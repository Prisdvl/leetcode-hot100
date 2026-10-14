import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

/* =============== 141 / 142 环形链表 =============== */
// 3 → 2 → 0 → -4 → (回到 2)
const cycNodes = [
  { v: '3', x: 90, y: 100 },
  { v: '2', x: 250, y: 50 },
  { v: '0', x: 420, y: 100 },
  { v: '-4', x: 250, y: 160 },
]
const cycEdges: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 1]]
const cycSteps = [
  { slow: 0, fast: 0, find: -1, msg: 'slow=fast=head：慢走1步、快走2步' },
  { slow: 1, fast: 2, find: -1, msg: 'slow=2, fast=0' },
  { slow: 2, fast: 1, find: -1, msg: 'slow=0, fast=2' },
  { slow: 3, fast: 3, find: -1, msg: 'slow=fast=-4 → 存在环（141 在此返回 true）' },
  { slow: 3, fast: 3, find: 0, msg: '142：finder 从 head 出发，与 slow 同速' },
  { slow: 1, fast: 3, find: 1, msg: 'finder 与 slow 在节点 2 相遇 → 入环点' },
]
const CycleListBase: React.FC<AnimationProps> = ({ stepIndex, last = cycSteps.length - 1 }) => {
  const s = cycSteps[Math.min(stepIndex, last)]
  const active = new Set([s.slow, s.fast, s.find].filter(i => i >= 0))
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <defs>
        <marker id="cycArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
        </marker>
      </defs>
      {cycEdges.map(([a, b], i) => {
        const na = cycNodes[a], nb = cycNodes[b]
        return (
          <line key={i} x1={na.x + 18} y1={na.y} x2={nb.x - 18} y2={nb.y}
            stroke={C.line} strokeWidth={1.6} markerEnd="url(#cycArrow)"
            strokeDasharray={i === 3 ? '5 4' : undefined} />
        )
      })}
      {cycNodes.map((n, i) => {
        const isSlow = s.slow === i, isFast = s.fast === i, isFind = s.find === i
        let fill = C.normal
        if (active.has(i)) fill = C.current
        if (isSlow) fill = C.lPtr
        if (isFast) fill = C.rPtr
        if (isFind) fill = C.highlight
        return (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={20} fill={fill} stroke="#94a3b8" strokeWidth={1.2} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={13} fontWeight={700}
              fill={active.has(i) ? '#fff' : C.normalText}>{n.v}</text>
          </g>
        )
      })}
      <g fontSize={11} fontWeight={700}>
        <circle cx={70} cy={20} r={6} fill={C.lPtr} /><text x={82} y={24} fill={C.lPtr}>slow</text>
        <circle cx={140} cy={20} r={6} fill={C.rPtr} /><text x={152} y={24} fill={C.rPtr}>fast</text>
        <circle cx={210} cy={20} r={6} fill={C.highlight} /><text x={222} y={24} fill={C.highlight}>finder</text>
      </g>
      <text x={300} y={208} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}
export const CycleList1Animation: React.FC<AnimationProps> = (p) => <CycleListBase {...p} last={3} />
export const CycleList2Animation: React.FC<AnimationProps> = (p) => <CycleListBase {...p} last={5} />

