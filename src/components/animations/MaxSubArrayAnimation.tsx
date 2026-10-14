import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

// nums = [-2,1,-3,4,-1,2,1,-5,4]
const NUMS = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

type Snap = { i: number; cur: number; ans: number; msg: string }
const STEPS: Snap[] = [
  { i: 0, cur: -2, ans: -2, msg: 'cur = -2，ans = -2' },
  { i: 1, cur: 1, ans: 1, msg: 'cur = max(1, -2+1=-1) = 1（重启），ans=1' },
  { i: 2, cur: -2, ans: 1, msg: 'cur = max(-3, 1-3=-2) = -2，ans 仍为 1' },
  { i: 3, cur: 4, ans: 4, msg: 'cur = max(4, -2+4=2) = 4（重启），ans=4' },
  { i: 4, cur: 3, ans: 4, msg: 'cur = max(-1, 4-1=3) = 3' },
  { i: 5, cur: 5, ans: 5, msg: 'cur = 3+2 = 5，ans=5' },
  { i: 6, cur: 6, ans: 6, msg: 'cur = 5+1 = 6，ans=6（[4,-1,2,1]）' },
  { i: 7, cur: 1, ans: 6, msg: 'cur = 6-5 = 1，ans 仍为 6' },
  { i: 8, cur: 5, ans: 6, msg: 'cur = 1+4 = 5，最终答案 6' },
]

export const MaxSubArrayAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = STEPS[Math.min(stepIndex, STEPS.length - 1)]
  const cellW = 46
  return (
    <g>
      {NUMS.map((v, i) => {
        const x = 25 + i * (cellW + 6)
        const inRun = i <= s.i && i >= 3  // simplification: show current run from index 3
        const fill = i === s.i ? C.current : inRun ? C.processed : C.normal
        const textFill = i === s.i ? '#fff' : '#334155'
        return (
          <g key={i}>
            <rect x={x} y={60} width={cellW} height={cellW} rx={6} fill={fill} stroke="#94a3b8" />
            <text x={x + cellW / 2} y={88} textAnchor="middle" fontSize={14} fontWeight={700} fill={textFill}>
              {v}
            </text>
            <text x={x + cellW / 2} y={115} textAnchor="middle" fontSize={10} fill="#94a3b8">{i}</text>
          </g>
        )
      })}
      <text x={300} y={155} textAnchor="middle" fontSize={14} fill="#334155" fontFamily="monospace">
        cur（以 i 结尾的最大和）= {s.cur}
      </text>
      <text x={300} y={180} textAnchor="middle" fontSize={14} fill="#6366f1" fontWeight={700}>
        全局最大 ans = {s.ans}
      </text>
      <text x={300} y={210} textAnchor="middle" fontSize={12} fill="#334155">{s.msg}</text>
    </g>
  )
}
