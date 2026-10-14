import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

// strs = ["eat","tea","tan","ate","nat","bat"]
const WORDS = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
const SORTED = ['aet', 'aet', 'ant', 'aet', 'ant', 'abt']
// groups: aet -> eat/tea/ate; ant -> tan/nat; abt -> bat

export const GroupAnagramsAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  // show up to 6 words one by one; each adds to its bucket
  const processed = Math.min(stepIndex, WORDS.length)
  return (
    <g>
      {/* words row */}
      {WORDS.map((w, i) => {
        const cx = 30 + i * 90
        const isProc = i < processed
        const fill = isProc ? C.processed : C.normal
        return (
          <g key={i}>
            <rect x={cx} y={30} width={70} height={36} rx={6} fill={fill} stroke="#94a3b8" />
            <text x={cx + 35} y={53} textAnchor="middle" fontSize={14} fill="#334155" fontFamily="monospace">
              {w}
            </text>
            {isProc && (
              <text x={cx + 35} y={82} textAnchor="middle" fontSize={11} fill="#6366f1" fontFamily="monospace">
                → {SORTED[i]}
              </text>
            )}
          </g>
        )
      })}

      {/* bucket columns */}
      {['aet', 'ant', 'abt'].map((key, col) => {
        const items = WORDS.filter((_, i) => SORTED[i] === key && i < processed)
        const bx = 60 + col * 180
        return (
          <g key={key}>
            <rect x={bx} y={110} width={140} height={100} rx={8} fill="#f8fafc" stroke="#cbd5e1" />
            <text x={bx + 10} y={130} fontSize={12} fontWeight={700} fill="#475569" fontFamily="monospace">
              key: {key}
            </text>
            {items.map((w, k) => (
              <text key={k} x={bx + 15} y={155 + k * 18} fontSize={12} fill="#334155" fontFamily="monospace">
                • {w}
              </text>
            ))}
          </g>
        )
      })}

      <text x={300} y={215} textAnchor="middle" fontSize={12} fill="#334155">
        排序后相同的字符串进入同一桶（Map 分组）
      </text>
    </g>
  )
}