/* =============== 160 相交链表 =============== */
// A: 4→1↘
//          8→4→5
// B: 5→6→1↗
const itNodes = [
  { v: '4', x: 60, y: 60 }, { v: '1', x: 150, y: 60 },
  { v: '5', x: 60, y: 165 }, { v: '6', x: 150, y: 165 }, { v: '1', x: 240, y: 165 },
  { v: '8', x: 340, y: 112 }, { v: '4', x: 440, y: 112 }, { v: '5', x: 530, y: 112 },
]
const itEdges: [number, number][] = [[0, 1], [2, 3], [3, 4], [1, 5], [4, 5], [5, 6], [6, 7]]
// -1 = null, -2 = B-head, -3 = A-head
const itSteps = [
  { pa: 0, pb: 2, msg: 'pA 走 A、pB 走 B' },
  { pa: 1, pb: 3, msg: '同步前进' },
  { pa: 5, pb: 4, msg: 'pA 进入公共段，pB 还差一步' },
  { pa: 6, pb: 5, msg: 'pA=4，pB=8' },
  { pa: 7, pb: 6, msg: 'pA 走到 5（A 尾）' },
  { pa: -2, pb: 7, msg: 'A 走完，pA 转到 B 头；pB 到 B 尾' },
  { pa: 3, pb: -3, msg: 'B 走完，pB 转到 A 头' },
  { pa: 5, pb: 5, msg: 'pA、pB 都走了 A+B 段，在 8 相遇 → 交点' },
]
export const IntersectionLLAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = itSteps[Math.min(stepIndex, itSteps.length - 1)]
  const ptrAt = (n: number) => {
    const labels: string[] = []
    if (s.pa === n) labels.push('A')
    if (s.pb === n) labels.push('B')
    return labels
  }
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <defs>
        <marker id="itArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
        </marker>
      </defs>
      <text x={30} y={52} fontSize={11} fontWeight={700} fill={C.lPtr}>A</text>
      <text x={30} y={157} fontSize={11} fontWeight={700} fill={C.rPtr}>B</text>
      {itEdges.map(([a, b], i) => {
        const na = itNodes[a], nb = itNodes[b]
        return (
          <line key={i} x1={na.x + 16} y1={na.y} x2={nb.x - 16} y2={nb.y}
            stroke={C.line} strokeWidth={1.6} markerEnd="url(#itArrow)" />
        )
      })}
      {itNodes.map((n, i) => {
        const labels = ptrAt(i)
        const shared = i >= 5
        const fill = labels.length ? C.current : shared ? C.processed : C.normal
        return (
          <g key={i}>
            <rect x={n.x - 18} y={n.y - 16} width={36} height={32} rx={8}
              fill={fill} stroke="#94a3b8" strokeWidth={1.2} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={13} fontWeight={700}
              fill={labels.length ? '#fff' : C.normalText}>{n.v}</text>
            {labels.length > 0 && (
              <text x={n.x} y={n.y - 22} textAnchor="middle" fontSize={11} fontWeight={700}
                fill={labels.includes('A') ? C.lPtr : C.rPtr}>
                {labels.includes('A') ? 'pA' : 'pB'}
              </text>
            )}
          </g>
        )
      })}
      <text x={300} y={208} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}

/* =============== 138 随机链表的复制 =============== */
const crVals = [7, 13, 11, 1]
const crSteps = [
  { clones: 0, links: false, msg: '原链表 7→13→11→1（虚线为 random 指针）' },
  { clones: 1, links: false, msg: '逐节点 new 克隆，哈希表记录 原节点 → 克隆节点' },
  { clones: 2, links: false, msg: '克隆节点继续创建……' },
  { clones: 3, links: false, msg: '所有克隆节点已建完' },
  { clones: 4, links: true, msg: '通过哈希表接好克隆链表的 next 和 random' },
]
export const CopyRandomAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = crSteps[Math.min(stepIndex, crSteps.length - 1)]
  const w = 70, gap = 38, x0 = 60
  const renderRow = (y: number, vals: number[], upTo: number, color: string, textFill: string) =>
    vals.map((v, i) => {
      const x = x0 + i * (w + gap)
      const on = i < upTo
      return (
        <g key={`${y}-${i}`}>
          <rect x={x} y={y} width={w} height={40} rx={8}
            fill={on ? color : '#f1f5f9'} stroke="#94a3b8" strokeWidth={1.2} />
          <text x={x + w / 2} y={y + 25} textAnchor="middle" fontSize={13} fontWeight={700}
            fill={on ? textFill : '#94a3b8'}>{v}</text>
          {i < vals.length - 1 && on && i + 1 < upTo && (
            <line x1={x + w} y1={y + 20} x2={x + w + gap} y2={y + 20}
              stroke={C.line} strokeWidth={1.6} markerEnd="url(#crArrow)" />
          )}
        </g>
      )
    })
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <defs>
        <marker id="crArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
        </marker>
      </defs>
      <text x={20} y={52} fontSize={11} fontWeight={700} fill="#64748b">原链表</text>
      {renderRow(60, crVals, 4, C.normal, C.normalText)}
      {/* random dashed arrows */}
      <path d={`M ${x0 + w / 2} 58 Q ${x0 + w + gap / 2} 20 ${x0 + (w + gap) + w / 2} 58`}
        stroke="#f59e0b" strokeWidth={1.4} fill="none" strokeDasharray="4 3" />
      <text x={20} y={132} fontSize={11} fontWeight={700} fill="#64748b">克隆</text>
      {renderRow(140, crVals, s.clones, s.links ? C.current : C.processed, s.links ? '#fff' : C.normalText)}
      <text x={300} y={208} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}

