import React from 'react'
import type { CardData } from '../data/types'

const DIFFICULTY_STYLE: Record<CardData['difficulty'], { badge: string; dot: string; label: string }> = {
  easy: { badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500', label: '简单' },
  medium: { badge: 'bg-amber-50 text-amber-700 ring-amber-200', dot: 'bg-amber-500', label: '中等' },
  hard: { badge: 'bg-rose-50 text-rose-700 ring-rose-200', dot: 'bg-rose-500', label: '困难' },
}

export const CardFront: React.FC<{ card: CardData }> = ({ card }) => {
  const d = DIFFICULTY_STYLE[card.difficulty]
  return (
    <div className="px-7 py-7 select-none">
      <div className="mb-2 text-[11px] font-mono tracking-wider text-gray-400 uppercase">
        LeetCode · #{card.leetcodeNo}
      </div>
      <h2 className="text-[26px] font-semibold text-gray-900 tracking-tight mb-4 leading-tight">
        {card.title}
      </h2>
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ring-1 ring-inset ${d.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${d.dot}`} />
          {d.label}
        </span>
        {card.tags.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[11px] font-medium">
            {t}
          </span>
        ))}
      </div>
      <div className="w-full h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent mb-5" />
      <p className="text-[14.5px] text-gray-700 leading-[1.7]">
        {card.brief}
      </p>
      <div className="mt-6 flex items-center gap-1.5 text-[11px] text-gray-400">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0Z" />
          <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
        </svg>
        点击卡片或按空格键查看题解
      </div>
    </div>
  )
}
