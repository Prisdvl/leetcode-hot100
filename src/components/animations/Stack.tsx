import React from 'react'
import { C } from './_shared'

/** Generic stack: vertical push/pop. */
export interface StackCfg {
  steps: { stack: (string | number)[]; action: string; log: string }[]
}
export const StackAnimation: React.FC<{ stepIndex: number; cfg: StackCfg }> = ({ stepIndex, cfg }) => {
  const s = cfg.steps[Math.min(stepIndex, cfg.steps.length - 1)]
  return (
    <svg viewBox="0 0 600 240" className="w-full">
      {/* stack frame */}
      <rect x={250} y={40} width={100} height={160} rx={8} fill="#f8fafc" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 3" />
      {s.stack.map((item, i) => {
        const y = 40 + 160 - (i + 1) * 28
        const isTop = i === s.stack.length - 1
        return (
          <g key={i}>
            <rect x={256} y={y + 4} width={88} height={24} rx={4}
              fill={isTop ? C.current : C.processed} />
            <text x={300} y={y + 20} textAnchor="middle" fontSize={12} fontWeight={700}
              fill={isTop ? '#fff' : C.normalText}>{String(item)}</text>
          </g>
        )
      })}
      <text x={400} y={60} fontSize={13} fontWeight={700} fill={C.current}>{s.action}</text>
      <text x={300} y={225} textAnchor="middle" fontSize={12} fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">
        {s.log}
      </text>
    </svg>
  )
}
