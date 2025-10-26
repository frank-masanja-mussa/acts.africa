import React, { useState, useEffect, useMemo } from 'react'
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './SurveyAnalytics.css'

const COLORS = {
  primary: '#d2691e',       // burnt orange
  primaryDark: '#b85c1a',   // darker burnt orange
  secondary: '#daa520',     // goldenrod
  accent: '#cd853f',        // terracotta
  warning: '#e67e22',
  danger: '#a63a1b',        // deep terracotta
  neutral: '#5a3e2b',       // cocoa
}

const CHART_COLORS = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.accent,
  COLORS.warning,
  COLORS.danger,
  '#8c5a3c',
  '#a87c4f',
  '#6f4e37',
  '#c0873d',
  '#9c6b3b'
]

const AI_LEVEL_KEYS = [
  'No understanding',
  'Basic understanding',
  'Intermediate understanding',
  'Advanced understanding',
  'Expert level'
]

const INTERNET_KEYS = ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never']

const SurveyAnalytics = ({ surveyData = [] }) => {
  const [filters, setFilters] = useState({ role: 'All', gender: 'All', age: 'All' })
  const [analytics, setAnalytics] = useState({
    demographics: { byAge: [], byGender: [], byRole: [] },
    aiAwareness: { byRole: [], byAge: [], overall: [] },
    internetUsage: { byRole: [], byAge: [], overall: [] },
    barriers: { all: [], byRole: [] },
    devices: { all: [], byRole: [] },
    learningPreferences: { all: [], byRole: [] }
  })

  const uniqueOptions = useMemo(() => {
    const roles = new Set()
    const genders = new Set()
    const ages = new Set()
    surveyData.forEach(r => {
      if (r.role) roles.add(r.role)
      if (r.gender) genders.add(r.gender)
      if (r.age) ages.add(r.age)
    })
    const sortAlpha = arr => Array.from(arr).filter(Boolean).sort((a, b) => a.localeCompare(b))
    return {
      roles: ['All', ...sortAlpha(roles)],
      genders: ['All', ...sortAlpha(genders)],
      ages: ['All', ...sortAlpha(ages)]
    }
  }, [surveyData])

  const filteredData = useMemo(() => {
    return surveyData.filter(r => {
      if (filters.role !== 'All' && r.role !== filters.role) return false
      if (filters.gender !== 'All' && r.gender !== filters.gender) return false
      if (filters.age !== 'All' && r.age !== filters.age) return false
      return true
    })
  }, [surveyData, filters])

  useEffect(() => {
    if (filteredData.length > 0) {
      processAnalytics(filteredData)
    } else {
      setAnalytics({
        demographics: { byAge: [], byGender: [], byRole: [] },
        aiAwareness: { byRole: [], byAge: [], overall: [] },
        internetUsage: { byRole: [], byAge: [], overall: [] },
        barriers: { all: [], byRole: [] },
        devices: { all: [], byRole: [] },
        learningPreferences: { all: [], byRole: [] }
      })
    }
  }, [filteredData])

  const processAnalytics = (data) => {
    const ageGroups = {}
    const genderGroups = {}
    const roleGroups = {}

    const aiByRole = {}
    const aiByAge = {}
    const aiLevels = {}

    const internetByRole = {}
    const internetByAge = {}
    const internetLevels = {}

    const allBarriers = {}
    const barriersByRole = {}

    const allDevices = {}
    const devicesByRole = {}

    const learningPrefs = {}
    const learningPrefsByRole = {}

    data.forEach(response => {
      ageGroups[response.age] = (ageGroups[response.age] || 0) + 1
      genderGroups[response.gender] = (genderGroups[response.gender] || 0) + 1
      roleGroups[response.role] = (roleGroups[response.role] || 0) + 1

      const aiLevel = response.aiUnderstanding || 'Unknown'
      aiLevels[aiLevel] = (aiLevels[aiLevel] || 0) + 1
      if (!aiByRole[response.role]) aiByRole[response.role] = {}
      aiByRole[response.role][aiLevel] = (aiByRole[response.role][aiLevel] || 0) + 1
      if (!aiByAge[response.age]) aiByAge[response.age] = {}
      aiByAge[response.age][aiLevel] = (aiByAge[response.age][aiLevel] || 0) + 1

      const internet = response.internetUsage || 'Unknown'
      internetLevels[internet] = (internetLevels[internet] || 0) + 1
      if (!internetByRole[response.role]) internetByRole[response.role] = {}
      internetByRole[response.role][internet] = (internetByRole[response.role][internet] || 0) + 1
      if (!internetByAge[response.age]) internetByAge[response.age] = {}
      internetByAge[response.age][internet] = (internetByAge[response.age][internet] || 0) + 1

      const barriers = response.barriers ? response.barriers.split(',').map(b => b.trim()).filter(Boolean) : []
      barriers.forEach(barrier => {
        allBarriers[barrier] = (allBarriers[barrier] || 0) + 1
        if (!barriersByRole[response.role]) barriersByRole[response.role] = {}
        barriersByRole[response.role][barrier] = (barriersByRole[response.role][barrier] || 0) + 1
      })

      const devices = response.devices ? response.devices.split(',').map(d => d.trim()).filter(Boolean) : []
      devices.forEach(device => {
        allDevices[device] = (allDevices[device] || 0) + 1
        if (!devicesByRole[response.role]) devicesByRole[response.role] = {}
        devicesByRole[response.role][device] = (devicesByRole[response.role][device] || 0) + 1
      })

      const pref = response.learningPreference || 'Unknown'
      learningPrefs[pref] = (learningPrefs[pref] || 0) + 1
      if (!learningPrefsByRole[response.role]) learningPrefsByRole[response.role] = {}
      learningPrefsByRole[response.role][pref] = (learningPrefsByRole[response.role][pref] || 0) + 1
    })

    setAnalytics({
      demographics: {
        byAge: objectToSeries(ageGroups),
        byGender: objectToSeries(genderGroups),
        byRole: objectToSeries(roleGroups)
      },
      aiAwareness: {
        byRole: groupToStacked(aiByRole),
        byAge: groupToStacked(aiByAge, 'age'),
        overall: objectToSeries(aiLevels)
      },
      internetUsage: {
        byRole: groupToStacked(internetByRole),
        byAge: groupToStacked(internetByAge, 'age'),
        overall: objectToSeries(internetLevels)
      },
      barriers: {
        all: objectToSeries(allBarriers).sort((a, b) => b.value - a.value).slice(0, 10),
        byRole: Object.entries(barriersByRole).map(([role, obj]) => ({ role, barriers: objectToSeries(obj) }))
      },
      devices: {
        all: objectToSeries(allDevices).sort((a, b) => b.value - a.value),
        byRole: Object.entries(devicesByRole).map(([role, obj]) => ({ role, devices: objectToSeries(obj) }))
      },
      learningPreferences: {
        all: objectToSeries(learningPrefs),
        byRole: groupToStacked(learningPrefsByRole)
      }
    })
  }

  const objectToSeries = (obj) => Object.entries(obj).map(([name, value]) => ({ name, value }))
  const groupToStacked = (groupObj, labelKey = 'role') => {
    return Object.entries(groupObj).map(([label, series]) => ({ [labelKey]: label, ...series }))
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0]
      return (
        <div className="custom-tooltip">
          <p className="label">{item.name || item.payload?.name || item.payload?.role || item.payload?.age}</p>
          <p className="value">Count: {item.value}</p>
          <p className="percentage">
            {filteredData.length ? ((item.value / filteredData.length) * 100).toFixed(1) : 0}%
          </p>
        </div>
      )
    }
    return null
  }

  const axisTick = { fill: '#6c757d', fontSize: 12 }
  const gridStroke = '#eee'
  const legendStyle = { color: '#5a3e2b', fontSize: 12 }

  return (
    <div className="survey-analytics">
      <div className="analytics-header">
        <h2>Analytics Overview</h2>
        <p>Use the filters below to explore AI literacy and access patterns across different groups.</p>

        {/* Filters */}
        <div className="filters-bar">
          <div className="filter-item">
            <label>Role</label>
            <select value={filters.role} onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}>
              {uniqueOptions.roles.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
          </div>
          <div className="filter-item">
            <label>Gender</label>
            <select value={filters.gender} onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}>
              {uniqueOptions.genders.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
          </div>
          <div className="filter-item">
            <label>Age</label>
            <select value={filters.age} onChange={(e) => setFilters(prev => ({ ...prev, age: e.target.value }))}>
              {uniqueOptions.ages.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
          </div>
          <button className="clear-btn" onClick={() => setFilters({ role: 'All', gender: 'All', age: 'All' })}>Reset</button>
        </div>

        <div className="filters-meta">
          Showing {filteredData.length} of {surveyData.length} responses
        </div>
      </div>

      {/* Demographics Section */}
      <section className="analytics-section">
        <h3 className="section-title">Demographics</h3>
        <div className="charts-grid">
          <div className="chart-container">
            <h4>Participants by Role</h4>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={analytics.demographics.byRole} cx="50%" cy="50%" innerRadius={60} outerRadius={110} stroke="#ffffff" strokeWidth={2} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} dataKey="value">
                    {analytics.demographics.byRole.map((_, index) => (
                      <Cell key={`role-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-container">
            <h4>Age Distribution</h4>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={analytics.demographics.byAge} cx="50%" cy="50%" innerRadius={60} outerRadius={110} stroke="#ffffff" strokeWidth={2} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} dataKey="value">
                    {analytics.demographics.byAge.map((_, index) => (
                      <Cell key={`age-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-container">
            <h4>Gender Distribution</h4>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={analytics.demographics.byGender} cx="50%" cy="50%" innerRadius={60} outerRadius={110} stroke="#ffffff" strokeWidth={2} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} dataKey="value">
                    {analytics.demographics.byGender.map((_, index) => (
                      <Cell key={`gender-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* AI Awareness Section */}
      <section className="analytics-section">
        <h3 className="section-title">AI Understanding</h3>
        <div className="chart-container-full">
          <h4>By Role</h4>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={440}>
              <BarChart data={analytics.aiAwareness.byRole} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="role" tick={axisTick} stroke="#e9ecef" />
                <YAxis tick={axisTick} stroke="#e9ecef" />
                <Tooltip />
                <Legend wrapperStyle={legendStyle} />
                {AI_LEVEL_KEYS.map((key, idx) => (
                  <Bar key={key} dataKey={key} stackId="a" fill={CHART_COLORS[idx % CHART_COLORS.length]} radius={[6, 6, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container-full">
          <h4>By Age Group</h4>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={440}>
              <BarChart data={analytics.aiAwareness.byAge} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="age" tick={axisTick} stroke="#e9ecef" />
                <YAxis tick={axisTick} stroke="#e9ecef" />
                <Tooltip />
                <Legend wrapperStyle={legendStyle} />
                {AI_LEVEL_KEYS.map((key, idx) => (
                  <Bar key={key} dataKey={key} stackId="a" fill={CHART_COLORS[idx % CHART_COLORS.length]} radius={[6, 6, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Internet Usage Section */}
      <section className="analytics-section">
        <h3 className="section-title">Internet Access & Usage</h3>
        <div className="charts-grid">
          <div className="chart-container">
            <h4>Overall Usage</h4>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={analytics.internetUsage.overall} cx="50%" cy="50%" innerRadius={60} outerRadius={110} stroke="#ffffff" strokeWidth={2} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} dataKey="value">
                    {analytics.internetUsage.overall.map((_, index) => (
                      <Cell key={`net-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-container">
            <h4>By Role</h4>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={analytics.internetUsage.byRole} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                  <XAxis dataKey="role" tick={axisTick} stroke="#e9ecef" />
                  <YAxis tick={axisTick} stroke="#e9ecef" />
                  <Tooltip />
                  <Legend wrapperStyle={legendStyle} />
                  {INTERNET_KEYS.map((key, idx) => (
                    <Bar key={key} dataKey={key} fill={CHART_COLORS[idx % CHART_COLORS.length]} radius={[6, 6, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Barriers Section */}
      <section className="analytics-section">
        <h3 className="section-title">Barriers to Learning</h3>
        <div className="chart-container-full">
          <h4>Top Barriers</h4>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={440}>
              <BarChart data={analytics.barriers.all} layout="vertical" barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis type="number" tick={axisTick} stroke="#e9ecef" />
                <YAxis dataKey="name" type="category" width={160} tick={axisTick} stroke="#e9ecef" />
                <Tooltip />
                <Bar dataKey="value" fill={COLORS.primary} radius={[0, 6, 6, 0]}>
                  {analytics.barriers.all.map((_, index) => (
                    <Cell key={`bar-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Devices Section */}
      <section className="analytics-section">
        <h3 className="section-title">Devices for Learning</h3>
        <div className="chart-container-full">
          <h4>Device Availability</h4>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={analytics.devices.all} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="name" tick={axisTick} stroke="#e9ecef" />
                <YAxis tick={axisTick} stroke="#e9ecef" />
                <Tooltip />
                <Bar dataKey="value" fill={COLORS.secondary} radius={[6, 6, 0, 0]}>
                  {analytics.devices.all.map((_, index) => (
                    <Cell key={`dev-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Learning Preferences Section */}
      <section className="analytics-section">
        <h3 className="section-title">Learning Preferences</h3>
        <div className="charts-grid">
          <div className="chart-container">
            <h4>Overall</h4>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={analytics.learningPreferences.all} cx="50%" cy="50%" innerRadius={60} outerRadius={110} stroke="#ffffff" strokeWidth={2} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} dataKey="value">
                    {analytics.learningPreferences.all.map((_, index) => (
                      <Cell key={`pref-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-container">
            <h4>By Role</h4>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={analytics.learningPreferences.byRole} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                  <XAxis dataKey="role" tick={axisTick} stroke="#e9ecef" />
                  <YAxis tick={axisTick} stroke="#e9ecef" />
                  <Tooltip />
                  <Legend wrapperStyle={legendStyle} />
                  <Bar dataKey="Online" fill={CHART_COLORS[0]} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="In-person" fill={CHART_COLORS[1]} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Hybrid" fill={CHART_COLORS[2]} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SurveyAnalytics

