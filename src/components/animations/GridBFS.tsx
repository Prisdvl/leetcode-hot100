import React from 'react'
import { C } from './_shared'

/** Generic grid BFS / flood fill. Grid is rows x cols. */
export interface GridCfg {
  rows: number
  cols: number
  cellSize?: number
  /** 0=empty, 1=wall, 2=source */
  initial: number[][]
  steps: { frontier: [number, number][]; reached: [number, number][]; log: string }[]
}
export const GridBFSAnimation: React.FC<{ stepIndex: number; cfg: GridCfg }> = ({ stepIndex, cfg }) => {
  const s = cfg.steps[Math.min(stepIndex, cfg.steps.length - 1)]
  const cs = cfg.cellSize ?? 44
  const ox = 60
  const oy = 40
  const reached = new Set(s.reached.map(([r, c]) => `${r},${c}`))
  const frontier = new Set(s.frontier.map(([r, c]) => `${r},${c}`))
  return (
    <svg viewBox="0 0 600 300" className="w-full">
      {cfg.initial.map((row, r) =>
        row.map((v, c) => {
          const x = ox + c * cs
          const y = oy + r * cs
          const key = `${r},${c}`
          let fill = '#f8fafc'
          if (v === 1) fill = '#475569'
          else if (v === 2) fill = C.lPtr
          else if (frontier.has(key)) fill = C.highlight
          else if (reached.has(key)) fill = C.water
          return (
            <rect key={key} x={x} y={y} width={cs - 4} height={cs - 4} rx={6}
              fill={fill} stroke="#cbd5e1" strokeWidth={1} />
          )
        })
      )}
      <text x={300} y={280} textAnchor="middle" fontSize={13} fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">
        {s.log}
      </text>
    </svg>
  )
}
