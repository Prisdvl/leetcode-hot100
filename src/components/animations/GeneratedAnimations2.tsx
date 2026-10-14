import React from 'react'
import type { AnimationProps } from '../../data/types'
import { LinearScanAnimation, type LinearScanConfig } from './LinearScan'
import { BinarySearchAnimation, type BinarySearchCfg } from './BinarySearch'
import { LinkedListAnimation, type LinkedListCfg } from './LinkedList'
import { TreeTraverseAnimation, type TreeCfg } from './TreeTraverse'
import { StackAnimation, type StackCfg } from './Stack'
import { DPAnimation, type DPCfg } from './DPFill'
import { MatrixGridAnimation, type MatrixCfg } from './MatrixGrid'
import { DP2DAnimation, type DP2DCfg } from './DP2D'
import { TwoStringScanAnimation, type TwoStringCfg } from './StringAnimations2'

const wrap = (Comp: React.FC<{ stepIndex: number; cfg: any }>, cfg: any) =>
  ({ stepIndex }: AnimationProps) => <Comp stepIndex={stepIndex} cfg={cfg} />

/* ==================== 二叉树（TreeTraverse） ==================== */

// 94 中序遍历：[1,null,2,3]
const inorderCfg: TreeCfg = {
  nodes: [
    { id: 1, x: 180, y: 60, label: '1' },
    { id: 2, x: 400, y: 120, label: '2' },
    { id: 3, x: 300, y: 190, label: '3' },
  ],
  edges: [[1, 2], [2, 3]],
  steps: [
    { visited: [], current: 1, log: '左-根-右：先到根 1' },
    { visited: [1], current: 1, log: '左子树为空 → 访问 1' },
    { visited: [1], current: 3, log: '右子树中先一路向左到 3' },
    { visited: [1, 3], current: 3, log: '访问 3' },
    { visited: [1, 3, 2], current: 2, log: '回到子树根 2 → 中序 1,3,2' },
  ],
}

// 101 对称二叉树
const symmetricCfg: TreeCfg = {
  nodes: [
    { id: 1, x: 300, y: 40, label: '1' },
    { id: 2, x: 200, y: 105, label: '2' },
    { id: 3, x: 400, y: 105, label: '2' },
    { id: 4, x: 120, y: 175, label: '3' },
    { id: 5, x: 240, y: 175, label: '4' },
    { id: 6, x: 360, y: 175, label: '4' },
    { id: 7, x: 480, y: 175, label: '3' },
  ],
  edges: [[1, 2], [1, 3], [2, 4], [2, 5], [3, 6], [3, 7]],
  steps: [
    { visited: [1], current: 1, log: '根 1 对称；再比较「左.左 vs 右.右」' },
    { visited: [1, 2, 3], current: 2, log: '左子树的 2 与右子树的 2 值相等' },
    { visited: [1, 2, 3, 4, 7], current: 4, log: '外侧：3 与 3 相等' },
    { visited: [1, 2, 3, 4, 5, 6, 7], current: 5, log: '内侧：4 与 4 相等，子节点也对称 → true' },
  ],
}

// 108 有序数组转 BST：[-10,-3,0,5,9]
const sortedToBstCfg: TreeCfg = {
  nodes: [
    { id: 0, x: 300, y: 50, label: '0' },
    { id: -3, x: 170, y: 120, label: '-3' },
    { id: -10, x: 80, y: 190, label: '-10' },
    { id: 9, x: 430, y: 120, label: '9' },
    { id: 5, x: 360, y: 190, label: '5' },
  ],
  edges: [[0, -3], [0, 9], [-3, -10], [9, 5]],
  steps: [
    { visited: [], current: 0, log: '取中点 0 作为根' },
    { visited: [0], current: -3, log: '左半 [-10,-3] 中点 -3 作左根' },
    { visited: [0, -3], current: -10, log: '-10 作 -3 的左孩子' },
    { visited: [0, -3, -10], current: 9, log: '右半 [5,9] 中点 9 作右根' },
    { visited: [0, -3, -10, 9], current: 5, log: '5 作 9 的左孩子 → 平衡 BST' },
  ],
}

// 199 右视图：[1,2,3,null,5,null,4]
const rightViewCfg: TreeCfg = {
  nodes: [
    { id: 1, x: 300, y: 40, label: '1' },
    { id: 2, x: 190, y: 110, label: '2' },
    { id: 3, x: 410, y: 110, label: '3' },
    { id: 5, x: 250, y: 185, label: '5' },
    { id: 4, x: 470, y: 185, label: '4' },
  ],
  edges: [[1, 2], [1, 3], [2, 5], [3, 4]],
  steps: [
    { visited: [1], current: 1, log: '层 0 最右节点 = 1，答案 [1]' },
    { visited: [1, 2, 3], current: 3, log: '层 1 最右节点 = 3' },
    { visited: [1, 2, 3, 5, 4], current: 4, log: '层 2 最右节点 = 4 → 右视图 [1,3,4]' },
  ],
}

