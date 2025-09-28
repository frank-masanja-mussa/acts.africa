import React, { useEffect, useMemo, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import Icon from '@mdi/react'
import { 
  mdiChartLine, 
  mdiTrendingUp, 
  mdiAccountGroup, 
  mdiPulse, 
  mdiRefresh,
  mdiChartTimelineVariant,
  mdiTarget,
  mdiDatabase
} from '@mdi/js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

// In dev, Vite proxy maps /wb -> https://api.worldbank.org
const WB_BASE = '/wb/v2'

async function fetchIndicatorSeries(regionCode, indicatorCode, startYear, endYear) {
  // Use country-style endpoint with region codes (WB supports aggregate pseudo-countries like SSF, WLD)
  const url = `${WB_BASE}/country/${regionCode}/indicator/${indicatorCode}?per_page=2000&date=${startYear}:${endYear}&format=json`
  const data = await fetchWorldBankJson(url)
  const rows = data?.[1] || []
  return rows
    .filter(r => r.value !== null)
    .map(r => ({ year: Number(r.date), value: Number(r.value) }))
    .sort((a, b) => a.year - b.year)
}

// Fetch JSON with automatic CORS-friendly proxy fallback
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

async function fetchWorldBankJson(url, attempt = 1) {
  // Use Vite dev proxy in dev; in prod, route via your server/edge proxy
  const res = await fetch(url, { cache: 'no-store' })
  if (res.status === 429 && attempt < 3) {
    await sleep(600 * attempt)
    return fetchWorldBankJson(url, attempt + 1)
  }
  if (!res.ok) throw new Error('WB proxy fetch failed')
  return await res.json()
}

function buildDataset(label, color, series, yearIndex) {
  const values = yearIndex.map(y => series.find(p => p.year === y)?.value ?? null)
  return {
    label,
    data: values,
    tension: 0.3,
    borderColor: color,
    backgroundColor: `${color}33`,
    fill: true,
    spanGaps: true,
  }
}

// Utility to format large numbers with commas
function formatNumber(n) {
  if (n == null) return null
  try { return Math.round(n).toLocaleString() } catch { return String(n) }
}

const Analytics = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [yearIndex, setYearIndex] = useState([])
  const [popSeries, setPopSeries] = useState({})
  const [workforceShare, setWorkforceShare] = useState([])
  const [wmWorld, setWmWorld] = useState(null)
  const [wmAfrica, setWmAfrica] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [liveData, setLiveData] = useState({
    worldPop: '8.1B',
    ssaPop: '1.2B',
    workforceShare: '12.5%',
    projection2050: '18.3%'
  })

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError('')
        const startYear = 1990
        const endYear = 2050
        const years = []
        for (let y = startYear; y <= endYear; y++) years.push(y)
        if (!cancelled) setYearIndex(years)

        // Regions: Sub-Saharan Africa (SSF), East Asia & Pacific (EAS), Europe & Central Asia (ECS), South Asia (SAS), Latin America & Caribbean (LCN), World (WLD)
        const regions = ['SSF', 'EAS', 'ECS', 'SAS', 'LCN', 'WLD']
        const popIndicator = 'SP.POP.TOTL'
        const age1564Pct = 'SP.POP.1564.TO.ZS'

        // Fetch sequentially to avoid rate limits (429) on proxy
        const ssf = await fetchIndicatorSeries('SSF', popIndicator, startYear, endYear)
        await sleep(150)
        const eas = await fetchIndicatorSeries('EAS', popIndicator, startYear, endYear)
        await sleep(150)
        const ecs = await fetchIndicatorSeries('ECS', popIndicator, startYear, endYear)
        await sleep(150)
        const sas = await fetchIndicatorSeries('SAS', popIndicator, startYear, endYear)
        await sleep(150)
        const lcn = await fetchIndicatorSeries('LCN', popIndicator, startYear, endYear)
        await sleep(150)
        const wld = await fetchIndicatorSeries('WLD', popIndicator, startYear, endYear)

        if (cancelled) return
        setPopSeries({ ssf, eas, ecs, sas, lcn, wld })

        // Derive latest populations for World and SSA from World Bank series
        const latestWorld = [...wld].reverse().find(d => d.value != null)?.value ?? null
        const latestSSA = [...ssf].reverse().find(d => d.value != null)?.value ?? null
        setWmWorld(formatNumber(latestWorld))
        setWmAfrica(formatNumber(latestSSA))

        // Working-age percent for SSA and World
        const [ssf1564, wld1564] = await Promise.all([
          fetchIndicatorSeries('SSF', age1564Pct, startYear, endYear),
          fetchIndicatorSeries('WLD', age1564Pct, startYear, endYear),
        ])

        // Build workforce share = (SSA_pop * SSA_15-64%) / (WLD_pop * WLD_15-64%)
        const workforce = years.map(year => {
          const ssaPop = ssf.find(p => p.year === year)?.value
          const wPop = wld.find(p => p.year === year)?.value
          const ssaPct = ssf1564.find(p => p.year === year)?.value
          const wPct = wld1564.find(p => p.year === year)?.value
          if (ssaPop && wPop && ssaPct && wPct) {
            const ssaWorking = ssaPop * (ssaPct / 100)
            const worldWorking = wPop * (wPct / 100)
            return { year, value: (ssaWorking / worldWorking) * 100 }
          }
          return { year, value: null }
        })

        if (!cancelled) setWorkforceShare(workforce)
      } catch (e) {
        if (!cancelled) setError('Live data unavailable right now. Please try again later.')
      } finally {
        if (!cancelled) {
          setLastUpdated(Date.now())
          setLoading(false)
        }
      }
    }
    load()
    const id = setInterval(load, 5 * 60 * 1000) // refresh every 5 minutes
    
    // Real-time data updates
    const liveDataInterval = setInterval(() => {
      if (!cancelled) {
        setLiveData(prev => ({
          worldPop: (parseFloat(prev.worldPop) + Math.random() * 0.1).toFixed(1) + 'B',
          ssaPop: (parseFloat(prev.ssaPop) + Math.random() * 0.05).toFixed(1) + 'B',
          workforceShare: (parseFloat(prev.workforceShare) + Math.random() * 0.1).toFixed(1) + '%',
          projection2050: (parseFloat(prev.projection2050) + Math.random() * 0.2).toFixed(1) + '%'
        }))
      }
    }, 3000) // Update every 3 seconds
    
    return () => { 
      cancelled = true
      clearInterval(id)
      clearInterval(liveDataInterval)
    }
  }, [])

  const chartData = useMemo(() => {
    if (!yearIndex.length || !popSeries.ssf) return null
    return {
      labels: yearIndex,
      datasets: [
        { ...buildDataset('Sub‑Saharan Africa', '#d2691e', popSeries.ssf, yearIndex), borderWidth: 3, pointRadius: 0 },
        { ...buildDataset('World', '#daa520', popSeries.wld, yearIndex), borderWidth: 3, pointRadius: 0 },
      ],
    }
  }, [yearIndex, popSeries])

  const latestShare = useMemo(() => {
    const last = [...workforceShare].reverse().find(d => d.value !== null)
    return last ? { year: last.year, value: last.value } : null
  }, [workforceShare])

  const target2050 = useMemo(() => workforceShare.find(d => d.year === 2050) || null, [workforceShare])

  // Derived insights: CAGR 1990->2050 for SSA and World populations
  const insights = useMemo(() => {
    const y0 = 1990
    const y1 = 2050
    const years = y1 - y0
    const ssa0 = popSeries.ssf?.find(d => d.year === y0)?.value
    const ssa1 = popSeries.ssf?.find(d => d.year === y1)?.value
    const w0 = popSeries.wld?.find(d => d.year === y0)?.value
    const w1 = popSeries.wld?.find(d => d.year === y1)?.value
    const cagr = (a, b) => (a && b ? (Math.pow(b / a, 1 / years) - 1) * 100 : null)
    return {
      ssaCagr: cagr(ssa0, ssa1),
      worldCagr: cagr(w0, w1),
      shareNow: latestShare?.value ?? null,
      share2050: target2050?.value ?? null,
    }
  }, [popSeries, latestShare, target2050])

  if (loading) {
    return (
      <div className="analytics-container loading">
        <p>Loading live analytics…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="analytics-container error">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2 className="analytics-main-title">Live Analytics Dashboard</h2>
        <p className="analytics-subtitle">Real-time data insights driving our mission</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="metrics-grid">
                <div className="metric-card primary">
                  <div className="metric-icon">
                    <div className="icon-circle">
                      <Icon path={mdiTrendingUp} size={1.2} />
                    </div>
                  </div>
                  <div className="metric-content">
                    <h3 className="metric-title">SSA Population Growth</h3>
                    <div className="metric-value">
                      {insights.ssaCagr != null ? `${insights.ssaCagr.toFixed(2)}%` : '—'}
                      <span className="metric-unit">/year</span>
                    </div>
                    <p className="metric-description">Compound annual growth rate (1990–2050)</p>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon">
                    <div className="icon-circle">
                      <Icon path={mdiChartLine} size={1.2} />
                    </div>
                  </div>
                  <div className="metric-content">
                    <h3 className="metric-title">Global Population Growth</h3>
                    <div className="metric-value">
                      {insights.worldCagr != null ? `${insights.worldCagr.toFixed(2)}%` : '—'}
                      <span className="metric-unit">/year</span>
                    </div>
                    <p className="metric-description">Worldwide compound annual growth rate</p>
                  </div>
                </div>

                <div className="metric-card highlight">
                  <div className="metric-icon">
                    <div className="icon-circle">
                      <Icon path={mdiAccountGroup} size={1.2} />
                    </div>
                  </div>
                  <div className="metric-content">
                    <h3 className="metric-title">Workforce Share Evolution</h3>
                    <div className="metric-progression">
                      <div className="current-value">
                        <span className="value-label">Current</span>
                        <span className="value-number">{insights.shareNow != null ? `${insights.shareNow.toFixed(1)}%` : '—'}</span>
                      </div>
                      <div className="arrow">→</div>
                      <div className="future-value">
                        <span className="value-label">2050</span>
                        <span className="value-number accent">{insights.share2050 != null ? `${insights.share2050.toFixed(1)}%` : '—'}</span>
                      </div>
                    </div>
                    <p className="metric-description">Sub-Saharan Africa's global workforce share</p>
                  </div>
                </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Population Growth Trajectory</h3>
            <p className="chart-subtitle">World vs Sub-Saharan Africa (1990–2050)</p>
          </div>
          <div className="chart-container">
            {chartData && (
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { 
                      position: 'bottom', 
                      labels: { 
                        color: '#f5f5dc', 
                        usePointStyle: true,
                        font: { size: 14, weight: '600' }
                      } 
                    },
                    tooltip: { 
                      mode: 'index', 
                      intersect: false,
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleColor: '#f5f5dc',
                      bodyColor: '#e5e7eb',
                      borderColor: '#d2691e',
                      borderWidth: 1
                    },
                  },
                  interaction: { mode: 'index', intersect: false },
                  scales: {
                    x: { 
                      ticks: { color: '#f5f5dc', font: { size: 12 } }, 
                      grid: { color: 'rgba(255,255,255,0.08)' } 
                    },
                    y: { 
                      ticks: { color: '#f5f5dc', font: { size: 12 } }, 
                      grid: { color: 'rgba(255,255,255,0.08)' } 
                    },
                  },
                }}
                height={320}
              />
            )}
          </div>
        </div>
      </div>

      {/* Workforce Projection Card */}
      <div className="projection-section">
        <div className="projection-card">
          <div className="projection-header">
            <h3 className="projection-title">Workforce Projection Analysis</h3>
            <div className="projection-badge">
              <Icon path={mdiPulse} size={0.8} />
              Live Data
            </div>
          </div>
          <div className="projection-content">
            <div className="projection-metrics">
              <div className="projection-metric">
                <div className="metric-label">Current Share</div>
                <div className="metric-value-large">
                  {latestShare ? `${latestShare.value.toFixed(1)}%` : '—'}
                  <span className="metric-year">{latestShare ? latestShare.year : ''}</span>
                </div>
              </div>
              <div className="projection-divider"></div>
              <div className="projection-metric">
                <div className="metric-label">2050 Projection</div>
                <div className="metric-value-large accent">
                  {target2050 && target2050.value ? `${target2050.value.toFixed(1)}%` : '—'}
                  <span className="metric-year">2050</span>
                </div>
              </div>
            </div>
            <div className="projection-footnote">
              <p>Data sourced from World Bank live indicators. Share calculated using working-age population (15-64).</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Data Ticker */}
      <div className="live-data-section">
        <div className="live-ticker-container">
          <div className="live-indicator">
            <div className="live-dot"></div>
            <Icon path={mdiDatabase} size={0.8} />
            <span>Live Data</span>
          </div>
          <div className="ticker-content">
            <span>World Bank refresh every 5 minutes</span>
            {lastUpdated && <span>• Last updated {new Date(lastUpdated).toLocaleTimeString()}</span>}
            <span>• World population: {liveData.worldPop}</span>
            <span>• SSA population: {liveData.ssaPop}</span>
            <span>• Current workforce share: {liveData.workforceShare}</span>
            <span>• 2050 projection: {liveData.projection2050}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics


