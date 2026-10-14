import React from 'react'

/** Shared visual palette for animations. */
export const C = {
  normal: '#e2e8f0',
  normalText: '#334155',
  current: '#6366f1',
  currentText: '#ffffff',
  processed: '#c7d2fe',
  highlight: '#f59e0b',
  water: '#38bdf8',
  lPtr: '#10b981',
  rPtr: '#ef4444',
  line: '#94a3b8',
  good: '#10b981',
  bad: '#ef4444',
}

/** Render a row of array cells. */
export const ArrayRow: React.FC<{
  values: (number | string | null)[]
  x?: number
  y?: number
  cellSize?: number
  gap?: number
  /** which indices are "current" (indigo) */
  current?: number[]
  /** which indices are "processed" (light indigo) */
  processed?: number[]
  /** which indices are "highlight" (amber) */
  highlight?: number[]
  /** custom fill per index */
  fillOverride?: Record<number, string>
  showIndex?: boolean
}> = ({
  values,
  x = 20,
  y = 90,
  cellSize = 56,
  gap = 8,
  current = [],
  processed = [],
  highlight = [],
  fillOverride = {},
  showIndex = true,
}) => {
  const cur = new Set(current)
  const pro = new Set(processed)
  const hl = new Set(highlight)
  return (
    <g>
      {values.map((v, i) => {
        const cx = x + i * (cellSize + gap)
        let fill = C.normal
        let textFill = C.normalText
        if (fillOverride[i]) fill = fillOverride[i]
        else if (cur.has(i)) { fill = C.current; textFill = C.currentText }
        else if (hl.has(i)) { fill = C.highlight; textFill = '#ffffff' }
        else if (pro.has(i)) fill = C.processed
        return (
          <g key={i}>
            <rect
              x={cx}
              y={y}
              width={cellSize}
              height={cellSize}
              rx={8}
              fill={fill}
              stroke="#94a3b8"
              strokeWidth={1}
            />
            <text
              x={cx + cellSize / 2}
              y={y + cellSize / 2 + 5}
              textAnchor="middle"
              fontSize={18}
              fontWeight={600}
              fill={textFill}
            >
              {v === null ? '' : v}
            </text>
            {showIndex && (
              <text
                x={cx + cellSize / 2}
                y={y + cellSize + 16}
                textAnchor="middle"
                fontSize={11}
                fill="#94a3b8"
              >
                {i}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}

/** Pointer triangle below a cell. */
export const Pointer: React.FC<{
  x: number
  y: number
  color: string
  label: string
}> = ({ x, y, color, label }) => (
  <g>
    <polygon points={`${x - 8},${y} ${x + 8},${y} ${x},${y + 10}`} fill={color} />
    <text x={x} y={y + 26} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>
      {label}
    </text>
  </g>
)