// 114 二叉树展开为链表：[1,2,5,3,4,null,6]
const flattenCfg: TreeCfg = {
  nodes: [
    { id: 1, x: 300, y: 40, label: '1' },
    { id: 2, x: 200, y: 110, label: '2' },
    { id: 5, x: 400, y: 110, label: '5' },
    { id: 3, x: 130, y: 185, label: '3' },
    { id: 4, x: 270, y: 185, label: '4' },
    { id: 6, x: 470, y: 185, label: '6' },
  ],
  edges: [[1, 2], [1, 5], [2, 3], [2, 4], [5, 6]],
  steps: [
    { visited: [1], current: 1, log: '先序 1,2,3,4,5,6；处理 1：右子树 5 暂存' },
    { visited: [1, 2], current: 2, log: '左子树 2 接到 1 右侧；处理 2：右子树 4 暂存' },
    { visited: [1, 2, 3], current: 3, log: '左子树 3 接到 2 右侧' },
    { visited: [1, 2, 3, 4], current: 4, log: '把暂存的 4 接到 3 之后' },
    { visited: [1, 2, 3, 4, 5], current: 5, log: '再接上暂存的 5' },
    { visited: [1, 2, 3, 4, 5, 6], current: 6, log: '6 为 5 的右孩子；全树只剩右链' },
  ],
}

// 437 路径总和 III（简化树，target=8）
const pathSum3Cfg: TreeCfg = {
  nodes: [
    { id: 10, x: 300, y: 40, label: '10' },
    { id: 5, x: 180, y: 110, label: '5' },
    { id: -3, x: 420, y: 110, label: '-3' },
    { id: 3, x: 100, y: 180, label: '3' },
    { id: 2, x: 250, y: 180, label: '2' },
    { id: 11, x: 490, y: 180, label: '11' },
  ],
  edges: [[10, 5], [10, -3], [5, 3], [5, 2], [-3, 11]],
  steps: [
    { visited: [10], current: 10, log: '沿路径维护前缀和，target = 8' },
    { visited: [10, 5], current: 5, log: '走 10 → 5' },
    { visited: [10, 5, 3], current: 3, log: '5 → 3：路径和 8 命中 ✓' },
    { visited: [10, 5, 3, 2], current: 2, log: '5 → 2：无匹配，回溯' },
    { visited: [10, 5, 3, 2, -3], current: -3, log: '回到根再走 -3' },
    { visited: [10, 5, 3, 2, -3, 11], current: 11, log: '-3 → 11：8 命中 ✓，共 2 条' },
  ],
}

// 124 最大路径和：[-10,9,20,null,null,15,7]
const maxPathSumCfg: TreeCfg = {
  nodes: [
    { id: -10, x: 300, y: 40, label: '-10' },
    { id: 9, x: 170, y: 110, label: '9' },
    { id: 20, x: 430, y: 110, label: '20' },
    { id: 15, x: 360, y: 180, label: '15' },
    { id: 7, x: 500, y: 180, label: '7' },
  ],
  edges: [[-10, 9], [-10, 20], [20, 15], [20, 7]],
  steps: [
    { visited: [9], current: 9, log: '叶子 9 向上贡献 9' },
    { visited: [9, 15], current: 15, log: '叶子 15 向上贡献 15' },
    { visited: [9, 15, 7], current: 7, log: '叶子 7 向上贡献 7' },
    { visited: [9, 15, 7, 20], current: 20, log: '经 20 的路径 15+20+7=42（新最大）；上抛 20+15=35' },
    { visited: [9, 15, 7, 20, -10], current: -10, log: '经根 9+(-10)+35=34 < 42 → 答案 42' },
  ],
}

// 208 Trie：插入 apple
const trieCfg: TreeCfg = {
  nodes: [
    { id: 0, x: 520, y: 160, label: 'root' },
    { id: 1, x: 430, y: 160, label: 'a' },
    { id: 2, x: 330, y: 90, label: 'p' },
    { id: 3, x: 240, y: 50, label: 'p' },
    { id: 4, x: 150, y: 85, label: 'l' },
    { id: 5, x: 70, y: 160, label: 'e' },
  ],
  edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
  steps: [
    { visited: [], current: 0, log: '从 root 开始插入 "apple"' },
    { visited: [0], current: 1, log: '新建节点 a' },
    { visited: [0, 1], current: 2, log: '新建节点 p' },
    { visited: [0, 1, 2], current: 3, log: '新建节点 p' },
    { visited: [0, 1, 2, 3], current: 4, log: '新建节点 l' },
    { visited: [0, 1, 2, 3, 4, 5], current: 5, log: '新建 e 并标记单词结尾；search("apple")=true，search("app")=false' },
  ],
}

// 131 分割回文串：aab
const palindromePartitionCfg: TreeCfg = {
  nodes: [
    { id: 0, x: 300, y: 30, label: '·' },
    { id: 1, x: 150, y: 100, label: 'a' },
    { id: 2, x: 450, y: 100, label: 'aa' },
    { id: 3, x: 100, y: 175, label: 'a' },
    { id: 4, x: 200, y: 175, label: 'b' },
    { id: 5, x: 450, y: 175, label: 'b' },
  ],
  edges: [[0, 1], [1, 3], [3, 4], [0, 2], [2, 5]],
  steps: [
    { visited: [], current: 0, log: '从位置 0 开始，只切回文前缀' },
    { visited: [0], current: 1, log: '切出 "a" 是回文' },
    { visited: [0, 1], current: 3, log: '剩余 "ab" 再切 "a" 是回文' },
    { visited: [0, 1, 3], current: 4, log: '再切 "b" → 得到 [a,a,b]' },
    { visited: [0, 1, 3, 4], current: 2, log: '回溯：整段 "aa" 是回文' },
    { visited: [0, 1, 3, 4, 2, 5], current: 5, log: '再接 "b" → [aa,b]，共 2 种' },
  ],
}

