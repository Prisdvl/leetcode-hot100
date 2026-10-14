import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CARDS } from './data/cards'
import { ANIMATION_REGISTRY } from './components/animations'
import { CardFront } from './components/CardFront'
import { CardBack } from './components/CardBack'
import { TopBar, type AppMode } from './components/TopBar'
import { RatingButtons } from './components/RatingButtons'
import MicroSlats from './components/MicroSlats/MicroSlats'
import PulseHeart from './components/PulseHeart/PulseHeart'
import LatticeLoader from './components/LatticeLoader/LatticeLoader'
import { StatsPanel } from './components/StatsPanel'
import { useReviewQueue } from './hooks/useReviewQueue'
import {
  exportAll, importAll,
  loadFavorites, saveFavorites,
  loadTimings, appendTiming, saveTimings,
} from './utils/storage'
import type { Rating } from './utils/sm2'

const App: React.FC = () => {
  const cardIds = useMemo(() => CARDS.map((c) => c.id), [])
  const { dueCards, currentId, index, rate, resetAll, totalCards } = useReviewQueue({ cardIds })
  const [revealed, setRevealed] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // mode
  const [mode, setMode] = useState<AppMode>('review')
  // favorites
  const [favorites, setFavorites] = useState<Set<string>>(() => loadFavorites())
  // timings
  const [timings, setTimings] = useState(() => loadTimings())
  // session timer for practice mode
  const [sessionStart, setSessionStart] = useState<number | null>(null)
  const [cardStart, setCardStart] = useState<number>(() => performance.now())
  const [showStats, setShowStats] = useState(false)
  // pause state for practice timer
  const [paused, setPaused] = useState(false)
  const [, setTick] = useState(0)
  const pausedTotalRef = useRef(0) // accumulated paused ms
  const pausedAtRef = useRef<number | null>(null) // when pause began

  const currentCard = CARDS.find((c) => c.id === currentId)
  const done = dueCards.length === 0 || index >= dueCards.length

  // reset card timer when current card changes
  useEffect(() => {
    setCardStart(performance.now())
    setRevealed(false)
    setPaused(false)
    pausedTotalRef.current = 0
    pausedAtRef.current = null
  }, [currentId, index])

  // start session timer when entering practice mode
  useEffect(() => {
    if (mode === 'practice') {
      setSessionStart(performance.now())
      setCardStart(performance.now())
      setPaused(false)
      pausedTotalRef.current = 0
      pausedAtRef.current = null
    } else {
      setSessionStart(null)
    }
  }, [mode])

  // tick to refresh elapsed display
  useEffect(() => {
    if (mode !== 'practice' || revealed) return
    const id = setInterval(() => setTick(t => t + 1), 100)
    return () => clearInterval(id)
  }, [mode, revealed])

  const elapsedMs = () => {
    const now = performance.now()
    if (pausedAtRef.current != null) {
      return pausedAtRef.current - cardStart - pausedTotalRef.current
    }
    return now - cardStart - pausedTotalRef.current
  }

  const togglePause = () => {
    const now = performance.now()
    if (pausedAtRef.current != null) {
      // resume
      pausedTotalRef.current += now - pausedAtRef.current
      pausedAtRef.current = null
      setPaused(false)
    } else {
      pausedAtRef.current = now
      setPaused(true)
    }
  }

  const handleToggleFav = (next: boolean) => {
    if (!currentCard) return
    const nextSet = new Set(favorites)
    if (next) nextSet.add(currentCard.id)
    else nextSet.delete(currentCard.id)
    setFavorites(nextSet)
    saveFavorites(nextSet)
  }

  const handleRate = (r: Rating) => {
    // record timing in practice mode
    if (mode === 'practice' && currentCard) {
      const sec = elapsedMs() / 1000
      const list = appendTiming({
        cardId: currentCard.id,
        seconds: Math.round(sec * 10) / 10,
        at: Date.now(),
        rating: r,
      })
      setTimings(list)
    }
    rate(r)
    setRevealed(false)
  }

  const handleExport = () => {
    const data = exportAll()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leetcode100-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const { count } = importAll(String(reader.result))
        setFavorites(loadFavorites())
        setTimings(loadTimings())
        alert(`导入成功，恢复 ${count} 张卡片进度`)
        window.location.reload()
      } catch (err) { alert('导入失败：' + (err as Error).message) }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const progressPct = done
    ? 100
    : Math.min(100, ((totalCards - dueCards.length + 1) / totalCards) * 100)

  const isFav = currentCard ? favorites.has(currentCard.id) : false

  return (
    <div className="min-h-screen relative flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* MicroSlats background */}
      <div className="fixed inset-0 -z-10 opacity-[0.18] pointer-events-none">
        <MicroSlats
          preset="tide"
          color="#94a3b8"
          glintColor="#c4b5fd"
          backgroundColor="transparent"
          slatWidth={5}
          slatHeight={14}
          gap={5}
          roundness={0.6}
          interactive={true}
          cursorStrength={1.0}
          cursorSize={50}
          trail={1.5}
          intro={true}
          introDuration={1.2}
          speed={0.25}
          scale={1.4}
          chop={0.2}
          glint={0.3}
          contrast={1.05}
          perspective={0.4}
          fog={0.5}
        />
      </div>

      <TopBar
        dueCount={dueCards.length}
        total={totalCards}
        done={done}
        progressPct={progressPct}
        mode={mode}
        onModeChange={(m) => setMode(m)}
        favCount={favorites.size}
        onShowStats={() => setShowStats(true)}
        onExport={handleExport}
        onImport={() => fileInputRef.current?.click()}
        onReset={() => { if (confirm('清空所有进度？')) resetAll() }}
        fileInputRef={fileInputRef}
        onImportChange={handleImport}
      />

      <main className="flex-1 w-full flex flex-col items-center justify-center px-5 pt-6 pb-28">
        <div className="w-full max-w-2xl flex flex-col items-center justify-center">
        {done || !currentCard ? (
          <div className="text-center py-20">
            <div className="text-sm text-gray-900 font-medium mb-1">今日复习已完成</div>
            <div className="text-xs text-gray-500 mb-6">所有到期卡片都已复习完毕</div>
            <button
              onClick={() => { if (confirm('重新开始一轮？')) resetAll() }}
              className="px-3.5 py-1.5 text-xs bg-gray-900 text-white rounded-md hover:bg-gray-800 fast-transition cursor-pointer">
              重新开始
            </button>
          </div>
        ) : (
          <>
            {/* breadcrumb */}
            <motion.div
              layout
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full flex items-center mb-3 px-1"
            >
              <div className="cursor-target flex items-baseline gap-2 text-xs text-gray-500 min-w-0" data-cursor-label="题目">
                <span className="font-semibold text-gray-900">#{currentCard.leetcodeNo}</span>
                <span className="text-gray-900">{currentCard.title}</span>
                <span className="text-gray-300">·</span>
                <span className="truncate">{currentCard.tags.join(' · ')}</span>
              </div>
            </motion.div>

            {/* card area */}
            <motion.div
              layout
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full relative"
            >
              {/* favorite button */}
              <div className="absolute -top-3 right-3 z-10">
                <PulseHeart
                  liked={isFav}
                  onChange={(next) => handleToggleFav(next)}
                  showCount={false}
                  icon="heart"
                  size={22}
                  corner={32}
                  pillColor="#ffffff"
                  likedColor="#ff4d6d"
                  idleColor="#9ca3af"
                  idleOutline
                  label="收藏题目"
                />
              </div>

              <div className="rounded-2xl bg-white border border-gray-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_24px_-8px_rgba(0,0,0,0.08)] cursor-pointer cursor-target" data-cursor-label="翻牌">
                <div onClick={(e) => {
                  const t = e.target as HTMLElement
                  if (t.closest('button')) return
                  if (!revealed) setRevealed(true)
                }}>
                  <AnimatePresence mode="wait" initial={false}>
                    {!revealed ? (
                      <motion.div
                        key="front"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <CardFront card={currentCard} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="slim-scroll overflow-y-auto"
                        style={{ maxHeight: 'calc(100vh - 240px)', minHeight: '300px' }}
                      >
                        <CardBack
                          card={currentCard}
                          animation={ANIMATION_REGISTRY[currentCard.animation]}
                          resetKey={currentCard.id}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* practice timer row: between card and action bar */}
            {mode === 'practice' && !revealed && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="w-full mt-3 flex items-center justify-center gap-3"
              >
                <LatticeLoader
                  status="working"
                  label={paused ? '已暂停' : '思考中'}
                  pattern="orbit"
                  grid={3}
                  cellSize={7}
                  gap={2}
                  fontSize={13}
                  step={90}
                  idleOpacity={0.2}
                  color={paused ? '#9ca3af' : '#6b7280'}
                  showTimer
                  elapsed={elapsedMs() / 1000}
                  frozen={paused}
                />
                <button
                  onClick={togglePause}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full fast-transition cursor-pointer ${
                    paused
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={paused ? '继续计时' : '暂停计时'}
                >
                  {paused ? (
                    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 1 L9 5 L2 9 Z" fill="currentColor" /></svg>
                  ) : (
                    <svg width="10" height="10" viewBox="0 0 10 10"><rect x="1.5" y="1" width="2.5" height="8" rx="0.5" fill="currentColor" /><rect x="6" y="1" width="2.5" height="8" rx="0.5" fill="currentColor" /></svg>
                  )}
                  {paused ? '继续' : '暂停'}
                </button>
              </motion.div>
            )}

            {/* action bar */}
            <motion.div
              layout
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full mt-4"
            >
              <AnimatePresence mode="wait" initial={false}>
                {!revealed ? (
                  <motion.button
                    key="show"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setRevealed(true)}
                    className="w-full py-3 text-[13px] font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 active:scale-[0.99] transition-all cursor-pointer cursor-target shadow-sm"
                    data-cursor-label="答案">
                    显示答案
                  </motion.button>
                ) : (
                  <motion.div
                    key="rate"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mode === 'practice' && (
                      <div className="mb-2 flex justify-center">
                        <LatticeLoader
                          status="done"
                          label="用时"
                          doneLabel="已记录"
                          pattern="orbit"
                          grid={3}
                          cellSize={6}
                          gap={2}
                          fontSize={12}
                          idleOpacity={0.2}
                          color="#6b7280"
                          showTimer={false}
                        />
                      </div>
                    )}
                    <RatingButtons onRate={handleRate} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {index + 1 < dueCards.length && (
              <motion.div
                layout
                transition={{ duration: 0.25 }}
                className="mt-3 text-xs text-gray-400 px-1 self-start cursor-target"
                data-cursor-label="下一张"
              >
                下一张：#{CARDS.find((c) => c.id === dueCards[index + 1])?.leetcodeNo}{' '}
                {CARDS.find((c) => c.id === dueCards[index + 1])?.title}
              </motion.div>
            )}
          </>
        )}
        </div>
      </main>

      {showStats && (
        <StatsPanel
          timings={timings}
          favorites={favorites}
          onClose={() => setShowStats(false)}
          onClear={() => { setTimings([]); saveTimings([]) }}
        />
      )}

      {/* keep sessionStart referenced for future use */}
      <span className="hidden">{sessionStart}</span>
    </div>
  )
}

export default App
