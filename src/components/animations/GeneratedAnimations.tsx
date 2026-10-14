import React from 'react'
import type { AnimationProps } from '../../data/types'
import { LinearScanAnimation, type LinearScanConfig } from './LinearScan'
import { TwoPointersAnimation, type TwoPointersCfg } from './TwoPointers'
import { BinarySearchAnimation, type BinarySearchCfg } from './BinarySearch'
import { SlidingWindowAnimation, type SlidingWindowCfg } from './SlidingWindow'
import { TreeTraverseAnimation, type TreeCfg } from './TreeTraverse'
import { GridBFSAnimation, type GridCfg } from './GridBFS'
import { StackAnimation, type StackCfg } from './Stack'
import { LinkedListAnimation, type LinkedListCfg } from './LinkedList'
import { DPAnimation, type DPCfg } from './DPFill'

// Helper to make a component from config
const mk = (cfg: any, Comp: any) =>
  ({ stepIndex }: AnimationProps) => <Comp stepIndex={stepIndex} cfg={cfg} />

// ---------- Array / Hash ----------
const validAnagram: LinearScanConfig = {
  values: [1, 1, 0, 0, 0, 0],
  steps: [
    { ptr: 0, log: 'count[s[0]]++  →  a:1', mark: 'current' },
    { ptr: 1, log: 'count[s[1]]++  →  b:1', mark: 'current' },
    { ptr: 2, log: 'count[s[2]]--  →  a:0', mark: 'current' },
    { ptr: 3, log: 'count[s[3]]--  →  b:0', mark: 'current' },
    { ptr: 4, log: 'return count.every(v => v === 0)', mark: 'processed' },
  ],
  caption: '26 位计数数组，遍历 s++ / t--',
}
export const ValidAnimation = mk(validAnagram, LinearScanAnimation)

const majority: LinearScanConfig = {
  values: [2, 2, 1, 1, 2],
  steps: [
    { ptr: 0, log: 'candidate=2, count=1', mark: 'current' },
    { ptr: 1, log: 'same → count=2', mark: 'current' },
    { ptr: 2, log: 'different → count=1', mark: 'current' },
    { ptr: 3, log: 'different → count=0', mark: 'current' },
    { ptr: 4, log: 'candidate=2, count=1', mark: 'current' },
    { ptr: 4, log: 'return candidate (Boyer-Moore)', mark: 'processed' },
  ],
  caption: '摩尔投票：count 归零就换 candidate',
}
export const MajorityAnimation = mk(majority, LinearScanAnimation)

const stock: LinearScanConfig = {
  values: [7, 1, 5, 3, 6, 4],
  steps: [
    { ptr: 0, log: 'minPrice=7, profit=0', mark: 'current' },
    { ptr: 1, log: 'minPrice=1', mark: 'current' },
    { ptr: 2, log: 'profit=max(0,5-1)=4', mark: 'current' },
    { ptr: 3, log: 'profit=max(4,3-1)=4', mark: 'current' },
    { ptr: 4, log: 'profit=max(4,6-1)=5', mark: 'current' },
    { ptr: 5, log: 'profit=max(5,4-1)=5', mark: 'current' },
  ],
  caption: '一次遍历：维护 minPrice 和 maxProfit',
}
export const StockAnimation = mk(stock, LinearScanAnimation)

// ---------- Two Pointers ----------
const validPalindrome: TwoPointersCfg = {
  values: ['a', 'b', 'c', 'b', 'a'],
  steps: [
    { lo: 0, hi: 4, log: 's[0]===s[4] → a===a ✓' },
    { lo: 1, hi: 3, log: 's[1]===s[3] → b===b ✓' },
    { lo: 2, hi: 2, log: 'lo >= hi → return true' },
  ],
}
export const ValidPalindromeAnimation = mk(validPalindrome, TwoPointersAnimation)

