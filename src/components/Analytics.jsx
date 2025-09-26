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
    return () => { cancelled = true; clearInterval(id) }
  }, [])

  const chartData = useMemo(() => {
    if (!yearIndex.length || !popSeries.ssf) return null
    return {
      labels: yearIndex,
      datasets: [
        { ...buildDataset('Sub‑Saharan Africa', '#60a5fa', popSeries.ssf, yearIndex), borderWidth: 3, pointRadius: 0 },
        { ...buildDataset('World', '#fbbf24', popSeries.wld, yearIndex), borderWidth: 3, pointRadius: 0 },
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
      {/* Insight badges */}
      <div className="insights-row">
        <div className="kpi">
          <div className="kpi-label">SSA population CAGR (1990–2050)</div>
          <div className="kpi-value accent">{insights.ssaCagr != null ? `${insights.ssaCagr.toFixed(2)}%/yr` : '—'}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">World population CAGR (1990–2050)</div>
          <div className="kpi-value">{insights.worldCagr != null ? `${insights.worldCagr.toFixed(2)}%/yr` : '—'}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">SSA share of global workforce</div>
          <div className="kpi-value">{insights.shareNow != null ? `${insights.shareNow.toFixed(1)}%` : '—'} → <span className="accent">{insights.share2050 != null ? `${insights.share2050.toFixed(1)}%` : '—'}</span></div>
        </div>
      </div>

      <div className="analytics-card">
        <h3 className="analytics-title">World vs Sub‑Saharan Africa • Population to 2050</h3>
        {chartData && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom', labels: { color: '#fff', usePointStyle: true } },
                tooltip: { mode: 'index', intersect: false },
              },
              interaction: { mode: 'index', intersect: false },
              scales: {
                x: { ticks: { color: '#e5e7eb' }, grid: { color: 'rgba(255,255,255,0.06)' } },
                y: { ticks: { color: '#e5e7eb' }, grid: { color: 'rgba(255,255,255,0.06)' } },
              },
            }}
            height={320}
          />
        )}
      </div>

      <div className="analytics-stats">
        <div className="stat-card">
          <div className="stat-label">Sub‑Saharan Africa share of global workforce (to 2050)</div>
          <div className="stat-values">
            <div className="stat-now">
              <span className="stat-caption">Latest</span>
              <span className="stat-number">{latestShare ? `${latestShare.value.toFixed(1)}%` : '—'}</span>
              <span className="stat-year">{latestShare ? latestShare.year : ''}</span>
            </div>
            <div className="stat-target">
              <span className="stat-caption">Projection</span>
              <span className="stat-number accent">{target2050 && target2050.value ? `${target2050.value.toFixed(1)}%` : '—'}</span>
              <span className="stat-year">2050</span>
            </div>
          </div>
          <div className="stat-footnote">Data: World Bank (live). Share approximated using 15–64 population.</div>
        </div>
      </div>

      <div className="live-row">
        <div className="live-ticker">
          <span className="live-dot" /> Live data · World Bank refresh 5m {lastUpdated ? `· Updated ${new Date(lastUpdated).toLocaleTimeString()}` : ''} · Latest workforce share {latestShare ? `${latestShare.value.toFixed(1)}% in ${latestShare.year}` : '—'} · 2050 {target2050 && target2050.value ? `${target2050.value.toFixed(1)}%` : '—'} · World pop {wmWorld ?? '—'} · SSA pop {wmAfrica ?? '—'} · <span className="live-dot" />
        </div>
      </div>
    </div>
  )
}

export default Analytics


