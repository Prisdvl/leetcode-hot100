import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

// intervals = [[1,3],[2,6],[8,10],[15,18]]
const IV = [[1, 3], [2, 6], [8, 10], [15, 18]]

type Snap = { i: number; merged: number[][]; msg: string }
const STEPS: Snap[] = [
  { i: 0, merged: [[1, 3]], msg: '按左端点排序；[1,3] 先入结果' },
  { i: 1, merged: [[1, 6]], msg: '[2,6] 左端点 2 <= lastEnd=3，合并为 [1,6]' },
  { i: 2, merged: [[1, 6], [8, 10]], msg: '[8,10] 左端点 8 > lastEnd=6，独立加入' },
  { i: 3, merged: [[1, 6], [8, 10], [15, 18]], msg: '[15,18] 独立加入，完成' },
]

export const MergeIntervalsAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = STEPS[Math.min(stepIndex, STEPS.length - 1)]
  const scale = 25 // x pixels per unit
  const originX = 80
  const baseY = 80
  return (
    <g>
      {/* axis */}
      <line x1={originX} y1={baseY + 60} x2={originX + 18 * scale} y2={baseY + 60} stroke="#94a3b8" strokeWidth={1} />
      {/* all original intervals as faint bars */}
      {IV.map(([l, r], k) => (
        <g key={k}>
          <rect x={originX + l * scale} y={baseY + 40} width={(r - l) * scale} height={18} rx={4} fill="#e2e8f0" />
          <text x={originX + (l + r) / 2 * scale} y={baseY + 53} textAnchor="middle" fontSize={10} fill="#64748b" fontFamily="monospace">
            [{l},{r}]
          </text>
        </g>
      ))}
      {/* merged bars */}
      {s.merged.map(([l, r], k) => (
        <g key={k}>
          <rect x={originX + l * scale} y={baseY} width={(r - l) * scale} height={28} rx={6} fill={C.current} />
          <text x={originX + (l + r) / 2 * scale} y={baseY + 19} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff" fontFamily="monospace">
            [{l},{r}]
          </text>
        </g>
      ))}
      <text x={300} y={180} textAnchor="middle" fontSize={13} fill="#334155">
        结果：[{s.merged.map((m) => `[${m}]`).join(', ')}]
      </text>
      <text x={300} y={210} textAnchor="middle" fontSize={12} fill="#334155">{s.msg}</text>
    </g>
  )
}