const twoSumSorted: TwoPointersCfg = {
  values: [2, 7, 11, 15],
  steps: [
    { lo: 0, hi: 3, log: '2+15=17 > target → hi--' },
    { lo: 0, hi: 2, log: '2+11=13 > target → hi--' },
    { lo: 0, hi: 1, log: '2+7=9 = target ✓' },
  ],
}
export const TwoSumSortedAnimation = mk(twoSumSorted, TwoPointersAnimation)

const mergeSorted: TwoPointersCfg = {
  values: [1, 2, 3, 0, 0, 0],
  steps: [
    { lo: 2, hi: 5, log: 'nums1[p--] = max(nums1[i], nums2[j])' },
    { lo: 1, hi: 4, log: '3 > 2 → p=5: 3' },
    { lo: 0, hi: 4, log: '2 = 2 → p=4: 2' },
    { lo: 0, hi: 3, log: '1 < 2 → p=3: 2' },
    { lo: 0, hi: 2, log: 'p=2: 1, 剩余 nums2 拷入' },
  ],
}
export const MergeSortedAnimation = mk(mergeSorted, TwoPointersAnimation)

// ---------- Binary Search ----------
const binarySearch: BinarySearchCfg = {
  values: [-1, 0, 3, 5, 9, 12],
  target: 9,
  steps: [
    { lo: 0, hi: 5, mid: 2, log: 'mid=2: 3 < 9 → lo=mid+1=3' },
    { lo: 3, hi: 5, mid: 4, log: 'mid=4: 9 = 9 ✓' },
  ],
}
export const BinarySearchStdAnimation = mk(binarySearch, BinarySearchAnimation)

const searchRotated: BinarySearchCfg = {
  values: [4, 5, 6, 7, 0, 1, 2],
  target: 0,
  steps: [
    { lo: 0, hi: 6, mid: 3, log: 'mid=3: 7, 左半有序但 target不在 → lo=4' },
    { lo: 4, hi: 6, mid: 5, log: 'mid=5: 1, 右半有序 → hi=4' },
    { lo: 4, hi: 4, mid: 4, log: 'mid=4: 0 = target ✓' },
  ],
}
export const SearchRotatedAnimation = mk(searchRotated, BinarySearchAnimation)

const findMinRotated: BinarySearchCfg = {
  values: [4, 5, 6, 7, 0, 1, 2],
  target: 0,
  steps: [
    { lo: 0, hi: 6, mid: 3, log: 'nums[mid]=7 > nums[hi]=2 → 最小值在右半' },
    { lo: 4, hi: 6, mid: 5, log: 'nums[mid]=1 < nums[hi]=2 → 最小值在左半(含mid)' },
    { lo: 4, hi: 5, mid: 4, log: 'lo=hi=4 → 最小值 nums[4]=0' },
  ],
}
export const FindMinAnimation = mk(findMinRotated, BinarySearchAnimation)

// ---------- Sliding Window ----------
const minWindowGen: SlidingWindowCfg = {
  values: ['A', 'D', 'O', 'B', 'E', 'C', 'O', 'D', 'E', 'B', 'A'],
  steps: [
    { l: 0, r: 4, log: 'r 扩展直到 formed=required' },
    { l: 0, r: 6, log: 'formed 达标, bestLen=7 "ADOBECO"' },
    { l: 1, r: 6, log: 'l 收缩: A 弹出后 formed 不达标' },
    { l: 6, r: 9, log: 'r 再扩展, l 再收缩, best="BEC" len=3' },
  ],
}
export const MinWindowGenAnimation = mk(minWindowGen, SlidingWindowAnimation)

// ---------- Stack ----------
const validParen: StackCfg = {
  steps: [
    { stack: [], action: 'push (', log: 's = "(", stack=["("]' },
    { stack: ['('], action: 'push (', log: 's = "()", stack=["(", "("]' },
    { stack: ['(', '('], action: 'push)', log: 's = "()(", stack=["(", "(", "("]' },
    { stack: ['(', '('], action: 'pop)', log: 's = "()()", 弹 ( 匹配 )' },
    { stack: ['('], action: 'pop)', log: 's = "()()(", 弹 ( 匹配 )' },
    { stack: [], action: 'empty?', log: 's 遍历完, stack 空 → true' },
  ],
}
export const ValidParenAnimation = mk(validParen, StackAnimation)

