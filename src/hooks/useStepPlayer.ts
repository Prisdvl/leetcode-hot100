import { useCallback, useEffect, useRef, useState } from 'react'

interface Options {
  totalSteps: number
  autoPlayIntervalMs?: number
  /** reset when card changes */
  resetKey?: string | number
}

export function useStepPlayer({ totalSteps, autoPlayIntervalMs = 900, resetKey }: Options) {
  const [stepIndex, setStepIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef<number | null>(null)

  // reset on card change
  useEffect(() => {
    setStepIndex(0)
    setPlaying(false)
  }, [resetKey])

  const goNext = useCallback(() => {
    setStepIndex((s) => Math.min(s + 1, totalSteps - 1))
  }, [totalSteps])

  const goPrev = useCallback(() => {
    setStepIndex((s) => Math.max(s - 1, 0))
  }, [])

  useEffect(() => {
    if (!playing) return
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setStepIndex((s) => {
        if (s >= totalSteps - 1) {
          setPlaying(false)
          return s
        }
        return s + 1
      })
    }, autoPlayIntervalMs)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [playing, totalSteps, autoPlayIntervalMs])

  const togglePlay = useCallback(() => {
    setPlaying((p) => {
      // if at end and pressing play, restart from 0
      if (!p && stepIndex >= totalSteps - 1) setStepIndex(0)
      return !p
    })
  }, [stepIndex, totalSteps])

  const setStep = useCallback((i: number) => {
    setStepIndex(Math.max(0, Math.min(i, totalSteps - 1)))
  }, [totalSteps])

  return {
    stepIndex,
    playing,
    goNext,
    goPrev,
    togglePlay,
    setStep,
    totalSteps,
  }
}