/* ==================== 链表（LinkedList） ==================== */

// 24 两两交换
const swapPairsCfg: LinkedListCfg = {
  nodes: ['1', '2', '3', '4'],
  ptrLabel: 'p',
  steps: [
    { ptr: 0, ptr2: 1, log: '第一对 1、2：交换指针' },
    { ptr: 1, ptr2: 0, done: [0, 1], log: '2 → 1；处理第二对 3、4' },
    { ptr: 3, ptr2: 2, done: [0, 1], log: '4 与 3 交换' },
    { ptr: null, done: [0, 1, 2, 3], log: '相邻对首尾相接 → 2 → 1 → 4 → 3' },
  ],
}

// 25 K 个一组翻转
const reverseKGroupCfg: LinkedListCfg = {
  nodes: ['1', '2', '3', '4', '5'],
  steps: [
    { ptr: 0, ptr2: 1, log: 'k=2，第一组 [1,2] 反转' },
    { ptr: 1, ptr2: 0, done: [0, 1], log: '2 → 1；处理第二组 [3,4]' },
    { ptr: 3, ptr2: 2, done: [0, 1], log: '4 → 3' },
    { ptr: null, done: [0, 1, 2, 3], log: '尾节点 5 不足 2 个，保持原位' },
    { ptr: null, done: [0, 1, 2, 3, 4], log: '2 → 1 → 4 → 3 → 5' },
  ],
}

// 234 回文链表
const palindromeLlCfg: LinkedListCfg = {
  nodes: ['1', '2', '2', '1'],
  steps: [
    { ptr: 1, ptr2: 2, log: 'slow、fast 找中点：慢指针落在第一个 2' },
    { ptr: 2, ptr2: 3, log: '反转后半：2 → 1 反转为 1 → 2' },
    { ptr: 1, ptr2: 2, done: [0, 3], log: '前半 1 与后半 1 逐对比较：相等' },
    { ptr: null, done: [0, 1, 2, 3], log: '全部相等 → 是回文链表' },
  ],
}

// 148 排序链表
const sortListCfg: LinkedListCfg = {
  nodes: ['4', '2', '1', '3'],
  steps: [
    { ptr: 0, ptr2: 2, log: '归并排序：中点拆成 [4,2] 和 [1,3]' },
    { ptr: 1, ptr2: 0, log: '左半 [4,2] → [2,4]' },
    { ptr: 3, ptr2: 2, done: [0, 1], log: '右半 [1,3] → [1,3]' },
    { ptr: null, done: [0, 1, 2, 3], log: '双指针合并两个有序段 → 1 → 2 → 3 → 4' },
  ],
}

/* ==================== 二分查找（BinarySearch） ==================== */

// 35 搜索插入位置
const searchInsertCfg: BinarySearchCfg = {
  values: [1, 3, 5, 6],
  target: 2,
  steps: [
    { lo: 0, hi: 3, mid: 1, log: 'mid=3 > 2，hi = mid-1 = 0' },
    { lo: 0, hi: 0, mid: 0, log: 'mid=1 < 2，lo = mid+1 = 1' },
    { lo: 1, hi: 0, mid: 0, log: 'lo > hi：插入位置就是 lo = 1' },
  ],
}

// 34 首尾位置
const firstLastCfg: BinarySearchCfg = {
  values: [5, 7, 7, 8, 8, 10],
  target: 8,
  steps: [
    { lo: 0, hi: 5, mid: 2, log: '先找左边界：mid=7 < 8，lo=3' },
    { lo: 3, hi: 5, mid: 4, log: 'mid=8 命中，仍向左找，hi=3' },
    { lo: 3, hi: 3, mid: 3, log: 'mid=8 命中，hi=2 → 左边界 3' },
    { lo: 3, hi: 5, mid: 4, log: '再找右边界：mid=8 命中，lo=5' },
    { lo: 5, hi: 5, mid: 5, log: 'mid=10 > 8，hi=4 → 右边界 4' },
    { lo: 5, hi: 4, mid: 4, log: '答案 [3, 4]' },
  ],
}

/* ==================== 线性扫描（LinearScan） ==================== */

const containsDuplicateCfg: LinearScanConfig = {
  values: [1, 2, 3, 1],
  steps: [
    { ptr: 0, log: '1 不在集合，加入 {1}' },
    { ptr: 1, log: '2 不在集合，加入 {1,2}' },
    { ptr: 2, log: '3 不在集合，加入 {1,2,3}' },
    { ptr: 3, log: '1 已在集合 → 存在重复元素，返回 true' },
  ],
}

