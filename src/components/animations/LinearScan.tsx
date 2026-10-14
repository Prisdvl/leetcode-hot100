import React from 'react'
import { C, ArrayRow, Pointer } from './_shared'

/**
 * Generic linear scan: a pointer walks left→right, processed cells turn indigo,
 * current cell highlights. A side "call log" shows which function is being invoked
 * at each step (e.g. map.set(x) / set.has(x) / count++).
 */
export interface LinearScanConfig {
  values: (number | string)[]
  /** per-step: pointer index, and log line */
  steps: {
    ptr: number
    log: string
    mark?: 'current' | 'processed'
    /** inclusive range of cells to paint light-indigo (e.g. reachable interval) */
    range?: [number, number]
    /** extra amber cells */
    highlight?: number[]
  }[]
  caption?: string
}

export const LinearScanAnimation: React.FC<{ stepIndex: number; cfg: LinearScanConfig }> = ({
  stepIndex,
  cfg,
}) => {
  const s = cfg.steps[Math.min(stepIndex, cfg.steps.length - 1)]
  const processed: number[] = []
  for (let i = 0; i < s.ptr; i++) processed.push(i)
  if (s.range) {
    for (let i = s.range[0]; i <= s.range[1]; i++) processed.push(i)
  }
  const hl = s.highlight ?? []
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <ArrayRow
        values={cfg.values}
        x={40}
        y={70}
        cellSize={50}
        gap={6}
        current={s.mark === 'current' ? [s.ptr] : []}
        processed={processed.filter(i => i !== s.ptr)}
        highlight={hl}
      />
      <Pointer
        x={40 + s.ptr * 56 + 25}
        y={70 + 50 + 12}
        color={C.current}
        label="i"
      />
      <text x={300} y={180} textAnchor="middle" fontSize={13} fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">
        {s.log}
      </text>
      {cfg.caption && (
        <text x={300} y={205} textAnchor="middle" fontSize={11} fill="#94a3b8">
          {cfg.caption}
        </text>
      )}
    </svg>
  )
}