const dailyTemp: StackCfg = {
  steps: [
    { stack: [], action: 'push 73', log: 'temp=73, stack=[73]' },
    { stack: [73], action: 'push 74', log: '74>73 → 弹 73, 答案[0]=1, stack=[74]' },
    { stack: [74], action: 'push 75', log: '75>74 → 弹 74, 答案[1]=1, stack=[75]' },
    { stack: [75, 71], action: 'push 71', log: '71<75, stack=[75,71]' },
    { stack: [75, 71], action: 'pop 69', log: '69<71, stack=[75,71,69]' },
  ],
}
export const DailyTempAnimation = mk(dailyTemp, StackAnimation)

// ---------- Linked List ----------
const reverseLL: LinkedListCfg = {
  nodes: ['1', '2', '3', '4', '5'],
  steps: [
    { ptr: 0, log: 'prev=null, curr=1' },
    { ptr: 1, log: 'next=2; curr.next=prev; prev=1; curr=2' },
    { ptr: 2, log: 'next=3; curr.next=1; prev=2; curr=3' },
    { ptr: 3, log: 'curr.next=2; prev=3' },
    { ptr: 4, log: 'curr.next=3; prev=4; curr=5' },
    { ptr: null, log: 'return prev=5 (新头)' },
  ],
}
export const ReverseLLAnimation = mk(reverseLL, LinkedListAnimation)

const mergeTwoLL: LinkedListCfg = {
  nodes: ['1→1', '2→3', '4→4'],
  steps: [
    { ptr: 0, log: 'dummy → 小者入链' },
    { ptr: 1, log: 'l1=1 vs l2=1 → 取 l1=1' },
    { ptr: 2, log: 'l1=2 vs l2=1 → 取 l2=1' },
    { ptr: null, log: '剩余链表直接接上' },
  ],
}
export const MergeLLAnimation = mk(mergeTwoLL, LinkedListAnimation)

// ---------- Tree ----------
const treeNodes = [
  { id: 1, x: 300, y: 40, label: '3' },
  { id: 2, x: 180, y: 110, label: '9' },
  { id: 3, x: 420, y: 110, label: '20' },
  { id: 4, x: 360, y: 180, label: '15' },
  { id: 5, x: 480, y: 180, label: '7' },
]
const bfsTree: TreeCfg = {
  nodes: treeNodes,
  edges: [[1, 2], [1, 3], [3, 4], [3, 5]],
  steps: [
    { visited: [1], current: 1, log: 'queue=[3], 出队 3, 入队 9,20' },
    { visited: [1, 2, 3], current: 2, log: '出队 9 (叶子), 入队其左右' },
    { visited: [1, 2, 3, 4], current: 3, log: '出队 20, 入队 15,7' },
    { visited: [1, 2, 3, 4, 5], current: 5, log: '出队 15, 7 → 层序遍历完成' },
  ],
}
export const TreeBFSAnimation = mk(bfsTree, TreeTraverseAnimation)

const invertTree: TreeCfg = {
  nodes: treeNodes,
  edges: [[1, 2], [1, 3], [3, 4], [3, 5]],
  steps: [
    { visited: [1], current: 1, log: 'swap(root.left, root.right)' },
    { visited: [1, 2], current: 2, log: '递归 invert(9) → 叶子' },
    { visited: [1, 3], current: 3, log: '递归 invert(20) → 交换 15,7' },
    { visited: [1, 3, 4, 5], current: null, log: '所有节点左右互换完成' },
  ],
}
export const InvertTreeAnimation = mk(invertTree, TreeTraverseAnimation)

