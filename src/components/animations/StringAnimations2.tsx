import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C, ArrayRow, Pointer } from './_shared'

/* =============== 5 最长回文子串（中心扩展） =============== */
const LP = ['b', 'a', 'b', 'a', 'd']
const lpSteps = [
  { l: 0, r: 0, best: [0, 0], msg: '以每个位置为中心，L、R 向两边扩展比较' },
  { l: 0, r: 2, best: [0, 2], msg: '中心 i=1 (a)：b==b → "bab"，长度 3' },
  { l: 1, r: 3, best: [0, 2], msg: '中心 i=2 (b)：a==a → "aba"，长度 3，未刷新' },
  { l: 3, r: 3, best: [0, 2], msg: '中心 i=3 (a)：b≠d，扩展失败' },
  { l: 0, r: 2, best: [0, 2], msg: '答案 "bab"（"aba" 也可，长度相同）' },
]
export const LongestPalindromeAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = lpSteps[Math.min(stepIndex, lpSteps.length - 1)]
  const cur = []
  for (let i = s.l; i <= s.r; i++) cur.push(i)
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <ArrayRow values={LP} x={150} y={70} cellSize={56} gap={8}
        current={cur} highlight={s.best} />
      <Pointer x={150 + s.l * 64 + 28} y={146} color={C.lPtr} label="L" />
      <Pointer x={150 + s.r * 64 + 28} y={146} color={C.rPtr} label="R" />
      <text x={300} y={196} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}

/* =============== 通用：双字符串匹配（392 判断子序列） =============== */
export interface TwoStringCfg {
  pattern: string
  text: string
  steps: { i: number; j: number; log: string }[]
}
export const TwoStringScanAnimation: React.FC<{ stepIndex: number; cfg: TwoStringCfg }> = ({ stepIndex, cfg }) => {
  const s = cfg.steps[Math.min(stepIndex, cfg.steps.length - 1)]
  const cs = 48, gap = 6
  const rowX = (n: number) => (600 - n * (cs + gap)) / 2
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <text x={40} y={60} fontSize={12} fontWeight={700} fill={C.lPtr}>s</text>
      <ArrayRow values={cfg.pattern.split('')} x={rowX(cfg.pattern.length)} y={40}
        cellSize={cs} gap={gap}
        current={[Math.min(s.i, cfg.pattern.length - 1)]}
        processed={Array.from({ length: s.i }, (_, k) => k)} showIndex={false} />
      <text x={40} y={130} fontSize={12} fontWeight={700} fill={C.rPtr}>t</text>
      <ArrayRow values={cfg.text.split('')} x={rowX(cfg.text.length)} y={110}
        cellSize={cs} gap={gap}
        current={[Math.min(s.j, cfg.text.length - 1)]}
        processed={Array.from({ length: s.j }, (_, k) => k)} showIndex={false} />
      <text x={300} y={196} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.log}</text>
    </svg>
  )
}
