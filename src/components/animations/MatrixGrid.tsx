import React from 'react'
import { C } from './_shared'

/**
 * Generic matrix / grid animation.
 * Each step can recolor cells by role and optionally override the values.
 * markRows / markCols highlight whole row/col header strips (e.g. 矩阵置零).
 */
export interface MatrixStep {
  values?: (number | string | null)[][]
  current?: [number, number][]
  processed?: [number, number][]
  good?: [number, number][]
  bad?: [number, number][]
  highlight?: [number, number][]
  markRows?: number[]
  markCols?: number[]
  log: string
}

export interface MatrixCfg {
  rows: number
  cols: number
  cellSize?: number
  /** left header labels (row indices), top header labels (col indices) */
  headers?: boolean
  /** draw thick box lines every 3 (sudoku) */
  boxes?: boolean
  initial: (number | string | null)[][]
  steps: MatrixStep[]
}

const key = (r: number, c: number) => `${r},${c}`

export const MatrixGridAnimation: React.FC<{ stepIndex: number; cfg: MatrixCfg }> = ({ stepIndex, cfg }) => {
  const s = cfg.steps[Math.min(stepIndex, cfg.steps.length - 1)]
  const cs = cfg.cellSize ?? 44
  const values = s.values ?? cfg.initial
  const pad = cfg.headers ? 26 : 8
  const ox = (600 - (cfg.cols * cs + (cfg.headers ? 26 : 0))) / 2
  const gridX = ox + (cfg.headers ? 26 : 0)
  const gridY = 28
  const sets = {
    current: new Set((s.current ?? []).map(([r, c]) => key(r, c))),
    processed: new Set((s.processed ?? []).map(([r, c]) => key(r, c))),
    good: new Set((s.good ?? []).map(([r, c]) => key(r, c))),
    bad: new Set((s.bad ?? []).map(([r, c]) => key(r, c))),
    highlight: new Set((s.highlight ?? []).map(([r, c]) => key(r, c))),
  }
  const markRows = new Set(s.markRows ?? [])
  const markCols = new Set(s.markCols ?? [])

  const cellFill = (r: number, c: number) => {
    const k = key(r, c)
    if (sets.current.has(k)) return { fill: C.current, text: '#fff' }
    if (sets.good.has(k)) return { fill: C.good, text: '#fff' }
    if (sets.bad.has(k)) return { fill: C.bad, text: '#fff' }
    if (sets.highlight.has(k)) return { fill: C.highlight, text: '#fff' }
    if (sets.processed.has(k)) return { fill: C.processed, text: C.normalText }
    return { fill: '#f1f5f9', text: C.normalText }
  }

  return (
    <svg viewBox="0 0 600 220" className="w-full">
      {/* row / col markers */}
      {cfg.headers && Array.from({ length: cfg.rows }).map((_, r) => (
        <g key={`r${r}`}>
          <rect x={gridX - 22} y={gridY + r * cs} width={16} height={cs - 4} rx={4}
            fill={markRows.has(r) ? C.highlight : '#e2e8f0'} />
          <text x={gridX - 14} y={gridY + r * cs + cs / 2 - 2} textAnchor="middle" fontSize={11}
            fontWeight={700} fill={markRows.has(r) ? '#fff' : C.normalText}>{r}</text>
        </g>
      ))}
      {cfg.headers && Array.from({ length: cfg.cols }).map((_, c) => (
        <g key={`c${c}`}>
          <rect x={gridX + c * cs} y={gridY - 22} width={cs - 4} height={16} rx={4}
            fill={markCols.has(c) ? C.highlight : '#e2e8f0'} />
          <text x={gridX + c * cs + cs / 2 - 2} y={gridY - 10} textAnchor="middle" fontSize={11}
            fontWeight={700} fill={markCols.has(c) ? '#fff' : C.normalText}>{c}</text>
        </g>
      ))}

      {values.map((row, r) =>
        row.map((v, c) => {
          const x = gridX + c * cs
          const y = gridY + r * cs
          const { fill, text } = cellFill(r, c)
          const isQueen = v === 'Q' || v === '♛'
          return (
            <g key={key(r, c)}>
              <rect x={x} y={y} width={cs - 4} height={cs - 4} rx={6}
                fill={fill} stroke="#cbd5e1" strokeWidth={1} />
              <text x={x + (cs - 4) / 2} y={y + (cs - 4) / 2 + (isQueen ? 6 : 5)}
                textAnchor="middle" fontSize={isQueen ? cs * 0.55 : cs * 0.3}
                fontWeight={700} fill={isQueen ? '#fff' : text}>
                {v === null ? '' : v}
              </text>
            </g>
          )
        })
      )}

      {/* bold 3x3 box lines for sudoku */}
      {cfg.boxes && Array.from({ length: cfg.rows + 1 }).map((_, i) => (
        <g key={`b${i}`}>
          {i % 3 === 0 && (
            <line x1={gridX} y1={gridY + i * cs} x2={gridX + cfg.cols * cs} y2={gridY + i * cs}
              stroke="#475569" strokeWidth={2} />
          )}
          {i % 3 === 0 && (
            <line x1={gridX + i * cs} y1={gridY} x2={gridX + i * cs} y2={gridY + cfg.rows * cs}
              stroke="#475569" strokeWidth={2} />
          )}
        </g>
      ))}

      <text x={300} y={210} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">
        {s.log}
      </text>
    </svg>
  )
}
