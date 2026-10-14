import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C, ArrayRow } from './_shared'

/* =============== 105 前序 + 中序构造二叉树 =============== */
// preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
const PRE = [3, 9, 20, 15, 7]
const IN = [9, 3, 15, 20, 7]
const treeNodes = [
  { id: 3, x: 300, y: 30 },
  { id: 9, x: 180, y: 95 },
  { id: 20, x: 420, y: 95 },
  { id: 15, x: 340, y: 160 },
  { id: 7, x: 500, y: 160 },
]
const treeEdges: [number, number][] = [[3, 9], [3, 20], [20, 15], [20, 7]]
const btSteps = [
  { preHi: [0], inHi: [] as number[], built: [] as number[], msg: '前序第一个元素 3 = 整棵树的根' },
  { preHi: [0], inHi: [1], built: [3], msg: '在中序中定位 3：左边 [9] 是左子树，右边 [15,20,7] 是右子树' },
  { preHi: [1], inHi: [0, 1], built: [3, 9], msg: '左子树前序段 [9] → 根 9（叶子）' },
  { preHi: [2], inHi: [1, 3], built: [3, 9, 20], msg: '右子树前序段 [20,15,7] → 根 20' },
  { preHi: [3, 4], inHi: [1, 2, 3, 4], built: [3, 9, 20, 15, 7], msg: '中序中 20 左侧 15、右侧 7 → 整棵树构造完成' },
]
export const BuildTreeAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = btSteps[Math.min(stepIndex, btSteps.length - 1)]
  const built = new Set(s.built)
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      {/* arrays at top */}
      <text x={20} y={26} fontSize={11} fill="#94a3b8">preorder</text>
      <ArrayRow values={PRE} x={80} y={6} cellSize={34} gap={4}
        current={s.preHi} showIndex={false} />
      <text x={20} y={78} fontSize={11} fill="#94a3b8">inorder</text>
      <ArrayRow values={IN} x={80} y={58} cellSize={34} gap={4}
        current={s.inHi} showIndex={false} />
      {/* tree */}
      {treeEdges.map(([a, b], i) => {
        const na = treeNodes.find(n => n.id === a)!
        const nb = treeNodes.find(n => n.id === b)!
        return (
          <line key={i} x1={na.x} y1={na.y + 14} x2={nb.x} y2={nb.y - 14}
            stroke={built.has(a) && built.has(b) ? C.current : C.line}
            strokeWidth={built.has(a) && built.has(b) ? 2 : 1.2}
            strokeDasharray={built.has(a) && built.has(b) ? undefined : '4 3'} />
        )
      })}
      {treeNodes.map(n => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={15}
            fill={built.has(n.id) ? C.current : '#f1f5f9'}
            stroke="#94a3b8" strokeWidth={1.2} />
          <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={11} fontWeight={700}
            fill={built.has(n.id) ? '#fff' : '#94a3b8'}>{n.id}</text>
        </g>
      ))}
      <text x={300} y={200} textAnchor="middle" fontSize={12}
        fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{s.msg}</text>
    </svg>
  )
}