const missingNumberCfg: LinearScanConfig = {
  values: [3, 0, 1],
  steps: [
    { ptr: 0, log: '从 n=3 开始，逐个数减去 nums[i]' },
    { ptr: 1, log: '3 - 3 = 0；再减 0 仍为 0' },
    { ptr: 2, log: '再减 1，剩下 2 → 缺失的就是 2' },
  ],
}

const singleXorCfg: LinearScanConfig = {
  values: [4, 1, 2, 1, 2],
  steps: [
    { ptr: 0, log: 'res = 4' },
    { ptr: 1, log: 'res = 4 XOR 1 = 5' },
    { ptr: 2, log: 'res = 5 XOR 2 = 7' },
    { ptr: 3, log: 'res = 7 XOR 1 = 6（1 抵消）' },
    { ptr: 4, log: 'res = 6 XOR 2 = 4 → 只出现一次的是 4' },
  ],
}

const jumpGameCfg: LinearScanConfig = {
  values: [2, 3, 1, 1, 4],
  steps: [
    { ptr: 0, range: [0, 2], log: 'i=0：0+2=2，最远 reach=2' },
    { ptr: 1, range: [0, 4], log: 'i=1：1+3=4，reach=4 已覆盖终点' },
    { ptr: 2, range: [0, 4], log: 'i=2：i 在 reach 内，reach 不变' },
    { ptr: 3, range: [0, 4], log: 'i=3：reach 不变' },
    { ptr: 4, range: [0, 4], log: 'reach >= 4 → 能到达最后一个下标' },
  ],
}

const jump2Cfg: LinearScanConfig = {
  values: [2, 3, 1, 1, 4],
  steps: [
    { ptr: 0, range: [0, 0], log: '起点：farthest=0，end=0，jumps=0' },
    { ptr: 1, range: [0, 2], log: 'i=0 到达 end：farthest=2，jumps=1，新 end=2' },
    { ptr: 2, range: [0, 4], log: 'i=1：farthest=1+3=4' },
    { ptr: 3, range: [0, 4], log: 'i=2 到达 end：jumps=2，新 end=4' },
    { ptr: 4, range: [0, 4], log: '已覆盖终点 → 最少跳跃 2 次' },
  ],
}

const gasStationCfg: LinearScanConfig = {
  values: [1, 2, 3, 4, 5],
  caption: 'gas = [1,2,3,4,5]，cost = [3,4,5,1,2]',
  steps: [
    { ptr: 0, log: 'i=0：1-3=-2，油箱变负，候选起点重置到 1' },
    { ptr: 1, log: 'i=1：2-4=-2，候选起点重置到 2' },
    { ptr: 2, log: 'i=2：3-5=-2，候选起点重置到 3' },
    { ptr: 3, range: [3, 4], log: 'i=3：4-1=3，油箱=3' },
    { ptr: 4, range: [3, 4], log: 'i=4：5-2=3，油箱=6，走完一圈 → 起点 3' },
  ],
}

const partitionLabelsCfg: LinearScanConfig = {
  values: 'abacbde'.split(''),
  steps: [
    { ptr: 0, range: [0, 2], log: 'i=0：a 最后出现在 2，right=2' },
    { ptr: 1, range: [0, 4], log: 'i=1：b 最后出现在 4，right=4' },
    { ptr: 2, range: [0, 4], log: 'i=2：a 已在区间内' },
    { ptr: 3, range: [0, 4], log: 'i=3：c 最后出现在 3，区间不扩大' },
    { ptr: 4, range: [0, 4], log: 'i=4 == right：切出 "abacb"，长度 5' },
    { ptr: 5, range: [5, 6], log: 'i=5：d 最后出现 6' },
    { ptr: 6, range: [5, 6], log: 'i=6 == right：切出 "de" → 结果 [5,2]' },
  ],
}

/* ==================== 栈（Stack） ==================== */

const rpnCfg: StackCfg = {
  steps: [
    { stack: [], action: '2 1 + 3 *', log: '遇到数字入栈，遇到运算符弹两个数' },
    { stack: [2], action: 'push 2', log: '2 入栈' },
    { stack: [2, 1], action: 'push 1', log: '1 入栈' },
    { stack: [3], action: '"+": 2+1=3', log: '弹出 1、2，相加得 3 再入栈' },
    { stack: [3, 3], action: 'push 3', log: '3 入栈' },
    { stack: [9], action: '"*": 3×3=9', log: '弹出 3、3，相乘得 9' },
    { stack: [9], action: '结束', log: '栈中唯一值 9 即表达式结果' },
  ],
}

/* ==================== 一维 DP（DPFill） ==================== */

