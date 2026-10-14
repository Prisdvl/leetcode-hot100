import React from 'react'
import { C, ArrayRow, Pointer } from './_shared'

/** Generic binary search: lo/hi shrink toward target. */
export interface BinarySearchCfg {
  values: number[]
  target: number
  steps: { lo: number; hi: number; mid: number; log: string }[]
}
export const BinarySearchAnimation: React.FC<{ stepIndex: number; cfg: BinarySearchCfg }> = ({ stepIndex, cfg }) => {
  const s = cfg.steps[Math.min(stepIndex, cfg.steps.length - 1)]
  const dead: number[] = []
  for (let i = 0; i < s.lo; i++) dead.push(i)
  for (let i = s.hi + 1; i < cfg.values.length; i++) dead.push(i)
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <text x={40} y={40} fontSize={12} fill="#94a3b8">target = {cfg.target}</text>
      <ArrayRow values={cfg.values} x={40} y={70} cellSize={50} gap={6}
        current={[s.mid]}
        processed={dead} />
      <Pointer x={40 + s.lo * 56 + 25} y={70 + 50 + 12} color={C.lPtr} label="lo" />
      <Pointer x={40 + s.hi * 56 + 25} y={70 + 50 + 12} color={C.rPtr} label="hi" />
      <text x={300} y={180} textAnchor="middle" fontSize={13} fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">
        {s.log}
      </text>
    </svg>
  )
}
