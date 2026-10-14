import React from 'react'
import { C } from './_shared'

/** Generic linked list: nodes with arrows, up to two pointers and completed nodes. */
export interface LinkedListCfg {
  nodes: string[]
  steps: { ptr: number | null; ptr2?: number | null; done?: number[]; log: string }[]
  ptrLabel?: string
  ptr2Label?: string
}
export const LinkedListAnimation: React.FC<{ stepIndex: number; cfg: LinkedListCfg }> = ({ stepIndex, cfg }) => {
  const s = cfg.steps[Math.min(stepIndex, cfg.steps.length - 1)]
  const done = new Set(s.done ?? [])
  const cellW = 70
  const gap = 30
  const startX = 60
  const y = 90
  return (
    <svg viewBox="0 0 600 200" className="w-full">
      {cfg.nodes.map((n, i) => {
        const x = startX + i * (cellW + gap)
        const isCur = s.ptr === i
        const isCur2 = s.ptr2 === i
        const isDone = done.has(i)
        const fill = isCur ? C.current : isCur2 ? C.rPtr : isDone ? C.good : C.normal
        return (
          <g key={i}>
            <rect x={x} y={y} width={cellW} height={44} rx={8}
              fill={fill}
              stroke="#94a3b8" strokeWidth={1.5} />
            <text x={x + cellW / 2} y={y + 27} textAnchor="middle" fontSize={13} fontWeight={700}
              fill={isCur || isCur2 || isDone ? '#fff' : C.normalText}>{n}</text>
            {i < cfg.nodes.length - 1 && (
              <line x1={x + cellW} y1={y + 22} x2={x + cellW + gap} y2={y + 22}
                stroke={C.line} strokeWidth={1.5} markerEnd="url(#arrow)" />
            )}
            {isCur && (
              <text x={x + cellW / 2} y={y - 12} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.current}>▼</text>
            )}
            {isCur2 && (
              <text x={x + cellW / 2} y={y - 30} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.rPtr}>▼</text>
            )}
          </g>
        )
      })}
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.line} />
        </marker>
      </defs>
      <text x={300} y={180} textAnchor="middle" fontSize={13} fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">
        {s.log}
      </text>
    </svg>
  )
}
