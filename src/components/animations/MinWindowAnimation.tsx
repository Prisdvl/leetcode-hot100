import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

// s = "ADOBECODEBANC", t = "ABC"
const S = 'ADOBECODEBANC'.split('')

type Snap = { l: number; r: number; formed: boolean; msg: string; best?: string }
const STEPS: Snap[] = [
  { l: 0, r: 0, formed: false, msg: 'r=0 A，窗口 [A]，need A✓ B✗ C✗' },
  { l: 0, r: 3, formed: false, msg: 'r=1 D/2 O/3 B，窗口 [ADOB]，B✓ 但 C✗' },
  { l: 0, r: 5, formed: true, msg: 'r=5 → 找到 C，窗口 [ADOBEC] 满足条件！len=6 best="ADOBEC"' },
  { l: 1, r: 5, formed: true, msg: '收缩 l=0(A)：A 仍满足？弹出 A 后 formed--，停止' },
  { l: 1, r: 9, formed: false, msg: 'r 继续走：CODEB，等 C 再次出现' },
  { l: 5, r: 9, formed: true, best: 'BANC', msg: 'r=9 C，formed 达标，开始收缩 l' },
  { l: 9, r: 12, formed: true, best: 'BANC', msg: '收缩 l：弹出 ODECODE 直到 B，再弹 B 则 formed--。best="BANC" len=4' },
]

export const MinWindowAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = STEPS[Math.min(stepIndex, STEPS.length - 1)]
  const cellW = 36
  return (
    <g>
      {S.map((ch, i) => {
        const x = 25 + i * (cellW + 6)
        const inWin = i >= s.l && i <= s.r
        const isT = 'ABC'.includes(ch)
        let fill = C.normal
        if (inWin) fill = s.formed ? C.good : C.highlight
        else if (isT) fill = '#fef3c7'
        const textFill = inWin ? '#fff' : '#334155'
        return (
          <g key={i}>
            <rect x={x} y={60} width={cellW} height={cellW} rx={6} fill={fill} stroke="#94a3b8" />
            <text x={x + cellW / 2} y={84} textAnchor="middle" fontSize={14} fontWeight={700} fill={textFill}>
              {ch}
            </text>
          </g>
        )
      })}
      <text x={300} y={140} textAnchor="middle" fontSize={13} fill="#334155">
        当前窗口 [{s.l}, {s.r}] = "{S.slice(s.l, s.r + 1).join('')}" {s.formed ? '✓ 覆盖 t' : ''}
      </text>
      <text x={300} y={165} textAnchor="middle" fontSize={13} fill="#6366f1" fontWeight={700}>
        {s.best ? `最短 = "${s.best}" (len=${s.best.length})` : '寻找最短覆盖...'}
      </text>
      <text x={300} y={195} textAnchor="middle" fontSize={12} fill="#334155">{s.msg}</text>
      <text x={300} y={215} textAnchor="middle" fontSize={11} fill="#94a3b8">t = "ABC"</text>
    </g>
  )
}