const countBitsCfg: DPCfg = {
  caption: 'dp[i] = dp[i >> 1] + (i & 1)，0..5 的二进制 1 的个数',
  steps: [
    { filled: [0], values: [0, '', '', '', '', ''], log: 'dp[0] = 0' },
    { filled: [0, 1], values: [0, 1, '', '', '', ''], log: 'dp[1] = dp[0] + 1 = 1' },
    { filled: [0, 1, 2], values: [0, 1, 1, '', '', ''], log: 'dp[2] = dp[1] + 0 = 1' },
    { filled: [0, 1, 2, 3], values: [0, 1, 1, 2, '', ''], log: 'dp[3] = dp[1] + 1 = 2' },
    { filled: [0, 1, 2, 3, 4], values: [0, 1, 1, 2, 1, ''], log: 'dp[4] = dp[2] + 0 = 1' },
    { filled: [0, 1, 2, 3, 4, 5], values: [0, 1, 1, 2, 1, 2], log: 'dp[5] = dp[2] + 1 = 2 → [0,1,1,2,1,2]' },
  ],
}

const wordBreakCfg: DPCfg = {
  caption: 's="leetcode"，字典 ["leet","code"]；dp[i] 表示前 i 个字符可拆分',
  steps: [
    { filled: [0], values: ['T', '', '', '', '', '', '', '', ''], log: 'dp[0] = true（空前缀）' },
    { filled: [0, 4], values: ['T', '', '', '', 'T', '', '', '', ''], log: '前 4 个字符 "leet" 在字典中 → dp[4]=true' },
    { filled: [0, 4, 8], values: ['T', '', '', '', 'T', '', '', '', 'T'], log: '从 4 出发，"code" 命中 → dp[8]=true，可拆分' },
  ],
}

const perfectSquaresCfg: DPCfg = {
  caption: 'n = 12；dp[i] = 组成 i 的最少完全平方数个数',
  cellSize: 38,
  x0: 24,
  steps: [
    { filled: [0], values: [0, '', '', '', '', '', '', '', '', '', '', '', ''], log: 'dp[0] = 0' },
    { filled: [0, 1, 2, 3, 4], values: [0, 1, 2, 3, 1, '', '', '', '', '', '', '', ''], log: 'dp[4] = 1（4 = 2²）' },
    { filled: [0, 1, 2, 3, 4, 5, 6, 7, 8], values: [0, 1, 2, 3, 1, 2, 3, 4, 2, '', '', '', ''], log: 'dp[8] = 2（4+4）' },
    { filled: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], values: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, '', '', ''], log: 'dp[9] = 1（9 = 3²）' },
    { filled: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      values: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, 2, 3, 3], log: 'dp[12] = 3（4+4+4）→ 答案 3' },
  ],
}

const knapsackCfg: DPCfg = {
  caption: 'nums=[1,5,11,5]；dp[sum]：能否凑出 sum（0/1 背包，倒序更新）',
  cellSize: 40,
  x0: 30,
  steps: [
    { filled: [0], values: ['T', '', '', '', '', '', '', '', '', '', '', ''], log: 'dp[0] = true' },
    { filled: [0, 1], values: ['T', 'T', '', '', '', '', '', '', '', '', '', ''], log: '放入 1：能凑出 1' },
    { filled: [0, 1, 5, 6], values: ['T', 'T', '', '', '', 'T', 'T', '', '', '', '', ''], log: '放入 5：能凑出 5、6' },
    { filled: [0, 1, 5, 6, 10, 11], values: ['T', 'T', '', '', '', 'T', 'T', '', '', '', 'T', 'T'], log: '再放入 11、5：dp[11] = true' },
    { filled: [0, 1, 5, 6, 10, 11], values: ['T', 'T', '', '', '', 'T', 'T', '', '', '', 'T', 'T'], log: '目标和 = 22/2 = 11，dp[11] 为真 → 可等分' },
  ],
}

/* ==================== 双字符串 ==================== */

const subsequenceCfg: TwoStringCfg = {
  pattern: 'abc',
  text: 'ahbgdc',
  steps: [
    { i: 0, j: 0, log: 's="abc"，t="ahbgdc"：两个指针从头开始' },
    { i: 1, j: 1, log: 't[0]=a 与 s[0] 匹配，i 后移' },
    { i: 2, j: 3, log: 'h 不匹配跳过；b 匹配 s[1]，i=2' },
    { i: 3, j: 6, log: 'g、d 跳过；c 匹配 s[2]，i=3' },
    { i: 3, j: 6, log: 'i 走完 s.length=3 → 是子序列' },
  ],
}

/* ==================== 二维 DP（DP2D） ==================== */

