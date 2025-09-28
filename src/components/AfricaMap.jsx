import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import './AfricaMap.css'

const AfricaMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  // African countries with coordinates
  const countries = [
    { id: 'TZA', name: 'Tanzania', status: 'reached', coordinates: [34.8888, -6.3690] },
    { id: 'KEN', name: 'Kenya', status: 'coming-soon', coordinates: [37.9062, -1.0232] },
    { id: 'UGA', name: 'Uganda', status: 'coming-soon', coordinates: [32.2903, 1.3733] },
    { id: 'RWA', name: 'Rwanda', status: 'coming-soon', coordinates: [29.8739, -1.9403] },
    { id: 'ETH', name: 'Ethiopia', status: 'coming-soon', coordinates: [40.4897, 9.1450] },
    { id: 'GHA', name: 'Ghana', status: 'coming-soon', coordinates: [-1.0232, 7.9465] },
    { id: 'NGA', name: 'Nigeria', status: 'coming-soon', coordinates: [8.6753, 9.0819] },
    { id: 'ZAF', name: 'South Africa', status: 'coming-soon', coordinates: [22.9375, -30.5595] },
    { id: 'ZMB', name: 'Zambia', status: 'coming-soon', coordinates: [27.8493, -13.1339] },
    { id: 'MWI', name: 'Malawi', status: 'coming-soon', coordinates: [34.3015, -13.2543] },
    { id: 'ZWE', name: 'Zimbabwe', status: 'coming-soon', coordinates: [29.1549, -19.0154] },
    { id: 'BWA', name: 'Botswana', status: 'coming-soon', coordinates: [24.6848, -22.3285] },
    { id: 'NAM', name: 'Namibia', status: 'coming-soon', coordinates: [18.4904, -22.9576] },
    { id: 'AGO', name: 'Angola', status: 'coming-soon', coordinates: [17.8739, -11.2027] },
    { id: 'COD', name: 'Democratic Republic of Congo', status: 'coming-soon', coordinates: [21.7587, -4.0383] },
    { id: 'CMR', name: 'Cameroon', status: 'coming-soon', coordinates: [12.3547, 7.3697] },
    { id: 'SEN', name: 'Senegal', status: 'coming-soon', coordinates: [-14.4524, 14.4974] },
    { id: 'MLI', name: 'Mali', status: 'coming-soon', coordinates: [-3.9962, 17.5707] },
    { id: 'BFA', name: 'Burkina Faso', status: 'coming-soon', coordinates: [-2.1975, 12.2383] },
    { id: 'CIV', name: 'Ivory Coast', status: 'coming-soon', coordinates: [-5.5471, 7.5400] },
  ]

  return (
    <div className="africa-map-container">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 600,
          center: [20, 0]
        }}
        width={1600}
        height={1200}
        className="africa-svg"
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
        
        {/* Africa geodata */}
        <Geographies
          geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
        >
          {({ geographies }) =>
            geographies
              .filter((d) => d.properties.REGION_UN === "Africa")
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
        
        {/* Country markers */}
        {countries.map((country) => (
          <Marker
            key={country.id}
            coordinates={country.coordinates}
            onMouseEnter={(e) => {
              setHoveredCountry(country)
              setTooltipPos({ x: e.clientX + 14, y: e.clientY - 24 })
            }}
            onMouseMove={(e) => setTooltipPos({ x: e.clientX + 14, y: e.clientY - 24 })}
            onMouseLeave={() => setHoveredCountry(null)}
          >
            <g>
              <circle
                r={country.status === 'reached' ? 8 : 6}
                className={`reach-marker ${country.status}`}
              />
              {country.status === 'reached' && (
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
      {hoveredCountry && (
        <div className="country-tooltip" style={{ left: tooltipPos.x, top: tooltipPos.y }}>
          <div className="tooltip-content">
            <h4>{hoveredCountry.name}</h4>
            <p className={hoveredCountry.status}>
              {hoveredCountry.status === 'reached' ? 'Reached' : 'Coming Soon'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AfricaMap
