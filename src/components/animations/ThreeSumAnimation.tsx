import React from 'react'
import type { AnimationProps } from '../../data/types'
import { ArrayRow, Pointer, C } from './_shared'

// sorted nums = [-4, -1, -1, 0, 1, 2]
const NUMS = [-4, -1, -1, 0, 1, 2]

type Snap = { i: number; l: number; r: number; sum: number; msg: string; found?: boolean }
const STEPS: Snap[] = [
  { i: 0, l: 1, r: 5, sum: 0, msg: '排序后：[-4,-1,-1,0,1,2]；固定 i=0 (-4)' },
  { i: 0, l: 1, r: 5, sum: -4 + -1 + 2, msg: 'sum=-3 < 0，l++' },
  { i: 1, l: 2, r: 5, sum: -1 + -1 + 2, msg: 'i=1 (-1)，l=2, r=5' },
  { i: 1, l: 2, r: 5, sum: 0, msg: 'sum=0 ✓ 找到 [-1,-1,2]；去重后 l++, r--', found: true },
  { i: 1, l: 3, r: 4, sum: -1 + 0 + 1, msg: 'sum=0 ✓ 找到 [-1,0,1]；再去重', found: true },
  { i: 1, l: 4, r: 4, sum: 0, msg: 'l >= r，i 向右（跳过重复 -1）' },
  { i: 3, l: 4, r: 5, sum: 0 + 1 + 2, msg: 'i=3 (0)，sum=3>0，r--；l>=r 结束' },
]

export const ThreeSumAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = STEPS[Math.min(stepIndex, STEPS.length - 1)]
  return (
    <g>
      <ArrayRow
        values={NUMS}
        current={s.found ? [s.i, s.l, s.r] : [s.i]}
        highlight={s.found ? [s.i, s.l, s.r] : []}
      />
      <Pointer x={48 + s.i * 64 + 28} y={160} color={C.current} label="i" />
      <Pointer x={48 + s.l * 64 + 28} y={180} color={C.lPtr} label="l" />
      <Pointer x={48 + s.r * 64 + 28} y={200} color={C.rPtr} label="r" />
      <text x={300} y={215} textAnchor="middle" fontSize={12} fill="#334155">
        sum = {s.sum} · {s.msg}
      </text>
    </g>
  )
}
