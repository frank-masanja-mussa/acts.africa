import 'dotenv/config'

const WEBAPP_URL = process.env.VITE_SHEETS_WEBAPP_URL || ''
const WRITE_TOKEN = process.env.VITE_SHEETS_WRITE_TOKEN || ''
const TARGET_SHEET = 'Survey Responses'

if (!WEBAPP_URL) {
  console.error('Missing VITE_SHEETS_WEBAPP_URL environment variable.')
  process.exit(1)
}

if (!WRITE_TOKEN) {
  console.error('Missing VITE_SHEETS_WRITE_TOKEN environment variable.')
  process.exit(1)
}

const DEFAULT_TOTAL = 10000
const DEFAULT_BATCH_SIZE = 250

const args = process.argv.slice(2)
const totalRecordsArg = args.find(arg => /^\d+$/.test(arg))
const batchSizeArg = args.find(arg => arg.startsWith('--batch='))
const dryRun = args.includes('--dry-run')

const TOTAL_RECORDS = totalRecordsArg ? parseInt(totalRecordsArg, 10) : DEFAULT_TOTAL
const BATCH_SIZE = batchSizeArg ? parseInt(batchSizeArg.split('=')[1], 10) : DEFAULT_BATCH_SIZE

if (Number.isNaN(TOTAL_RECORDS) || TOTAL_RECORDS <= 0) {
  console.error('Total records must be a positive integer.')
  process.exit(1)
}

if (Number.isNaN(BATCH_SIZE) || BATCH_SIZE <= 0) {
  console.error('Batch size must be a positive integer.')
  process.exit(1)
}

// Default role weights (used if quotas are not computed)
const roles = [
  { value: 'Student', weight: 0.78 },
  { value: 'Teacher', weight: 0.17 },
  { value: 'Administrator', weight: 0.05 }
]

// Target role ratios aligned with TAMISEMI secondary balance
// We keep a minimal non-zero admin presence to avoid eliminating an existing category.
const TARGET_ROLE_RATIOS = {
  Student: 0.97,
  Teacher: 0.03,
  Administrator: 0.0
}

function clampRatios(ratios) {
  const entries = Object.entries(ratios)
  const total = entries.reduce((s, [, v]) => s + v, 0)
  if (total === 1) return ratios
  return Object.fromEntries(entries.map(([k, v]) => [k, v / total]))
}

const genders = [
  { value: 'Female', weight: 0.48 },
  { value: 'Male', weight: 0.5 },
  { value: 'Non-binary', weight: 0.02 }
]

const studentAgeBuckets = [
  { min: 12, max: 14, weight: 0.22 },
  { min: 15, max: 17, weight: 0.48 },
  { min: 18, max: 20, weight: 0.2 },
  { min: 21, max: 25, weight: 0.1 }
]

const teacherAgeBuckets = [
  { min: 24, max: 30, weight: 0.32 },
  { min: 31, max: 40, weight: 0.38 },
  { min: 41, max: 55, weight: 0.25 },
  { min: 56, max: 60, weight: 0.05 }
]

const adminAgeBuckets = [
  { min: 28, max: 35, weight: 0.3 },
  { min: 36, max: 45, weight: 0.45 },
  { min: 46, max: 60, weight: 0.25 }
]

const internetUsageByRole = {
  Student: [
    { value: 'Daily (mobile data)', weight: 0.35 },
    { value: 'Daily (school lab)', weight: 0.18 },
    { value: 'Weekly', weight: 0.32 },
    { value: 'Rarely', weight: 0.15 }
  ],
  Teacher: [
    { value: 'Daily (school lab)', weight: 0.28 },
    { value: 'Daily (mobile data)', weight: 0.22 },
    { value: 'Weekly', weight: 0.36 },
    { value: 'Rarely', weight: 0.14 }
  ],
  Administrator: [
    { value: 'Daily (office broadband)', weight: 0.4 },
    { value: 'Weekly', weight: 0.4 },
    { value: 'Rarely', weight: 0.2 }
  ]
}

const aiExperienceByRole = {
  Student: [
    { value: 'None', weight: 0.28 },
    { value: 'Beginner', weight: 0.5 },
    { value: 'Intermediate', weight: 0.19 },
    { value: 'Advanced', weight: 0.03 }
  ],
  Teacher: [
    { value: 'None', weight: 0.34 },
    { value: 'Beginner', weight: 0.42 },
    { value: 'Intermediate', weight: 0.21 },
    { value: 'Advanced', weight: 0.03 }
  ],
  Administrator: [
    { value: 'None', weight: 0.4 },
    { value: 'Beginner', weight: 0.38 },
    { value: 'Intermediate', weight: 0.19 },
    { value: 'Advanced', weight: 0.03 }
  ]
}

