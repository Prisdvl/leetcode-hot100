import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

// height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
const H = [1, 8, 6, 2, 5, 4, 8, 3, 7]

type Snap = { l: number; r: number; area: number; best: number; msg: string }
const STEPS: Snap[] = [
  { l: 0, r: 8, area: 0, best: 0, msg: '左右指针从两端开始' },
  { l: 0, r: 8, area: 8, best: 8, msg: '面积 = 8 × min(1,7) = 8；左矮，l++' },
  { l: 1, r: 8, area: 49, best: 49, msg: '面积 = 7 × min(8,7) = 49；右矮，r--' },
  { l: 1, r: 7, area: 18, best: 49, msg: '面积 = 6 × min(8,3) = 18；右矮，r--' },
  { l: 1, r: 6, area: 40, best: 49, msg: '面积 = 5 × min(8,8) = 40；相等，r--' },
  { l: 1, r: 5, area: 16, best: 49, msg: '面积 = 4 × min(8,4) = 16；右矮，r--' },
  { l: 1, r: 4, area: 16, best: 49, msg: '面积 = 3 × min(8,5) = 15；右矮，r--' },
  { l: 1, r: 3, area: 4, best: 49, msg: '面积 = 2 × min(8,2) = 4；右矮，r--' },
  { l: 1, r: 2, area: 6, best: 49, msg: '面积 = 1 × min(8,6) = 6；最终答案 49' },
]

export const MaxAreaAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = STEPS[Math.min(stepIndex, STEPS.length - 1)]
  const baseY = 180
  const barW = 40
  const gap = 22
  const maxH = 140
  const scale = maxH / Math.max(...H)
  return (
    <g>
      {H.map((h, i) => {
        const x = 30 + i * (barW + gap)
        const bh = h * scale
        const isL = i === s.l
        const isR = i === s.r
        const fill = isL ? C.lPtr : isR ? C.rPtr : C.normal
        return (
          <g key={i}>
            <rect x={x} y={baseY - bh} width={barW} height={bh} rx={4} fill={fill} />
            <text x={x + barW / 2} y={baseY + 16} textAnchor="middle" fontSize={11} fill="#64748b">
              {i}
            </text>
          </g>
        )
      })}
      {/* water fill between l and r */}
      {s.l < s.r && (
        <rect
          x={30 + s.l * (barW + gap) + barW}
          y={baseY - Math.min(H[s.l], H[s.r]) * scale}
          width={(s.r - s.l) * (barW + gap) - gap}
          height={Math.min(H[s.l], H[s.r]) * scale}
          fill={C.water}
          opacity={0.35}
        />
      )}
      <text x={300} y={30} textAnchor="middle" fontSize={13} fill="#334155">
        当前面积 = {s.area}，最大 = {s.best}
      </text>
      <text x={300} y={210} textAnchor="middle" fontSize={12} fill="#334155">
        {s.msg}
      </text>
    </g>
  )
}
