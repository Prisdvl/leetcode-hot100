import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

// nums = [1, 1, 1], k = 2
const NUMS = [1, 1, 1]

type Snap = { i: number; cur: number; map: Record<number, number>; ans: number; msg: string }
const STEPS: Snap[] = [
  { i: -1, cur: 0, map: { 0: 1 }, ans: 0, msg: '初始化 map = {0: 1}' },
  { i: 0, cur: 1, map: { 0: 1, 1: 1 }, ans: 0, msg: 'cur=1，查 cur-k=-1 次数=0；存入 1→1' },
  { i: 1, cur: 2, map: { 0: 1, 1: 1, 2: 1 }, ans: 1, msg: 'cur=2，查 cur-k=0 次数=1；ans=1（子数组 [0,1]）' },
  { i: 2, cur: 3, map: { 0: 1, 1: 1, 2: 1, 3: 1 }, ans: 2, msg: 'cur=3，查 cur-k=1 次数=1；ans=2（[1,2]）' },
]

export const SubarraySumAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = STEPS[Math.min(stepIndex, STEPS.length - 1)]
  return (
    <g>
      {/* array */}
      {NUMS.map((v, i) => {
        const x = 40 + i * 80
        const isCur = i === s.i
        return (
          <g key={i}>
            <rect x={x} y={50} width={60} height={44} rx={8} fill={isCur ? C.current : C.normal} stroke="#94a3b8" />
            <text x={x + 30} y={78} textAnchor="middle" fontSize={18} fontWeight={700} fill={isCur ? '#fff' : '#334155'}>
              {v}
            </text>
          </g>
        )
      })}
      <text x={300} y={120} textAnchor="middle" fontSize={14} fill="#334155" fontFamily="monospace">
        当前前缀和 cur = {s.cur}，ans = {s.ans}
      </text>
      {/* map */}
      <rect x={150} y={135} width={300} height={60} rx={8} fill="#f8fafc" stroke="#cbd5e1" />
      <text x={300} y={155} textAnchor="middle" fontSize={12} fontWeight={700} fill="#475569">
        map（前缀和 → 出现次数）
      </text>
      <text x={300} y={180} textAnchor="middle" fontSize={13} fill="#312e81" fontFamily="monospace">
        {Object.entries(s.map).map(([k, v]) => `${k}:${v}`).join('  ')}
      </text>
      <text x={300} y={215} textAnchor="middle" fontSize={12} fill="#334155">{s.msg}</text>
    </g>
  )
}