const aiUnderstandingLevels = [
  { value: 'No familiarity yet', weight: 0.26 },
  { value: 'Basic awareness', weight: 0.44 },
  { value: 'Comfortable using simple AI tools', weight: 0.24 },
  { value: 'Can lead AI projects', weight: 0.06 }
]

const deviceOptions = [
  'Shared smartphone',
  'Personal smartphone',
  'School computer lab',
  'Community digital center',
  'Personal laptop'
]

const barriersOptions = [
  'Limited internet connectivity',
  'High data costs',
  'Lack of devices',
  'Limited electricity',
  'Need teacher training',
  'Curriculum not updated',
  'Language barriers',
  'Parental awareness needed'
]

const topicsOptions = [
  'Learning to code with AI tools',
  'AI for agriculture and climate resilience',
  'Entrepreneurship with AI',
  'AI ethics and safety',
  'Robotics and automation',
  'Digital creativity and storytelling'
]

const joinClubOptions = [
  { value: 'Yes', weight: 0.58 },
  { value: 'Maybe', weight: 0.32 },
  { value: 'No', weight: 0.1 }
]

const learningPreferences = [
  { value: 'Hands-on workshops', weight: 0.33 },
  { value: 'School clubs with mentors', weight: 0.27 },
  { value: 'Self-paced digital content', weight: 0.18 },
  { value: 'Peer-led study groups', weight: 0.12 },
  { value: 'Community showcases', weight: 0.1 }
]

const expectationsOptions = [
  'Improve academic performance with AI tools',
  'Gain skills for future jobs',
  'Create community impact projects',
  'Access reliable study resources',
  'Connect with mentors and peers',
  'Prepare for national exams'
]

function weightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  let threshold = Math.random() * totalWeight
  for (const item of items) {
    threshold -= item.weight
    if (threshold <= 0) {
      return item.value ? item.value : item
    }
  }
  return items[items.length - 1].value ? items[items.length - 1].value : items[items.length - 1]
}

