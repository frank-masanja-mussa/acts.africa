import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import './TanzaniaMap.css'

const TanzaniaMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  // Tanzania regions with coordinates
  const regions = [
    { id: 'katavi', name: 'Katavi', status: 'reached', coordinates: [31.4167, -6.3333] },
    { id: 'dar-es-salaam', name: 'Dar es Salaam', status: 'coming-soon', coordinates: [39.2083, -6.7924] },
    { id: 'arusha', name: 'Arusha', status: 'coming-soon', coordinates: [36.6833, -3.3869] },
    { id: 'dodoma', name: 'Dodoma', status: 'coming-soon', coordinates: [35.7419, -6.1630] },
    { id: 'mwanza', name: 'Mwanza', status: 'coming-soon', coordinates: [32.9000, -2.5167] },
    { id: 'tanga', name: 'Tanga', status: 'coming-soon', coordinates: [39.1000, -5.0667] },
    { id: 'morogoro', name: 'Morogoro', status: 'coming-soon', coordinates: [37.6667, -6.8167] },
    { id: 'mbeya', name: 'Mbeya', status: 'coming-soon', coordinates: [33.4500, -8.9000] },
    { id: 'tabora', name: 'Tabora', status: 'coming-soon', coordinates: [32.8000, -5.0167] },
    { id: 'singida', name: 'Singida', status: 'coming-soon', coordinates: [34.7500, -4.8167] },
    { id: 'kigoma', name: 'Kigoma', status: 'coming-soon', coordinates: [29.6167, -4.8833] },
    { id: 'shinyanga', name: 'Shinyanga', status: 'coming-soon', coordinates: [33.4167, -3.6667] },
    { id: 'kagera', name: 'Kagera', status: 'coming-soon', coordinates: [31.3333, -1.0000] },
    { id: 'mara', name: 'Mara', status: 'coming-soon', coordinates: [34.0000, -1.5000] },
    { id: 'manyara', name: 'Manyara', status: 'coming-soon', coordinates: [35.8333, -4.3333] },
    { id: 'kilimanjaro', name: 'Kilimanjaro', status: 'coming-soon', coordinates: [37.3333, -3.3333] },
    { id: 'pwani', name: 'Pwani', status: 'coming-soon', coordinates: [38.5000, -6.5000] },
    { id: 'ruvuma', name: 'Ruvuma', status: 'coming-soon', coordinates: [35.0000, -10.5000] },
    { id: 'lindi', name: 'Lindi', status: 'coming-soon', coordinates: [39.7000, -9.9833] },
    { id: 'mtwara', name: 'Mtwara', status: 'coming-soon', coordinates: [40.1833, -10.2667] },
    { id: 'rukuwa', name: 'Rukwa', status: 'coming-soon', coordinates: [31.5000, -8.0000] },
    { id: 'songwe', name: 'Songwe', status: 'coming-soon', coordinates: [32.5000, -9.0000] },
    { id: 'geita', name: 'Geita', status: 'coming-soon', coordinates: [32.2500, -2.8667] },
    { id: 'simiyu', name: 'Simiyu', status: 'coming-soon', coordinates: [33.7500, -2.7500] },
    { id: 'njombe', name: 'Njombe', status: 'coming-soon', coordinates: [34.7500, -9.3333] },
  ]

  return (
    <div className="tanzania-map-container">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1200,
          center: [35, -6]
        }}
        width={1600}
        height={1200}
        className="tanzania-svg"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="100%" height="100%" fill="transparent" />
        
        {/* Tanzania geodata */}
        <Geographies
          geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
        >
          {({ geographies }) =>
            geographies
              .filter((d) => d.properties.NAME === "Tanzania")
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(255, 255, 255, 0.02)"
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth={0.6}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
          }
        </Geographies>
        
        {/* Region markers */}
        {regions.map((region) => (
          <Marker
            key={region.id}
            coordinates={region.coordinates}
            onMouseEnter={(e) => {
              setHoveredRegion(region)
              setTooltipPos({ x: e.clientX + 14, y: e.clientY - 24 })
            }}
            onMouseMove={(e) => setTooltipPos({ x: e.clientX + 14, y: e.clientY - 24 })}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <g>
              <circle
                r={region.status === 'reached' ? 8 : 6}
                className={`reach-marker ${region.status}`}
              />
              {region.status === 'reached' && (
                <circle
                  r="16"
                  className="pulse-ring"
                />
              )}
            </g>
          </Marker>
        ))}
      </ComposableMap>
      
      {/* Tooltip */}
      {hoveredRegion && (
        <div className="region-tooltip" style={{ left: tooltipPos.x, top: tooltipPos.y }}>
          <div className="tooltip-content">
            <h4>{hoveredRegion.name}</h4>
            <p className={hoveredRegion.status}>
              {hoveredRegion.status === 'reached' ? 'Reached' : 'Coming Soon'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TanzaniaMap
