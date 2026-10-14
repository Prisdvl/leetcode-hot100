import React from 'react'
import type { AnimationProps } from '../data/types'
import { useStepPlayer } from '../hooks/useStepPlayer'

interface Props {
  AnimationComponent: React.ComponentType<AnimationProps>
  totalSteps: number
  autoPlayIntervalMs?: number
  resetKey?: string | number
}

export const AlgorithmPlayer: React.FC<Props> = ({
  AnimationComponent, totalSteps, autoPlayIntervalMs = 900, resetKey,
}) => {
  const { stepIndex, playing, goNext, goPrev, togglePlay, setStep } = useStepPlayer({
    totalSteps, autoPlayIntervalMs, resetKey,
  })

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-3 h-9 border-b border-gray-100">
        <div className="text-xs text-gray-500 font-medium">
          算法演示
          <span className="text-gray-300 mx-1.5">·</span>
          <span className="text-gray-400 font-mono">{stepIndex + 1}/{totalSteps}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={goPrev} disabled={stepIndex === 0}
            className="w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30 fast-transition cursor-pointer text-xs"
            aria-label="上一步">‹</button>
          <button onClick={togglePlay}
            className="w-6 h-6 flex items-center justify-center rounded bg-gray-900 text-white hover:bg-gray-700 fast-transition cursor-pointer"
            aria-label={playing ? '暂停' : '播放'}>
            {playing ? (
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
            ) : (
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          <button onClick={goNext} disabled={stepIndex >= totalSteps - 1}
            className="w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30 fast-transition cursor-pointer text-xs"
            aria-label="下一步">›</button>
        </div>
      </div>

      {/* svg */}
      <div className="p-2 bg-white">
        <svg viewBox="0 0 600 220" className="w-full h-auto">
          <AnimationComponent stepIndex={stepIndex} />
        </svg>
      </div>

      {/* progress */}
      <div className="px-3 pb-2 flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <button key={i} onClick={() => setStep(i)}
            className={`h-[2px] flex-1 rounded-full fast-transition cursor-pointer ${
              i === stepIndex ? 'bg-gray-900' : i < stepIndex ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            aria-label={`步骤 ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}
