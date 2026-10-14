import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

// s = "cbaebabacd", p = "abc" (m=3)
const S = 'cbaebabacd'.split('')
const P = 'abc'

type Snap = { r: number; match: boolean; msg: string }
const STEPS: Snap[] = [
  { r: 2, match: true, msg: '窗口 [cba] 计数 == p → 起始下标 0' },
  { r: 3, match: false, msg: '窗口 [bae]，e 多出，不匹配' },
  { r: 4, match: false, msg: '窗口 [aeb]，多 e' },
  { r: 5, match: true, msg: '窗口 [eba] → 起始下标 6' },
  { r: 6, match: false, msg: '窗口 [bab]，a 缺、b 多' },
  { r: 7, match: false, msg: '窗口 [aba]，c 缺' },
  { r: 8, match: true, msg: '窗口 [bac] → 起始下标 6' },
  { r: 9, match: false, msg: '窗口 [acd]，b 缺、d 多' },
]

export const FindAnagramsAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = STEPS[Math.min(stepIndex, STEPS.length - 1)]
  const l = s.r - (P.length - 1)
  const cellW = 40
  return (
    <g>
      {S.map((ch, i) => {
        const x = 25 + i * (cellW + 8)
        const inWin = i >= l && i <= s.r
        const fill = inWin ? (s.match ? C.good : C.highlight) : C.normal
        const textFill = inWin ? '#fff' : '#334155'
        return (
          <g key={i}>
            <rect x={x} y={70} width={cellW} height={cellW} rx={6} fill={fill} stroke="#94a3b8" />
            <text x={x + cellW / 2} y={97} textAnchor="middle" fontSize={16} fontWeight={700} fill={textFill}>
              {ch}
            </text>
            <text x={x + cellW / 2} y={128} textAnchor="middle" fontSize={10} fill="#94a3b8">{i}</text>
          </g>
        )
      })}
      <text x={300} y={160} textAnchor="middle" fontSize={13} fill="#334155">
        窗口 [ {S.slice(l, s.r + 1).join('')} ] {s.match ? '✓ 异位词' : '✗ 不匹配'}
      </text>
      <text x={300} y={190} textAnchor="middle" fontSize={12} fill="#334155">{s.msg}</text>
      <text x={300} y={210} textAnchor="middle" fontSize={11} fill="#94a3b8">
        固定窗口长度 = p.length = {P.length}
      </text>
    </g>
  )
}
