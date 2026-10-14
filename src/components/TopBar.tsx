import React from 'react'
import GooeyNav from './GooeyNav/GooeyNav'

export type AppMode = 'review' | 'practice'

interface Props {
  dueCount: number
  total: number
  done: boolean
  progressPct: number
  mode: AppMode
  onModeChange: (m: AppMode) => void
  favCount: number
  onShowStats: () => void
  onExport: () => void
  onImport: () => void
  onReset: () => void
  fileInputRef: React.RefObject<HTMLInputElement>
  onImportChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TopBar: React.FC<Props> = ({
  dueCount, total, done, progressPct,
  mode, onModeChange, favCount, onShowStats,
  onExport, onImport, onReset, fileInputRef, onImportChange,
}) => {
  const activeIndex = mode === 'practice' ? 1 : 0
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 pl-3.5 pr-1.5 h-11 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.04)] whitespace-nowrap">
        {/* Title / progress */}
        <div className="flex items-center gap-2 pr-1">
          <span className="text-[12.5px] font-semibold text-gray-900 tracking-tight">Hot 100</span>
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-12 h-1 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-gray-900 transition-all duration-300" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="text-[10.5px] tabular-nums text-gray-500 font-medium">
              {done ? '完成' : `${dueCount}`}
            </span>
          </div>
        </div>

        <span className="w-px h-4 bg-gray-200" />

        {/* Mode switch */}
        <GooeyNav
          items={[{ label: '复习' }, { label: '练习' }]}
          activeIndex={activeIndex}
          onChange={(i) => onModeChange(i === 1 ? 'practice' : 'review')}
          theme="light"
          size="sm"
          frame={true}
          animationTime={500}
          particleCount={10}
          spread={32}
          gooeyness={0.6}
          wobble={0.4}
          className="flex-nowrap [&_ul]:flex-nowrap"
        />

        <span className="w-px h-4 bg-gray-200" />

        {/* Actions */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={onShowStats}
            className="px-2.5 h-8 text-xs text-gray-600 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
            title="学习统计"
          >
            统计{favCount > 0 ? <span className="text-rose-500 ml-0.5">♥{favCount}</span> : null}
          </button>
          <button onClick={onExport}
            className="px-2.5 h-8 text-xs text-gray-600 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
            title="导出 JSON">导出</button>
          <button onClick={onImport}
            className="px-2.5 h-8 text-xs text-gray-600 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
            title="导入 JSON">导入</button>
          <button onClick={onReset}
            className="px-2.5 h-8 text-xs text-gray-400 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
            title="清空进度">重置</button>
        </div>

        <input ref={fileInputRef} type="file" accept="application/json" onChange={onImportChange} className="hidden" />
      </div>
    </div>
  )
}