function weightedRandomByObject(weights) {
  const entries = Object.entries(weights).filter(([, w]) => w > 0)
  const total = entries.reduce((s, [, w]) => s + w, 0)
  let r = Math.random() * total
  for (const [key, w] of entries) {
    r -= w
    if (r <= 0) return key
  }
  return entries[entries.length - 1][0]
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomSubset(options, { min = 1, max = 3 } = {}) {
  const shuffled = [...options].sort(() => Math.random() - 0.5)
  const count = randomInt(min, Math.min(max, options.length))
  return shuffled.slice(0, count)
}

function pickAgeForRole(role) {
  const buckets =
    role === 'Student'
      ? studentAgeBuckets
      : role === 'Teacher'
        ? teacherAgeBuckets
        : adminAgeBuckets
  const bucket = weightedRandom(buckets)
  const range = bucket.value || bucket
  const min = range.min ?? bucket.min
  const max = range.max ?? bucket.max
  return randomInt(min, max)
}

function generateTimestamp(index) {
  const now = new Date()
  const daysBack = randomInt(0, 180)
  now.setDate(now.getDate() - daysBack)
  now.setHours(randomInt(8, 17), randomInt(0, 59), randomInt(0, 59), 0)
  return now.toISOString()
}

function generateDevices(role) {
  if (role === 'Teacher' || role === 'Administrator') {
    return randomSubset(deviceOptions, { min: 1, max: 3 })
  }
  // Students: bias towards shared/personal smartphones and lab access
  const studentDevices = [
    ...deviceOptions.filter(device =>
      ['Shared smartphone', 'Personal smartphone', 'School computer lab'].includes(device)
    ),
    'Personal tablet'
  ]
  const uniqueOptions = Array.from(new Set(studentDevices))
  return randomSubset(uniqueOptions, { min: 1, max: 3 })
}

function adjustWeightsForRole(role, options) {
  if (role === 'Teacher') {
    return options.map(option => {
      if (option.value === 'Need teacher training') {
        return { ...option, weight: option.weight + 0.12 }
      }
      if (option.value === 'Limited electricity') {
        return { ...option, weight: option.weight - 0.05 }
      }
      return option
    })
  }
  if (role === 'Student') {
    return options.map(option => {
      if (option === 'High data costs' || option.value === 'High data costs') {
        return { ...(option.value ? option : { value: option, weight: 1 }), weight: 0.22 }
      }
      if (option === 'Parental awareness needed' || option.value === 'Parental awareness needed') {
        return { ...(option.value ? option : { value: option, weight: 1 }), weight: 0.18 }
      }
      return option
    })
  }
  return options
}

function generateBarriers(role) {
  const options = adjustWeightsForRole(role, barriersOptions).map(option =>
    typeof option === 'string' ? { value: option, weight: 1 } : option
  )
  const count = role === 'Administrator' ? randomInt(1, 2) : randomInt(2, 4)
  const selected = []
  while (selected.length < count) {
    const choice = weightedRandom(options)
    if (!selected.includes(choice)) {
      selected.push(choice)
    }
  }
  return selected
}

function generateTopics(role) {
  let options = topicsOptions
  if (role === 'Teacher') {
    options = topicsOptions.concat(['Integrating AI into lesson plans'])
  }
  if (role === 'Administrator') {
    options = topicsOptions.concat(['Scaling AI programs across schools'])
  }
  return randomSubset(options, { min: role === 'Administrator' ? 1 : 2, max: 3 })
}

function generateExpectations(role) {
  const base = [...expectationsOptions]
  if (role === 'Teacher') {
    base.push('Develop AI-enhanced lesson plans')
  }
  if (role === 'Administrator') {
    base.push('Strengthen school-wide digital strategy')
  }
  return randomSubset(base, { min: 2, max: 4 })
}

function generateResponse(index) {
  const role = weightedRandom(roles)
  const gender = weightedRandom(genders)
  const age = pickAgeForRole(role)
  const internetUsage = weightedRandom(internetUsageByRole[role])
  const aiExperience = weightedRandom(aiExperienceByRole[role])
  const aiUnderstanding = weightedRandom(aiUnderstandingLevels)
  const devices = generateDevices(role)
  const barriers = generateBarriers(role)
  const topics = generateTopics(role)
  const joinClub = weightedRandom(joinClubOptions)
  const learningPreference = weightedRandom(learningPreferences)
  const expectations = generateExpectations(role)

  return [
    generateTimestamp(index),
    'Tanzania',
    String(age),
    gender,
    role,
    internetUsage,
    aiExperience,
    devices.join(', '),
    aiUnderstanding,
    barriers.join(', '),
    topics.join(', '),
    joinClub,
    learningPreference,
    expectations.join(', ')
  ]
}

async function fetchCurrentCounts() {
  // Read existing data to avoid contradictions and steer toward target ratios
  const range = encodeURIComponent('Survey Responses!A1:N100000')
  const url = `${WEBAPP_URL}?range=${range}`
  const res = await fetch(url, { method: 'GET' })
  if (!res.ok) {
    throw new Error(`Failed to read current data: ${res.status}`)
  }
  const data = await res.json()
  const values = (data && data.values) || []
  if (values.length < 2) {
    return { Student: 0, Teacher: 0, Administrator: 0, total: 0 }
  }
  const headers = values[0]
  const roleIdx = headers.indexOf('role')
  if (roleIdx === -1) {
    return { Student: 0, Teacher: 0, Administrator: 0, total: values.length - 1 }
  }
  const counts = { Student: 0, Teacher: 0, Administrator: 0 }
  for (let i = 1; i < values.length; i++) {
    const row = values[i]
    const r = (row[roleIdx] || '').trim()
    if (counts[r] !== undefined) {
      counts[r] += 1
    }
  }
  const total = values.length - 1
  return { ...counts, total }
}

function computeRoleQuotas(currentCounts, toAdd, targetRatiosInput) {
  const targetRatios = clampRatios(targetRatiosInput)
  const N0 = currentCounts.total || 0
  const N1 = N0 + toAdd
  // Desired totals at N1
  const desiredTotals = Object.fromEntries(
    Object.entries(targetRatios).map(([role, ratio]) => [role, Math.round(ratio * N1)])
  )
  // Compute needed additions (non-negative)
  const additions = {}
  let allocated = 0
  for (const role of Object.keys(targetRatios)) {
    const current = currentCounts[role] || 0
    const need = Math.max(0, desiredTotals[role] - current)
    additions[role] = need
    allocated += need
  }
  // Adjust to match exactly toAdd
  const rolesOrder = Object.keys(targetRatios).sort((a, b) => {
    // prioritize students > teachers > admin for any residual adjustments
    const order = { Student: 0, Teacher: 1, Administrator: 2 }
    return order[a] - order[b]
  })
  if (allocated > toAdd) {
    // Reduce extras starting from lowest priority
    for (let i = rolesOrder.length - 1; i >= 0 && allocated > toAdd; i--) {
      const role = rolesOrder[i]
      const canReduce = Math.min(additions[role], allocated - toAdd)
      additions[role] -= canReduce
      allocated -= canReduce
    }
  } else if (allocated < toAdd) {
    // Distribute remaining starting from highest priority
    for (let i = 0; i < rolesOrder.length && allocated < toAdd; i++) {
      const role = rolesOrder[i]
      additions[role] += 1
      allocated += 1
      i = (allocated < toAdd && i === rolesOrder.length - 1) ? -1 : i
    }
  }
  return additions
}

function rolePickerFromQuotas(quotas) {
  const remaining = { ...quotas }
  const totalRemaining = () => Object.values(remaining).reduce((s, v) => s + v, 0)
  return function pick() {
    const t = totalRemaining()
    if (t <= 0) {
      // Fallback to default weights if quotas exhausted unexpectedly
      return weightedRandom(roles)
    }
    const chosen = weightedRandomByObject(remaining)
    remaining[chosen] -= 1
    return chosen
  }
}

function generateResponseWithRole(index, role) {
  const gender = weightedRandom(genders)
  const age = pickAgeForRole(role)
  const internetUsage = weightedRandom(internetUsageByRole[role])
  const aiExperience = weightedRandom(aiExperienceByRole[role])
  const aiUnderstanding = weightedRandom(aiUnderstandingLevels)
  const devices = generateDevices(role)
  const barriers = generateBarriers(role)
  const topics = generateTopics(role)
  const joinClub = weightedRandom(joinClubOptions)
  const learningPreference = weightedRandom(learningPreferences)
  const expectations = generateExpectations(role)

  return [
    generateTimestamp(index),
    'Tanzania',
    String(age),
    gender,
    role,
    internetUsage,
    aiExperience,
    devices.join(', '),
    aiUnderstanding,
    barriers.join(', '),
    topics.join(', '),
    joinClub,
    learningPreference,
    expectations.join(', ')
  ]
}

async function sendBatch(rows, batchNumber) {
  if (dryRun) {
    console.log(`[dry-run] Would send batch ${batchNumber} with ${rows.length} rows`)
    return { status: 'ok', inserted: rows.length }
  }

  const response = await fetch(`${WEBAPP_URL}?token=${encodeURIComponent(WRITE_TOKEN)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sheet: TARGET_SHEET,
      rows
    })
  })

  if (!response.ok) {
    let errorMessage = `Write failed with status ${response.status}`
    try {
      const detail = await response.json()
      errorMessage = detail.error || errorMessage
    } catch (_) {
      // ignore JSON parsing errors
    }
    throw new Error(errorMessage)
  }

  return response.json()
}

async function run() {
  console.log('--- ACTS.Africa Survey Seeder ---')
  console.log(`Target sheet: ${TARGET_SHEET}`)
  console.log(`Total records: ${TOTAL_RECORDS}`)
  console.log(`Batch size: ${BATCH_SIZE}`)
  console.log(`Mode: ${dryRun ? 'DRY RUN (no writes will occur)' : 'LIVE WRITE'}`)

  // 1) Read current counts to compute quotas steering toward target ratios
  let quotas = null
  try {
    const current = await fetchCurrentCounts()
    const desiredAdditions = computeRoleQuotas(current, TOTAL_RECORDS, TARGET_ROLE_RATIOS)
    quotas = desiredAdditions
    console.log(
      `Current totals: S=${current.Student || 0}, T=${current.Teacher || 0}, A=${current.Administrator || 0}, N=${current.total || 0}`
    )
    console.log(
      `Planned additions: S=${quotas.Student || 0}, T=${quotas.Teacher || 0}, A=${quotas.Administrator || 0}`
    )
  } catch (e) {
    console.warn('Could not read current counts; proceeding with default role weights.', e.message)
  }

  let created = 0
  let batchNumber = 1
  const pickRole = quotas ? rolePickerFromQuotas(quotas) : null

  while (created < TOTAL_RECORDS) {
    const remaining = TOTAL_RECORDS - created
    const currentBatchSize = Math.min(BATCH_SIZE, remaining)
    const rows = Array.from({ length: currentBatchSize }, (_, idx) => {
      if (pickRole) {
        const role = pickRole()
        return generateResponseWithRole(created + idx, role)
      }
      return generateResponse(created + idx)
    })

    try {
      const result = await sendBatch(rows, batchNumber)
      created += currentBatchSize
      console.log(
        `Batch ${batchNumber} succeeded: +${currentBatchSize} rows (total inserted: ${created})`,
        dryRun ? '' : `| Sheets response: ${JSON.stringify(result)}`
      )
    } catch (error) {
      console.error(`Batch ${batchNumber} failed: ${error.message}`)
      console.error('Pausing before retry...')
      await new Promise(resolve => setTimeout(resolve, 3000))
      continue
    }

    batchNumber += 1
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log('--- Seeder complete ---')
}

run().catch(error => {
  console.error('Seeder failed:', error)
  process.exit(1)
})

