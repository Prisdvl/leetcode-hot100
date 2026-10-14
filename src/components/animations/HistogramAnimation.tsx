import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

/* =============== 84 柱状图中最大的矩形 =============== */
// heights = [2, 1, 5, 6, 2, 3]
const H = [2, 1, 5, 6, 2, 3]
const hrSteps = [
  { stack: [] as number[], area: null as null | { from: number; to: number; h: number; area: number }, ans: 0,
    msg: '单调递增栈存下标，弹栈时用「左边界 × 右边界」确定矩形宽' },
  { stack: [0], area: null, ans: 0, msg: 'i=0 h=2：下标 0 入栈' },
  { stack: [1], area: { from: 0, to: 0, h: 2, area: 2 }, ans: 2,
    msg: 'i=1 h=1 更矮：弹 0，宽=1 → 面积 2×1=2；压入 1' },
  { stack: [1, 2, 3], area: null, ans: 2, msg: 'h=5、h=6 递增：依次压入 2、3' },
  { stack: [1, 4], area: { from: 2, to: 3, h: 5, area: 10 }, ans: 10,
    msg: 'i=4 h=2：弹 3 → 6×1=6；弹 2 → 5×2=10' },
  { stack: [1, 4, 5], area: { from: 2, to: 5, h: 2, area: 8 }, ans: 10,
    msg: '压入 4、5；收尾弹 5 → 3×1=3，弹 4 → 2×4=8' },
  { stack: [], area: { from: 0, to: 5, h: 1, area: 6 }, ans: 10,
    msg: '弹 1 → 1×6=6；全局最大面积 = 10' },
]
export const LargestRectangleAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = hrSteps[Math.min(stepIndex, hrSteps.length - 1)]
  const bw = 60, gap = 10, x0 = 80, base = 175, unit = 20
  const inStack = new Set(s.stack)
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      {/* current area rectangle */}
      {s.area && (
        <rect
          x={x0 + s.area.from * (bw + gap)}
          y={base - s.area.h * unit}
          width={(s.area.to - s.area.from + 1) * (bw + gap) - gap}
          height={s.area.h * unit}
          fill={C.water} opacity={0.28} stroke={C.water} strokeWidth={1.5} strokeDasharray="4 3" />
      )}
      {H.map((h, i) => (
        <g key={i}>
          <rect x={x0 + i * (bw + gap)} y={base - h * unit} width={bw} height={h * unit}
            fill={inStack.has(i) ? C.current : C.processed}
            stroke={C.line} strokeWidth={1} />
          <text x={x0 + i * (bw + gap) + bw / 2} y={base - h * unit - 6} textAnchor="middle"
            fontSize={12} fontWeight={700} fill={C.normalText}>{h}</text>
          <text x={x0 + i * (bw + gap) + bw / 2} y={base + 16} textAnchor="middle"
            fontSize={11} fill="#94a3b8">{i}</text>
        </g>
      ))}
      <line x1={60} y1={base} x2={560} y2={base} stroke={C.line} strokeWidth={1.6} />
      <text x={40} y={40} fontSize={12} fontWeight={700} fill={C.current}>
        stack = [{s.stack.join(', ')}]
      </text>
      <text x={470} y={40} fontSize={12} fontWeight={700} fill={C.good}>
        {s.area ? `当前面积 ${s.area.area}` : ''}
      </text>
      <text x={530} y={60} fontSize={12} fontWeight={700} fill={C.good}>ans = {s.ans}</text>
      <text x={300} y={208} textAnchor="middle" fontSize={11.5}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}