const lca: TreeCfg = {
  nodes: treeNodes,
  edges: [[1, 2], [1, 3], [3, 4], [3, 5]],
  steps: [
    { visited: [], current: 1, log: 'dfs(root): 找到 p 或 q 就返回' },
    { visited: [2], current: 2, log: 'left=9 命中 p → 返回 9' },
    { visited: [3, 4], current: 4, log: 'right 子树递归, 15 命中 q' },
    { visited: [1, 3], current: 1, log: '左右都非空 → root=3 即 LCA' },
  ],
}
export const LCAAnimation = mk(lca, TreeTraverseAnimation)

// ---------- Grid BFS ----------
const islands: GridCfg = {
  rows: 4, cols: 5, cellSize: 48,
  initial: [
    [1, 1, 0, 0, 0],
    [1, 0, 0, 1, 1],
    [0, 0, 0, 1, 1],
    [0, 1, 1, 0, 0],
  ],
  steps: [
    { reached: [], frontier: [[0, 0]], log: '扫描到陆地 (0,0), BFS 入队' },
    { reached: [[0, 0], [0, 1], [1, 0]], frontier: [[1, 1]], log: '扩展相邻陆地, count=1' },
    { reached: [[0, 0], [0, 1], [1, 0], [1, 3], [1, 4], [2, 3], [2, 4]], frontier: [], log: '第二块岛, count=2' },
    { reached: [[3, 1], [3, 2]], frontier: [], log: '第三块岛, count=3' },
  ],
}
export const IslandsAnimation = mk(islands, GridBFSAnimation)

const rotten: GridCfg = {
  rows: 3, cols: 3, cellSize: 56,
  initial: [
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ],
  steps: [
    { reached: [], frontier: [[0, 0]], log: '初始 rotten 在 (0,0), queue 入队' },
    { reached: [[0, 0]], frontier: [[0, 1], [1, 0]], log: '1 min: 相邻变 rotten' },
    { reached: [[0, 0], [0, 1], [1, 0]], frontier: [[0, 2], [1, 1]], log: '2 min: 继续扩散' },
    { reached: [[0, 0], [0, 1], [1, 0], [0, 2], [1, 1], [1, 2], [2, 1], [2, 2]], frontier: [], log: '4 min: 全部腐烂' },
  ],
}
export const RottenAnimation = mk(rotten, GridBFSAnimation)

// ---------- DP ----------
const climbing: DPCfg = {
  caption: 'dp[i] = dp[i-1] + dp[i-2]',
  steps: [
    { filled: [0, 1], values: [1, 1, '', '', '', ''], log: 'dp[0]=1, dp[1]=1 初始' },
    { filled: [0, 1, 2], values: [1, 1, 2, '', '', ''], log: 'dp[2]=dp[1]+dp[0]=2' },
    { filled: [0, 1, 2, 3], values: [1, 1, 2, 3, '', ''], log: 'dp[3]=2+1=3' },
    { filled: [0, 1, 2, 3, 4], values: [1, 1, 2, 3, 5, ''], log: 'dp[4]=3+2=5' },
    { filled: [0, 1, 2, 3, 4, 5], values: [1, 1, 2, 3, 5, 8], log: 'dp[5]=5+3=8 → return 8' },
  ],
}
export const ClimbingAnimation = mk(climbing, DPAnimation)

const houseRobber: DPCfg = {
  caption: 'dp[i] = max(dp[i-1], dp[i-2]+nums[i])',
  steps: [
    { filled: [0], values: [1, '', '', '', ''], log: 'dp[0]=1' },
    { filled: [0, 1], values: [1, 2, '', '', ''], log: 'dp[1]=max(1,2)=2' },
    { filled: [0, 1, 2], values: [1, 2, 4, '', ''], log: 'dp[2]=max(2,1+3)=4' },
    { filled: [0, 1, 2, 3], values: [1, 2, 4, 4, ''], log: 'dp[3]=max(4,2+1)=4' },
    { filled: [0, 1, 2, 3, 4], values: [1, 2, 4, 4, 5], log: 'dp[4]=max(4,4+1)=5' },
  ],
}
export const HouseRobberAnimation = mk(houseRobber, DPAnimation)

