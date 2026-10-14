import React from 'react'
import { C } from './_shared'

/**
 * Generic binary tree traversal animation.
 * nodes: id -> {x, y, label}
 * edges: [fromId, toId][]
 * steps: set of visited node ids + log
 */
export interface TreeCfg {
  nodes: { id: number; x: number; y: number; label: string }[]
  edges: [number, number][]
  steps: { visited: number[]; current: number | null; log: string }[]
}
export const TreeTraverseAnimation: React.FC<{ stepIndex: number; cfg: TreeCfg }> = ({ stepIndex, cfg }) => {
  const s = cfg.steps[Math.min(stepIndex, cfg.steps.length - 1)]
  const visited = new Set(s.visited)
  return (
    <svg viewBox="0 0 600 260" className="w-full">
      {cfg.edges.map(([a, b], i) => {
        const na = cfg.nodes.find(n => n.id === a)!
        const nb = cfg.nodes.find(n => n.id === b)!
        return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={C.line} strokeWidth={1.5} />
      })}
      {cfg.nodes.map(n => {
        const isCur = s.current === n.id
        const isVis = visited.has(n.id)
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={20}
              fill={isCur ? C.current : isVis ? C.processed : C.normal}
              stroke="#94a3b8" strokeWidth={1} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={12} fontWeight={700}
              fill={isCur ? '#fff' : C.normalText}>{n.label}</text>
          </g>
        )
      })}
      <text x={300} y={240} textAnchor="middle" fontSize={13} fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">
        {s.log}
      </text>
    </svg>
  )
}
