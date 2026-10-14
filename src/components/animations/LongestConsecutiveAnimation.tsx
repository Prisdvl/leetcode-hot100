import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

// nums = [100, 4, 200, 1, 3, 2]
const NUMS = [100, 4, 200, 1, 3, 2]

export const LongestConsecutiveAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  // step 0: all in set
  // step 1: 100 is start? check 99 not in set -> chain length 1
  // step 2: 4 is start? 3 in set -> skip
  // step 3: 200 start -> length 1
  // step 4: 1 start -> 1,2,3,4 length 4 (best)
  // step 5: done
  const steps = [
    { highlight: [] as number[], msg: '全部加入 Set' },
    { highlight: [0], msg: '100: 99 不在 set，链长 1（best=1）' },
    { highlight: [1], msg: '4: 3 在 set，不是起点，跳过' },
    { highlight: [2], msg: '200: 199 不在 set，链长 1' },
    { highlight: [5, 4, 3, 1], msg: '1 是起点 → 1,2,3,4 链长 4（best=4）' },
    { highlight: [3, 4, 5, 1], msg: '最终答案：4' },
  ]
  const s = steps[Math.min(stepIndex, steps.length - 1)]
  return (
    <g>
      {NUMS.map((v, i) => {
        const cx = 40 + i * 90
        const inChain = s.highlight.includes(i)
        const fill = inChain ? C.highlight : C.normal
        return (
          <g key={i}>
            <rect x={cx} y={60} width={70} height={50} rx={8} fill={fill} stroke="#94a3b8" />
            <text x={cx + 35} y={90} textAnchor="middle" fontSize={18} fontWeight={700} fill={inChain ? '#fff' : '#334155'}>
              {v}
            </text>
          </g>
        )
      })}
      <text x={300} y={160} textAnchor="middle" fontSize={13} fill="#334155">
        {s.msg}
      </text>
      <text x={300} y={190} textAnchor="middle" fontSize={12} fill="#94a3b8">
        只从「x-1 不在集合中」的起点向右数
      </text>
    </g>
  )
}
