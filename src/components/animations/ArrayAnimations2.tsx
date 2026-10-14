import React from 'react'
import type { AnimationProps } from '../../data/types'
import { C, ArrayRow, Pointer } from './_shared'

const X = 40
const Y = 90
const CS = 50
const GAP = 6
const cx = (i: number) => X + i * (CS + GAP) + CS / 2

const Log: React.FC<{ children: React.ReactNode; y?: number }> = ({ children, y = 196 }) => (
  <text x={300} y={y} textAnchor="middle" fontSize={12}
    fill={C.normalText} fontFamily="ui-monospace, Menlo, monospace">{children}</text>
)

/* ---------------- 238 除自身以外数组的乘积 ---------------- */
const PS_NUMS = [1, 2, 3, 4]
const psSteps = [
  { out: ['', '', '', ''], cur: 0, suffix: 1, msg: '从左到右：out[i] = 左侧所有数的乘积，out[0]=1' },
  { out: [1, '', '', ''], cur: 1, suffix: 1, msg: 'out[1] = 1×nums[0] = 1' },
  { out: [1, 1, '', ''], cur: 2, suffix: 1, msg: 'out[2] = 1×nums[1] = 2' },
  { out: [1, 1, 2, ''], cur: 3, suffix: 1, msg: 'out[3] = 2×nums[2] = 6' },
  { out: [1, 1, 2, 6], cur: 3, suffix: 4, msg: '从右到左：suffix=1，out[3] = 6×1 = 6，suffix=4' },
  { out: [1, 1, 8, 6], cur: 2, suffix: 12, msg: 'out[2] = 2×4 = 8，suffix = 4×3 = 12' },
  { out: [1, 12, 8, 6], cur: 1, suffix: 24, msg: 'out[1] = 1×12 = 12，suffix = 12×2 = 24' },
  { out: [24, 12, 8, 6], cur: 0, suffix: 24, msg: 'out[0] = 1×24 = 24 → 不用除法，两次遍历' },
]
export const ProductExceptSelfAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = psSteps[Math.min(stepIndex, psSteps.length - 1)]
  const filledIdx = s.out.map((v, i) => (v === '' ? -1 : i)).filter(i => i >= 0)
  return (
    <g>
      <text x={X} y={30} fontSize={12} fill="#94a3b8">nums</text>
      <ArrayRow values={PS_NUMS} x={X} y={40} cellSize={CS} gap={GAP}
        processed={[0, 1, 2, 3]} showIndex={false} />
      <text x={X} y={120} fontSize={12} fill="#94a3b8">answer</text>
      <ArrayRow values={s.out} x={X} y={130} cellSize={CS} gap={GAP}
        current={[s.cur]} processed={filledIdx.filter(i => i !== s.cur)} showIndex={false} />
      <Log>{s.msg}</Log>
    </g>
  )
}

/* ---------------- 41 缺失的第一个正数 ---------------- */
const fmSteps = [
  { vals: [3, 4, -1, 1], cur: [0], swap: [] as number[], msg: '目标：让 nums[i]=i+1，原地归位（i=0 应放 1）' },
  { vals: [-1, 4, 3, 1], cur: [0], swap: [0, 2], msg: 'nums[0]=3 → 交换到下标 2：[-1,4,3,1]' },
  { vals: [-1, 1, 3, 4], cur: [1], swap: [1, 3], msg: 'nums[1]=4 → 交换到下标 3：[-1,1,3,4]' },
  { vals: [1, -1, 3, 4], cur: [1], swap: [0, 1], msg: 'nums[1]=1 → 交换到下标 0：[1,-1,3,4]' },
  { vals: [1, -1, 3, 4], cur: [1], swap: [], msg: '归位完成；逐个检查：nums[1]≠2 → 缺失 2' },
]
export const FirstMissingAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = fmSteps[Math.min(stepIndex, fmSteps.length - 1)]
  const good = s.vals.map((v, i) => (v === i + 1 ? i : -1)).filter(i => i >= 0)
  return (
    <g>
      <ArrayRow values={s.vals} x={cx(0) - CS / 2} y={Y} cellSize={CS} gap={GAP}
        current={s.cur} highlight={s.swap} processed={good} />
      <Log>{s.msg}</Log>
    </g>
  )
}

/* ---------------- 75 颜色分类（三指针） ---------------- */
const scSteps = [
  { vals: [2, 0, 2, 1, 1, 0], lo: 0, mid: 0, hi: 5, msg: 'lo=0,mid=0,hi=5：nums[mid]=2 → 与 hi 交换，hi--' },
  { vals: [0, 0, 2, 1, 1, 2], lo: 0, mid: 0, hi: 4, msg: 'nums[mid]=0 → 与 lo 交换，lo++,mid++' },
  { vals: [0, 0, 2, 1, 1, 2], lo: 1, mid: 1, hi: 4, msg: 'nums[mid]=0 → 与 lo 交换，lo++,mid++' },
  { vals: [0, 0, 2, 1, 1, 2], lo: 2, mid: 2, hi: 4, msg: 'nums[mid]=2 → 与 nums[hi]=1 交换，hi--' },
  { vals: [0, 0, 1, 1, 2, 2], lo: 2, mid: 2, hi: 3, msg: 'nums[mid]=1 → 属于中间，mid++' },
  { vals: [0, 0, 1, 1, 2, 2], lo: 2, mid: 3, hi: 3, msg: 'nums[mid]=1 → mid++，mid>hi 结束' },
]
export const SortColorsAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = scSteps[Math.min(stepIndex, scSteps.length - 1)]
  // settled 0s live left of lo (green), settled 2s live right of hi (red)
  const fillOverride: Record<number, string> = {}
  s.vals.forEach((v, i) => {
    if (i < s.lo) fillOverride[i] = C.lPtr
    else if (i > s.hi) fillOverride[i] = C.rPtr
  })
  return (
    <g>
      <ArrayRow values={s.vals} x={28} y={Y} cellSize={CS} gap={GAP}
        current={[s.mid]} highlight={[s.lo, s.hi].filter(i => i !== s.mid)}
        fillOverride={fillOverride}
        showIndex={false} />
      <Pointer x={cx(s.lo) - 12} y={Y + CS + 12} color={C.lPtr} label="lo" />
      <Pointer x={cx(s.mid)} y={Y + CS + 12} color={C.current} label="mid" />
      <Pointer x={cx(s.hi) + 12} y={Y + CS + 12} color={C.rPtr} label="hi" />
      <Log>{s.msg}</Log>
    </g>
  )
}

