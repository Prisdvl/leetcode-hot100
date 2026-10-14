import React from 'react'
import type { AnimationProps } from '../../data/types'
import { ArrayRow, Pointer, C } from './_shared'

// nums = [2, 7, 11, 15], target = 9
const NUMS = [2, 7, 11, 15]

export const TwoSumAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  // step 0: i=0, need=7 not in map
  // step 1: store 2 -> map
  // step 2: i=1, need=2 in map!
  // step 3: found [0,1]
  const steps = [
    { i: 0, map: [] as { v: number; idx: number }[], msg: 'i=0，需要 complement = 9-2 = 7' },
    { i: 0, map: [{ v: 2, idx: 0 }], msg: '7 不在 map 中，存入 (2, 0)' },
    { i: 1, map: [{ v: 2, idx: 0 }], msg: 'i=1，需要 complement = 9-7 = 2' },
    { i: 1, map: [{ v: 2, idx: 0 }], msg: '找到！map[2]=0，答案 [0,1]' },
  ]
  const s = steps[Math.min(stepIndex, steps.length - 1)]
  const currentIdx = s.i
  const mapX = 380
  return (
    <g>
      <ArrayRow values={NUMS} current={stepIndex >= 2 ? [0, 1] : [currentIdx]} />
      <Pointer x={48 + currentIdx * 64 + 28} y={160} color={C.current} label="i" />

      {/* hash map panel */}
      <rect x={mapX} y={60} width={200} height={140} rx={8} fill="#f8fafc" stroke="#cbd5e1" />
      <text x={mapX + 10} y={80} fontSize={12} fontWeight={700} fill="#475569">
        hash map
      </text>
      {s.map.length === 0 ? (
        <text x={mapX + 100} y={130} textAnchor="middle" fontSize={12} fill="#94a3b8">
          (空)
        </text>
      ) : (
        s.map.map((m, k) => (
          <g key={k}>
            <rect x={mapX + 20} y={100 + k * 36} width={160} height={28} rx={6} fill="#e0e7ff" />
            <text x={mapX + 30} y={119 + k * 36} fontSize={13} fill="#312e81" fontFamily="monospace">
              {m.v} → 下标 {m.idx}
            </text>
          </g>
        ))
      )}

      <text x={300} y={200} textAnchor="middle" fontSize={13} fill="#334155">
        {s.msg}
      </text>
    </g>
  )
}
