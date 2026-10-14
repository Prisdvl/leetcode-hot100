import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

// height = [0,1,0,2,1,0,1,3,2,1,2,1]
const H = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

type Snap = { l: number; r: number; leftMax: number; rightMax: number; water: number; msg: string }
const STEPS: Snap[] = [
  { l: 0, r: 11, leftMax: 0, rightMax: 0, water: 0, msg: '双指针从两端开始，维护 leftMax/rightMax' },
  { l: 1, r: 11, leftMax: 1, rightMax: 1, water: 0, msg: 'height[l]=1 >= leftMax，更新 leftMax=1' },
  { l: 2, r: 11, leftMax: 1, rightMax: 1, water: 1, msg: 'height[l]=0 < leftMax，积水 += 1-0 = 1' },
  { l: 3, r: 11, leftMax: 2, rightMax: 1, water: 1, msg: 'height[l]=2 >= leftMax，更新 leftMax=2' },
  { l: 3, r: 10, leftMax: 2, rightMax: 2, water: 1, msg: 'rightMax < leftMax，从右侧推进：height[r]=2' },
  { l: 3, r: 9, leftMax: 2, rightMax: 2, water: 2, msg: 'height[r]=1 < rightMax，积水 += 2-1 = 1' },
  { l: 3, r: 8, leftMax: 2, rightMax: 2, water: 2, msg: 'height[r]=2 >= rightMax，更新 rightMax=2' },
  { l: 4, r: 8, leftMax: 2, rightMax: 2, water: 3, msg: 'height[l]=1 < leftMax，积水 += 2-1 = 1' },
  { l: 5, r: 8, leftMax: 2, rightMax: 2, water: 5, msg: 'height[l]=0 < leftMax，积水 += 2-0 = 2' },
  { l: 6, r: 8, leftMax: 2, rightMax: 2, water: 6, msg: 'height[l]=1 < leftMax，积水 += 2-1 = 1' },
  { l: 7, r: 8, leftMax: 3, rightMax: 2, water: 6, msg: 'height[l]=3 >= leftMax，更新 leftMax=3' },
  { l: 7, r: 7, leftMax: 3, rightMax: 2, water: 6, msg: '相遇，总接水量 = 6' },
]

export const TrapRainWaterAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = STEPS[Math.min(stepIndex, STEPS.length - 1)]
  const baseY = 180
  const barW = 30
  const gap = 16
  const maxH = 130
  const scale = maxH / 3.5
  return (
    <g>
      {H.map((h, i) => {
        const x = 20 + i * (barW + gap)
        const bh = h * scale
        const isL = i === s.l
        const isR = i === s.r
        const fill = isL ? C.lPtr : isR ? C.rPtr : '#94a3b8'
        return (
          <g key={i}>
            <rect x={x} y={baseY - bh} width={barW} height={bh} rx={2} fill={fill} />
          </g>
        )
      })}
      {/* water fill up to min(leftMax,rightMax) for processed region */}
      {H.map((h, i) => {
        if (i <= s.l || i >= s.r) return null
        const cap = Math.min(s.leftMax, s.rightMax)
        if (h >= cap) return null
        const x = 20 + i * (barW + gap)
        const wh = (cap - h) * scale
        return (
          <rect
            key={i}
            x={x}
            y={baseY - h * scale - wh}
            width={barW}
            height={wh}
            fill={C.water}
            opacity={0.6}
          />
        )
      })}
      <text x={300} y={30} textAnchor="middle" fontSize={13} fill="#334155">
        累计积水 = {s.water}（leftMax={s.leftMax}, rightMax={s.rightMax}）
      </text>
      <text x={300} y={210} textAnchor="middle" fontSize={12} fill="#334155">
        {s.msg}
      </text>
    </g>
  )
}