/* ---------------- 31 下一个排列 ---------------- */
const npSteps = [
  { vals: [1, 2, 3, 5, 4], hi: [3, 4], cur: [] as number[], msg: '从右向左找第一个 nums[i] < nums[i+1]：5>4 继续下降' },
  { vals: [1, 2, 3, 5, 4], hi: [3, 4], cur: [2], msg: '找到 i=2：nums[2]=3 < nums[3]=5' },
  { vals: [1, 2, 3, 5, 4], hi: [3, 4], cur: [2, 4], msg: '从右找第一个 nums[j] > 3：j=4 (4)' },
  { vals: [1, 2, 4, 5, 3], hi: [3, 4], cur: [2, 4], msg: '交换 nums[2] 与 nums[4] → [1,2,4,5,3]' },
  { vals: [1, 2, 4, 3, 5], hi: [3, 4], cur: [3, 4], msg: '反转 i 之后的后缀 [5,3] → [1,2,4,3,5]' },
]
export const NextPermutationAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = npSteps[Math.min(stepIndex, npSteps.length - 1)]
  return (
    <g>
      <ArrayRow values={s.vals} x={cx(0) - CS / 2} y={Y} cellSize={CS} gap={GAP}
        current={s.cur} highlight={s.hi} />
      <Log>{s.msg}</Log>
    </g>
  )
}

/* ---------------- 287 寻找重复数（Floyd 环） ---------------- */
const fdNums = [1, 3, 4, 2, 2]
const fdSteps = [
  { slow: 0, fast: 0, finder: -1, msg: '把 i → nums[i] 看成链表指针，slow 走 1 步、fast 走 2 步' },
  { slow: 1, fast: 3, finder: -1, msg: 'slow=1, fast=3' },
  { slow: 3, fast: 4, finder: -1, msg: 'slow=3, fast=4' },
  { slow: 2, fast: 4, finder: -1, msg: 'slow=2, fast=4（沿 nums[4]=2 回到 2）→ 相遇' },
  { slow: 4, fast: 4, finder: 1, msg: '第二阶段：finder 从 0 出发，与 slow 同速' },
  { slow: 2, fast: 4, finder: 2, msg: 'finder=2 与 slow=2 相遇 → 重复数 2' },
]
export const FindDuplicateAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = fdSteps[Math.min(stepIndex, fdSteps.length - 1)]
  return (
    <g>
      <ArrayRow values={fdNums} x={28} y={Y} cellSize={CS} gap={GAP}
        current={[s.slow, s.fast].filter(i => i >= 0)} highlight={s.fast >= 0 ? [s.fast] : []}
        showIndex />
      <Pointer x={cx(s.slow) - 12} y={Y + CS + 26} color={C.lPtr} label="slow" />
      <Pointer x={cx(s.fast) + 12} y={Y + CS + 26} color={C.rPtr} label="fast" />
      {s.finder >= 0 && (
        <Pointer x={cx(s.finder)} y={Y + CS + 26} color={C.current} label="find" />
      )}
      <Log y={205}>{s.msg}</Log>
    </g>
  )
}

/* ---------------- 215 快速选择 QuickSelect ---------------- */
const qsSteps = [
  { vals: [3, 2, 1, 5, 6, 4], lo: 0, hi: 5, pivot: 5, part: [] as number[], msg: '目标：第 2 大 → 目标下标 n-k=4，pivot=4' },
  { vals: [3, 2, 1, 5, 6, 4], lo: 0, hi: 5, pivot: 5, part: [0, 1, 2], msg: '3,2,1 都 < 4，放到 pivot 左侧' },
  { vals: [3, 2, 1, 4, 6, 5], lo: 0, hi: 5, pivot: 3, part: [0, 1, 2], msg: 'pivot 归位到下标 3；3 < 4 → 递归右半 [6,5]' },
  { vals: [3, 2, 1, 4, 6, 5], lo: 4, hi: 5, pivot: 5, part: [4], msg: '右半 pivot=5，6>5 不换' },
  { vals: [3, 2, 1, 4, 5, 6], lo: 4, hi: 5, pivot: 4, part: [4], msg: 'pivot 归位到下标 4 == 目标下标 → 返回 5' },
]
export const QuickSelectAnimation: React.FC<AnimationProps> = ({ stepIndex }) => {
  const s = qsSteps[Math.min(stepIndex, qsSteps.length - 1)]
  const done = s.vals.map((_, i) => (i < s.lo || i > s.hi ? i : -1)).filter(i => i >= 0)
  return (
    <g>
      <ArrayRow values={s.vals} x={28} y={Y} cellSize={CS} gap={GAP}
        current={[s.pivot]} highlight={s.part} processed={done} />
      <Log>{s.msg}</Log>
    </g>
  )
}
