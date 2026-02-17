import React, { useState, useEffect, useMemo } from 'react'
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts'
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

// Normalization helpers to align raw sheet values into consistent buckets
const normalizeAI = (val) => {
    const v = (val || '').toLowerCase()
    if (v.includes('no familiarity') || v === 'none' || v.includes('no understanding')) return 'No understanding'
    if (v.includes('basic')) return 'Basic understanding'
    if (v.includes('comfortable') || v.includes('beginner') || v.includes('intermediate')) return 'Intermediate understanding'
    if (v.includes('lead') || v.includes('advanced') || v.includes('expert')) return 'Advanced understanding'
    return 'Other'
}

const normalizeInternet = (val) => {
    const v = (val || '').toLowerCase()
    if (v.startsWith('daily')) return 'Daily'
    if (v.startsWith('weekly')) return 'Weekly'
    if (v.startsWith('monthly')) return 'Monthly'
    if (v.startsWith('rarely') || v.startsWith('never')) return 'Rarely/Never'
    return 'Other'
}

// Age normalization -> bucket into ranges for clearer charts
const AGE_BUCKETS = [
    { label: '12–14', min: 12, max: 14 },
    { label: '15–17', min: 15, max: 17 },
    { label: '18–20', min: 18, max: 20 },
    { label: '21–25', min: 21, max: 25 },
    { label: '26–30', min: 26, max: 30 },
    { label: '31–40', min: 31, max: 40 },
    { label: '41+', min: 41, max: 200 }
]

const normalizeAgeToBucket = (ageValue) => {
    const n = Number(String(ageValue).trim())
    if (Number.isNaN(n)) return 'Unknown'
    const bucket = AGE_BUCKETS.find(b => n >= b.min && n <= b.max)
    return bucket ? bucket.label : 'Unknown'
}

