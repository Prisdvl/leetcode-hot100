import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

// nums = [1,3,-1,-3,5,3,6,7], k=3
const NUMS = [1, 3, -1, -3, 5, 3, 6, 7]

type Snap = { i: number; deq: number[]; windowMax?: number; msg: string }
const STEPS: Snap[] = [
  { i: 0, deq: [0], msg: 'i=0: deq=[0(1)]' },
  { i: 1, deq: [1], msg: 'i=1: 弹出 0(1<=3)，deq=[1(3)]' },
  { i: 2, deq: [1, 2], windowMax: 3, msg: 'i=2: deq=[1(3),2(-1)]，窗口[1,3,-1] max=3' },
  { i: 3, deq: [1, 2, 3], windowMax: 3, msg: 'i=3: deq=[1,2,3]，窗口[3,-1,-3] max=3' },
  { i: 4, deq: [4], windowMax: 5, msg: 'i=4: 弹出 3,2,1（都 <=5），弹出越界 1，deq=[4(5)]' },
  { i: 5, deq: [4, 5], windowMax: 5, msg: 'i=5: deq=[4(5),5(3)]，max=5' },
  { i: 6, deq: [6], windowMax: 6, msg: 'i=6: 弹出 5,4（<=6），deq=[6(6)]' },
  { i: 7, deq: [7], windowMax: 7, msg: 'i=7: deq=[7(7)]，max=7。结果 [3,3,5,5,6,7]' },
]

export const MaxSlidingWindowAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = STEPS[Math.min(stepIndex, STEPS.length - 1)]
  const cellW = 50
  return (
    <g>
      {NUMS.map((v, i) => {
        const x = 30 + i * (cellW + 6)
        const inDeq = s.deq.includes(i)
        const fill = inDeq ? C.current : C.normal
        const textFill = inDeq ? '#fff' : '#334155'
        return (
          <g key={i}>
            <rect x={x} y={50} width={cellW} height={cellW} rx={6} fill={fill} stroke="#94a3b8" />
            <text x={x + cellW / 2} y={80} textAnchor="middle" fontSize={16} fontWeight={700} fill={textFill}>
              {v}
            </text>
            <text x={x + cellW / 2} y={115} textAnchor="middle" fontSize={10} fill="#94a3b8">{i}</text>
          </g>
        )
      })}
      {/* window bracket */}
      {s.i >= 2 && (
        <rect
          x={30 + (s.i - 2) * (cellW + 6) - 4}
          y={40}
          width={3 * (cellW + 6) + 4}
          height={cellW + 30}
          fill="none"
          stroke={C.highlight}
          strokeWidth={2}
          rx={10}
          strokeDasharray="4 3"
        />
      )}
      <text x={300} y={150} textAnchor="middle" fontSize={13} fill="#334155" fontFamily="monospace">
        deq（存下标，单调递减）: [{s.deq.join(', ')}]
      </text>
      <text x={300} y={175} textAnchor="middle" fontSize={13} fill="#334155">
        当前窗口最大值 = {s.windowMax ?? '—'}
      </text>
      <text x={300} y={205} textAnchor="middle" fontSize={12} fill="#334155">{s.msg}</text>
    </g>
  )
}
