import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

// s = "abcabcbb"
const S = 'abcabcbb'.split('')

type Snap = { l: number; r: number; best: number; msg: string }
const STEPS: Snap[] = [
  { l: 0, r: 0, best: 1, msg: '窗口 [a]，len=1' },
  { l: 0, r: 1, best: 2, msg: '窗口 [ab]，len=2' },
  { l: 0, r: 2, best: 3, msg: '窗口 [abc]，len=3（best=3）' },
  { l: 1, r: 3, best: 3, msg: 's[3]=a 重复，l 跳到上次 a 的下一格：[bca]' },
  { l: 2, r: 4, best: 3, msg: 's[4]=b 重复，l 跳到 [cab]' },
  { l: 3, r: 5, best: 3, msg: 's[5]=c 重复，l 跳到 [abc]' },
  { l: 5, r: 6, best: 3, msg: 's[6]=b 重复，l 跳到 [cb]' },
  { l: 7, r: 7, best: 3, msg: 's[7]=b 重复，l 跳到 [b]，最终答案 3' },
]

export const LongestSubstringAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = STEPS[Math.min(stepIndex, STEPS.length - 1)]
  const cellW = 50
  return (
    <g>
      {S.map((ch, i) => {
        const x = 30 + i * (cellW + 8)
        const inWin = i >= s.l && i <= s.r
        const fill = inWin ? C.current : C.normal
        const textFill = inWin ? '#fff' : '#334155'
        return (
          <g key={i}>
            <rect x={x} y={70} width={cellW} height={cellW} rx={8} fill={fill} stroke="#94a3b8" />
            <text x={x + cellW / 2} y={100} textAnchor="middle" fontSize={20} fontWeight={700} fill={textFill}>
              {ch}
            </text>
            <text x={x + cellW / 2} y={140} textAnchor="middle" fontSize={11} fill="#94a3b8">{i}</text>
          </g>
        )
      })}
      {/* window bracket */}
      <rect
        x={30 + s.l * (cellW + 8) - 4}
        y={60}
        width={(s.r - s.l + 1) * (cellW + 8) + 4}
        height={cellW + 20}
        fill="none"
        stroke={C.current}
        strokeWidth={2}
        rx={10}
        strokeDasharray="4 3"
      />
      <text x={300} y={180} textAnchor="middle" fontSize={13} fill="#334155">
        当前窗口长度 = {s.r - s.l + 1}，历史最长 = {s.best}
      </text>
      <text x={300} y={205} textAnchor="middle" fontSize={12} fill="#334155">{s.msg}</text>
    </g>
  )
}
