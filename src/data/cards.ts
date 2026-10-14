import type { CardData } from './types'
import { EXTRA_CARDS } from './cards-extra'
import { HOT100_CARDS } from './cards-hot100'

export const CARDS: CardData[] = [
  {
    id: '1',
    leetcodeNo: 1,
    title: '两数之和',
    difficulty: 'easy',
    tags: ['哈希表', '数组'],
    brief: '在数组中找到和为 target 的两个数，返回它们的下标。',
    insight:
      '一遍遍历：每到一个元素，先查「需要配对的数」是否已经在哈希表里，在就直接返回，不在就把当前数存进去。',
    derivation: [
      '暴力做法是双重循环，O(n²)。优化的关键是用空间换时间：把「已经看过的数」存起来。',
      '遍历到 nums[i] 时，需要 complement = target - nums[i]。如果 complement 出现过，答案就是它的下标和 i。',
      '否则把 nums[i] → i 存入哈希表，继续向后走。',
      '题目保证有且仅有一个解，所以遇到即返回。',
    ],
    code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>() // 值 -> 下标
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]
    if (map.has(need)) return [map.get(need)!, i]
    map.set(nums[i], i)
  }
  return []
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '不能先把所有数一次性塞进 map 再查，会导致同一元素被用两次（虽然本题可过，但写法不优雅）。',
      '返回的是下标，不是值；注意重复元素时 map 存的是「最近一次」的下标。',
    ],
    animation: 'two-sum',
  },
  {
    id: '49',
    leetcodeNo: 49,
    title: '字母异位词分组',
    difficulty: 'medium',
    tags: ['哈希表', '字符串'],
    brief: '把字母异位词（字母相同但排列不同）分到同一组。',
    insight:
      '异位词排序后一定相同 —— 把排序后的字符串当作哈希 key，原字符串作为 value 塞进数组，最后 values 就是分组。',
    derivation: [
      '判断两个词是否是异位词，最朴素的办法是排序后比较（"eat"、"tea"、"ate" 排序后都是 "aet"）。',
      '遍历每个字符串，计算它的「排序后形式」作为 key。',
      '用 Map<key, string[]> 把原串 push 进去。',
      '最后返回 Array.from(map.values())。',
      '进阶：字母只有 26 个时，可以用计数数组 "a1b2..." 作为 key，避免排序的 O(k log k)。',
    ],
    code: `function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>()
  for (const s of strs) {
    const key = s.split('').sort().join('')
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(s)
  }
  return Array.from(map.values())
}`,
    timeComplexity: 'O(n · k log k)，k 为最长字符串长度',
    spaceComplexity: 'O(n · k)',
    pitfalls: [
      '空字符串 "" 也是合法输入，排序后 key 为 ""，要正常分组。',
      '不要用对象 {} 当 Map，会把数字 key 强转字符串；用 Map 更稳。',
    ],
    animation: 'group-anagrams',
  },
  {
    id: '128',
    leetcodeNo: 128,
    title: '最长连续序列',
    difficulty: 'medium',
    tags: ['哈希表', '并查集'],
    brief: '未排序数组中，找出最长连续整数序列的长度。',
    insight:
      '只从「序列起点」开始数：如果 x-1 在集合里，说明 x 不是起点，直接跳过；否则从 x 开始 while 递增，统计长度。',
    derivation: [
      '先把所有数塞进 Set，O(1) 判断存在性。',
      '遍历每个数 x：如果 x-1 不在 set 里，x 是某个连续段的起点。',
      '从 x 开始，不断查 x+1、x+2… 是否在 set 中，记录连续长度。',
      '因为每个数最多被访问两次（一次当起点、一次被向右扫过），整体 O(n)。',
    ],
    code: `function longestConsecutive(nums: number[]): number {
  const set = new Set(nums)
  let best = 0
  for (const x of set) {
    if (set.has(x - 1)) continue // 不是起点
    let cur = x, len = 1
    while (set.has(cur + 1)) { cur++; len++ }
    best = Math.max(best, len)
  }
  return best
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '必须遍历 set 而不是 nums，否则重复元素会让起点判断失效。',
      '不能先排序，排序是 O(n log n)，题目要求 O(n)。',
    ],
    animation: 'longest-consecutive',
  },
  {
    id: '283',
    leetcodeNo: 283,
    title: '移动零',
    difficulty: 'easy',
    tags: ['双指针', '数组'],
    brief: '把所有 0 移到数组末尾，保持非零元素相对顺序，原地完成。',
    insight:
      '快慢指针：慢指针指向「下一个非零元素该放的位置」，快指针扫到非零就交换过来。',
    derivation: [
      '用指针 j 指向已处理区间的末尾（下一个非零位置）。',
      '遍历 i：遇到 nums[i] !== 0，就把 nums[i] 换到 j 位置，j++。',
      '遍历结束后，[j, n) 全是 0。',
      '这种写法等价于「先把非零元素全部前移，再补 0」，但只遍历一次。',
    ],
    code: `function moveZeroes(nums: number[]): void {
  let j = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]]
      j++
    }
  }
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '不要用 splice，splice 是 O(n)，整体变成 O(n²)。',
      '原地修改，不能返回新数组。',
    ],
    animation: 'move-zeroes',
  },
  {
    id: '11',
    leetcodeNo: 11,
    title: '盛最多水的容器',
    difficulty: 'medium',
    tags: ['双指针', '贪心'],
    brief: '选两条线使容器装水最多，面积 = 长 × min(高)。',
    insight:
      '左右指针从两端向中间收缩：面积由短板决定，所以每次移动较矮的那根指针才可能让面积变大。',
    derivation: [
      '左指针在最左、右指针在最右，此时宽度最大。',
      '面积 = width × min(h[l], h[r])。',
      '如果移动较高的那根：宽度变小，短板不变或更小，面积必然不增。',
      '所以必须移动较矮的那根，才可能遇到更高的板子从而让面积变大。',
      '直到两指针相遇，过程中记录最大面积。',
    ],
    code: `function maxArea(height: number[]): number {
  let l = 0, r = height.length - 1, ans = 0
  while (l < r) {
    const area = (r - l) * Math.min(height[l], height[r])
    ans = Math.max(ans, area)
    if (height[l] < height[r]) l++
    else r--
  }
  return ans
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '面积取的是 min(高)，不是 max。',
      '移动高板是无意义的，容易写反。',
    ],
    animation: 'max-area',
  },
  {
    id: '15',
    leetcodeNo: 15,
    title: '三数之和',
    difficulty: 'medium',
    tags: ['双指针', '排序', '数组'],
    brief: '找出所有和为 0 的三元组，不能重复。',
    insight:
      '排序后固定一个数 nums[i]，再在剩余区间用左右双指针找两数之和为 -nums[i]；外层和内层都要去重。',
    derivation: [
      '先排序，方便去重和双指针。',
      '枚举第一个数 a = nums[i]，当 a > 0 时可直接 break（后面都更大，不可能凑成 0）。',
      '在 [i+1, n) 区间用 l、r 双指针：sum = a + nums[l] + nums[r]。',
      'sum === 0 时记录，并跳过重复的 nums[l]、nums[r]；sum < 0 时 l++，否则 r--。',
      '外层枚举 a 时也要跳过重复值。',
    ],
    code: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b)
  const res: number[][] = []
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break
    if (i > 0 && nums[i] === nums[i - 1]) continue
    let l = i + 1, r = nums.length - 1
    while (l < r) {
      const s = nums[i] + nums[l] + nums[r]
      if (s === 0) {
        res.push([nums[i], nums[l], nums[r]])
        while (l < r && nums[l] === nums[l + 1]) l++
        while (l < r && nums[r] === nums[r - 1]) r--
        l++; r--
      } else if (s < 0) l++
      else r--
    }
  }
  return res
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(log n)（排序递归栈）',
    pitfalls: [
      '去重是本题最容易漏的地方：外层 i 和找到解后的 l、r 都要跳过重复值。',
      '找到一组解后不能只动一个指针，必须同时 l++、r--，否则会错过其他组合。',
    ],
    animation: 'three-sum',
  },
  {
    id: '42',
    leetcodeNo: 42,
    title: '接雨水',
    difficulty: 'hard',
    tags: ['双指针', '栈', '动态规划'],
    brief: '给定高度图，计算下雨后能接多少单位的雨水。',
    insight:
      '每根柱子能接的水 = min(左边最高, 右边最高) - 当前高度。双指针法始终维护较矮一侧的最大高度，从矮侧向内推进。',
    derivation: [
      '位置 i 能接多少水，取决于它左右两侧最高柱子中较矮的那根。',
      '用双指针 l、r，同时维护 leftMax 和 rightMax。',
      '若 leftMax < rightMax：l 位置的水量由 leftMax 决定（因为右侧更高），可以确定并累加，然后 l++。',
      '反之 r 位置的水量由 rightMax 决定，累加后 r--。',
      '整体一次遍历完成，不需要预先计算左右最大数组。',
    ],
    code: `function trap(height: number[]): number {
  let l = 0, r = height.length - 1
  let leftMax = 0, rightMax = 0, ans = 0
  while (l < r) {
    if (height[l] < height[r]) {
      if (height[l] >= leftMax) leftMax = height[l]
      else ans += leftMax - height[l]
      l++
    } else {
      if (height[r] >= rightMax) rightMax = height[r]
      else ans += rightMax - height[r]
      r--
    }
  }
  return ans
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '更新 max 的顺序：先和当前高度比较、决定是「更新 max」还是「积水」，不能颠倒。',
      '空数组、单元素要返回 0。',
    ],
    animation: 'trap-rain-water',
  },
  {
    id: '3',
    leetcodeNo: 3,
    title: '无重复字符的最长子串',
    difficulty: 'medium',
    tags: ['滑动窗口', '哈希表'],
    brief: '找出不含重复字符的最长子串长度。',
    insight:
      '滑动窗口 [l, r] 始终保持无重复：r 右移时若 s[r] 在窗口内出现过，就把 l 跳到该字符上次出现位置的下一格。',
    derivation: [
      '用哈希表记录每个字符最近一次出现的下标。',
      'r 向右扩展窗口。若 s[r] 之前出现过且其位置 ≥ l，说明窗口内重复，l 必须跳到上次位置 + 1。',
      '每步都更新最大长度 r - l + 1。',
      '本质上是「窗口右端点每步 +1，左端点按需跳跃」。',
    ],
    code: `function lengthOfLongestSubstring(s: string): number {
  const lastPos = new Map<string, number>()
  let l = 0, ans = 0
  for (let r = 0; r < s.length; r++) {
    const ch = s[r]
    if (lastPos.has(ch) && lastPos.get(ch)! >= l) {
      l = lastPos.get(ch)! + 1
    }
    lastPos.set(ch, r)
    ans = Math.max(ans, r - l + 1)
  }
  return ans
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(Σ)，Σ 为字符集大小',
    pitfalls: [
      '判断重复时必须加 `lastPos.get(ch) >= l`，否则会把窗口外的旧位置当成重复。',
      'l 只能向前走，不能回退。',
    ],
    animation: 'longest-substring',
  },
  {
    id: '438',
    leetcodeNo: 438,
    title: '找到字符串中所有字母异位词',
    difficulty: 'medium',
    tags: ['滑动窗口', '字符串'],
    brief: '在 s 中找出所有 p 的字母异位词子串的起始下标。',
    insight:
      '固定长度为 p.length 的滑动窗口，用 26 位计数数组比较窗口内字符计数与 p 的计数；每次只滑动一格，O(1) 更新计数。',
    derivation: [
      'p 长度为 m，s 长度为 n。窗口长度固定为 m。',
      '先统计 p 的字符计数 pCount。',
      '第一个窗口 [0, m) 统计 sCount，与 pCount 比较。',
      '窗口右移一格：左边界字符计数 -1，右边界字符计数 +1，再比较。',
      '计数数组相等时（26 次比较），记录左边界下标。',
    ],
    code: `function findAnagrams(s: string, p: string): number[] {
  if (s.length < p.length) return []
  const pCount = new Array(26).fill(0)
  const wCount = new Array(26).fill(0)
  const a = 'a'.charCodeAt(0)
  for (const ch of p) pCount[ch.charCodeAt(0) - a]++
  const res: number[] = []
  for (let i = 0; i < s.length; i++) {
    wCount[s.charCodeAt(i) - a]++
    if (i >= p.length) wCount[s.charCodeAt(i - p.length) - a]--
    if (i >= p.length - 1 && wCount.every((v, k) => v === pCount[k])) {
      res.push(i - p.length + 1)
    }
  }
  return res
}`,
    timeComplexity: 'O(n · 26) = O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '窗口长度固定为 p.length，不要和「无重复最长子串」混淆。',
      'i 从 0 开始，要等窗口装满（i >= m-1）才开始比较。',
    ],
    animation: 'find-anagrams',
  },
  {
    id: '560',
    leetcodeNo: 560,
    title: '和为 K 的子数组',
    difficulty: 'medium',
    tags: ['哈希表', '前缀和'],
    brief: '统计和为 k 的连续子数组个数。',
    insight:
      '前缀和 + 哈希：当 prefixSum[i] - prefixSum[j] = k 时，子数组 (j, i] 的和就是 k。问题变成「有多少个 j 满足 prefixSum[j] = prefixSum[i] - k」。',
    derivation: [
      '定义 prefix[i] = nums[0] + ... + nums[i]。子数组和 = prefix[r] - prefix[l-1]。',
      '遍历 i 时维护当前前缀和 cur。',
      '要找之前出现过多少次 cur - k，因为那些位置之后到 i 的子数组和就是 k。',
      '用 Map<preSum, count> 统计，初始放入 {0: 1} 表示空前缀。',
      '答案累加 count[cur - k]，然后把 cur 本身计数 +1。',
    ],
    code: `function subarraySum(nums: number[], k: number): number {
  const map = new Map<number, number>([[0, 1]])
  let cur = 0, ans = 0
  for (const x of nums) {
    cur += x
    ans += map.get(cur - k) ?? 0
    map.set(cur, (map.get(cur) ?? 0) + 1)
  }
  return ans
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '必须先查再更新，否则会把当前元素自己算进去（k=0 时尤其明显）。',
      '初始化 {0: 1} 是为了处理「从 0 到 i 本身就是 k」的情况。',
    ],
    animation: 'subarray-sum',
  },
  {
    id: '239',
    leetcodeNo: 239,
    title: '滑动窗口最大值',
    difficulty: 'hard',
    tags: ['单调队列', '堆'],
    brief: '大小为 k 的滑动窗口每次右移一步，返回每个窗口的最大值。',
    insight:
      '维护一个单调递减的双端队列（存下标）：队列头部永远是当前窗口最大值。新元素从队尾弹出所有比它小的元素，再入队；头部下标越界就弹出。',
    derivation: [
      '用 deque 存下标，保证队列中下标对应的值是单调递减的。',
      '每来一个新元素 nums[i]：从队尾弹出所有 <= nums[i] 的下标（它们再也不可能成为最大值）。',
      '把 i 入队。',
      '如果队头下标已经 <= i - k（滑出窗口），从队头弹出。',
      '当 i >= k - 1 时，队头就是当前窗口最大值。',
    ],
    code: `function maxSlidingWindow(nums: number[], k: number): number[] {
  const deq: number[] = []
  const res: number[] = []
  for (let i = 0; i < nums.length; i++) {
    while (deq.length && nums[deq[deq.length - 1]] <= nums[i]) deq.pop()
    deq.push(i)
    while (deq[0] <= i - k) deq.shift()
    if (i >= k - 1) res.push(nums[deq[0]])
  }
  return res
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    pitfalls: [
      '队列里存的是下标不是值，否则无法判断元素是否滑出窗口。',
      '弹出队尾时用 <= 而不是 <，等于的旧元素可以扔掉。',
    ],
    animation: 'max-sliding-window',
  },
  {
    id: '76',
    leetcodeNo: 76,
    title: '最小覆盖子串',
    difficulty: 'hard',
    tags: ['滑动窗口', '哈希表'],
    brief: '在 s 中找出包含 t 所有字符（含重复）的最短子串。',
    insight:
      '可变长度滑动窗口：先不断右移 r 直到窗口满足条件，再尽量右移 l 缩短窗口，每次合法时更新最短长度。',
    derivation: [
      '统计 t 的字符计数 need，窗口计数 have。',
      '用「满足条件的字符种类数」formed 和 need 对比，避免每次 O(26) 比较。',
      'r 右移，把 s[r] 计入 have；当某字符计数达到 need 时 formed++。',
      'formed 达标时，尝试左移 l 缩小窗口：弹出 s[l]，更新 formed。',
      '每缩小一步都检查当前窗口长度，记录最短的起止位置。',
    ],
    code: `function minWindow(s: string, t: string): string {
  const need = new Map<string, number>()
  for (const ch of t) need.set(ch, (need.get(ch) ?? 0) + 1)
  const have = new Map<string, number>()
  let formed = 0, required = need.size
  let l = 0, best = '', bestLen = Infinity
  for (let r = 0; r < s.length; r++) {
    const ch = s[r]
    have.set(ch, (have.get(ch) ?? 0) + 1)
    if (need.has(ch) && have.get(ch)! === need.get(ch)) formed++
    while (formed === required && l <= r) {
      const len = r - l + 1
      if (len < bestLen) { bestLen = len; best = s.slice(l, r + 1) }
      const lch = s[l]
      have.set(lch, have.get(lch)! - 1)
      if (need.has(lch) && have.get(lch)! < need.get(lch)!) formed--
      l++
    }
  }
  return best
}`,
    timeComplexity: 'O(|s| + |t|)',
    spaceComplexity: 'O(|Σ|)',
    pitfalls: [
      't 中可能有重复字符（如 "AAB"），计数必须精确匹配。',
      '内层 while 可以连续收缩 l，不要写成 if。',
    ],
    animation: 'min-window',
  },
  {
    id: '53',
    leetcodeNo: 53,
    title: '最大子数组和',
    difficulty: 'medium',
    tags: ['动态规划', 'Kadane'],
    brief: '求连续子数组的最大和。',
    insight:
      'Kadane：以 i 结尾的最大子数组和 dp[i] = max(nums[i], dp[i-1] + nums[i])。要么从 i 重新开始，要么接在前面。',
    derivation: [
      '定义 dp[i] 为「以 i 结尾的连续子数组的最大和」。',
      '决策：nums[i] 是单独一段（前面是负数、拖累和），还是接在 dp[i-1] 后面。',
      '所以 dp[i] = max(nums[i], dp[i-1] + nums[i])。',
      '答案是 max(dp[0..n-1])。',
      '空间上可优化为一个变量 cur：cur = max(x, cur + x)，ans = max(ans, cur)。',
    ],
    code: `function maxSubArray(nums: number[]): number {
  let cur = nums[0], ans = nums[0]
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i])
    ans = Math.max(ans, cur)
  }
  return ans
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '数组全为负数时，答案是最大的负数（不是 0），所以初始化为 nums[0]。',
      '必须是连续子数组，不能挑着选。',
    ],
    animation: 'max-subarray',
  },
  {
    id: '56',
    leetcodeNo: 56,
    title: '合并区间',
    difficulty: 'medium',
    tags: ['排序', '数组'],
    brief: '合并所有重叠区间，返回不重叠区间数组。',
    insight:
      '按左端点排序后，遍历时若当前区间左端点 <= 结果最后一个区间的右端点，就合并（更新右端点为 max），否则独立加入。',
    derivation: [
      '按区间左端点升序排序。',
      '第一个区间直接放入结果。',
      '遍历后续区间 [s, e]：若 s <= lastEnd，说明重叠，合并为 [lastStart, max(lastEnd, e)]。',
      '否则追加为新区间。',
      '排序后只需一次扫描即可完成合并。',
    ],
    code: `function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0])
  const res: number[][] = [intervals[0]]
  for (let i = 1; i < intervals.length; i++) {
    const last = res[res.length - 1]
    const [s, e] = intervals[i]
    if (s <= last[1]) last[1] = Math.max(last[1], e)
    else res.push([s, e])
  }
  return res
}`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '合并时右端点取 max，不能直接赋值成新区间的右端点（如 [1,5] 和 [2,3]）。',
      '必须先按左端点排序，否则合并逻辑不成立。',
    ],
    animation: 'merge-intervals',
  },
  {
    id: '189',
    leetcodeNo: 189,
    title: '轮转数组',
    difficulty: 'medium',
    tags: ['数组', '数学'],
    brief: '将数组向右轮转 k 个位置，原地完成。',
    insight:
      '三次反转：先整体反转，再反转前 k%n 个，最后反转后 n-k%n 个。',
    derivation: [
      'k 可能大于 n，先 k = k % n。',
      '整体反转：[1,2,3,4,5,6,7] → [7,6,5,4,3,2,1]。',
      '反转前 k 个：[7,6,5 | 4,3,2,1] → [5,6,7 | 4,3,2,1]。',
      '反转后 n-k 个：[5,6,7 | 4,3,2,1] → [5,6,7 | 1,2,3,4]。',
      '三次反转 O(n)、O(1) 完成。',
    ],
    code: `function rotate(nums: number[], k: number): void {
  const n = nums.length
  k = k % n
  const reverse = (l: number, r: number) => {
    while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r-- }
  }
  reverse(0, n - 1)
  reverse(0, k - 1)
  reverse(k, n - 1)
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      'k 要先对 n 取模，否则越界。',
      '三次反转顺序不能颠倒。',
    ],
    animation: 'rotate-array',
  },
  ...EXTRA_CARDS,
  ...HOT100_CARDS,
]
