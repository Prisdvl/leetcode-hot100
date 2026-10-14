import React from 'react'
import { C, ArrayRow, Pointer } from './_shared'

/** Generic two pointers: lo and hi move, with a log line. */
export interface TwoPointersCfg {
  values: (number | string)[]
  steps: { lo: number; hi: number; log: string }[]
}
export const TwoPointersAnimation: React.FC<{ stepIndex: number; cfg: TwoPointersCfg }> = ({ stepIndex, cfg }) => {
  const s = cfg.steps[Math.min(stepIndex, cfg.steps.length - 1)]
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <ArrayRow values={cfg.values} x={40} y={70} cellSize={50} gap={6}
        current={[s.lo, s.hi]} />
      <Pointer x={40 + s.lo * 56 + 25} y={70 + 50 + 12} color={C.lPtr} label="L" />
      <Pointer x={40 + s.hi * 56 + 25} y={70 + 50 + 12} color={C.rPtr} label="R" />
      <text x={300} y={180} textAnchor="middle" fontSize={13} fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">
        {s.log}
      </text>
    </svg>
  )
}
