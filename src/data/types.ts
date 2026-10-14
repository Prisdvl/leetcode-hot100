export type Difficulty = 'easy' | 'medium' | 'hard'

export interface CardData {
  /** leetcode problem number as string id */
  id: string
  leetcodeNo: number
  title: string
  difficulty: Difficulty
  tags: string[]
  /** 一句话题意 */
  brief: string
  /** 一句话核心洞察 */
  insight: string
  /** 分步骤推导 */
  derivation: string[]
  /** TypeScript 代码模板 */
  code: string
  timeComplexity: string
  spaceComplexity: string
  /** 易错点 */
  pitfalls: string[]
  /** animation registry key */
  animation: AnimationKey
}

export type AnimationKey =
  | 'two-sum'
  | 'group-anagrams'
  | 'longest-consecutive'
  | 'move-zeroes'
  | 'max-area'
  | 'three-sum'
  | 'trap-rain-water'
  | 'longest-substring'
  | 'find-anagrams'
  | 'subarray-sum'
  | 'max-sliding-window'
  | 'min-window'
  | 'max-subarray'
  | 'merge-intervals'
  | 'rotate-array'
  | 'valid-anagram'
  | 'majority'
  | 'stock'
  | 'valid-palindrome'
  | 'two-sum-sorted'
  | 'merge-sorted'
  | 'binary-search'
  | 'search-rotated'
  | 'find-min-rotated'
  | 'min-window-gen'
  | 'valid-paren'
  | 'daily-temp'
  | 'reverse-ll'
  | 'merge-ll'
  | 'tree-bfs'
  | 'invert-tree'
  | 'lca'
  | 'islands'
  | 'rotten'
  | 'climbing'
  | 'house-robber'
  | 'coin-change'
  | 'lis'
  | 'kadane'
  | 'unique-paths'
  // ---- Hot100 补全：普通数组 / 矩阵 ----
  | 'product-except-self'
  | 'first-missing'
  | 'set-zeroes'
  | 'spiral-matrix'
  | 'rotate-image'
  | 'search-2d-2'
  // ---- Hot100 补全：链表 ----
  | 'intersection-ll'
  | 'palindrome-ll'
  | 'cycle-1'
  | 'cycle-2'
  | 'swap-pairs'
  | 'reverse-k-group'
  | 'copy-random'
  | 'sort-list'
  | 'merge-k-lists'
  | 'lru'
  // ---- Hot100 补全：二叉树 ----
  | 'inorder'
  | 'symmetric-tree'
  | 'sorted-to-bst'
  | 'right-view'
  | 'flatten-tree'
  | 'build-tree'
  | 'path-sum-3'
  | 'max-path-sum'
  // ---- Hot100 补全：图 / Trie / 回溯 ----
  | 'trie'
  | 'palindrome-partition'
  | 'n-queens'
  // ---- Hot100 补全：二分 / 栈 / 堆 ----
  | 'search-insert'
  | 'first-last'
  | 'median-two'
  | 'decode-string'
  | 'largest-rectangle'
  | 'median-stream'
  // ---- Hot100 补全：贪心 / DP / 多维 DP / 技巧 ----
  | 'jump-2'
  | 'partition-labels'
  | 'pascal'
  | 'perfect-squares'
  | 'longest-valid-paren'
  | 'min-path-sum'
  | 'longest-palindrome'
  | 'lcs'
  | 'edit-distance'
  | 'sort-colors'
  | 'next-permutation'
  | 'find-duplicate'
  // ---- 旧卡片占位动画修正（一题一动画） ----
  | 'contains-duplicate'
  | 'sudoku'
  | 'missing-number'
  | 'min-stack'
  | 'rpn'
  | 'subsequence'
  | 'quickselect'
  | 'top-k-bucket'
  | 'word-break-dp'
  | 'knapsack'
  | 'jump-game'
  | 'gas-station'
  | 'single-xor'
  | 'hamming-weight'
  | 'count-bits'
  | 'palindrome-num'
  | 'word-search'
  | 'topo-sort'

export interface AnimationProps {
  stepIndex: number
  last?: number
}
