import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

/* =============== 207 课程表（拓扑排序 / Kahn） =============== */
const topoNodes = [
  { id: 0, x: 90, y: 110 },
  { id: 2, x: 250, y: 50 },
  { id: 4, x: 250, y: 170 },
  { id: 1, x: 420, y: 110 },
  { id: 3, x: 540, y: 110 },
]
const topoEdges: [number, number][] = [[0, 1], [0, 2], [2, 1], [2, 4], [1, 3]]
const topoSteps = [
  { done: [] as number[], queued: [] as number[], indeg: [0, 2, 1, 1, 1], msg: '建邻接表并统计入度：indeg = [0,2,1,1,1]' },
  { done: [], queued: [0], indeg: [0, 2, 1, 1, 1], msg: '入度为 0 的课程 0 入队' },
  { done: [0], queued: [2], indeg: [0, 1, 0, 1, 1], msg: '出队 0：邻居 1、2 入度 -1 → 课程 2 入度 0 入队' },
  { done: [0, 2], queued: [4], indeg: [0, 0, 0, 1, 0], msg: '出队 2：邻居 1、4 入度 -1 → 4 入队' },
  { done: [0, 2, 4], queued: [1], indeg: [0, 0, 0, 0, 0], msg: '出队 4；课程 1 入度 0 入队' },
  { done: [0, 2, 4, 1, 3], queued: [], indeg: [0, 0, 0, 0, 0], msg: '出队 1、3：共处理 5 门 == 课程数 → 无环，可完成' },
]
export const TopoSortAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = topoSteps[Math.min(stepIndex, topoSteps.length - 1)]
  const done = new Set(s.done)
  const queued = new Set(s.queued)
  const n = (id: number) => topoNodes.find(x => x.id === id)!
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <defs>
        <marker id="topoArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
        </marker>
      </defs>
      {topoEdges.map(([a, b], i) => (
        <line key={i} x1={n(a).x + 20} y1={n(a).y} x2={n(b).x - 20} y2={n(b).y}
          stroke={C.line} strokeWidth={1.5} markerEnd="url(#topoArrow)" />
      ))}
      {topoNodes.map(node => {
        const isDone = done.has(node.id)
        const isQ = queued.has(node.id)
        const fill = isDone ? C.good : isQ ? C.current : C.normal
        return (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r={20} fill={fill} stroke="#94a3b8" strokeWidth={1.2} />
            <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize={13} fontWeight={700}
              fill={isDone || isQ ? '#fff' : C.normalText}>{node.id}</text>
            <text x={node.x} y={node.y + 40} textAnchor="middle" fontSize={10} fill="#94a3b8">
              indeg {s.indeg[node.id]}
            </text>
          </g>
        )
      })}
      <text x={300} y={32} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}

/* =============== 347 前 K 个高频元素（桶排序） =============== */
const bkSteps = [
  { show: 0 as number, msg: '扫描 nums=[1,1,1,2,2,3]，统计频率' },
  { show: 1, msg: '建立「频率桶」：下标即出现次数' },
  { show: 2, msg: '桶 3 = [1]，桶 2 = [2]，桶 1 = [3]' },
  { show: 3, msg: '从高频桶向下取够 k=2 个 → [1, 2]' },
]
const BUCKETS = [
  { freq: 3, vals: [1] },
  { freq: 2, vals: [2] },
  { freq: 1, vals: [3] },
]
export const TopKBucketAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = bkSteps[Math.min(stepIndex, bkSteps.length - 1)]
  const x0 = 90, y0 = 44, laneH = 42
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      {BUCKETS.map((b, i) => {
        const y = y0 + i * laneH
        const visible = s.show >= 2
        const picked = s.show >= 3 && b.freq >= 2
        return (
          <g key={i}>
            <rect x={x0} y={y} width={420} height={34} rx={8}
              fill={picked ? C.good : visible ? '#f8fafc' : '#f1f5f9'}
              stroke="#cbd5e1" />
            <text x={x0 + 24} y={y + 22} textAnchor="middle" fontSize={13} fontWeight={700}
              fill={picked ? '#fff' : C.normalText}>桶 {b.freq}</text>
            {visible && b.vals.map((v, j) => (
              <g key={j}>
                <rect x={x0 + 60 + j * 50} y={y + 4} width={40} height={26} rx={6}
                  fill={picked ? '#fff' : C.current} stroke="#94a3b8" />
                <text x={x0 + 80 + j * 50} y={y + 22} textAnchor="middle" fontSize={13} fontWeight={700}
                  fill={picked ? C.good : '#fff'}>{v}</text>
              </g>
            ))}
          </g>
        )
      })}
      <text x={300} y={196} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}
