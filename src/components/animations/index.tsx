import React from 'react'
import type { AnimationKey, AnimationProps } from '../../data/types'
import { TwoSumAnimation } from './TwoSumAnimation'
import { GroupAnagramsAnimation } from './GroupAnagramsAnimation'
import { LongestConsecutiveAnimation } from './LongestConsecutiveAnimation'
import { MoveZeroesAnimation } from './MoveZeroesAnimation'
import { MaxAreaAnimation } from './MaxAreaAnimation'
import { ThreeSumAnimation } from './ThreeSumAnimation'
import { TrapRainWaterAnimation } from './TrapRainWaterAnimation'
import { LongestSubstringAnimation } from './LongestSubstringAnimation'
import { FindAnagramsAnimation } from './FindAnagramsAnimation'
import { SubarraySumAnimation } from './SubarraySumAnimation'
import { MaxSlidingWindowAnimation } from './MaxSlidingWindowAnimation'
import { MinWindowAnimation } from './MinWindowAnimation'
import { MaxSubArrayAnimation } from './MaxSubArrayAnimation'
import { MergeIntervalsAnimation } from './MergeIntervalsAnimation'
import { RotateArrayAnimation } from './RotateArrayAnimation'
import {
  ValidAnimation, MajorityAnimation, StockAnimation,
  ValidPalindromeAnimation, TwoSumSortedAnimation, MergeSortedAnimation,
  BinarySearchStdAnimation, SearchRotatedAnimation, FindMinAnimation,
  MinWindowGenAnimation, ValidParenAnimation, DailyTempAnimation,
  ReverseLLAnimation, MergeLLAnimation,
  TreeBFSAnimation, InvertTreeAnimation, LCAAnimation,
  IslandsAnimation, RottenAnimation,
  ClimbingAnimation, HouseRobberAnimation, CoinChangeAnimation,
  LISAnimation, KadaneAnimation, UniquePathsAnimation,
} from './GeneratedAnimations'
import {
  ProductExceptSelfAnimation, FirstMissingAnimation,
  SortColorsAnimation, NextPermutationAnimation,
  FindDuplicateAnimation, QuickSelectAnimation,
} from './ArrayAnimations2'
import {
  CycleList1Animation, CycleList2Animation,
  IntersectionLLAnimation, CopyRandomAnimation, MergeKListsAnimation,
} from './ListAnimations2'
import { LRUAnimation, MedianStreamAnimation } from './DesignAnimations'
import { BuildTreeAnimation } from './TreeAnimations2'
import {
  DecodeStringAnimation, LongestValidParenAnimation, MinStackAnimation,
} from './StackAnimations2'
import { LargestRectangleAnimation } from './HistogramAnimation'
import { LongestPalindromeAnimation } from './StringAnimations2'
import { MedianTwoArraysAnimation } from './MedianTwoAnimation'
import { HammingWeightAnimation, PalindromeNumAnimation } from './BitAnimations'
import { PascalTriangleAnimation } from './PascalAnimation'
import { TopoSortAnimation, TopKBucketAnimation } from './TopoAnimation'
import {
  InorderAnimation, SymmetricTreeAnimation, SortedToBstAnimation,
  RightViewAnimation, FlattenTreeAnimation, PathSum3Animation,
  MaxPathSumAnimation, TrieAnimation, PalindromePartitionAnimation,
  SwapPairsAnimation, ReverseKGroupAnimation, PalindromeLlAnimation,
  SortListAnimation, SearchInsertAnimation, FirstLastAnimation,
  ContainsDuplicateAnimation, MissingNumberAnimation, SingleXorAnimation,
  JumpGameAnimation, JumpGame2Animation, GasStationAnimation,
  PartitionLabelsAnimation, RPNAnimation, CountBitsAnimation,
  WordBreakDPAnimation, PerfectSquaresAnimation, KnapsackAnimation,
  SubsequenceAnimation, LCSAnimation, EditDistanceAnimation,
  SetZeroesAnimation, SpiralMatrixAnimation, RotateImageAnimation,
  Search2d2Animation, MinPathSumAnimation, NQueensAnimation,
  SudokuAnimation, WordSearchAnimation,
} from './GeneratedAnimations2'

export interface AnimationEntry {
  Component: React.ComponentType<AnimationProps>
  totalSteps: number
}