const coinChange: DPCfg = {
  caption: 'dp[i] = min(dp[i], dp[i-coin]+1)',
  steps: [
    { filled: [0], values: [0, '', '', '', '', '', '', '', ''], log: 'dp[0]=0' },
    { filled: [0, 1, 2], values: [0, 1, 2, '', '', '', '', '', ''], log: 'coin=1: dp[1]=1, dp[2]=2' },
    { filled: [0, 1, 2, 3], values: [0, 1, 2, 1, '', '', '', '', ''], log: 'coin=2: dp[3]=dp[1]+1=2' },
    { filled: [0, 1, 2, 3, 4], values: [0, 1, 2, 2, 3, '', '', '', ''], log: 'dp[4]=dp[2]+1=3' },
    { filled: [0, 1, 2, 3, 4, 5, 6, 7], values: [0, 1, 2, 2, 3, 1, 2, 2, 3], log: 'dp[7]=dp[6]+1=2 → 用 1+6 或 7' },
  ],
}
export const CoinChangeAnimation = mk(coinChange, DPAnimation)

const lis: DPCfg = {
  caption: 'dp[i] = 1 + max(dp[j]) for j<i, nums[j]<nums[i]',
  steps: [
    { filled: [0], values: [1, '', '', '', ''], log: 'dp[0]=1' },
    { filled: [0, 1], values: [1, 1, '', '', ''], log: '10<9? 否 → dp[1]=1' },
    { filled: [0, 1, 2], values: [1, 1, 2, '', ''], log: '10<2? 9<2? 否 → dp[2]=2? 实际: 2 开头 dp[2]=1' },
    { filled: [0, 1, 2, 3], values: [1, 1, 1, 3, ''], log: 'nums[3]=5: dp[3]=dp[2]+1=2' },
    { filled: [0, 1, 2, 3, 4], values: [1, 1, 1, 2, 3], log: 'nums[4]=3: dp[4]=dp[2]+1=2 → max=3' },
  ],
}
export const LISAnimation = mk(lis, DPAnimation)

const maxSubarrayGen: DPCfg = {
  caption: 'Kadane: cur = max(x, cur+x)',
  steps: [
    { filled: [0], values: [-2, '', '', '', '', ''], log: 'cur=-2, ans=-2' },
    { filled: [0, 1], values: [-2, 1, '', '', '', ''], log: 'cur=max(1,-2+1)=1, ans=1' },
    { filled: [0, 1, 2], values: [-2, 1, -3, '', '', ''], log: 'cur=max(-3,1-3)=-2, ans=1' },
    { filled: [0, 1, 2, 3], values: [-2, 1, -3, 4, '', ''], log: 'cur=max(4,-2+4)=4, ans=4' },
    { filled: [0, 1, 2, 3, 4], values: [-2, 1, -3, 4, -1, ''], log: 'cur=max(-1,4-1)=3, ans=4' },
  ],
}
export const KadaneAnimation = mk(maxSubarrayGen, DPAnimation)

const uniquePaths: DPCfg = {
  caption: 'dp[i][j] = dp[i-1][j] + dp[i][j-1]',
  steps: [
    { filled: [0, 1, 2, 3, 4, 5, 6, 7, 8], values: [1, 1, 1, 1, 2, 3, 4, 5, 0], log: '第一行/列全 1' },
    { filled: [0, 1, 2, 3, 4, 5, 6, 7, 8], values: [1, 1, 1, 1, 2, 3, 4, 5, 6], log: 'dp[1][1]=1+1=2' },
    { filled: [0, 1, 2, 3, 4, 5, 6, 7, 8], values: [1, 1, 1, 1, 2, 3, 4, 5, 10], log: 'dp[2][2]=3+3=6 → 继续' },
  ],
}
export const UniquePathsAnimation = mk(uniquePaths, DPAnimation)
