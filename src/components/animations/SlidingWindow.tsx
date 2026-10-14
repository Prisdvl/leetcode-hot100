import React from 'react'
import { C, ArrayRow, Pointer } from './_shared'

/** Generic sliding window: bracket shows [l, r]. */
export interface SlidingWindowCfg {
  values: (number | string)[]
  steps: { l: number; r: number; log: string }[]
}
export const SlidingWindowAnimation: React.FC<{ stepIndex: number; cfg: SlidingWindowCfg }> = ({ stepIndex, cfg }) => {
  const s = cfg.steps[Math.min(stepIndex, cfg.steps.length - 1)]
  const cellsIn: number[] = []
  for (let i = s.l; i <= s.r; i++) cellsIn.push(i)
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <ArrayRow values={cfg.values} x={40} y={70} cellSize={50} gap={6}
        current={cellsIn} />
      <Pointer x={40 + s.l * 56 + 25} y={70 + 50 + 12} color={C.lPtr} label="l" />
      <Pointer x={40 + s.r * 56 + 25} y={70 + 50 + 12} color={C.rPtr} label="r" />
      <text x={300} y={180} textAnchor="middle" fontSize={13} fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">
        {s.log}
      </text>
    </svg>
  )
}
