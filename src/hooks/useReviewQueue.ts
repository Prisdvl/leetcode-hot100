import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  applyRating,
  createInitialProgress,
  isDue,
  type CardProgress,
  type Rating,
} from '../utils/sm2'
import { loadProgressMap, saveProgressMap } from '../utils/storage'

interface Options {
  /** all card ids in order */
  cardIds: string[]
}

export function useReviewQueue({ cardIds }: Options) {
  const [progressMap, setProgressMap] = useState<Record<string, CardProgress>>(() => {
    const existing = loadProgressMap()
    const merged: Record<string, CardProgress> = { ...existing }
    const now = Date.now()
    // First-time: schedule every card for immediate review (due now)
    for (const id of cardIds) {
      if (!merged[id]) merged[id] = createInitialProgress(id, now)
    }
    return merged
  })

  useEffect(() => {
    saveProgressMap(progressMap)
  }, [progressMap])

  const dueCards = useMemo(() => {
    const now = Date.now()
    return cardIds.filter((id) => progressMap[id] && isDue(progressMap[id], now))
  }, [progressMap, cardIds])

  const [index, setIndex] = useState(0)

  // clamp when due list changes
  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, dueCards.length - 1)))
  }, [dueCards.length])

  const currentId = dueCards[index]

  const rate = useCallback(
    (rating: Rating) => {
      if (!currentId) return
      const prev = progressMap[currentId]
      const next = applyRating(prev, rating)
      setProgressMap((m) => ({ ...m, [currentId]: next }))
      // move to next card
      setIndex((i) => Math.min(i + 1, Math.max(0, dueCards.length - 1)))
    },
    [currentId, progressMap, dueCards.length],
  )

  const resetAll = useCallback(() => {
    const now = Date.now()
    const fresh: Record<string, CardProgress> = {}
    for (const id of cardIds) fresh[id] = createInitialProgress(id, now)
    setProgressMap(fresh)
    setIndex(0)
  }, [cardIds])

  return {
    dueCards,
    currentId,
    index,
    rate,
    resetAll,
    totalCards: cardIds.length,
    progressMap,
  }
}
