import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

/* =============== 146 LRU 缓存 =============== */
// 链表最左 = 最近使用，最右 = 最久未使用；超出容量淘汰最右
const lruSteps = [
  { list: [] as number[], evict: -1, op: 'capacity = 2，哈希表 + 双向链表' },
  { list: [1], evict: -1, op: 'put(1) → 链表头' },
  { list: [2, 1], evict: -1, op: 'put(2) → 链表头' },
  { list: [1, 2], evict: -1, op: 'get(1) → 1 移到链表头' },
  { list: [3, 1], evict: 2, op: 'put(3) 容量满 → 淘汰最久未用的 2' },
  { list: [3, 1], evict: -1, op: 'get(2) → -1（已被淘汰）' },
  { list: [4, 3], evict: 1, op: 'put(4) → 淘汰 1' },
]
export const LRUAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = lruSteps[Math.min(stepIndex, lruSteps.length - 1)]
  const w = 80, gap = 16, x0 = 110, y = 70
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <text x={x0} y={48} fontSize={12} fill="#94a3b8">最近使用 → 最久未使用</text>
      {s.list.map((v, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y={y} width={w} height={48} rx={8}
            fill={i === 0 ? C.current : C.processed} stroke="#94a3b8" strokeWidth={1.2} />
          <text x={x0 + i * (w + gap) + w / 2} y={y + 30} textAnchor="middle"
            fontSize={16} fontWeight={700} fill={i === 0 ? '#fff' : C.normalText}>key {v}</text>
          {i < s.list.length - 1 && (
            <line x1={x0 + i * (w + gap) + w} y1={y + 24} x2={x0 + i * (w + gap) + w + gap} y2={y + 24}
              stroke={C.line} strokeWidth={1.8} markerEnd="url(#lruArrow)" />
          )}
        </g>
      ))}
      {s.evict >= 0 && (
        <g>
          <rect x={x0 + 2 * (w + gap)} y={y} width={w} height={48} rx={8}
            fill="#fecaca" stroke={C.bad} strokeWidth={1.5} strokeDasharray="5 3" />
          <text x={x0 + 2 * (w + gap) + w / 2} y={y + 30} textAnchor="middle"
            fontSize={16} fontWeight={700} fill={C.bad}>{s.evict} 淘汰</text>
        </g>
      )}
      <defs>
        <marker id="lruArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
        </marker>
      </defs>
      <text x={300} y={160} textAnchor="middle" fontSize={13} fill={C.normalText}
        fontFamily="ui-monospace, Menlo, monospace">{s.op}</text>
    </svg>
  )
}

/* =============== 295 数据流的中位数 =============== */
// low：大根堆，存较小一半（堆顶最大）；high：小根堆，存较大一半（堆顶最小）
const medSteps = [
  { low: [] as number[], high: [] as number[], note: '维护两个堆：low 大根堆 / high 小根堆' },
  { low: [1], high: [], note: 'addNum(1)：进 low' },
  { low: [1], high: [2], note: 'addNum(2)：2 经 low 弹入 high → 中位数 (1+2)/2 = 1.5' },
  { low: [2, 1], high: [3], note: 'addNum(3)：重平衡后 low=[2,1], high=[3] → 中位数 = 2' },
  { low: [3, 1, 2], high: [4], note: 'addNum(4)：low 过多 → 3 弹入 high；再入 4 → low 顶 3，high 顶 4' },
  { low: [3, 1, 2], high: [4, 6], note: 'addNum(6) → 中位数 = (3+4)/2 = 3.5' },
]
const HeapCol: React.FC<{ x: number; title: string; vals: number[]; color: string }> = ({ x, title, vals, color }) => (
  <g>
    <text x={x + 50} y={38} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>{title}</text>
    {vals.map((v, i) => {
      const y = 150 - i * 30
      const isTop = i === vals.length - 1
      return (
        <g key={i}>
          <rect x={x} y={y} width={100} height={26} rx={6}
            fill={isTop ? C.current : C.processed} stroke="#94a3b8" />
          <text x={x + 50} y={y + 18} textAnchor="middle" fontSize={13} fontWeight={700}
            fill={isTop ? '#fff' : C.normalText}>{v}</text>
        </g>
      )
    })}
    <text x={x + 50} y={178} textAnchor="middle" fontSize={10} fill="#94a3b8">堆顶 ↑</text>
  </g>
)
export const MedianStreamAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = medSteps[Math.min(stepIndex, medSteps.length - 1)]
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <rect x={110} y={20} width={110} height={170} rx={8} fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="4 3" />
      <rect x={380} y={20} width={110} height={170} rx={8} fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="4 3" />
      <HeapCol x={115} title="low 大根堆" vals={s.low} color={C.lPtr} />
      <HeapCol x={385} title="high 小根堆" vals={s.high} color={C.rPtr} />
      <text x={300} y={100} textAnchor="middle" fontSize={11} fill="#94a3b8">数量相等取两堆顶平均</text>
      <text x={300} y={120} textAnchor="middle" fontSize={11} fill="#94a3b8">奇数时取 low 堆顶</text>
      <text x={300} y={210} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.note}</text>
    </svg>
  )
}
