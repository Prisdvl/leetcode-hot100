// SM-2 (SuperMemo 2) spaced repetition algorithm implementation.
// Ratings: 0=Again (forgot), 1=Hard, 2=Good, 3=Easy.

export type Rating = 'again' | 'hard' | 'good' | 'easy'

export interface CardProgress {
  cardId: string
  repetitions: number
  /** days; 0 means "same day / minutes" */
  intervalDays: number
  easeFactor: number
  /** ms epoch when card is next due */
  dueAt: number
  lastReviewAt?: number
}

const MIN_EASE = 1.3
const DAY_MS = 24 * 60 * 60 * 1000
const AGAIN_DELAY_MINUTES = 10

export function createInitialProgress(cardId: string, dueAt: number = Date.now()): CardProgress {
  return {
    cardId,
    repetitions: 0,
    intervalDays: 0,
    easeFactor: 2.5,
    dueAt,
  }
}

export function applyRating(progress: CardProgress, rating: Rating, now: number = Date.now()): CardProgress {
  const p: CardProgress = { ...progress, lastReviewAt: now }

  switch (rating) {
    case 'again': {
      p.repetitions = 0
      p.intervalDays = 0
      p.easeFactor = Math.max(MIN_EASE, progress.easeFactor - 0.2)
      p.dueAt = now + AGAIN_DELAY_MINUTES * 60 * 1000
      break
    }
    case 'hard': {
      p.repetitions = progress.repetitions + 1
      const base = p.repetitions === 1 ? 1 : Math.max(1, Math.round(progress.intervalDays * 1.2))
      p.intervalDays = base
      p.easeFactor = Math.max(MIN_EASE, progress.easeFactor - 0.15)
      p.dueAt = now + base * DAY_MS
      break
    }
    case 'good': {
      p.repetitions = progress.repetitions + 1
      let interval: number
      if (p.repetitions === 1) interval = 1
      else if (p.repetitions === 2) interval = 6
      else interval = Math.max(1, Math.round(progress.intervalDays * progress.easeFactor))
      p.intervalDays = interval
      p.dueAt = now + interval * DAY_MS
      break
    }
    case 'easy': {
      p.repetitions = progress.repetitions + 1
      p.easeFactor = progress.easeFactor + 0.15
      let interval: number
      if (p.repetitions === 1) interval = 4
      else if (p.repetitions === 2) interval = 10
      else interval = Math.max(1, Math.round(progress.intervalDays * p.easeFactor * 1.3))
      p.intervalDays = interval
      p.dueAt = now + interval * DAY_MS
      break
    }
  }
  return p
}

export function isDue(p: CardProgress, now: number = Date.now()): boolean {
  return p.dueAt <= now
}

export function formatInterval(p: CardProgress): string {
  if (p.intervalDays === 0) {
    const mins = Math.max(1, Math.round((p.dueAt - Date.now()) / 60000))
    return mins <= 60 ? `${mins} 分钟后` : `${Math.round(mins / 60)} 小时后`
  }
  if (p.intervalDays < 30) return `${p.intervalDays} 天后`
  const months = Math.round(p.intervalDays / 30)
  return `${months} 个月后`
}
