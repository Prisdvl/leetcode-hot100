import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

// nums = [1,2,3,4,5,6,7], k=3
// step 0: original
// step 1: reverse all -> [7,6,5,4,3,2,1]
// step 2: reverse first k -> [5,6,7,4,3,2,1]
// step 3: reverse rest -> [5,6,7,1,2,3,4]
const INIT = [1, 2, 3, 4, 5, 6, 7]

type Snap = { arr: number[]; phase: string; msg: string }
const STEPS: Snap[] = [
  { arr: INIT, phase: '原始', msg: 'nums = [1,2,3,4,5,6,7], k=3' },
  { arr: [7, 6, 5, 4, 3, 2, 1], phase: '整体反转', msg: 'reverse(0, n-1) → [7,6,5,4,3,2,1]' },
  { arr: [5, 6, 7, 4, 3, 2, 1], phase: '反转前 k 个', msg: 'reverse(0, k-1) → [5,6,7,4,3,2,1]' },
  { arr: [5, 6, 7, 1, 2, 3, 4], phase: '反转后 n-k 个', msg: 'reverse(k, n-1) → [5,6,7,1,2,3,4]' },
]

export const RotateArrayAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = STEPS[Math.min(stepIndex, STEPS.length - 1)]
  const cellW = 50
  // highlight split boundary
  const split = stepIndex >= 2 && stepIndex <= 3 ? 3 : -1
  return (
    <g>
      {s.arr.map((v, i) => {
        const x = 30 + i * (cellW + 8)
        let fill = C.normal
        if (s.phase === '整体反转') fill = C.highlight
        else if (s.phase === '反转前 k 个') fill = i < 3 ? C.current : C.processed
        else if (s.phase === '反转后 n-k 个') fill = i < 3 ? C.processed : C.current
        const textFill = fill === C.normal || fill === C.processed ? '#334155' : '#fff'
        return (
          <g key={i}>
            <rect x={x} y={80} width={cellW} height={cellW} rx={8} fill={fill} stroke="#94a3b8" />
            <text x={x + cellW / 2} y={112} textAnchor="middle" fontSize={18} fontWeight={700} fill={textFill}>
              {v}
            </text>
          </g>
        )
      })}
      {split > 0 && (
        <line
          x1={30 + split * (cellW + 8) - 4}
          y1={70}
          x2={30 + split * (cellW + 8) - 4}
          y2={140}
          stroke={C.current}
          strokeWidth={2}
          strokeDasharray="4 3"
        />
      )}
      <text x={300} y={170} textAnchor="middle" fontSize={13} fill="#6366f1" fontWeight={700}>
        阶段：{s.phase}
      </text>
      <text x={300} y={200} textAnchor="middle" fontSize={12} fill="#334155">{s.msg}</text>
    </g>
  )
}