export const ANIMATION_REGISTRY: Record<AnimationKey, AnimationEntry> = {
  'two-sum': { Component: TwoSumAnimation, totalSteps: 4 },
  'group-anagrams': { Component: GroupAnagramsAnimation, totalSteps: 7 },
  'longest-consecutive': { Component: LongestConsecutiveAnimation, totalSteps: 6 },
  'move-zeroes': { Component: MoveZeroesAnimation, totalSteps: 6 },
  'max-area': { Component: MaxAreaAnimation, totalSteps: 9 },
  'three-sum': { Component: ThreeSumAnimation, totalSteps: 7 },
  'trap-rain-water': { Component: TrapRainWaterAnimation, totalSteps: 12 },
  'longest-substring': { Component: LongestSubstringAnimation, totalSteps: 8 },
  'find-anagrams': { Component: FindAnagramsAnimation, totalSteps: 8 },
  'subarray-sum': { Component: SubarraySumAnimation, totalSteps: 4 },
  'max-sliding-window': { Component: MaxSlidingWindowAnimation, totalSteps: 8 },
  'min-window': { Component: MinWindowAnimation, totalSteps: 7 },
  'max-subarray': { Component: MaxSubArrayAnimation, totalSteps: 9 },
  'merge-intervals': { Component: MergeIntervalsAnimation, totalSteps: 4 },
  'rotate-array': { Component: RotateArrayAnimation, totalSteps: 4 },
  'valid-anagram': { Component: ValidAnimation, totalSteps: 5 },
  'majority': { Component: MajorityAnimation, totalSteps: 6 },
  'stock': { Component: StockAnimation, totalSteps: 6 },
  'valid-palindrome': { Component: ValidPalindromeAnimation, totalSteps: 3 },
  'two-sum-sorted': { Component: TwoSumSortedAnimation, totalSteps: 3 },
  'merge-sorted': { Component: MergeSortedAnimation, totalSteps: 5 },
  'binary-search': { Component: BinarySearchStdAnimation, totalSteps: 2 },
  'search-rotated': { Component: SearchRotatedAnimation, totalSteps: 3 },
  'find-min-rotated': { Component: FindMinAnimation, totalSteps: 3 },
  'min-window-gen': { Component: MinWindowGenAnimation, totalSteps: 4 },
  'valid-paren': { Component: ValidParenAnimation, totalSteps: 6 },
  'daily-temp': { Component: DailyTempAnimation, totalSteps: 5 },
  'reverse-ll': { Component: ReverseLLAnimation, totalSteps: 6 },
  'merge-ll': { Component: MergeLLAnimation, totalSteps: 4 },
  'tree-bfs': { Component: TreeBFSAnimation, totalSteps: 4 },
  'invert-tree': { Component: InvertTreeAnimation, totalSteps: 4 },
  'lca': { Component: LCAAnimation, totalSteps: 4 },
  'islands': { Component: IslandsAnimation, totalSteps: 4 },
  'rotten': { Component: RottenAnimation, totalSteps: 4 },
  'climbing': { Component: ClimbingAnimation, totalSteps: 5 },
  'house-robber': { Component: HouseRobberAnimation, totalSteps: 5 },
  'coin-change': { Component: CoinChangeAnimation, totalSteps: 5 },
  'lis': { Component: LISAnimation, totalSteps: 5 },
  'kadane': { Component: KadaneAnimation, totalSteps: 5 },
  'unique-paths': { Component: UniquePathsAnimation, totalSteps: 3 },

  // ---- 普通数组 / 矩阵 ----
  'product-except-self': { Component: ProductExceptSelfAnimation, totalSteps: 8 },
  'first-missing': { Component: FirstMissingAnimation, totalSteps: 5 },
  'set-zeroes': { Component: SetZeroesAnimation, totalSteps: 4 },
  'spiral-matrix': { Component: SpiralMatrixAnimation, totalSteps: 9 },
  'rotate-image': { Component: RotateImageAnimation, totalSteps: 4 },
  'search-2d-2': { Component: Search2d2Animation, totalSteps: 6 },

  // ---- 链表 ----
  'intersection-ll': { Component: IntersectionLLAnimation, totalSteps: 8 },
  'palindrome-ll': { Component: PalindromeLlAnimation, totalSteps: 4 },
  'cycle-1': { Component: CycleList1Animation, totalSteps: 4 },
  'cycle-2': { Component: CycleList2Animation, totalSteps: 6 },
  'swap-pairs': { Component: SwapPairsAnimation, totalSteps: 4 },
  'reverse-k-group': { Component: ReverseKGroupAnimation, totalSteps: 5 },
  'copy-random': { Component: CopyRandomAnimation, totalSteps: 5 },
  'sort-list': { Component: SortListAnimation, totalSteps: 4 },
  'merge-k-lists': { Component: MergeKListsAnimation, totalSteps: 6 },
  'lru': { Component: LRUAnimation, totalSteps: 7 },

  // ---- 二叉树 ----
  'inorder': { Component: InorderAnimation, totalSteps: 5 },
  'symmetric-tree': { Component: SymmetricTreeAnimation, totalSteps: 4 },
  'sorted-to-bst': { Component: SortedToBstAnimation, totalSteps: 5 },
  'right-view': { Component: RightViewAnimation, totalSteps: 3 },
  'flatten-tree': { Component: FlattenTreeAnimation, totalSteps: 6 },
  'build-tree': { Component: BuildTreeAnimation, totalSteps: 5 },
  'path-sum-3': { Component: PathSum3Animation, totalSteps: 6 },
  'max-path-sum': { Component: MaxPathSumAnimation, totalSteps: 5 },

  // ---- 图 / Trie / 回溯 ----
  'trie': { Component: TrieAnimation, totalSteps: 6 },
  'palindrome-partition': { Component: PalindromePartitionAnimation, totalSteps: 6 },
  'n-queens': { Component: NQueensAnimation, totalSteps: 6 },

  // ---- 二分 / 栈 / 堆 ----
  'search-insert': { Component: SearchInsertAnimation, totalSteps: 3 },
  'first-last': { Component: FirstLastAnimation, totalSteps: 6 },
  'median-two': { Component: MedianTwoArraysAnimation, totalSteps: 4 },
  'decode-string': { Component: DecodeStringAnimation, totalSteps: 7 },
  'largest-rectangle': { Component: LargestRectangleAnimation, totalSteps: 7 },
  'median-stream': { Component: MedianStreamAnimation, totalSteps: 6 },

  // ---- 贪心 / DP / 技巧 ----
  'jump-2': { Component: JumpGame2Animation, totalSteps: 5 },
  'partition-labels': { Component: PartitionLabelsAnimation, totalSteps: 7 },
  'pascal': { Component: PascalTriangleAnimation, totalSteps: 5 },
  'perfect-squares': { Component: PerfectSquaresAnimation, totalSteps: 5 },
  'longest-valid-paren': { Component: LongestValidParenAnimation, totalSteps: 7 },
  'min-path-sum': { Component: MinPathSumAnimation, totalSteps: 9 },
  'longest-palindrome': { Component: LongestPalindromeAnimation, totalSteps: 5 },
  'lcs': { Component: LCSAnimation, totalSteps: 6 },
  'edit-distance': { Component: EditDistanceAnimation, totalSteps: 6 },
  'sort-colors': { Component: SortColorsAnimation, totalSteps: 6 },
  'next-permutation': { Component: NextPermutationAnimation, totalSteps: 5 },
  'find-duplicate': { Component: FindDuplicateAnimation, totalSteps: 6 },

  // ---- 旧卡片占位动画修正 ----
  'contains-duplicate': { Component: ContainsDuplicateAnimation, totalSteps: 4 },
  'sudoku': { Component: SudokuAnimation, totalSteps: 4 },
  'missing-number': { Component: MissingNumberAnimation, totalSteps: 3 },
  'min-stack': { Component: MinStackAnimation, totalSteps: 7 },
  'rpn': { Component: RPNAnimation, totalSteps: 7 },
  'subsequence': { Component: SubsequenceAnimation, totalSteps: 5 },
  'quickselect': { Component: QuickSelectAnimation, totalSteps: 5 },
  'top-k-bucket': { Component: TopKBucketAnimation, totalSteps: 4 },
  'word-break-dp': { Component: WordBreakDPAnimation, totalSteps: 3 },
  'knapsack': { Component: KnapsackAnimation, totalSteps: 5 },
  'jump-game': { Component: JumpGameAnimation, totalSteps: 5 },
  'gas-station': { Component: GasStationAnimation, totalSteps: 5 },
  'single-xor': { Component: SingleXorAnimation, totalSteps: 5 },
  'hamming-weight': { Component: HammingWeightAnimation, totalSteps: 4 },
  'count-bits': { Component: CountBitsAnimation, totalSteps: 6 },
  'palindrome-num': { Component: PalindromeNumAnimation, totalSteps: 5 },
  'word-search': { Component: WordSearchAnimation, totalSteps: 6 },
  'topo-sort': { Component: TopoSortAnimation, totalSteps: 6 },
}