/* =============== 23 合并 K 个升序链表 =============== */
const mk = [
  { vals: [1, 4, 5], y: 34 },
  { vals: [1, 3, 4], y: 68 },
  { vals: [2, 6], y: 102 },
]
const mkSteps = [
  { consumed: [0, 0, 0], heap: [1, 1, 2], result: [] as number[], msg: 'K 个链表头全部入小根堆：{1,1,2}' },
  { consumed: [1, 0, 0], heap: [1, 2, 4], result: [1], msg: '弹出最小 1（链表1），其后继 4 入堆' },
  { consumed: [1, 1, 0], heap: [2, 3, 4], result: [1, 1], msg: '弹出 1（链表2），后继 3 入堆' },
  { consumed: [1, 1, 1], heap: [3, 4, 6], result: [1, 1, 2], msg: '弹出 2（链表3），后继 6 入堆' },
  { consumed: [1, 2, 1], heap: [4, 4, 6], result: [1, 1, 2, 3], msg: '弹出 3，依次继续……' },
  { consumed: [3, 3, 2], heap: [], result: [1, 1, 2, 3, 4, 4, 5, 6], msg: '堆空 → 1→1→2→3→4→4→5→6' },
]
export const MergeKListsAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = mkSteps[Math.min(stepIndex, mkSteps.length - 1)]
  const cw = 38, cg = 8, x0 = 40
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      {mk.map((list, li) =>
        list.vals.map((v, i) => {
          const x = x0 + i * (cw + cg), y = list.y
          const used = i < s.consumed[li]
          return (
            <g key={`${li}-${i}`}>
              <rect x={x} y={y} width={cw} height={26} rx={5}
                fill={used ? C.processed : C.normal} stroke="#94a3b8" strokeWidth={1} />
              <text x={x + cw / 2} y={y + 18} textAnchor="middle" fontSize={12} fontWeight={700}
                fill={used ? '#94a3b8' : C.normalText}>{v}</text>
              {i < list.vals.length - 1 && (
                <line x1={x + cw} y1={y + 13} x2={x + cw + cg} y2={y + 13} stroke={C.line} strokeWidth={1.4} />
              )}
            </g>
          )
        })
      )}
      {/* heap */}
      <rect x={380} y={28} width={190} height={102} rx={8} fill="#f8fafc" stroke="#cbd5e1" />
      <text x={475} y={46} textAnchor="middle" fontSize={12} fontWeight={700} fill="#475569">小根堆（各链表头）</text>
      {s.heap.length === 0 ? (
        <text x={475} y={92} textAnchor="middle" fontSize={12} fill="#94a3b8">空</text>
      ) : (
        s.heap.map((v, i) => (
          <g key={i}>
            <rect x={400 + i * 52} y={64} width={40} height={36} rx={6}
              fill={i === 0 ? C.current : C.processed} stroke="#94a3b8" />
            <text x={420 + i * 52} y={87} textAnchor="middle" fontSize={13} fontWeight={700}
              fill={i === 0 ? '#fff' : C.normalText}>{v}</text>
          </g>
        ))
      )}
      {/* result */}
      <text x={40} y={160} fontSize={11} fontWeight={700} fill="#475569">结果</text>
      {s.result.map((v, i) => (
        <g key={i}>
          <rect x={x0 + i * (cw + cg)} y={168} width={cw} height={26} rx={5}
            fill={C.good} stroke="#94a3b8" />
          <text x={x0 + i * (cw + cg) + cw / 2} y={186} textAnchor="middle" fontSize={12}
            fontWeight={700} fill="#fff">{v}</text>
        </g>
      ))}
      <text x={300} y={210} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}
