import React from 'react'
import type { AnimationKey, AnimationProps } from '../../data/types'

// 动画按需加载：翻到卡片背面时才下载对应动画模块，避免单包过大
const lazyAnim = <T extends React.ComponentType<AnimationProps>>(
  loader: () => Promise<{ default: T }>,
) => React.lazy(loader)

const TwoSumAnimation = lazyAnim(() => import('./TwoSumAnimation').then((m) => ({ default: m.TwoSumAnimation })))
const GroupAnagramsAnimation = lazyAnim(() => import('./GroupAnagramsAnimation').then((m) => ({ default: m.GroupAnagramsAnimation })))
const LongestConsecutiveAnimation = lazyAnim(() => import('./LongestConsecutiveAnimation').then((m) => ({ default: m.LongestConsecutiveAnimation })))
const MoveZeroesAnimation = lazyAnim(() => import('./MoveZeroesAnimation').then((m) => ({ default: m.MoveZeroesAnimation })))
const MaxAreaAnimation = lazyAnim(() => import('./MaxAreaAnimation').then((m) => ({ default: m.MaxAreaAnimation })))
const ThreeSumAnimation = lazyAnim(() => import('./ThreeSumAnimation').then((m) => ({ default: m.ThreeSumAnimation })))
const TrapRainWaterAnimation = lazyAnim(() => import('./TrapRainWaterAnimation').then((m) => ({ default: m.TrapRainWaterAnimation })))
const LongestSubstringAnimation = lazyAnim(() => import('./LongestSubstringAnimation').then((m) => ({ default: m.LongestSubstringAnimation })))
const FindAnagramsAnimation = lazyAnim(() => import('./FindAnagramsAnimation').then((m) => ({ default: m.FindAnagramsAnimation })))
const SubarraySumAnimation = lazyAnim(() => import('./SubarraySumAnimation').then((m) => ({ default: m.SubarraySumAnimation })))
const MaxSlidingWindowAnimation = lazyAnim(() => import('./MaxSlidingWindowAnimation').then((m) => ({ default: m.MaxSlidingWindowAnimation })))
const MinWindowAnimation = lazyAnim(() => import('./MinWindowAnimation').then((m) => ({ default: m.MinWindowAnimation })))
const MaxSubArrayAnimation = lazyAnim(() => import('./MaxSubArrayAnimation').then((m) => ({ default: m.MaxSubArrayAnimation })))
const MergeIntervalsAnimation = lazyAnim(() => import('./MergeIntervalsAnimation').then((m) => ({ default: m.MergeIntervalsAnimation })))
const RotateArrayAnimation = lazyAnim(() => import('./RotateArrayAnimation').then((m) => ({ default: m.RotateArrayAnimation })))
const ValidAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.ValidAnimation })))
const MajorityAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.MajorityAnimation })))
const StockAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.StockAnimation })))
const ValidPalindromeAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.ValidPalindromeAnimation })))
const TwoSumSortedAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.TwoSumSortedAnimation })))
const MergeSortedAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.MergeSortedAnimation })))
const BinarySearchStdAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.BinarySearchStdAnimation })))
const SearchRotatedAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.SearchRotatedAnimation })))
const FindMinAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.FindMinAnimation })))
const MinWindowGenAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.MinWindowGenAnimation })))
const ValidParenAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.ValidParenAnimation })))
const DailyTempAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.DailyTempAnimation })))
const ReverseLLAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.ReverseLLAnimation })))
const MergeLLAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.MergeLLAnimation })))
const TreeBFSAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.TreeBFSAnimation })))
const InvertTreeAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.InvertTreeAnimation })))
const LCAAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.LCAAnimation })))
const IslandsAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.IslandsAnimation })))
const RottenAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.RottenAnimation })))
const ClimbingAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.ClimbingAnimation })))
const HouseRobberAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.HouseRobberAnimation })))
const CoinChangeAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.CoinChangeAnimation })))
const LISAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.LISAnimation })))
const KadaneAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.KadaneAnimation })))
const UniquePathsAnimation = lazyAnim(() => import('./GeneratedAnimations').then((m) => ({ default: m.UniquePathsAnimation })))
const ProductExceptSelfAnimation = lazyAnim(() => import('./ArrayAnimations2').then((m) => ({ default: m.ProductExceptSelfAnimation })))
const FirstMissingAnimation = lazyAnim(() => import('./ArrayAnimations2').then((m) => ({ default: m.FirstMissingAnimation })))
const SortColorsAnimation = lazyAnim(() => import('./ArrayAnimations2').then((m) => ({ default: m.SortColorsAnimation })))
const NextPermutationAnimation = lazyAnim(() => import('./ArrayAnimations2').then((m) => ({ default: m.NextPermutationAnimation })))
const FindDuplicateAnimation = lazyAnim(() => import('./ArrayAnimations2').then((m) => ({ default: m.FindDuplicateAnimation })))
const QuickSelectAnimation = lazyAnim(() => import('./ArrayAnimations2').then((m) => ({ default: m.QuickSelectAnimation })))
const CycleList1Animation = lazyAnim(() => import('./ListAnimations2').then((m) => ({ default: m.CycleList1Animation })))
const CycleList2Animation = lazyAnim(() => import('./ListAnimations2').then((m) => ({ default: m.CycleList2Animation })))
const IntersectionLLAnimation = lazyAnim(() => import('./ListAnimations2').then((m) => ({ default: m.IntersectionLLAnimation })))
const CopyRandomAnimation = lazyAnim(() => import('./ListAnimations2').then((m) => ({ default: m.CopyRandomAnimation })))
const MergeKListsAnimation = lazyAnim(() => import('./ListAnimations2').then((m) => ({ default: m.MergeKListsAnimation })))
const LRUAnimation = lazyAnim(() => import('./DesignAnimations').then((m) => ({ default: m.LRUAnimation })))
const MedianStreamAnimation = lazyAnim(() => import('./DesignAnimations').then((m) => ({ default: m.MedianStreamAnimation })))
const BuildTreeAnimation = lazyAnim(() => import('./TreeAnimations2').then((m) => ({ default: m.BuildTreeAnimation })))
const DecodeStringAnimation = lazyAnim(() => import('./StackAnimations2').then((m) => ({ default: m.DecodeStringAnimation })))
const LongestValidParenAnimation = lazyAnim(() => import('./StackAnimations2').then((m) => ({ default: m.LongestValidParenAnimation })))
const MinStackAnimation = lazyAnim(() => import('./StackAnimations2').then((m) => ({ default: m.MinStackAnimation })))
const LargestRectangleAnimation = lazyAnim(() => import('./HistogramAnimation').then((m) => ({ default: m.LargestRectangleAnimation })))
const LongestPalindromeAnimation = lazyAnim(() => import('./StringAnimations2').then((m) => ({ default: m.LongestPalindromeAnimation })))
const MedianTwoArraysAnimation = lazyAnim(() => import('./MedianTwoAnimation').then((m) => ({ default: m.MedianTwoArraysAnimation })))
const HammingWeightAnimation = lazyAnim(() => import('./BitAnimations').then((m) => ({ default: m.HammingWeightAnimation })))
const PalindromeNumAnimation = lazyAnim(() => import('./BitAnimations').then((m) => ({ default: m.PalindromeNumAnimation })))
const PascalTriangleAnimation = lazyAnim(() => import('./PascalAnimation').then((m) => ({ default: m.PascalTriangleAnimation })))
const TopoSortAnimation = lazyAnim(() => import('./TopoAnimation').then((m) => ({ default: m.TopoSortAnimation })))
const TopKBucketAnimation = lazyAnim(() => import('./TopoAnimation').then((m) => ({ default: m.TopKBucketAnimation })))
const InorderAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.InorderAnimation })))
const SymmetricTreeAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.SymmetricTreeAnimation })))
const SortedToBstAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.SortedToBstAnimation })))
const RightViewAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.RightViewAnimation })))
const FlattenTreeAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.FlattenTreeAnimation })))
const PathSum3Animation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.PathSum3Animation })))
const MaxPathSumAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.MaxPathSumAnimation })))
const TrieAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.TrieAnimation })))
const PalindromePartitionAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.PalindromePartitionAnimation })))
const SwapPairsAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.SwapPairsAnimation })))
const ReverseKGroupAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.ReverseKGroupAnimation })))
const PalindromeLlAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.PalindromeLlAnimation })))
const SortListAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.SortListAnimation })))
const SearchInsertAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.SearchInsertAnimation })))
const FirstLastAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.FirstLastAnimation })))
const ContainsDuplicateAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.ContainsDuplicateAnimation })))
const MissingNumberAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.MissingNumberAnimation })))
const SingleXorAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.SingleXorAnimation })))
const JumpGameAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.JumpGameAnimation })))
const JumpGame2Animation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.JumpGame2Animation })))
const GasStationAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.GasStationAnimation })))
const PartitionLabelsAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.PartitionLabelsAnimation })))
const RPNAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.RPNAnimation })))
const CountBitsAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.CountBitsAnimation })))
const WordBreakDPAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.WordBreakDPAnimation })))
const PerfectSquaresAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.PerfectSquaresAnimation })))
const KnapsackAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.KnapsackAnimation })))
const SubsequenceAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.SubsequenceAnimation })))
const LCSAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.LCSAnimation })))
const EditDistanceAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.EditDistanceAnimation })))
const SetZeroesAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.SetZeroesAnimation })))
const SpiralMatrixAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.SpiralMatrixAnimation })))
const RotateImageAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.RotateImageAnimation })))
const Search2d2Animation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.Search2d2Animation })))
const MinPathSumAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.MinPathSumAnimation })))
const NQueensAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.NQueensAnimation })))
const SudokuAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.SudokuAnimation })))
const WordSearchAnimation = lazyAnim(() => import('./GeneratedAnimations2').then((m) => ({ default: m.WordSearchAnimation })))

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
