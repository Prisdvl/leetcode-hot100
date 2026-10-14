import React from 'react'
import { C } from './_shared'

/**
 * Generic 2D DP table animation.
 * rows/cols include optional header labels; cells fill progressively.
 */
export interface DP2DStep {
  values: (number | string)[][]
  filled?: [number, number][]
  current?: [number, number]
  processed?: [number, number][]
  log: string
}

export interface DP2DCfg {
  rows: number
  cols: number
  cellSize?: number
  /** top column headers (length = cols), e.g. chars of one string */
  colLabels?: string[]
  /** left row headers (length = rows) */
  rowLabels?: string[]
  caption?: string
  steps: DP2DStep[]
}

const k = (r: number, c: number) => `${r},${c}`

export const DP2DAnimation: React.FC<{ stepIndex: number; cfg: DP2DCfg }> = ({ stepIndex, cfg }) => {
  const s = cfg.steps[Math.min(stepIndex, cfg.steps.length - 1)]
  const cs = cfg.cellSize ?? 52
  const hasLabels = !!(cfg.colLabels || cfg.rowLabels)
  const labelPad = hasLabels ? 26 : 0
  const gridW = cfg.cols * cs
  const gridX = (600 - gridW - labelPad) / 2 + labelPad
  const gridY = 40
  const filled = new Set((s.filled ?? []).map(([r, c]) => k(r, c)))
  const cur = s.current ? k(s.current[0], s.current[1]) : ''
  const processed = new Set((s.processed ?? []).map(([r, c]) => k(r, c)))

  return (
    <svg viewBox="0 0 600 220" className="w-full">
      {cfg.caption && <text x={300} y={22} textAnchor="middle" fontSize={12} fill="#94a3b8">{cfg.caption}</text>}
      {cfg.colLabels?.map((lab, c) => (
        <text key={`c${c}`} x={gridX + c * cs + cs / 2} y={gridY - 8} textAnchor="middle"
          fontSize={13} fontWeight={700} fill="#64748b">{lab}</text>
      ))}
      {cfg.rowLabels?.map((lab, r) => (
        <text key={`r${r}`} x={gridX - 10} y={gridY + r * cs + cs / 2 + 5} textAnchor="middle"
          fontSize={13} fontWeight={700} fill="#64748b">{lab}</text>
      ))}
      {s.values.map((row, r) =>
        row.map((v, c) => {
          const x = gridX + c * cs
          const y = gridY + r * cs
          const key2 = k(r, c)
          const isCur = cur === key2
          const isFilled = filled.has(key2)
          const isPro = processed.has(key2)
          let fill = C.normal
          let textFill = C.normalText
          if (isCur) { fill = C.highlight; textFill = '#fff' }
          else if (isFilled) { fill = C.current; textFill = '#fff' }
          else if (isPro) { fill = C.processed; textFill = C.normalText }
          return (
            <g key={key2}>
              <rect x={x} y={y} width={cs - 4} height={cs - 4} rx={6}
                fill={fill} stroke="#94a3b8" strokeWidth={1} />
              <text x={x + (cs - 4) / 2} y={y + (cs - 4) / 2 + 5} textAnchor="middle"
                fontSize={14} fontWeight={700} fill={textFill}>
                {v === '' || v === null ? '' : v}
              </text>
            </g>
          )
        })
      )}
      <text x={300} y={205} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">
        {s.log}
      </text>
    </svg>
  )
}