const SurveyAnalytics = ({ surveyData = [] }) => {
    const [filters, setFilters] = useState({ role: 'All', gender: 'All', age: 'All' })
    // Derived analytics; computed once per filtered dataset change
    const emptyAnalytics = useMemo(() => ({
        demographics: { byAge: [], byGender: [], byRole: [] },
        aiAwareness: { byRole: [], byAge: [], overall: [] },
        internetUsage: { byRole: [], byAge: [], overall: [] },
        barriers: { all: [], byRole: [] },
        devices: { all: [], byRole: [] },
        learningPreferences: { all: [], byRole: [] }
    }), [])

    const uniqueOptions = useMemo(() => {
        const roles = new Set()
        const genders = new Set()
        const ages = new Set()
        surveyData.forEach(r => {
            if (r.role) roles.add(r.role)
            if (r.gender) genders.add(r.gender)
            if (r.age) ages.add(r.age)
        })
        // Robust sorter: handles strings and numbers; numeric-aware for mixed inputs
        const sortAlpha = arr =>
            Array.from(arr)
                .filter(v => v !== undefined && v !== null && v !== '')
                .sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' }))
        return {
            roles: ['All', ...sortAlpha(roles)],
            genders: ['All', ...sortAlpha(genders)],
            ages: ['All', ...sortAlpha(ages)]
        }
    }, [surveyData])

    // Responsive chart heights
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false)
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])
    const pieHeight = isMobile ? 260 : 380
    const barHeight = isMobile ? 320 : 420
    const deviceBarHeight = isMobile ? 320 : 400

    const filteredData = useMemo(() => {
        return surveyData.filter(r => {
            if (filters.role !== 'All' && r.role !== filters.role) return false
            if (filters.gender !== 'All' && r.gender !== filters.gender) return false
            if (filters.age !== 'All' && r.age !== filters.age) return false
            return true
        })
    }, [surveyData, filters])

    // Helpers must be defined before use to avoid TDZ issues
    const objectToSeries = (obj) => {
        return Object.entries(obj)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
    }
    const groupToStacked = (groupObj, labelKey = 'role') => {
        return Object.entries(groupObj).map(([label, series]) => ({ [labelKey]: label, ...series }))
    }
    const objectToSeriesWithOrder = (obj, order) => {
        const items = []
        order.forEach(label => {
            if (Object.prototype.hasOwnProperty.call(obj, label)) {
                items.push({ name: label, value: obj[label] })
            }
        })
        // Append any unexpected labels at the end
        Object.entries(obj).forEach(([name, value]) => {
            if (!order.includes(name)) items.push({ name, value })
        })
        return items
    }
    const groupToStackedWithOrder = (groupObj, labelKey, order) => {
        const map = new Map(Object.entries(groupObj))
        const rows = []
        order.forEach(label => {
            if (map.has(label)) rows.push({ [labelKey]: label, ...map.get(label) })
        })
        // Append any unexpected labels at the end
        map.forEach((series, label) => {
            if (!order.includes(label)) rows.push({ [labelKey]: label, ...series })
        })
        return rows
    }
    const groupToPercentStacked = (groupObj, labelKey, keys) => {
        return Object.entries(groupObj).map(([label, series]) => {
            const total = Object.values(series).reduce((sum, val) => sum + val, 0)
            const row = { [labelKey]: label }
            keys.forEach(key => {
                const count = series[key] || 0
                row[key] = total ? Number(((count / total) * 100).toFixed(1)) : 0
            })
            return row
        }).sort((a, b) => {
            const sumA = keys.reduce((sum, key) => sum + (a[key] || 0), 0)
            const sumB = keys.reduce((sum, key) => sum + (b[key] || 0), 0)
            return sumB - sumA
        })
    }

    const analytics = useMemo(() => {
        const data = filteredData
        if (!data || data.length === 0) return emptyAnalytics
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

        for (let i = 0; i < data.length; i++) {
            const response = data[i]
            const ageBucket = normalizeAgeToBucket(response.age)
            ageGroups[ageBucket] = (ageGroups[ageBucket] || 0) + 1
            genderGroups[response.gender] = (genderGroups[response.gender] || 0) + 1
            roleGroups[response.role] = (roleGroups[response.role] || 0) + 1

            const aiLevel = normalizeAI(response.aiUnderstanding || 'Unknown')
            aiLevels[aiLevel] = (aiLevels[aiLevel] || 0) + 1
            if (!aiByRole[response.role]) aiByRole[response.role] = {}
            aiByRole[response.role][aiLevel] = (aiByRole[response.role][aiLevel] || 0) + 1
            if (!aiByAge[ageBucket]) aiByAge[ageBucket] = {}
            aiByAge[ageBucket][aiLevel] = (aiByAge[ageBucket][aiLevel] || 0) + 1

            const internet = normalizeInternet(response.internetUsage || 'Unknown')
            internetLevels[internet] = (internetLevels[internet] || 0) + 1
            if (!internetByRole[response.role]) internetByRole[response.role] = {}
            internetByRole[response.role][internet] = (internetByRole[response.role][internet] || 0) + 1
            if (!internetByAge[ageBucket]) internetByAge[ageBucket] = {}
            internetByAge[ageBucket][internet] = (internetByAge[ageBucket][internet] || 0) + 1

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
        }

        // Derive dynamic keys for stacked bars to match processed categories exactly
        const aiKeys = Object.keys(aiLevels)
        const internetKeys = Object.keys(internetLevels)
        const ageOrder = AGE_BUCKETS.map(b => b.label).concat(['Unknown'])

        const barrierSeriesRaw = objectToSeries(allBarriers).sort((a, b) => b.value - a.value).slice(0, 8)
        const barrierTotal = barrierSeriesRaw.reduce((sum, item) => sum + item.value, 0)
        const barrierSeries = barrierSeriesRaw.map(item => ({
            name: item.name,
            count: item.value,
            percent: barrierTotal ? Number(((item.value / barrierTotal) * 100).toFixed(1)) : 0
        }))
        const barrierKeys = barrierSeries.map(item => item.name)

        const deviceSeriesRaw = objectToSeries(allDevices).sort((a, b) => b.value - a.value).slice(0, 8)
        const deviceTotal = deviceSeriesRaw.reduce((sum, item) => sum + item.value, 0)
        const deviceSeries = deviceSeriesRaw.map(item => ({
            name: item.name,
            count: item.value,
            percent: deviceTotal ? Number(((item.value / deviceTotal) * 100).toFixed(1)) : 0
        }))
        const deviceKeys = deviceSeries.map(item => item.name)

        return {
            demographics: {
                byAge: objectToSeriesWithOrder(ageGroups, ageOrder),
                byGender: objectToSeries(genderGroups),
                byRole: objectToSeries(roleGroups)
            },
            aiAwareness: {
                byRole: groupToStacked(aiByRole),
                byAge: groupToStackedWithOrder(aiByAge, 'age', ageOrder),
                overall: objectToSeries(aiLevels),
                keys: aiKeys
            },
            internetUsage: {
                byRole: groupToStacked(internetByRole),
                byAge: groupToStackedWithOrder(internetByAge, 'age', ageOrder),
                overall: objectToSeries(internetLevels),
                keys: internetKeys
            },
            barriers: {
                all: barrierSeries,
                totalCount: barrierTotal,
                keys: barrierKeys,
                byRole: groupToPercentStacked(barriersByRole, 'role', barrierKeys)
            },
            devices: {
                all: deviceSeries,
                totalCount: deviceTotal,
                keys: deviceKeys,
                byRole: groupToPercentStacked(devicesByRole, 'role', deviceKeys)
            },
            learningPreferences: {
                all: objectToSeries(learningPrefs),
                byRole: groupToStacked(learningPrefsByRole)
            }
        }
    }, [filteredData, emptyAnalytics])

    // (moved helpers above analytics useMemo)

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

    const axisTick = { fill: '#6c757d', fontSize: isMobile ? 10 : 12 }
    const gridStroke = '#eee'
    const legendStyle = { color: '#5a3e2b', fontSize: isMobile ? 10 : 12 }
    const formatCategory = (value) => {
        const s = String(value ?? '')
        if (s.length <= (isMobile ? 10 : 18)) return s
        return s.slice(0, isMobile ? 10 : 18) + '…'
    }
    const chartMargin = { top: 10, right: 10, left: 10, bottom: isMobile ? 20 : 30 }
    const barrierChartData = analytics.barriers?.all || []
    const deviceChartData = analytics.devices?.all || []
    const barrierHasData = barrierChartData.length > 1
    const deviceHasData = deviceChartData.length > 1
    const percentTickFormatter = (value) => `${value}%`
    const barrierTicks = isMobile ? [0, 50, 100] : [0, 25, 50, 75, 100]
    const tooltipLabelFormatter = (label, payload) => {
        const count = payload && payload[0] ? payload[0].payload.count : 0
        return `${label} · ${count} responses`
    }

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
                            <ResponsiveContainer width="100%" height={380}>
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
                            <ResponsiveContainer width="100%" height={380}>
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
                            <ResponsiveContainer width="100%" height={380}>
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
                        <ResponsiveContainer width="100%" height={barHeight}>
                            <BarChart data={analytics.aiAwareness.byRole} barSize={isMobile ? 14 : 20} barCategoryGap={isMobile ? '20%' : '10%'} margin={chartMargin}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                                <XAxis dataKey="role" tick={axisTick} stroke="#dadce0" tickFormatter={formatCategory} />
                                <YAxis tick={axisTick} stroke="#dadce0" />
                                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #dadce0', borderRadius: '8px' }} />
                                <Legend wrapperStyle={legendStyle} iconType="circle" />
                                {(analytics.aiAwareness.keys || []).map((key, idx) => (
                                    <Bar key={key} dataKey={key} fill={CHART_COLORS[idx % CHART_COLORS.length]} radius={[4, 4, 0, 0]} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-container-full">
                    <h4>By Age Group</h4>
                    <div className="chart-content">
                        <ResponsiveContainer width="100%" height={barHeight}>
                            <BarChart data={analytics.aiAwareness.byAge} barSize={isMobile ? 14 : 20} barCategoryGap={isMobile ? '20%' : '10%'} margin={chartMargin}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                                <XAxis dataKey="age" tick={axisTick} stroke="#dadce0" tickFormatter={formatCategory} />
                                <YAxis tick={axisTick} stroke="#dadce0" />
                                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #dadce0', borderRadius: '8px' }} />
                                <Legend wrapperStyle={legendStyle} iconType="circle" />
                                {(analytics.aiAwareness.keys || []).map((key, idx) => (
                                    <Bar key={key} dataKey={key} fill={CHART_COLORS[idx % CHART_COLORS.length]} radius={[4, 4, 0, 0]} />
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
                            <ResponsiveContainer width="100%" height={pieHeight}>
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
                            <ResponsiveContainer width="100%" height={barHeight}>
                                <BarChart data={analytics.internetUsage.byRole} barSize={isMobile ? 20 : 28} margin={chartMargin}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                                    <XAxis dataKey="role" tick={axisTick} stroke="#e9ecef" tickFormatter={formatCategory} />
                                    <YAxis tick={axisTick} stroke="#e9ecef" />
                                    <Tooltip />
                                    <Legend wrapperStyle={legendStyle} />
                                    {(analytics.internetUsage.keys || []).map((key, idx) => (
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
                        {barrierHasData ? (
                            <ResponsiveContainer width="100%" height={barHeight}>
                                <BarChart data={barrierChartData} layout="vertical" barSize={isMobile ? 18 : 24} barCategoryGap={isMobile ? '16%' : '12%'} margin={chartMargin}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                                    <XAxis type="number" domain={[0, 100]} ticks={barrierTicks} tickFormatter={percentTickFormatter} tick={axisTick} stroke="#dadce0" />
                                    <YAxis dataKey="name" type="category" width={isMobile ? 140 : 220} tick={axisTick} stroke="#dadce0" tickFormatter={formatCategory} />
                                    <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Share']} labelFormatter={tooltipLabelFormatter} />
                                    <Bar dataKey="percent" radius={[0, 8, 8, 0]}>
                                        <LabelList dataKey="count" position="right" fill="#5a3e2b" fontSize={isMobile ? 10 : 12} />
                                        {barrierChartData.map((_, index) => (
                                            <Cell key={`bar-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="chart-empty">Not enough barrier data to visualize yet.</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Devices Section */}
            <section className="analytics-section">
                <h3 className="section-title">Devices for Learning</h3>
                <div className="chart-container-full">
                    <h4>Device Availability</h4>
                    <div className="chart-content">
                        {deviceHasData ? (
                            <ResponsiveContainer width="100%" height={deviceBarHeight}>
                                <BarChart data={deviceChartData} layout="vertical" barSize={isMobile ? 18 : 26} barCategoryGap={isMobile ? '16%' : '12%'} margin={chartMargin}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                                    <XAxis type="number" domain={[0, 100]} ticks={barrierTicks} tickFormatter={percentTickFormatter} tick={axisTick} stroke="#e9ecef" />
                                    <YAxis dataKey="name" type="category" width={isMobile ? 140 : 220} tick={axisTick} stroke="#e9ecef" tickFormatter={formatCategory} />
                                    <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Share']} labelFormatter={(label, payload) => {
                                        const count = payload && payload[0] ? payload[0].payload.count : 0
                                        return `${label} · ${count} mentions`
                                    }} />
                                    <Bar dataKey="percent" fill={COLORS.secondary} radius={[0, 8, 8, 0]}>
                                        <LabelList dataKey="count" position="right" fill="#5a3e2b" fontSize={isMobile ? 10 : 12} />
                                        {deviceChartData.map((_, index) => (
                                            <Cell key={`dev-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="chart-empty">Not enough device data to visualize yet.</div>
                        )}
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
                            <ResponsiveContainer width="100%" height={pieHeight}>
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
                            <ResponsiveContainer width="100%" height={barHeight}>
                                <BarChart data={analytics.learningPreferences.byRole} barSize={isMobile ? 20 : 28} margin={chartMargin}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                                    <XAxis dataKey="role" tick={axisTick} stroke="#e9ecef" tickFormatter={formatCategory} />
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
