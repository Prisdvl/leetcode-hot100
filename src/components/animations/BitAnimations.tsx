import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

/* =============== 191 位 1 的个数 =============== */
const hwSteps = [
  { cur: '1011', expr: '', count: 0, msg: 'n = 1011，count = 0' },
  { cur: '1010', expr: '1011 & 1010', count: 1, msg: 'n & (n-1) 消掉最低位的 1 → 1010' },
  { cur: '1000', expr: '1010 & 1001', count: 2, msg: '再消一位 → 1000' },
  { cur: '0000', expr: '1000 & 0111', count: 3, msg: '再消一位 → 0000，n 变 0，返回 3' },
]
export const HammingWeightAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = hwSteps[Math.min(stepIndex, hwSteps.length - 1)]
  const bw = 64, gap = 8, x0 = (600 - 4 * (bw + gap)) / 2
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      {s.cur.split('').map((bit, i) => (
          <g key={i}>
            <rect x={x0 + i * (bw + gap)} y={60} width={bw} height={bw} rx={10}
              fill={bit === '1' ? C.current : C.processed} stroke="#94a3b8" />
            <text x={x0 + i * (bw + gap) + bw / 2} y={60 + bw / 2 + 8} textAnchor="middle"
              fontSize={26} fontWeight={700} fill={bit === '1' ? '#fff' : C.normalText}>{bit}</text>
          </g>
      ))}
      {s.expr && (
        <text x={300} y={158} textAnchor="middle" fontSize={14}
          fontFamily="ui-monospace, Menlo, monospace" fill="#475569">{s.expr}</text>
      )}
      <text x={300} y={185} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.good}>count = {s.count}</text>
      <text x={300} y={210} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}

/* =============== 9 回文数（反转一半） =============== */
const pnSteps = [
  { x: '12321', rev: '0', msg: 'x = 12321，rev = 0（负数与末位 0 的非零数直接 false）' },
  { x: '1232', rev: '1', msg: '弹出末位 1：rev = 1，x = 1232' },
  { x: '123', rev: '12', msg: '弹出末位 2：rev = 12，x = 123' },
  { x: '12', rev: '123', msg: 'x <= rev 时停止（已反转一半）' },
  { x: '12', rev: '123', msg: 'x == rev/10（12 == 12）→ 回文；偶数位时比较 x == rev' },
]
const NumBox: React.FC<{ x: number; label: string; value: string; color: string }> = ({ x, label, value, color }) => (
  <g>
    <text x={x + 60} y={70} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>{label}</text>
    <rect x={x} y={80} width={120} height={52} rx={10} fill="#f8fafc" stroke="#94a3b8" strokeWidth={1.4} />
    <text x={x + 60} y={115} textAnchor="middle" fontSize={22} fontWeight={700}
      fontFamily="ui-monospace, Menlo, monospace" fill={C.normalText}>{value}</text>
  </g>
)
export const PalindromeNumAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = pnSteps[Math.min(stepIndex, pnSteps.length - 1)]
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <NumBox x={150} label="x（剩余前半）" value={s.x} color={C.lPtr} />
      <NumBox x={330} label="rev（反转的后半）" value={s.rev} color={C.rPtr} />
      <text x={300} y={185} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}
