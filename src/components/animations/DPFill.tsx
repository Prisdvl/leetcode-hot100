import React from 'react'
import { C } from './_shared'

/** Generic DP table: dp[0..n] fills left to right. */
export interface DPCfg {
  caption: string
  cellSize?: number
  x0?: number
  steps: { filled: number[]; values: (number | string)[]; log: string }[]
}
export const DPAnimation: React.FC<{ stepIndex: number; cfg: DPCfg }> = ({ stepIndex, cfg }) => {
  const s = cfg.steps[Math.min(stepIndex, cfg.steps.length - 1)]
  const cellSize = cfg.cellSize ?? 56
  const gap = 6
  const x0 = cfg.x0 ?? 40
  const y = 80
  return (
    <svg viewBox="0 0 600 200" className="w-full">
      <text x={40} y={40} fontSize={12} fill="#94a3b8">{cfg.caption}</text>
      {s.values.map((v, i) => {
        const x = x0 + i * (cellSize + gap)
        const filled = s.filled.includes(i)
        return (
          <g key={i}>
            <rect x={x} y={y} width={cellSize} height={cellSize} rx={8}
              fill={filled ? C.current : C.normal}
              stroke="#94a3b8" strokeWidth={1} />
            <text x={x + cellSize / 2} y={y + cellSize / 2 + 5} textAnchor="middle" fontSize={14} fontWeight={700}
              fill={filled ? '#fff' : C.normalText}>{v === undefined ? '' : v}</text>
            <text x={x + cellSize / 2} y={y + cellSize + 16} textAnchor="middle" fontSize={11} fill="#94a3b8">{i}</text>
          </g>
        )
      })}
      <text x={300} y={180} textAnchor="middle" fontSize={13} fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">
        {s.log}
      </text>
    </svg>
  )
}
