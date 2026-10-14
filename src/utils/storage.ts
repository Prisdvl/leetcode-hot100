import type { CardProgress } from './sm2'

const STORAGE_KEY = 'leetcode100.progress.v1'
const ALL_CARDS_KEY = 'leetcode100.allProgress.v1'
const FAV_KEY = 'leetcode100.favorites.v1'
const TIME_KEY = 'leetcode100.timings.v1'

export function loadProgressMap(): Record<string, CardProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, CardProgress>
  } catch {
    return {}
  }
}

export function saveProgressMap(map: Record<string, CardProgress>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

// ---------- favorites ----------
export function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(FAV_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as string[]
    return new Set(arr)
  } catch {
    return new Set()
  }
}
export function saveFavorites(set: Set<string>): void {
  localStorage.setItem(FAV_KEY, JSON.stringify(Array.from(set)))
}

// ---------- per-card timing records ----------
export interface TimingRecord {
  cardId: string
  seconds: number
  at: number // epoch ms
  rating?: string
}
export function loadTimings(): TimingRecord[] {
  try {
    const raw = localStorage.getItem(TIME_KEY)
    if (!raw) return []
    return JSON.parse(raw) as TimingRecord[]
  } catch {
    return []
  }
}
export function saveTimings(list: TimingRecord[]): void {
  localStorage.setItem(TIME_KEY, JSON.stringify(list))
}
export function appendTiming(rec: TimingRecord): TimingRecord[] {
  const list = loadTimings()
  list.push(rec)
  saveTimings(list)
  return list
}

export function exportAll(extra: Record<string, unknown> = {}): string {
  const progress = loadProgressMap()
  const favorites = Array.from(loadFavorites())
  const timings = loadTimings()
  const payload: Record<string, unknown> = {
    version: 2,
    exportedAt: new Date().toISOString(),
    progress,
    favorites,
    timings,
    ...extra,
  }
  return JSON.stringify(payload, null, 2)
}

export function importAll(json: string): { count: number } {
  const parsed = JSON.parse(json) as {
    progress?: Record<string, CardProgress>
    favorites?: string[]
    timings?: TimingRecord[]
  }
  if (!parsed || typeof parsed !== 'object' || !parsed.progress) {
    throw new Error('文件格式不正确：缺少 progress 字段')
  }
  const merged: Record<string, CardProgress> = {}
  for (const [k, v] of Object.entries(parsed.progress)) {
    if (v && v.cardId) merged[k] = v
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  localStorage.setItem(ALL_CARDS_KEY, JSON.stringify(parsed))
  if (Array.isArray(parsed.favorites)) localStorage.setItem(FAV_KEY, JSON.stringify(parsed.favorites))
  if (Array.isArray(parsed.timings)) localStorage.setItem(TIME_KEY, JSON.stringify(parsed.timings))
  return { count: Object.keys(merged).length }
}
