import React, { useMemo } from 'react'
import { CARDS } from '../data/cards'
import type { TimingRecord } from '../utils/storage'

interface Props {
  timings: TimingRecord[]
  favorites: Set<string>
  onClose: () => void
  onClear: () => void
}

const fmtSec = (s: number) => {
  if (s < 60) return `${s.toFixed(1)}s`
  const m = Math.floor(s / 60)
  const r = Math.round(s % 60)
  return `${m}m${r}s`
}

export const StatsPanel: React.FC<Props> = ({ timings, favorites, onClose, onClear }) => {
  const byCard = useMemo(() => {
    const map = new Map<string, number[]>()
    for (const t of timings) {
      const arr = map.get(t.cardId) ?? []
      arr.push(t.seconds)
      map.set(t.cardId, arr)
    }
    return map
  }, [timings])

  const totalSec = timings.reduce((a, b) => a + b.seconds, 0)
  const uniqueCards = byCard.size
  const last7 = useMemo(() => {
    const cutoff = Date.now() - 7 * 864000 * 1000
    return timings.filter(t => t.at >= cutoff)
  }, [timings])

  const rows = useMemo(() => {
    return CARDS.map(c => {
      const arr = byCard.get(c.id) ?? []
      if (arr.length === 0) return null
      const sum = arr.reduce((a, b) => a + b, 0)
      return {
        id: c.id,
        no: c.leetcodeNo,
        title: c.title,
        difficulty: c.difficulty,
        count: arr.length,
        avg: sum / arr.length,
        min: Math.min(...arr),
        max: Math.max(...arr),
        total: sum,
        fav: favorites.has(c.id),
      }
    }).filter(Boolean) as {
      id: string; no: number; title: string; difficulty: string;
      count: number; avg: number; min: number; max: number; total: number; fav: boolean;
    }[]
  }, [byCard, favorites])

  const recent = useMemo(() => [...timings].sort((a, b) => b.at - a.at).slice(0, 8), [timings])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[85vh] bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900">学习统计</div>
            <div className="text-xs text-gray-500 mt-0.5">所有练习模式下的用时记录</div>
          </div>
          <button onClick={onClose} className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-md cursor-pointer">关闭</button>
        </div>

        <div className="overflow-y-auto slim-scroll px-5 py-4">
          {/* KPI */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="p-3 rounded-lg border border-gray-200">
              <div className="text-[11px] text-gray-500">总用时</div>
              <div className="text-base font-semibold text-gray-900 mt-1">{fmtSec(totalSec)}</div>
            </div>
            <div className="p-3 rounded-lg border border-gray-200">
              <div className="text-[11px] text-gray-500">练习题数</div>
              <div className="text-base font-semibold text-gray-900 mt-1">{uniqueCards} / {CARDS.length}</div>
            </div>
            <div className="p-3 rounded-lg border border-gray-200">
              <div className="text-[11px] text-gray-500">近 7 天</div>
              <div className="text-base font-semibold text-gray-900 mt-1">{last7.length} 次 · {fmtSec(last7.reduce((a,b)=>a+b.seconds,0))}</div>
            </div>
            <div className="p-3 rounded-lg border border-gray-200">
              <div className="text-[11px] text-gray-500">收藏题目</div>
              <div className="text-base font-semibold text-gray-900 mt-1">{favorites.size} 道</div>
            </div>
          </div>

          {/* Per-card table */}
          <div className="text-xs font-medium text-gray-500 mb-2">按题目聚合</div>
          {rows.length === 0 ? (
            <div className="text-xs text-gray-400 py-6 text-center border border-dashed border-gray-200 rounded-lg">
              还没有练习记录。切换到「练习」模式开始计时。
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium">题目</th>
                    <th className="text-right px-3 py-2 font-medium">次数</th>
                    <th className="text-right px-3 py-2 font-medium">平均</th>
                    <th className="text-right px-3 py-2 font-medium">最快</th>
                    <th className="text-right px-3 py-2 font-medium">最慢</th>
                    <th className="text-right px-3 py-2 font-medium">累计</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.id} className="border-t border-gray-100">
                      <td className="px-3 py-2">
                        <span className="text-gray-900 font-medium">#{r.no} {r.title}</span>
                        {r.fav && <span className="ml-1 text-rose-500">♥</span>}
                      </td>
                      <td className="px-3 py-2 text-right text-gray-600">{r.count}</td>
                      <td className="px-3 py-2 text-right text-gray-900 font-medium">{fmtSec(r.avg)}</td>
                      <td className="px-3 py-2 text-right text-gray-600">{fmtSec(r.min)}</td>
                      <td className="px-3 py-2 text-right text-gray-600">{fmtSec(r.max)}</td>
                      <td className="px-3 py-2 text-right text-gray-600">{fmtSec(r.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Recent */}
          {recent.length > 0 && (
            <>
              <div className="text-xs font-medium text-gray-500 mt-5 mb-2">最近记录</div>
              <div className="space-y-1">
                {recent.map((t, i) => {
                  const c = CARDS.find(x => x.id === t.cardId)
                  return (
                    <div key={i} className="flex items-center justify-between text-xs px-3 py-2 rounded-md bg-gray-50">
                      <span className="text-gray-900">#{c?.leetcodeNo} {c?.title}</span>
                      <span className="text-gray-500 tabular-nums">
                        {new Date(t.at).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                        <span className="ml-3 font-medium text-gray-900">{fmtSec(t.seconds)}</span>
                        {t.rating && <span className="ml-2 text-gray-400">· {t.rating}</span>}
                      </span>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>

        <div className="px-5 py-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => { if (confirm('清空所有用时记录？（不影响 SM-2 进度）')) onClear() }}
            className="px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-md cursor-pointer"
          >
            清空记录
          </button>
        </div>
      </div>
    </div>
  )
}