// 1143 最长公共子序列：ABCDE / ACE
const lcsCfg: DP2DCfg = {
  rows: 6,
  cols: 4,
  cellSize: 26,
  colLabels: ['', 'A', 'C', 'E'],
  rowLabels: ['', 'A', 'B', 'C', 'D', 'E'],
  caption: '相等取对角 +1，否则取上方/左方最大值',
  steps: [
    { values: [[0, 0, 0, 0], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      filled: [[0, 0], [0, 1], [0, 2], [0, 3]], current: [0, 3],
      log: '空串的 LCS 都是 0' },
    { values: [[0, 0, 0, 0], [0, 1, 1, 1], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      filled: [[1, 0], [1, 1], [1, 2], [1, 3]], current: [1, 1],
      log: '行 A：A==A 取对角+1 → 1' },
    { values: [[0, 0, 0, 0], [0, 1, 1, 1], [0, 1, 1, 1], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      filled: [[2, 0], [2, 1], [2, 2], [2, 3]], current: [2, 2],
      log: '行 B：B 与 A/C/E 都不匹配，取 max(上,左)' },
    { values: [[0, 0, 0, 0], [0, 1, 1, 1], [0, 1, 1, 1], [0, 1, 2, 2], ['', '', '', ''], ['', '', '', '']],
      filled: [[3, 0], [3, 1], [3, 2], [3, 3]], current: [3, 2],
      log: '行 C：C==C → 2' },
    { values: [[0, 0, 0, 0], [0, 1, 1, 1], [0, 1, 1, 1], [0, 1, 2, 2], [0, 1, 2, 2], ['', '', '', '']],
      filled: [[4, 0], [4, 1], [4, 2], [4, 3]], current: [4, 3],
      log: '行 D：无新匹配' },
    { values: [[0, 0, 0, 0], [0, 1, 1, 1], [0, 1, 1, 1], [0, 1, 2, 2], [0, 1, 2, 2], [0, 1, 2, 3]],
      filled: [[5, 0], [5, 1], [5, 2], [5, 3]], current: [5, 3],
      log: '行 E：E==E → 3，即 LCS = "ACE" 长度 3' },
  ],
}

// 72 编辑距离：horse → ros
const editDistanceCfg: DP2DCfg = {
  rows: 7,
  cols: 4,
  cellSize: 22,
  colLabels: ['', 'r', 'o', 's'],
  rowLabels: ['', 'h', 'o', 'r', 's', 'e', ''],
  caption: '相等抄对角；不相等 = min(上,左,对角) + 1',
  steps: [
    { values: [
      [0, 1, 2, 3],
      ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      filled: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0]], current: [1, 0],
      log: '空串边：dp[i][0]=i，dp[0][j]=j' },
    { values: [
      [0, 1, 2, 3],
      [1, 1, 2, 3],
      ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      filled: [[1, 1], [1, 2], [1, 3]], current: [1, 3],
      log: 'h 与 r/o/s 均不相等：替换/插入/删除取最小' },
    { values: [
      [0, 1, 2, 3],
      [1, 1, 2, 3],
      [2, 2, 1, 2],
      ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      filled: [[2, 0], [2, 1], [2, 2], [2, 3]], current: [2, 2],
      log: 'o 与 o 相等：直接抄对角 dp[2][2]=1' },
    { values: [
      [0, 1, 2, 3],
      [1, 1, 2, 3],
      [2, 2, 1, 2],
      [3, 2, 2, 2],
      ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      filled: [[3, 0], [3, 1], [3, 2], [3, 3]], current: [3, 1],
      log: 'r 与 r 相等：dp[3][1] 抄对角 = 2' },
    { values: [
      [0, 1, 2, 3],
      [1, 1, 2, 3],
      [2, 2, 1, 2],
      [3, 2, 2, 2],
      [4, 3, 3, 2],
      ['', '', '', ''], ['', '', '', '']],
      filled: [[4, 0], [4, 1], [4, 2], [4, 3]], current: [4, 3],
      log: 's 与 s 相等：dp[4][3] = 2' },
    { values: [
      [0, 1, 2, 3],
      [1, 1, 2, 3],
      [2, 2, 1, 2],
      [3, 2, 2, 2],
      [4, 3, 3, 2],
      [5, 4, 4, 3],
      ['', '', '', '']],
      filled: [[5, 0], [5, 1], [5, 2], [5, 3]], current: [5, 3],
      log: '最后一行 → 右下角 = 3，horse → ros 最少 3 步' },
  ],
}

/* ==================== 矩阵（MatrixGrid） ==================== */

// 73 矩阵置零
const setZeroesCfg: MatrixCfg = {
  rows: 3,
  cols: 3,
  cellSize: 56,
  headers: true,
  initial: [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
  steps: [
    { current: [[1, 1]], log: '发现 0 在 (1,1)，记录其行号与列号' },
    { markRows: [1], markCols: [1], current: [[1, 1]], log: '标记第 1 行、第 1 列（先不直接改，避免连锁误判）' },
    { values: [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
      highlight: [[1, 0], [1, 2], [0, 1], [2, 1]],
      log: '标记行整行置 0，标记列整列置 0' },
    { values: [[1, 0, 1], [0, 0, 0], [1, 0, 1]], good: [[1, 1]],
      log: '原地完成，额外空间 O(1)' },
  ],
}

// 54 螺旋矩阵
const spiralPath: [number, number][] = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0], [1, 1]]
const spiralSteps: MatrixCfg['steps'] = spiralPath.map(([r, c], i) => {
  const visited = spiralPath.slice(0, i)
  const order = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return {
    current: [[r, c]],
    processed: visited,
    log: i < 8 ? `按「顶→右→底→左」顺序访问第 ${i + 1} 个 = ${order[i]}` : '螺旋顺序：1, 2, 3, 4, 5, 6, 7, 8, 9',
  }
})
const spiralCfg: MatrixCfg = {
  rows: 3,
  cols: 3,
  cellSize: 56,
  initial: [[1, 2, 3], [8, 9, 4], [7, 6, 5]],
  steps: spiralSteps,
}

// 48 旋转图像
const rotateCfg: MatrixCfg = {
  rows: 3,
  cols: 3,
  cellSize: 56,
  initial: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  steps: [
    { current: [[0, 0]], log: '第一步：沿主对角线转置（交换 (i,j) 与 (j,i)）' },
    { values: [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
      highlight: [[0, 1], [1, 0], [0, 2], [2, 0], [1, 2], [2, 1]],
      log: '转置完成' },
    { values: [[7, 4, 1], [8, 5, 2], [9, 6, 3]],
      highlight: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
      log: '第二步：每一行左右翻转' },
    { values: [[7, 4, 1], [8, 5, 2], [9, 6, 3]], good: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
      log: '顺时针旋转 90° 完成，原地修改' },
  ],
}

// 240 搜索二维矩阵 II
const search2d2Cfg: MatrixCfg = {
  rows: 5,
  cols: 5,
  cellSize: 36,
  initial: [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30],
  ],
  steps: [
    { current: [[0, 4]], log: '从右上角 15 开始；15 > 5 → 左移（这一列都更大）' },
    { current: [[0, 3]], processed: [[0, 4]], log: '11 > 5 → 左移' },
    { current: [[0, 2]], processed: [[0, 4], [0, 3]], log: '7 > 5 → 左移' },
    { current: [[0, 1]], processed: [[0, 4], [0, 3], [0, 2]], log: '4 < 5 → 下移（这一行都更小）' },
    { current: [[1, 1]], processed: [[0, 4], [0, 3], [0, 2], [0, 1]], log: '5 == 5 → 找到目标' },
    { good: [[1, 1]], processed: [[0, 4], [0, 3], [0, 2], [0, 1], [1, 1]], log: '返回 true' },
  ],
}

// 64 最小路径和
const minPathSumCfg: MatrixCfg = {
  rows: 3,
  cols: 3,
  cellSize: 56,
  initial: [[1, 3, 1], [1, 5, 1], [4, 2, 1]],
  steps: [
    { values: [[1, '', ''], ['', '', ''], ['', '', '']], current: [[0, 0]], log: 'dp[0][0] = 1' },
    { values: [[1, 4, ''], ['', '', ''], ['', '', '']], current: [[0, 1]], processed: [[0, 0]], log: '只能从左边来：1+3=4' },
    { values: [[1, 4, 5], ['', '', ''], ['', '', '']], current: [[0, 2]], processed: [[0, 0], [0, 1]], log: '4+1=5' },
    { values: [[1, 4, 5], [2, '', ''], ['', '', '']], current: [[1, 0]], processed: [[0, 0], [0, 1], [0, 2]], log: '只能从上边来：1+1=2' },
    { values: [[1, 4, 5], [2, 7, ''], ['', '', '']], current: [[1, 1]], processed: [[1, 0]], log: 'min(4,2)+5 = 7' },
    { values: [[1, 4, 5], [2, 7, 6], ['', '', '']], current: [[1, 2]], processed: [[1, 1]], log: 'min(5,7)+1 = 6' },
    { values: [[1, 4, 5], [2, 7, 6], [6, '', '']], current: [[2, 0]], processed: [[1, 0]], log: '2+4=6' },
    { values: [[1, 4, 5], [2, 7, 6], [6, 8, '']], current: [[2, 1]], processed: [[2, 0]], log: 'min(7,6)+2 = 8' },
    { values: [[1, 4, 5], [2, 7, 6], [6, 8, 7]], good: [[2, 2]],
      processed: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1]],
      log: 'min(6,8)+1 = 7 → 右下角最小路径和 7' },
  ],
}

// 51 N 皇后
const nQueensCfg: MatrixCfg = {
  rows: 4,
  cols: 4,
  cellSize: 48,
  initial: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
  steps: [
    { values: [['', 'Q', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      current: [[0, 1]], log: 'row0 放 col1；同行/列/斜线不能再放' },
    { values: [['', 'Q', '', ''], ['', '', '', 'Q'], ['', '', '', ''], ['', '', '', '']],
      current: [[1, 3]], processed: [[0, 1]], log: 'row1 只能放 col3' },
    { values: [['', 'Q', '', ''], ['', '', '', 'Q'], ['Q', '', '', ''], ['', '', '', '']],
      current: [[2, 0]], processed: [[0, 1], [1, 3]], log: 'row2 放 col0' },
    { values: [['', 'Q', '', ''], ['', '', '', 'Q'], ['Q', '', '', ''], ['', '', 'Q', '']],
      good: [[0, 1], [1, 3], [2, 0], [3, 2]],
      log: 'row3 放 col2 → 第一个解 [.Q.. ...Q Q... ..Q.]' },
    { values: [['', '', 'Q', ''], ['Q', '', '', ''], ['', '', '', 'Q'], ['', 'Q', '', '']],
      current: [[0, 2]], log: '回溯继续：row0 改放 col2' },
    { values: [['', '', 'Q', ''], ['Q', '', '', ''], ['', '', '', 'Q'], ['', 'Q', '', '']],
      good: [[0, 2], [1, 0], [2, 3], [3, 1]],
      log: '得到第二个解 [..Q. Q... ...Q .Q..]，共 2 个解' },
  ],
}

// 36 有效的数独（4x4 简化演示，2x2 宫格）
const sudokuCfg: MatrixCfg = {
  rows: 4,
  cols: 4,
  cellSize: 48,
  boxes: true,
  initial: [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1],
  ],
  steps: [
    { current: [[0, 0]], highlight: [[0, 1], [0, 2], [0, 3]], log: '检查数字 1：所在行没有重复' },
    { current: [[1, 2]], highlight: [[0, 2], [2, 2], [3, 2]], log: '检查数字 1：所在列没有重复' },
    { current: [[2, 3]], highlight: [[2, 2], [3, 2], [3, 3]], log: '检查所在 2×2 宫格（真实题是 3×3）没有重复' },
    { good: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3],
      [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]],
      log: '行、列、宫均无重复 → 数独合法' },
  ],
}

// 79 单词搜索：ABCCED
const wordSearchCfg: MatrixCfg = {
  rows: 3,
  cols: 4,
  cellSize: 48,
  initial: [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  steps: [
    { current: [[0, 0]], log: '从 A(0,0) 出发' },
    { current: [[0, 1]], processed: [[0, 0]], log: '向右走到 B' },
    { current: [[0, 2]], processed: [[0, 0], [0, 1]], log: '向右走到 C' },
    { current: [[1, 2]], processed: [[0, 0], [0, 1], [0, 2]], log: '向下走到 C（已访问格子不能回头）' },
    { current: [[2, 2]], processed: [[0, 0], [0, 1], [0, 2], [1, 2]], log: '向下走到 E' },
    { good: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1]],
      processed: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
      log: '向左走到 D → 拼出 "ABCCED"，返回 true' },
  ],
}

/* ==================== 导出 ==================== */

export const InorderAnimation = wrap(TreeTraverseAnimation, inorderCfg)
export const SymmetricTreeAnimation = wrap(TreeTraverseAnimation, symmetricCfg)
export const SortedToBstAnimation = wrap(TreeTraverseAnimation, sortedToBstCfg)
export const RightViewAnimation = wrap(TreeTraverseAnimation, rightViewCfg)
export const FlattenTreeAnimation = wrap(TreeTraverseAnimation, flattenCfg)
export const PathSum3Animation = wrap(TreeTraverseAnimation, pathSum3Cfg)
export const MaxPathSumAnimation = wrap(TreeTraverseAnimation, maxPathSumCfg)
export const TrieAnimation = wrap(TreeTraverseAnimation, trieCfg)
export const PalindromePartitionAnimation = wrap(TreeTraverseAnimation, palindromePartitionCfg)

export const SwapPairsAnimation = wrap(LinkedListAnimation, swapPairsCfg)
export const ReverseKGroupAnimation = wrap(LinkedListAnimation, reverseKGroupCfg)
export const PalindromeLlAnimation = wrap(LinkedListAnimation, palindromeLlCfg)
export const SortListAnimation = wrap(LinkedListAnimation, sortListCfg)

export const SearchInsertAnimation = wrap(BinarySearchAnimation, searchInsertCfg)
export const FirstLastAnimation = wrap(BinarySearchAnimation, firstLastCfg)

export const ContainsDuplicateAnimation = wrap(LinearScanAnimation, containsDuplicateCfg)
export const MissingNumberAnimation = wrap(LinearScanAnimation, missingNumberCfg)
export const SingleXorAnimation = wrap(LinearScanAnimation, singleXorCfg)
export const JumpGameAnimation = wrap(LinearScanAnimation, jumpGameCfg)
export const JumpGame2Animation = wrap(LinearScanAnimation, jump2Cfg)
export const GasStationAnimation = wrap(LinearScanAnimation, gasStationCfg)
export const PartitionLabelsAnimation = wrap(LinearScanAnimation, partitionLabelsCfg)

export const RPNAnimation = wrap(StackAnimation, rpnCfg)

export const CountBitsAnimation = wrap(DPAnimation, countBitsCfg)
export const WordBreakDPAnimation = wrap(DPAnimation, wordBreakCfg)
export const PerfectSquaresAnimation = wrap(DPAnimation, perfectSquaresCfg)
export const KnapsackAnimation = wrap(DPAnimation, knapsackCfg)

export const SubsequenceAnimation = wrap(TwoStringScanAnimation, subsequenceCfg)

export const LCSAnimation = wrap(DP2DAnimation, lcsCfg)
export const EditDistanceAnimation = wrap(DP2DAnimation, editDistanceCfg)

export const SetZeroesAnimation = wrap(MatrixGridAnimation, setZeroesCfg)
export const SpiralMatrixAnimation = wrap(MatrixGridAnimation, spiralCfg)
export const RotateImageAnimation = wrap(MatrixGridAnimation, rotateCfg)
export const Search2d2Animation = wrap(MatrixGridAnimation, search2d2Cfg)
export const MinPathSumAnimation = wrap(MatrixGridAnimation, minPathSumCfg)
export const NQueensAnimation = wrap(MatrixGridAnimation, nQueensCfg)
export const SudokuAnimation = wrap(MatrixGridAnimation, sudokuCfg)
export const WordSearchAnimation = wrap(MatrixGridAnimation, wordSearchCfg)
