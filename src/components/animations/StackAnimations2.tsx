import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C } from './_shared'

/* =============== 394 字符串解码 =============== */
// 3[a2[c]] = accaccacc
const dsSteps = [
  { scan: '3', kStack: [] as string[], strStack: [] as string[], cur: '', msg: "读到数字 3，再读 '['" },
  { scan: '3[', kStack: ['3'], strStack: [''], cur: '', msg: "遇 '['：把 k=3 和当前串 '' 压栈" },
  { scan: '3[a', kStack: ['3'], strStack: [''], cur: 'a', msg: '读到字母，拼接到当前串 → "a"' },
  { scan: '3[a2', kStack: ['3', '2'], strStack: [''], cur: 'a', msg: "读到 2 和 '['：k=2、串 \"a\" 压栈" },
  { scan: '3[a2[c', kStack: ['3', '2'], strStack: ['', 'a'], cur: 'c', msg: '读到 c，当前串 = "c"' },
  { scan: '3[a2[c]]', kStack: ['3'], strStack: [''], cur: 'acc', msg: "遇 ']'：弹 k=2、弹 \"a\" → a+cc = \"acc\"" },
  { scan: '3[a2[c]]', kStack: [], strStack: [], cur: 'accaccacc', msg: "再遇 ']'：弹 k=3 → \"\"+acc×3" },
]
const MiniStack: React.FC<{ x: number; title: string; items: string[]; color: string }> = ({ x, title, items, color }) => (
  <g>
    <text x={x + 45} y={44} textAnchor="middle" fontSize={11} fontWeight={700} fill={color}>{title}</text>
    <rect x={x} y={50} width={90} height={120} rx={8} fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="4 3" />
    {items.map((it, i) => (
      <g key={i}>
        <rect x={x + 6} y={50 + 120 - (i + 1) * 24 - 2} width={78} height={21} rx={4}
          fill={i === items.length - 1 ? C.current : C.processed} stroke="#94a3b8" />
        <text x={x + 45} y={50 + 120 - (i + 1) * 24 + 13} textAnchor="middle" fontSize={11}
          fontWeight={700} fill={i === items.length - 1 ? '#fff' : C.normalText}>{it}</text>
      </g>
    ))}
  </g>
)
export const DecodeStringAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = dsSteps[Math.min(stepIndex, dsSteps.length - 1)]
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <text x={300} y={26} textAnchor="middle" fontSize={14} fontWeight={700}
        fontFamily="ui-monospace, Menlo, monospace" fill={C.normalText}>{s.scan}</text>
      <MiniStack x={120} title="数字栈 k" items={s.kStack} color={C.lPtr} />
      <MiniStack x={240} title="字符串栈" items={s.strStack} color={C.rPtr} />
      <rect x={380} y={50} width={180} height={120} rx={8} fill="#f8fafc" stroke="#cbd5e1" />
      <text x={470} y={72} textAnchor="middle" fontSize={11} fontWeight={700} fill="#475569">当前串 cur</text>
      <text x={470} y={120} textAnchor="middle" fontSize={15} fontWeight={700}
        fontFamily="ui-monospace, Menlo, monospace" fill={C.current}>{s.cur || '∅'}</text>
      <text x={300} y={202} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}

/* =============== 32 最长有效括号 =============== */
// s = ")()())"
const LVP = [')', '(', ')', '(', ')', ')']
const lvpSteps = [
  { st: [-1], cur: -1, ans: 0, msg: '栈底放基准下标 -1' },
  { st: [0], cur: 0, ans: 0, msg: "i=0 是 ')'：弹出 -1 栈空，压入 0 作新基准" },
  { st: [0, 1], cur: 1, ans: 0, msg: "i=1 是 '('：下标 1 入栈" },
  { st: [0], cur: 2, ans: 2, msg: "i=2 是 ')'：弹 1，长度 = 2-栈顶0 = 2" },
  { st: [0, 3], cur: 3, ans: 2, msg: "i=3 是 '('：下标 3 入栈" },
  { st: [0], cur: 4, ans: 4, msg: "i=4 是 ')'：弹 3，长度 = 4-0 = 4" },
  { st: [5], cur: 5, ans: 4, msg: "i=5 是 ')'：弹 0 栈空，压 5 → 最长 4" },
]
export const LongestValidParenAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = lvpSteps[Math.min(stepIndex, lvpSteps.length - 1)]
  const cs = 52, x0 = 60
  const stSet = new Set(s.st.filter(i => i >= 0))
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      {LVP.map((ch, i) => {
        const x = x0 + i * (cs + 6)
        const inStack = stSet.has(i)
        const isCur = i === s.cur
        return (
          <g key={i}>
            <rect x={x} y={50} width={cs} height={cs} rx={8}
              fill={isCur ? C.current : inStack ? C.processed : C.normal}
              stroke="#94a3b8" />
            <text x={x + cs / 2} y={50 + cs / 2 + 6} textAnchor="middle" fontSize={20}
              fontWeight={700} fill={isCur ? '#fff' : C.normalText}>{ch}</text>
            <text x={x + cs / 2} y={50 + cs + 16} textAnchor="middle" fontSize={11} fill="#94a3b8">{i}</text>
          </g>
        )
      })}
      {/* stack */}
      <text x={60} y={150} fontSize={12} fontWeight={700} fill="#475569">stack</text>
      <text x={120} y={150} fontSize={13} fontFamily="ui-monospace, Menlo, monospace"
        fill={C.current}>[{s.st.join(', ')}]</text>
      <text x={420} y={150} fontSize={13} fontWeight={700} fill={C.good}>ans = {s.ans}</text>
      <text x={300} y={196} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}

/* =============== 155 最小栈（辅助栈） =============== */
const msSteps = [
  { data: [] as number[], min: [] as number[], act: '初始：data 栈 + min 辅助栈' },
  { data: [-2], min: [-2], act: 'push(-2) → min 栈同步压 -2' },
  { data: [-2, 0], min: [-2, -2], act: 'push(0) → 当前最小值仍为 -2' },
  { data: [-2, 0, -3], min: [-2, -2, -3], act: 'push(-3) → min(-3,-2) = -3' },
  { data: [-2, 0, -3], min: [-2, -2, -3], act: 'getMin() = min 栈顶 -3' },
  { data: [-2, 0], min: [-2, -2], act: 'pop() → 两个栈同步弹出' },
  { data: [-2, 0], min: [-2, -2], act: 'top() = 0，getMin() = -2' },
]
const VStack: React.FC<{ x: number; title: string; items: number[]; color: string }> = ({ x, title, items, color }) => (
  <g>
    <text x={x + 55} y={40} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>{title}</text>
    <rect x={x} y={48} width={110} height={132} rx={8} fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="4 3" />
    {items.map((v, i) => (
      <g key={i}>
        <rect x={x + 8} y={48 + 132 - (i + 1) * 28 - 2} width={94} height={25} rx={5}
          fill={i === items.length - 1 ? C.current : C.processed} stroke="#94a3b8" />
        <text x={x + 55} y={48 + 132 - (i + 1) * 28 + 15} textAnchor="middle" fontSize={13}
          fontWeight={700} fill={i === items.length - 1 ? '#fff' : C.normalText}>{v}</text>
      </g>
    ))}
  </g>
)
export const MinStackAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = msSteps[Math.min(stepIndex, msSteps.length - 1)]
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <VStack x={150} title="data 栈" items={s.data} color={C.lPtr} />
      <VStack x={340} title="min 栈（同步压栈）" items={s.min} color={C.rPtr} />
      <text x={300} y={205} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.act}</text>
    </svg>
  )
}
