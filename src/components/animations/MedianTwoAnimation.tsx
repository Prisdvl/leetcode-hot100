import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

/* =============== 4 寻找两个正序数组的中位数 =============== */
// nums1 = [1,3,5], nums2 = [2,4,6,8] → 合并后中位数 4
const A = [1, 3, 5]
const B = [2, 4, 6, 8]
const mtSteps = [
  { cutA: 0, cutB: 0, msg: '在较短数组 nums1 上二分「切点」，使两数组左半总数 = 右半总数' },
  { cutA: 1, cutB: 2, msg: 'cutA=1、cutB=2：L1=1,R1=3；L2=4,R2=6；L2(4) > R1(3) → 切点右移' },
  { cutA: 2, cutB: 1, msg: 'cutA=2、cutB=1：L1=3,R1=5；L2=2,R2=4' },
  { cutA: 2, cutB: 1, msg: 'L1≤R2 (3≤4) 且 L2≤R1 (2≤5) → 中位数 = min(R1,R2) = min(5,4) = 4' },
]
const PartRow: React.FC<{ label: string; vals: number[]; y: number; cut: number; color: string }> =
  ({ label, vals, y, cut, color }) => {
    const cs = 52, gap = 6, x0 = 130
    const cutX = x0 + cut * (cs + gap)
    return (
      <g>
        <text x={70} y={y + 32} fontSize={12} fontWeight={700} fill={color}>{label}</text>
        {vals.map((v, i) => {
          const x = x0 + i * (cs + gap)
          const left = i < cut
          return (
            <g key={i}>
              <rect x={x} y={y} width={cs} height={cs} rx={8}
                fill={left ? C.processed : C.normal} stroke="#94a3b8" />
              <text x={x + cs / 2} y={y + cs / 2 + 5} textAnchor="middle" fontSize={15}
                fontWeight={700} fill={C.normalText}>{v}</text>
            </g>
          )
        })}
        {/* cut divider */}
        <line x1={cutX} y1={y - 8} x2={cutX} y2={y + cs + 8}
          stroke={C.highlight} strokeWidth={2.5} strokeDasharray="5 3" />
        <text x={cutX} y={y - 12} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.highlight}>cut</text>
      </g>
    )
  }
export const MedianTwoArraysAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = mtSteps[Math.min(stepIndex, mtSteps.length - 1)]
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <PartRow label="nums1" vals={A} y={40} cut={s.cutA} color={C.lPtr} />
      <PartRow label="nums2" vals={B} y={120} cut={s.cutB} color={C.rPtr} />
      <text x={300} y={200} textAnchor="middle" fontSize={11.5}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}
