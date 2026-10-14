import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

/* =============== 118 杨辉三角 =============== */
const ROWS = [
  [1],
  [1, 1],
  [1, 2, 1],
  [1, 3, 3, 1],
  [1, 4, 6, 4, 1],
]
const psMsgs = [
  'row0 = [1]',
  'row1：两端为 1 → [1,1]',
  'row2：row[i] = 上一行左 + 上一行右 → 1+1=2',
  'row3：1+2=3，2+1=3 → [1,3,3,1]',
  'row4：1+3=4，3+3=6，3+1=4 → [1,4,6,4,1]',
]
export const PascalTriangleAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const shown = Math.min(stepIndex + 1, ROWS.length)
  const cs = 46, gap = 6
  const rowY = (r: number) => 24 + r * 36
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      {ROWS.slice(0, shown).map((row, r) => {
        const rowW = row.length * (cs + gap) - gap
        const x0 = (600 - rowW) / 2
        const isNew = r === shown - 1
        return (
          <g key={r}>
            {row.map((v, i) => {
              const x = x0 + i * (cs + gap)
              return (
                <g key={i}>
                  <rect x={x} y={rowY(r)} width={cs} height={30} rx={7}
                    fill={isNew && i > 0 && i < row.length - 1 ? C.highlight : C.processed}
                    stroke="#94a3b8" />
                  <text x={x + cs / 2} y={rowY(r) + 20} textAnchor="middle" fontSize={13}
                    fontWeight={700}
                    fill={isNew && i > 0 && i < row.length - 1 ? '#fff' : C.normalText}>{v}</text>
                </g>
              )
            })}
          </g>
        )
      })}
      <text x={300} y={210} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{psMsgs[Math.min(stepIndex, psMsgs.length - 1)]}</text>
    </svg>
  )
}
