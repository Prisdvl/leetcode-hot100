import React from 'react'
import type { AnimationProps } from '../../data/types'
import { ArrayRow, Pointer, C } from './_shared'

// nums = [0, 1, 0, 3, 12]
// step snapshots after each i:
type Snap = { arr: number[]; i: number; j: number; msg: string }
const STEPS: Snap[] = [
  { arr: [0, 1, 0, 3, 12], i: -1, j: 0, msg: '初始化：j 指向下一个非零位置' },
  { arr: [0, 1, 0, 3, 12], i: 0, j: 0, msg: 'i=0 是 0，跳过' },
  { arr: [1, 0, 0, 3, 12], i: 1, j: 1, msg: 'i=1 是 1，交换 nums[i] 与 nums[j]，j++' },
  { arr: [1, 0, 0, 3, 12], i: 2, j: 1, msg: 'i=2 是 0，跳过' },
  { arr: [1, 3, 0, 0, 12], i: 3, j: 2, msg: 'i=3 是 3，交换后 j=2' },
  { arr: [1, 3, 12, 0, 0], i: 4, j: 3, msg: 'i=4 是 12，交换后 j=3，剩余位置全为 0' },
]

export const MoveZeroesAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = STEPS[Math.min(stepIndex, STEPS.length - 1)]
  const current: number[] = []
  if (s.i >= 0) current.push(s.i)
  return (
    <g>
      <ArrayRow
        values={s.arr}
        current={current}
      />
      {s.i >= 0 && (
        <Pointer x={48 + s.i * 64 + 28} y={160} color={C.lPtr} label="i" />
      )}
      {s.j < s.arr.length && (
        <Pointer x={48 + s.j * 64 + 28} y={180} color={C.rPtr} label="j" />
      )}
      <text x={300} y={215} textAnchor="middle" fontSize={12} fill="#334155">
        {s.msg}
      </text>
    </g>
  )
}
