import type { CardData } from './types'

/**
 * 官方热题 100 补全卡片（共 44 张，与前 75 张合并后覆盖全部 100 题）。
 * 顺序：普通数组 → 矩阵 → 链表 → 二叉树 → 图/Trie → 回溯 → 二分 → 栈 → 堆 → 贪心 → 一维 DP → 多维 DP → 技巧。
 */
export const HOT100_CARDS: CardData[] = [
  /* ==================== 普通数组 ==================== */
  {
    id: '238',
    leetcodeNo: 238,
    title: '除自身以外数组的乘积',
    difficulty: 'medium',
    tags: ['前缀和', '数组'],
    brief: '返回 answer[i]，其值等于除 nums[i] 之外其余所有元素的乘积，且不能用除法。',
    insight:
      'answer[i] = 左侧前缀积 × 右侧后缀积。第一遍左扫填前缀积，第二遍右扫用一个 suffix 变量乘进去，结果数组本身不算额外空间。',
    derivation: [
      '左扫：answer[0] = 1；answer[i] = answer[i-1] × nums[i-1]。',
      '右扫：维护 suffix = 1，表示当前位置右侧所有数的乘积。',
      'answer[i] ×= suffix，再更新 suffix ×= nums[i]。',
      '两遍 O(n) 遍历即可，不需要除法，也能正确处理含 0 的数组。',
    ],
    code: `function productExceptSelf(nums: number[]): number[] {
  const n = nums.length
  const ans = new Array(n).fill(1)
  for (let i = 1; i < n; i++) ans[i] = ans[i - 1] * nums[i - 1]
  let suffix = 1
  for (let i = n - 1; i >= 0; i--) {
    ans[i] *= suffix
    suffix *= nums[i]
  }
  return ans
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)（不计结果数组）',
    pitfalls: [
      'suffix 初始为 1，不是 0。',
      '不能用除法：数组中只要有一个 0，除法就直接失效。',
    ],
    animation: 'product-except-self',
  },
  {
    id: '41',
    leetcodeNo: 41,
    title: '缺失的第一个正数',
    difficulty: 'hard',
    tags: ['哈希表', '原地算法'],
    brief: '在未排序数组中找出没有出现的最小正整数，要求 O(n) 时间、O(1) 额外空间。',
    insight:
      '把数组本身当哈希表：数值 i+1 应该放在下标 i 的位置。通过循环交换把所有数归位，再扫描第一个「不在其位」的位置。',
    derivation: [
      '答案一定落在 1..n+1，因此 1..n 之外的数（负数、0、大于 n）不用管。',
      '对每个 i，while 交换 nums[i] 与 nums[nums[i]-1]，直到 nums[i] 不在 1..n 或已归位。',
      '再扫描：第一个 nums[i] !== i+1 的位置，答案就是 i+1。',
      '全部归位则答案为 n+1。每个数最多归位一次，总 O(n)。',
    ],
    code: `function firstMissingPositive(nums: number[]): number {
  const n = nums.length
  for (let i = 0; i < n; i++) {
    while (
      nums[i] >= 1 && nums[i] <= n &&
      nums[nums[i] - 1] !== nums[i]
    ) {
      const j = nums[i] - 1
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
    }
  }
  for (let i = 0; i < n; i++) if (nums[i] !== i + 1) return i + 1
  return n + 1
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '必须是 while 不断交换，单次 if 不能保证一次归位。',
      '重复值会导致死循环，必须加 nums[nums[i]-1] !== nums[i] 条件。',
    ],
    animation: 'first-missing',
  },

  /* ==================== 矩阵 ==================== */
  {
    id: '73',
    leetcodeNo: 73,
    title: '矩阵置零',
    difficulty: 'medium',
    tags: ['矩阵', '哈希表'],
    brief: '若某个元素为 0，则把它所在的整行和整列都置为 0，原地修改。',
    insight:
      '用矩阵的第一行、第一列作为标记位（避免 O(m+n) 空间），再用两个布尔变量单独记录首行首列本身是否含 0。',
    derivation: [
      '先扫一遍：首列含 0 记 firstCol，首行含 0 记 firstRow。',
      '再扫内部 (i,j)：若为 0，就把 m[i][0] 和 m[0][j] 标记为 0。',
      '根据标记把内部置零：m[i][0] 或 m[0][j] 为 0 则 m[i][j]=0。',
      '最后根据 firstRow、firstCol 决定是否清空首行、首列。',
    ],
    code: `function setZeroes(m: number[][]): void {
  const rows = m.length, cols = m[0].length
  let firstRow = false, firstCol = false
  for (let i = 0; i < rows; i++) if (m[i][0] === 0) firstCol = true
  for (let j = 0; j < cols; j++) if (m[0][j] === 0) firstRow = true
  for (let i = 1; i < rows; i++)
    for (let j = 1; j < cols; j++)
      if (m[i][j] === 0) { m[i][0] = 0; m[0][j] = 0 }
  for (let i = 1; i < rows; i++)
    for (let j = 1; j < cols; j++)
      if (m[i][0] === 0 || m[0][j] === 0) m[i][j] = 0
  if (firstRow) for (let j = 0; j < cols; j++) m[0][j] = 0
  if (firstCol) for (let i = 0; i < rows; i++) m[i][0] = 0
}`,
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '不能边发现边置零，否则新产生的 0 会连锁污染整阵。',
      '首行首列的标记会被覆盖，必须最后处理。',
    ],
    animation: 'set-zeroes',
  },
  {
    id: '54',
    leetcodeNo: 54,
    title: '螺旋矩阵',
    difficulty: 'medium',
    tags: ['矩阵', '模拟'],
    brief: '按顺时针螺旋顺序返回矩阵中的所有元素。',
    insight:
      '维护 top/bottom/left/right 四条边界，依次打印「上行、右列、下行、左列」，每打完一边收缩对应边界。',
    derivation: [
      '顶行从左到右，之后 top++。',
      '右列从上到下，之后 right--。',
      '底行从右到左（先判断 top<=bottom），之后 bottom--。',
      '左列从下到上（先判断 left<=right），之后 left++。',
    ],
    code: `function spiralOrder(matrix: number[][]): number[] {
  const res: number[] = []
  let top = 0, bottom = matrix.length - 1
  let left = 0, right = matrix[0].length - 1
  while (top <= bottom && left <= right) {
    for (let j = left; j <= right; j++) res.push(matrix[top][j]); top++
    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]); right--
    if (top <= bottom) {
      for (let j = right; j >= left; j--) res.push(matrix[bottom][j]); bottom--
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) res.push(matrix[i][left]); left++
    }
  }
  return res
}`,
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(1)（不计结果）',
    pitfalls: [
      '底行、左列打印前必须再次检查边界，奇数行/奇数列时会重复打印。',
    ],
    animation: 'spiral-matrix',
  },
  {
    id: '48',
    leetcodeNo: 48,
    title: '旋转图像',
    difficulty: 'medium',
    tags: ['矩阵', '数学'],
    brief: '将 n×n 二维矩阵原地顺时针旋转 90°。',
    insight:
      '顺时针 90° = 先沿主对角线转置（行列互换），再把每一行左右翻转；全程原地交换。',
    derivation: [
      '转置：只遍历上三角，交换 matrix[i][j] 与 matrix[j][i]。',
      '每行左右翻转：双指针交换首尾。',
      '逆时针则是「转置 + 上下翻转」。',
    ],
    code: `function rotate(matrix: number[][]): void {
  const n = matrix.length
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
  for (const row of matrix) row.reverse()
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '转置只遍历 j>i 的上三角，否则会交换两次还原。',
      '不要新建矩阵，直接在原矩阵上交换。',
    ],
    animation: 'rotate-image',
  },
  {
    id: '240',
    leetcodeNo: 240,
    title: '搜索二维矩阵 II',
    difficulty: 'medium',
    tags: ['矩阵', '二分查找'],
    brief: '矩阵每行从左到右、每列从上到下均递增，判断 target 是否存在。',
    insight:
      '从右上角（或左下角）出发：它是行的最大值、列的最小值。当前值比 target 小就下移，比 target 大就左移。',
    derivation: [
      '起点 (0, n-1)。',
      'matrix[i][j] < target：这一行都更小，i++。',
      'matrix[i][j] > target：这一列都更大，j--。',
      '最多 m+n 步，每步排除一行或一列。',
    ],
    code: `function searchMatrix(matrix: number[][], target: number): boolean {
  let i = 0, j = matrix[0].length - 1
  while (i < matrix.length && j >= 0) {
    if (matrix[i][j] === target) return true
    if (matrix[i][j] < target) i++
    else j--
  }
  return false
}`,
    timeComplexity: 'O(m + n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '不能从左上角开始，向右和向下都增大，无法决策。',
    ],
    animation: 'search-2d-2',
  },

  /* ==================== 链表 ==================== */
  {
    id: '160',
    leetcodeNo: 160,
    title: '相交链表',
    difficulty: 'easy',
    tags: ['链表', '双指针'],
    brief: '两个链表可能在某个节点相交，返回相交的起始节点；不相交返回 null。',
    insight:
      'pA 走完 A 再走 B，pB 走完 B 再走 A，两指针走过的总长度都是 a+b，必然在交点相遇（或同时为 null）。',
    derivation: [
      '设 A 独有 a 段、B 独有 b 段、公共段 c。',
      '两指针都走 a+b+c 步后会到达同一个节点。',
      '若不相交，两指针同时为 null，null === null 直接返回。',
    ],
    code: `function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  let pA = headA, pB = headB
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next
    pB = pB === null ? headA : pB.next
  }
  return pA
}`,
    timeComplexity: 'O(m + n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '走到 null 之后才换对方表头，不要提前换。',
      '两指针都为 null 时也会相等，天然处理了不相交情况。',
    ],
    animation: 'intersection-ll',
  },
  {
    id: '234',
    leetcodeNo: 234,
    title: '回文链表',
    difficulty: 'easy',
    tags: ['链表', '双指针'],
    brief: '判断单链表是否为回文，要求 O(n) 时间、O(1) 空间。',
    insight:
      '快慢指针找到中点 → 原地反转后半段链表 → 前半与后半逐对比较。',
    derivation: [
      'slow 走 1 步、fast 走 2 步，fast 到尾时 slow 在中点。',
      '从中点开始反转链表。',
      '两个指针分别从头和反转后的中点出发，比较值。',
    ],
    code: `function isPalindrome(head: ListNode | null): boolean {
  let slow = head, fast = head
  while (fast?.next) { slow = slow!.next; fast = fast.next.next }
  let prev: ListNode | null = null
  while (slow) {
    const nxt = slow.next
    slow.next = prev
    prev = slow
    slow = nxt
  }
  let p = head
  while (prev) {
    if (p!.val !== prev.val) return false
    p = p!.next; prev = prev.next
  }
  return true
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '要求 O(1) 空间时不能用栈或数组记录。',
      '奇数个节点时慢指针落在正中间，比较时跳过中间节点。',
    ],
    animation: 'palindrome-ll',
  },
  {
    id: '142',
    leetcodeNo: 142,
    title: '环形链表 II',
    difficulty: 'medium',
    tags: ['链表', '双指针'],
    brief: '若链表有环，返回环的入口节点；否则返回 null。',
    insight:
      'Floyd 两阶段：快慢指针相遇后，再用一个指针从 head 出发与 slow 同速前进，相遇点就是环的入口。',
    derivation: [
      '头到入口距离 a，入口到相遇点 b，相遇点再回入口 c。',
      '慢走 a+b、快走 a+b+c+b 时相遇，由 2 倍关系得 a = c。',
      '第二阶段从 head 放一个同速指针，与 slow 再走 a 步必在入口相遇。',
    ],
    code: `function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head, fast = head
  while (fast?.next) {
    slow = slow!.next
    fast = fast.next.next
    if (slow === fast) {
      let p = head
      while (p !== slow) {
        p = p!.next
        slow = slow!.next
      }
      return p
    }
  }
  return null
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '第二阶段必须同速，且一个指针从 head 出发。',
      'fast.next 为空说明无环，直接返回 null。',
    ],
    animation: 'cycle-2',
  },
  {
    id: '24',
    leetcodeNo: 24,
    title: '两两交换链表中的节点',
    difficulty: 'medium',
    tags: ['链表', '递归'],
    brief: '把链表相邻两个节点两两交换，不能改节点值。',
    insight:
      '用 dummy 头节点：每轮保存 a、b 两个节点，依次改 b→a→原b后继，再把 dummy 移到 a。',
    derivation: [
      'dummy.next = head，node 从 dummy 开始。',
      'a=node.next，b=a.next。',
      'node.next=b；a.next=b.next；b.next=a。',
      'node 前进到 a（交换后的第二个）。',
    ],
    code: `function swapPairs(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head)
  let node = dummy
  while (node.next?.next) {
    const a = node.next
    const b = a.next
    node.next = b
    a.next = b.next
    b.next = a
    node = a
  }
  return dummy.next
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '改指针顺序不能乱：先接 b，再把 a 接到 b 后面。',
      'node 要跳到交换后的 a，而不是 b。',
    ],
    animation: 'swap-pairs',
  },
  {
    id: '25',
    leetcodeNo: 25,
    title: 'K 个一组翻转链表',
    difficulty: 'hard',
    tags: ['链表', '双指针'],
    brief: '每 k 个节点一组进行翻转，不足 k 个的尾部保持原样。',
    insight:
      '每轮先看后面是否够 k 个节点；够则反转这一组，且反转前的 prev 指向组后的节点，保证首尾能接上。',
    derivation: [
      '从 groupPrev 出发数 k 个节点，kth 为组尾。',
      '不足 k 个直接结束（尾部不翻转）。',
      '反转区间，prev 初始指向 groupNext（组后第一个），尾部天然接上。',
      '反转后 kth 变成组头，groupPrev.next 指向它；groupPrev 前进到原组头。',
    ],
    code: `function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  const dummy = new ListNode(0, head)
  let groupPrev = dummy
  while (true) {
    let kth: ListNode | null = groupPrev
    for (let i = 0; i < k && kth; i++) kth = kth.next
    if (!kth) break
    const groupNext = kth.next
    let prev: ListNode | null = groupNext
    let cur: ListNode | null = groupPrev.next
    while (cur !== groupNext) {
      const nxt = cur!.next
      cur!.next = prev
      prev = cur
      cur = nxt
    }
    const newGroupPrev = groupPrev.next
    groupPrev.next = kth
    groupPrev = newGroupPrev!
  }
  return dummy.next
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '反转时 prev 要指向组后节点（groupNext），不能是 null。',
      '不足 k 个的最后一组必须保持原顺序。',
    ],
    animation: 'reverse-k-group',
  },
  {
    id: '138',
    leetcodeNo: 138,
    title: '随机链表的复制',
    difficulty: 'medium',
    tags: ['链表', '哈希表'],
    brief: '链表每个节点除 next 外还有 random 指针，对链表做深拷贝。',
    insight:
      '第一遍只创建新节点，用哈希表建立「原节点 → 克隆节点」的映射；第二遍通过映射表连接 next 和 random。',
    derivation: [
      '先遍历原链表，为每个节点 new 一个同值克隆存入 Map。',
      '再遍历一遍，通过 Map 查到克隆节点的 next、random。',
      '原节点的 next/random 为 null 时克隆也要置 null。',
    ],
    code: `function copyRandomList(head: Node | null): Node | null {
  if (!head) return null
  const map = new Map<Node, Node>()
  for (let p: Node | null = head; p; p = p.next) map.set(p, new Node(p.val))
  for (let p: Node | null = head; p; p = p.next) {
    const cp = map.get(p)!
    cp.next = p.next ? map.get(p.next)! : null
    cp.random = p.random ? map.get(p.random)! : null
  }
  return map.get(head)!
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '必须先把所有节点创建完再连指针，否则 random 可能指向尚未创建的节点。',
      '空链表直接返回 null。',
    ],
    animation: 'copy-random',
  },
  {
    id: '148',
    leetcodeNo: 148,
    title: '排序链表',
    difficulty: 'medium',
    tags: ['链表', '归并排序', '双指针'],
    brief: '在 O(n log n) 时间、常数额外空间内排序单链表。',
    insight:
      '自顶向下归并：快慢指针找中点并断开，递归排序两段，再复用「合并两个有序链表」的双指针合并。',
    derivation: [
      'fast 初始为 head.next，慢指针停下时即中点。',
      '从中点断开成两条链表，递归排序。',
      '用 dummy 头双指针合并两个有序链表。',
    ],
    code: `function sortList(head: ListNode | null): ListNode | null {
  if (!head?.next) return head
  let slow = head, fast = head.next
  while (fast?.next) {
    slow = slow!.next
    fast = fast.next.next
  }
  const mid = slow!.next
  slow!.next = null
  return merge(sortList(head), sortList(mid))

  function merge(a: ListNode | null, b: ListNode | null) {
    const dummy = new ListNode(0)
    let p = dummy
    while (a && b) {
      if (a.val < b.val) { p.next = a; a = a.next }
      else { p.next = b; b = b.next }
      p = p.next
    }
    p.next = a ?? b
    return dummy.next
  }
}`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n) 递归栈',
    pitfalls: [
      '分完后必须 slow.next = null 真正断开。',
      'fast 初始为 head.next 才能在偶数长度时均分。',
    ],
    animation: 'sort-list',
  },
  {
    id: '23',
    leetcodeNo: 23,
    title: '合并 K 个升序链表',
    difficulty: 'hard',
    tags: ['链表', '堆', '分治'],
    brief: '将 K 个升序链表合并为一个升序链表。',
    insight:
      '维护一个大小为 K 的小根堆，里面放每个链表的当前头节点；每次弹出堆顶接入结果，并把它的后继入堆。',
    derivation: [
      'K 个链表头先入堆。',
      '弹出最小节点接到结果尾部。',
      '该节点的后继若存在则入堆。',
      '重复直到堆空。',
    ],
    code: `function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  const heap = new MinPriorityQueue<ListNode>({ priority: (n) => n.val })
  for (const l of lists) if (l) heap.enqueue(l)
  const dummy = new ListNode(0)
  let p = dummy
  while (heap.size()) {
    const node = heap.dequeue().element
    p.next = node
    p = p.next
    if (node.next) heap.enqueue(node.next)
  }
  return dummy.next
}`,
    timeComplexity: 'O(N log k)',
    spaceComplexity: 'O(k)',
    pitfalls: [
      '空链表先过滤，不要入堆。',
      '也可以两两归并（分治），但堆最直观。',
    ],
    animation: 'merge-k-lists',
  },
  {
    id: '146',
    leetcodeNo: 146,
    title: 'LRU 缓存',
    difficulty: 'medium',
    tags: ['设计', '哈希表', '链表'],
    brief: '实现 LRU 缓存：get 和 put 都要 O(1)，容量满时淘汰最久未使用的 key。',
    insight:
      '哈希表负责 O(1) 定位，双向链表负责维护访问顺序；JS 中 Map 的迭代顺序就是插入顺序，可直接当作「最近使用链表」。',
    derivation: [
      'get 命中后 delete 再 set，把 key 刷到最新。',
      'put 也先 delete 再 set（重复 key 刷新并更新 value）。',
      'size 超过容量时，删除 Map 的第一个（最旧）key。',
    ],
    code: `class LRUCache {
  private cap: number
  private map = new Map<number, number>()
  constructor(capacity: number) { this.cap = capacity }

  get(key: number): number {
    if (!this.map.has(key)) return -1
    const v = this.map.get(key)!
    this.map.delete(key)
    this.map.set(key, v)
    return v
  }

  put(key: number, value: number): void {
    this.map.delete(key)
    this.map.set(key, value)
    if (this.map.size > this.cap)
      this.map.delete(this.map.keys().next().value)
  }
}`,
    timeComplexity: 'get / put 均为 O(1)',
    spaceComplexity: 'O(capacity)',
    pitfalls: [
      'get 也算访问，必须刷新顺序。',
      '淘汰的是 Map 迭代出来的第一个（最旧）key。',
    ],
    animation: 'lru',
  },

  /* ==================== 二叉树 ==================== */
  {
    id: '94',
    leetcodeNo: 94,
    title: '二叉树的中序遍历',
    difficulty: 'easy',
    tags: ['二叉树', '栈', 'DFS'],
    brief: '按「左 → 根 → 右」的顺序遍历二叉树。',
    insight:
      '迭代写法：先一路向左把节点压栈，走到空后弹栈访问，再转向右子树。',
    derivation: [
      'cur 非空就压栈并走左孩子。',
      '走不动时弹栈，记录值。',
      'cur 转向右孩子，重复直到栈与 cur 都为空。',
    ],
    code: `function inorderTraversal(root: TreeNode | null): number[] {
  const res: number[] = []
  const stack: TreeNode[] = []
  let cur = root
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()!
    res.push(cur.val)
    cur = cur.right
  }
  return res
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    pitfalls: [
      '访问发生在弹栈时，不是压栈时。',
      '右子树为空时不用处理，继续弹栈即可。',
    ],
    animation: 'inorder',
  },
  {
    id: '101',
    leetcodeNo: 101,
    title: '对称二叉树',
    difficulty: 'easy',
    tags: ['二叉树', 'DFS'],
    brief: '判断一棵二叉树是否沿中轴线镜像对称。',
    insight:
      '不是比较两棵相同的树，而是比较两棵镜像的树：左孩子的左 对 右孩子的右，左孩子的右 对 右孩子的左。',
    derivation: [
      '比较根的左右子树。',
      '值相等，且 a.left 与 b.right 对称、a.right 与 b.left 对称。',
      '两边同时为空才对称，一空一非空不对称。',
    ],
    code: `function isSymmetric(root: TreeNode | null): boolean {
  const dfs = (a: TreeNode | null, b: TreeNode | null): boolean => {
    if (!a || !b) return a === b
    return (
      a.val === b.val &&
      dfs(a.left, b.right) &&
      dfs(a.right, b.left)
    )
  }
  return dfs(root!.left, root!.right)
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    pitfalls: [
      '递归参数是镜像对比，左右是反的。',
      '两个节点都为空时要用 a === b 而不是直接返回 true/false。',
    ],
    animation: 'symmetric-tree',
  },
  {
    id: '108',
    leetcodeNo: 108,
    title: '将有序数组转换为二叉搜索树',
    difficulty: 'easy',
    tags: ['二叉树', '分治', 'BST'],
    brief: '把严格递增的数组转换为高度平衡的 BST。',
    insight:
      '每次取区间中点作为根，左半段递归建左子树，右半段递归建右子树，两边高度差天然不超过 1。',
    derivation: [
      'mid = (l + r) >> 1，nums[mid] 作为根。',
      '递归建 [l, mid-1] 与 [mid+1, r]。',
      'l > r 时返回 null。',
    ],
    code: `function sortedArrayToBST(nums: number[]): TreeNode | null {
  const build = (l: number, r: number): TreeNode | null => {
    if (l > r) return null
    const mid = (l + r) >> 1
    const node = new TreeNode(nums[mid])
    node.left = build(l, mid - 1)
    node.right = build(mid + 1, r)
    return node
  }
  return build(0, nums.length - 1)
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(log n)',
    pitfalls: [
      '取左中点或右中点都能平衡，但要保持一致。',
    ],
    animation: 'sorted-to-bst',
  },
  {
    id: '199',
    leetcodeNo: 199,
    title: '二叉树的右视图',
    difficulty: 'medium',
    tags: ['二叉树', 'BFS', 'DFS'],
    brief: '返回从二叉树右侧能看到的节点值（每层最右的节点）。',
    insight:
      'DFS 先右后左：每一层第一次访问到的节点就是该层最右节点，用 depth 与答案长度判断。',
    derivation: [
      '从根出发，先递归右孩子再递归左孩子。',
      '当 depth === ans.length 时，这是该层第一个被访问的节点，加入答案。',
      '也可以用层序遍历取每层最后一个。',
    ],
    code: `function rightSideView(root: TreeNode | null): number[] {
  const ans: number[] = []
  const dfs = (node: TreeNode | null, depth: number) => {
    if (!node) return
    if (depth === ans.length) ans.push(node.val)
    dfs(node.right, depth + 1)
    dfs(node.left, depth + 1)
  }
  dfs(root, 0)
  return ans
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    pitfalls: [
      '必须先右后左，否则取到的是左视图。',
      '只有每层第一个访问的节点才记录。',
    ],
    animation: 'right-view',
  },
  {
    id: '114',
    leetcodeNo: 114,
    title: '二叉树展开为链表',
    difficulty: 'medium',
    tags: ['二叉树', '链表', '栈'],
    brief: '把二叉树按先序遍历顺序原地展开成一条只有右指针的链。',
    insight:
      '对每个有左子树的节点：找到左子树最右节点，把原右子树接到它后面，再把左子树整体挪到右侧。',
    derivation: [
      '若 cur 有左子树，找到左子树最右节点 p。',
      'p.right 接上 cur 的原右子树。',
      'cur.right = cur.left，cur.left = null。',
      'cur 沿右指针继续。',
    ],
    code: `function flatten(root: TreeNode | null): void {
  let cur = root
  while (cur) {
    if (cur.left) {
      let p = cur.left
      while (p.right) p = p.right
      p.right = cur.right
      cur.right = cur.left
      cur.left = null
    }
    cur = cur.right
  }
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '接原右子树之前先暂存，别直接覆盖。',
      '展开后 left 必须置为 null。',
    ],
    animation: 'flatten-tree',
  },
  {
    id: '105',
    leetcodeNo: 105,
    title: '从前序与中序遍历构造二叉树',
    difficulty: 'medium',
    tags: ['二叉树', '分治', '哈希表'],
    brief: '给定前序、中序遍历序列（值互不相同），构造二叉树。',
    insight:
      '前序的第一个元素是根；在中序中定位根，左边是左子树、右边是右子树，再递归。',
    derivation: [
      '用哈希表记录中序值到下标的映射。',
      '前序指针 p 依次取根，先建左子树再建右子树（顺序不能反）。',
      '按中序区间 [l, r] 切分左右子树。',
    ],
    code: `function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const index = new Map(inorder.map((v, i) => [v, i]))
  let p = 0
  const build = (l: number, r: number): TreeNode | null => {
    if (l > r) return null
    const root = new TreeNode(preorder[p++])
    const mid = index.get(root.val)!
    root.left = build(l, mid - 1)
    root.right = build(mid + 1, r)
    return root
  }
  return build(0, inorder.length - 1)
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '必须先递归左子树，前序指针才能按顺序消费。',
      '前提是节点值互不相同。',
    ],
    animation: 'build-tree',
  },
  {
    id: '437',
    leetcodeNo: 437,
    title: '路径总和 III',
    difficulty: 'medium',
    tags: ['二叉树', '前缀和', '哈希表'],
    brief: '统计二叉树中节点值之和等于 targetSum 的「向下路径」数量，路径不需经过根。',
    insight:
      '把问题转成树上的「和为 K 的子数组」：维护根到当前节点的前缀和，用哈希表计数 targetSum 对应的差值。',
    derivation: [
      'cnt 记录各前缀和出现次数，初始 {0:1}。',
      '到节点时 pre += val，答案 += cnt[pre - targetSum]。',
      '把 pre 加入计数，递归左右，回溯时撤销。',
    ],
    code: `function pathSum(root: TreeNode | null, targetSum: number): number {
  const cnt = new Map<number, number>([[0, 1]])
  let ans = 0
  const dfs = (node: TreeNode | null, pre: number) => {
    if (!node) return
    pre += node.val
    ans += cnt.get(pre - targetSum) ?? 0
    cnt.set(pre, (cnt.get(pre) ?? 0) + 1)
    dfs(node.left, pre)
    dfs(node.right, pre)
    cnt.set(pre, cnt.get(pre)! - 1)
  }
  dfs(root, 0)
  return ans
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    pitfalls: [
      '初始要有前缀和 0 出现 1 次。',
      '离开子树时要把前缀和计数撤销，避免污染其他分支。',
    ],
    animation: 'path-sum-3',
  },
  {
    id: '124',
    leetcodeNo: 124,
    title: '二叉树中的最大路径和',
    difficulty: 'hard',
    tags: ['二叉树', 'DFS', '动态规划'],
    brief: '路径可以从任意节点出发到任意节点，求最大节点值之和。',
    insight:
      '对每个节点分别算「左右子树的最大贡献」（负贡献截断为 0），经过该节点的路径和更新全局答案；向上返回时只能选一条分支。',
    derivation: [
      'left = max(0, dfs(左子树))，right 同理。',
      '以当前节点为最高点的路径和 = left + val + right，更新答案。',
      '向上只能返回 val + max(left, right)（路径不能分叉）。',
    ],
    code: `function maxPathSum(root: TreeNode | null): number {
  let ans = -Infinity
  const dfs = (node: TreeNode | null): number => {
    if (!node) return 0
    const left = Math.max(0, dfs(node.left))
    const right = Math.max(0, dfs(node.right))
    ans = Math.max(ans, left + node.val + right)
    return node.val + Math.max(left, right)
  }
  dfs(root)
  return ans
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    pitfalls: [
      '负贡献要截断为 0，子树可以不选。',
      '全局路径和与向上返回值是两个不同公式，不要混用。',
    ],
    animation: 'max-path-sum',
  },

  /* ==================== 图 / Trie ==================== */
  {
    id: '208',
    leetcodeNo: 208,
    title: '实现 Trie 前缀树',
    difficulty: 'medium',
    tags: ['设计', 'Trie', '字符串'],
    brief: '实现 insert、search、startsWith 三个操作。',
    insight:
      '每个节点持有 26 个孩子指针和一个 isEnd 标记；insert 沿路创建，search 要求走到单词结尾，startsWith 只要求路径存在。',
    derivation: [
      'insert：沿路没有孩子就新建，末节点置 isEnd。',
      'search：路径存在且末节点 isEnd 为 true。',
      'startsWith：路径存在即可。',
    ],
    code: `class TrieNode {
  children: Record<string, TrieNode> = {}
  isEnd = false
}
class Trie {
  private root = new TrieNode()

  insert(word: string): void {
    let p = this.root
    for (const ch of word) {
      p.children[ch] ??= new TrieNode()
      p = p.children[ch]
    }
    p.isEnd = true
  }

  private find(word: string): TrieNode | null {
    let p = this.root
    for (const ch of word) {
      if (!p.children[ch]) return null
      p = p.children[ch]
    }
    return p
  }

  search(word: string): boolean {
    return this.find(word)?.isEnd === true
  }
  startsWith(prefix: string): boolean {
    return this.find(prefix) !== null
  }
}`,
    timeComplexity: '单次操作 O(L)',
    spaceComplexity: 'O(总字符数)',
    pitfalls: [
      'search 与 startsWith 的区别只在 isEnd。',
    ],
    animation: 'trie',
  },

  /* ==================== 回溯 ==================== */
  {
    id: '131',
    leetcodeNo: 131,
    title: '分割回文串',
    difficulty: 'medium',
    tags: ['回溯', '字符串', '动态规划'],
    brief: '把字符串分割成若干子串，使每个子串都是回文，返回所有方案。',
    insight:
      '从 start 开始枚举终点 end：只有 s[start..end] 是回文时才切这一刀，递归处理 end+1。',
    derivation: [
      '双指针判断 s[l..r] 是否回文。',
      '在当前位置尝试所有回文前缀。',
      '切到字符串末尾时收集路径。',
    ],
    code: `function partition(s: string): string[][] {
  const ans: string[][] = []
  const path: string[] = []
  const isPal = (l: number, r: number) => {
    while (l < r) if (s[l++] !== s[r--]) return false
    return true
  }
  const dfs = (start: number) => {
    if (start === s.length) {
      ans.push([...path])
      return
    }
    for (let end = start; end < s.length; end++) {
      if (isPal(start, end)) {
        path.push(s.slice(start, end + 1))
        dfs(end + 1)
        path.pop()
      }
    }
  }
  dfs(0)
  return ans
}`,
    timeComplexity: 'O(n · 2ⁿ)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '只有回文前缀才允许进入下一层。',
      '下一层起点是 end + 1，不是 start + 1。',
    ],
    animation: 'palindrome-partition',
  },
  {
    id: '51',
    leetcodeNo: 51,
    title: 'N 皇后',
    difficulty: 'hard',
    tags: ['回溯', '集合'],
    brief: '在 n×n 棋盘上放 n 个皇后，使任意两皇后不在同一行、列、对角线。',
    insight:
      '按行放置，用三个集合记录已占用的列、主对角线 (row-col)、副对角线 (row+col)；冲突就跳过，回溯时撤销。',
    derivation: [
      '每行只放一个皇后，枚举列。',
      '列、row-col、row+col 三个集合都不冲突才放置。',
      '放满 n 行收集棋盘。',
    ],
    code: `function solveNQueens(n: number): string[][] {
  const ans: string[][] = []
  const board: string[] = Array.from({ length: n }, () => '.'.repeat(n))
  const cols = new Set<number>(), d1 = new Set<number>(), d2 = new Set<number>()
  const dfs = (row: number) => {
    if (row === n) { ans.push([...board]); return }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || d1.has(row - col) || d2.has(row + col)) continue
      board[row] = '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1)
      cols.add(col); d1.add(row - col); d2.add(row + col)
      dfs(row + 1)
      cols.delete(col); d1.delete(row - col); d2.delete(row + col)
    }
  }
  dfs(0)
  return ans
}`,
    timeComplexity: 'O(n!)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '两条对角线分别是 row-col 与 row+col，容易漏其中一个。',
      '回溯要同时撤销三个集合和棋盘行。',
    ],
    animation: 'n-queens',
  },

  /* ==================== 二分查找 ==================== */
  {
    id: '35',
    leetcodeNo: 35,
    title: '搜索插入位置',
    difficulty: 'easy',
    tags: ['二分查找', '数组'],
    brief: '在有序数组中找 target，不存在则返回应插入的位置。',
    insight:
      '标准左闭右闭二分，找不到时 lo 恰好指向第一个 ≥ target 的位置，也就是插入点。',
    derivation: [
      '相等直接返回 mid。',
      'nums[mid] < target 时 lo = mid+1，否则 hi = mid-1。',
      '循环结束返回 lo。',
    ],
    code: `function searchInsert(nums: number[], target: number): number {
  let lo = 0, hi = nums.length - 1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (nums[mid] === target) return mid
    if (nums[mid] < target) lo = mid + 1
    else hi = mid - 1
  }
  return lo
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '右边界初始为 n-1，与左闭右闭配套。',
    ],
    animation: 'search-insert',
  },
  {
    id: '34',
    leetcodeNo: 34,
    title: '在排序数组中查找元素的第一和最后位置',
    difficulty: 'medium',
    tags: ['二分查找', '数组'],
    brief: '在非降序数组中返回 target 第一次和最后一次出现的位置，不存在返回 [-1,-1]。',
    insight:
      '做两次二分：找左边界时命中后继续向左收，找右边界时命中后继续向右收。',
    derivation: [
      '左边界：命中后 hi=mid-1，记录 mid。',
      '右边界：命中后 lo=mid+1，记录 mid。',
      '先查左边界，为 -1 即可直接返回。',
    ],
    code: `function searchRange(nums: number[], target: number): number[] {
  const bound = (left: boolean): number => {
    let lo = 0, hi = nums.length - 1, res = -1
    while (lo <= hi) {
      const mid = (lo + hi) >> 1
      if (nums[mid] === target) {
        res = mid
        if (left) hi = mid - 1
        else lo = mid + 1
      } else if (nums[mid] < target) lo = mid + 1
      else hi = mid - 1
    }
    return res
  }
  return [bound(true), bound(false)]
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '命中后不能退出，要继续向目标方向收缩。',
    ],
    animation: 'first-last',
  },
  {
    id: '4',
    leetcodeNo: 4,
    title: '寻找两个正序数组的中位数',
    difficulty: 'hard',
    tags: ['二分查找', '数组', '分治'],
    brief: '两个有序数组长度分别为 m、n，在 O(log(m+n)) 时间内求中位数。',
    insight:
      '在较短数组上二分「切点」，把两个数组各自切成左右两半，使左半总数等于右半，并满足 L1≤R2、L2≤R1。',
    derivation: [
      '切点 i 把 nums1 切为两段，由总长度推出 nums2 的切点 j。',
      '合法条件：L1≤R2 且 L2≤R1；越界切点用 ±Infinity 兜底。',
      '奇数总长取 max(L1,L2)，偶数取 (max(L1,L2)+min(R1,R2))/2。',
    ],
    code: `function findMedianSortedArrays(a: number[], b: number[]): number {
  if (a.length > b.length) return findMedianSortedArrays(b, a)
  const m = a.length, n = b.length
  const half = (m + n + 1) >> 1
  let lo = 0, hi = m
  while (lo <= hi) {
    const i = (lo + hi) >> 1
    const j = half - i
    const l1 = i ? a[i - 1] : -Infinity
    const r1 = i < m ? a[i] : Infinity
    const l2 = j ? b[j - 1] : -Infinity
    const r2 = j < n ? b[j] : Infinity
    if (l1 <= r2 && l2 <= r1) {
      return (m + n) % 2
        ? Math.max(l1, l2)
        : (Math.max(l1, l2) + Math.min(r1, r2)) / 2
    }
    if (l1 > r2) hi = i - 1
    else lo = i + 1
  }
  return 0
}`,
    timeComplexity: 'O(log(min(m, n)))',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '切点必须在较短数组上二分，否则 j 可能越界。',
      '奇偶长度要分别处理，边界用 ±Infinity。',
    ],
    animation: 'median-two',
  },

  /* ==================== 栈 ==================== */
  {
    id: '394',
    leetcodeNo: 394,
    title: '字符串解码',
    difficulty: 'medium',
    tags: ['栈', '字符串'],
    brief: '把类似 "3[a2[c]]" 的编码字符串解码为 "accaccacc"。',
    insight:
      '维护数字栈和字符串栈：遇到 "[" 把重复次数和当前字符串压栈，遇到 "]" 弹栈并把当前串重复 k 次拼回去。',
    derivation: [
      '数字可能是多位，用 num = num*10 + d 累积。',
      '遇 "["：k 与当前 cur 入栈，cur 清空。',
      '遇 "]"：弹出前缀和 k，cur = 前缀 + cur.repeat(k)。',
    ],
    code: `function decodeString(s: string): string {
  const nums: number[] = []
  const strs: string[] = []
  let num = 0, cur = ''
  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + Number(ch)
    } else if (ch === '[') {
      nums.push(num)
      strs.push(cur)
      num = 0; cur = ''
    } else if (ch === ']') {
      const k = nums.pop()!
      cur = strs.pop() + cur.repeat(k)
    } else {
      cur += ch
    }
  }
  return cur
}`,
    timeComplexity: 'O(n)（按输出长度计）',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '压入字符串栈的是 "[" 之前已经解出的前缀。',
      '数字可能是多位，不能直接当字符处理。',
    ],
    animation: 'decode-string',
  },
  {
    id: '84',
    leetcodeNo: 84,
    title: '柱状图中最大的矩形',
    difficulty: 'hard',
    tags: ['栈', '单调栈'],
    brief: '给定每根柱子的高度，求能勾勒出的最大矩形面积。',
    insight:
      '单调递增栈存下标：当遇到更矮的柱子时弹栈，弹出柱子的左边界是栈顶、右边界是当前位置，宽度随之确定。',
    derivation: [
      '栈底先放 -1 作为基准。',
      '当前高度小于栈顶高度时，弹栈并计算面积 h × (i - 栈顶 - 1)。',
      '末尾再走一次（高度视为 0）清空栈。',
    ],
    code: `function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [-1]
  let ans = 0
  for (let i = 0; i <= heights.length; i++) {
    while (
      stack.length > 1 &&
      (i === heights.length || heights[i] < heights[stack[stack.length - 1]])
    ) {
      const h = heights[stack.pop()!]
      const w = i - stack[stack.length - 1] - 1
      ans = Math.max(ans, h * w)
    }
    stack.push(i)
  }
  return ans
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '栈底 -1 是宽度计算的基准。',
      '循环要多走一次把栈中剩余元素全部弹出。',
    ],
    animation: 'largest-rectangle',
  },

  /* ==================== 堆 ==================== */
  {
    id: '295',
    leetcodeNo: 295,
    title: '数据流的中位数',
    difficulty: 'hard',
    tags: ['设计', '堆', '双堆'],
    brief: '持续向数据流中添加数字，随时返回中位数。',
    insight:
      '大根堆 low 存较小的一半（堆顶是这半的最大值），小根堆 high 存较大的一半；奇数时取 low 堆顶，偶数时取两堆顶平均。',
    derivation: [
      '新数先入 low，再把 low 堆顶弹给 high，保证 low 的所有值 ≤ high。',
      '若 high 比 low 大，再把 high 堆顶弹回 low。',
      '维持 low 数量等于 high 或多 1 个。',
    ],
    code: `class MedianFinder {
  private low = new MaxPriorityQueue<number>()
  private high = new MinPriorityQueue<number>()

  addNum(num: number): void {
    this.low.enqueue(num)
    this.high.enqueue(this.low.dequeue().element)
    if (this.low.size() < this.high.size())
      this.low.enqueue(this.high.dequeue().element)
  }

  findMedian(): number {
    return this.low.size() > this.high.size()
      ? this.low.front().element
      : (this.low.front().element + this.high.front().element) / 2
  }
}`,
    timeComplexity: 'addNum O(log n)，findMedian O(1)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '插入后要做再平衡，保证 low 的数都不大于 high。',
      '奇数时中位数放在 low 堆顶。',
    ],
    animation: 'median-stream',
  },

  /* ==================== 贪心 ==================== */
  {
    id: '45',
    leetcodeNo: 45,
    title: '跳跃游戏 II',
    difficulty: 'medium',
    tags: ['贪心', '数组'],
    brief: 'nums[i] 是可跳的最大距离，求到达终点的最少跳跃次数。',
    insight:
      '一次遍历维护当前跳跃边界 end 和边界内能到的最远位置 farthest；每当 i 到达 end 就再跳一次并扩展边界。',
    derivation: [
      '遍历中不断更新 farthest = max(farthest, i+nums[i])。',
      'i 到达 end 时 jumps++，end = farthest。',
      '最后一个位置不需要再跳，循环到 n-2。',
    ],
    code: `function jump(nums: number[]): number {
  let jumps = 0, end = 0, farthest = 0
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i])
    if (i === end) {
      jumps++
      end = farthest
    }
  }
  return jumps
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '到达终点的位置不再计数，循环到 n-2。',
      '只有走到 end 时才增加跳跃次数。',
    ],
    animation: 'jump-2',
  },
  {
    id: '763',
    leetcodeNo: 763,
    title: '划分字母区间',
    difficulty: 'medium',
    tags: ['贪心', '哈希表', '双指针'],
    brief: '把字符串划成尽可能多的片段，使每个字母只出现在一个片段中。',
    insight:
      '先记录每个字母最后出现的位置；遍历时维护片段右端 right=max(区间内字母最后位置)，走到 right 就切片。',
    derivation: [
      '第一遍记录每个字母最后下标。',
      '第二遍扩展 right。',
      'i === right 时切出一段，长度 = right-start+1。',
    ],
    code: `function partitionLabels(s: string): number[] {
  const last = new Map<string, number>()
  for (let i = 0; i < s.length; i++) last.set(s[i], i)
  const ans: number[] = []
  let start = 0, right = 0
  for (let i = 0; i < s.length; i++) {
    right = Math.max(right, last.get(s[i])!)
    if (i === right) {
      ans.push(right - start + 1)
      start = i + 1
    }
  }
  return ans
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)（26 个字母）',
    pitfalls: [
      '切片长度是 right-start+1，不是 right-start。',
    ],
    animation: 'partition-labels',
  },

  /* ==================== 一维动态规划 ==================== */
  {
    id: '118',
    leetcodeNo: 118,
    title: '杨辉三角',
    difficulty: 'easy',
    tags: ['动态规划', '数组'],
    brief: '生成杨辉三角的前 numRows 行。',
    insight:
      '每行两端固定为 1，中间位置等于上一行左右两个数之和，按行递推。',
    derivation: [
      '第 r 行长度为 r+1。',
      'row[c] = 上一行的 [c-1] + [c]。',
      '两端 c=0、c=r 直接为 1。',
    ],
    code: `function generate(numRows: number): number[][] {
  const ans: number[][] = []
  for (let r = 0; r < numRows; r++) {
    const row = new Array(r + 1).fill(1)
    for (let c = 1; c < r; c++)
      row[c] = ans[r - 1][c - 1] + ans[r - 1][c]
    ans.push(row)
  }
  return ans
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)（不计结果）',
    pitfalls: [
      '中间列循环范围是 1..r-1，两端不要重复计算。',
    ],
    animation: 'pascal',
  },
  {
    id: '279',
    leetcodeNo: 279,
    title: '完全平方数',
    difficulty: 'medium',
    tags: ['动态规划', '完全背包'],
    brief: '找出和为 n 所需的完全平方数（1,4,9,…）的最少个数。',
    insight:
      '完全背包模型：dp[i] 表示组成 i 的最少个数，dp[i] = min(dp[i-j²] + 1)。',
    derivation: [
      'dp[0] = 0，其余初始化为无穷大。',
      '对每个 i 枚举不超过 i 的平方数 j²。',
      '取最小值。',
    ],
    code: `function numSquares(n: number): number {
  const dp = new Array(n + 1).fill(Infinity)
  dp[0] = 0
  for (let i = 1; i <= n; i++)
    for (let j = 1; j * j <= i; j++)
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1)
  return dp[n]
}`,
    timeComplexity: 'O(n√n)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '物品是平方数 j²，不是 j。',
      'dp[0] 是递推基础。',
    ],
    animation: 'perfect-squares',
  },
  {
    id: '32',
    leetcodeNo: 32,
    title: '最长有效括号',
    difficulty: 'hard',
    tags: ['栈', '字符串', '动态规划'],
    brief: '只包含 "(" 和 ")" 的字符串中，求最长有效括号子串的长度。',
    insight:
      '栈里存下标，栈底始终放最后一个未匹配 ")" 的位置作为基准；遇到 ")" 弹栈后，用当前下标减去新栈顶得到长度。',
    derivation: [
      '初始栈为 [-1]。',
      '遇 "(" 压入下标。',
      '遇 ")" 先弹栈；栈空则压入当前位置作为新基准，否则用 i-栈顶 更新答案。',
    ],
    code: `function longestValidParentheses(s: string): number {
  const stack = [-1]
  let ans = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i)
    } else {
      stack.pop()
      if (!stack.length) stack.push(i)
      else ans = Math.max(ans, i - stack[stack.length - 1])
    }
  }
  return ans
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      '栈底 -1 不能省。',
      '弹空后要把当前位置压进去，作为后续匹配的基准。',
    ],
    animation: 'longest-valid-paren',
  },

  /* ==================== 多维动态规划 ==================== */
  {
    id: '64',
    leetcodeNo: 64,
    title: '最小路径和',
    difficulty: 'medium',
    tags: ['动态规划', '矩阵'],
    brief: '从左上角到右下角（只能向右或向下），求路径上数字之和的最小值。',
    insight:
      'dp[i][j] = grid[i][j] + min(上方, 左方)，可以直接在原网格上原地更新。',
    derivation: [
      '起点 grid[0][0] 保持不变。',
      '第一行只能来自左、第一列只能来自上。',
      '其余位置取上、左的最小值。',
    ],
    code: `function minPathSum(grid: number[][]): number {
  const m = grid.length, n = grid[0].length
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue
      const up = i ? grid[i - 1][j] : Infinity
      const left = j ? grid[i][j - 1] : Infinity
      grid[i][j] += Math.min(up, left)
    }
  }
  return grid[m - 1][n - 1]
}`,
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(1)（原地更新）',
    pitfalls: [
      '边界只有一个来源，用 Infinity 兜底。',
    ],
    animation: 'min-path-sum',
  },
  {
    id: '5',
    leetcodeNo: 5,
    title: '最长回文子串',
    difficulty: 'medium',
    tags: ['字符串', '双指针', '动态规划'],
    brief: '返回字符串中最长的回文子串。',
    insight:
      '中心扩展：枚举每个位置作为中心，分别按奇数长度 (i,i) 和偶数长度 (i,i+1) 向两边扩。',
    derivation: [
      '比较 s[left] 与 s[right]，相等就继续向外。',
      '每扩展一次，若更长就更新答案区间。',
      '每个位置都要尝试奇、偶两种中心。',
    ],
    code: `function longestPalindrome(s: string): string {
  let l = 0, r = 0
  const expand = (left: number, right: number) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if (right - left > r - l) { l = left; r = right }
      left--; right++
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i)
    expand(i, i + 1)
  }
  return s.slice(l, r + 1)
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '偶数长度回文中心在两个字符之间，不能漏 expand(i, i+1)。',
    ],
    animation: 'longest-palindrome',
  },
  {
    id: '1143',
    leetcodeNo: 1143,
    title: '最长公共子序列',
    difficulty: 'medium',
    tags: ['字符串', '动态规划'],
    brief: '返回两个字符串最长公共子序列（LCS）的长度。',
    insight:
      '二维 DP：两字符相等时取左上加 1，不相等时取上方和左方的最大值。',
    derivation: [
      'dp[i][j] 表示 text1 前 i 个、text2 前 j 个字符的 LCS。',
      '相等：dp[i-1][j-1]+1。',
      '不等：max(dp[i-1][j], dp[i][j-1])。',
    ],
    code: `function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length, n = text2.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] =
        text1[i - 1] === text2[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1])
  return dp[m][n]
}`,
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(mn)（可压缩为 O(n)）',
    pitfalls: [
      '不相等时不能加 1，是子序列不是子串。',
      '字符下标与 dp 下标相差 1。',
    ],
    animation: 'lcs',
  },
  {
    id: '72',
    leetcodeNo: 72,
    title: '编辑距离',
    difficulty: 'medium',
    tags: ['字符串', '动态规划'],
    brief: '求把 word1 变成 word2 所需的最少插入、删除、替换次数。',
    insight:
      '二维 DP：两字符相等直接抄对角线；不相等时取删除(上)、插入(左)、替换(对角) 的最小值再加 1。',
    derivation: [
      'dp[i][j] 表示 word1 前 i 个字符变成 word2 前 j 个字符的代价。',
      '首行首列初始化为下标（与空串互相转换）。',
      '相等抄对角；不等 min(上, 左, 对角) + 1。',
    ],
    code: `function minDistance(word1: string, word2: string): number {
  const m = word1.length, n = word2.length
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    new Array(n + 1).fill(0).map((_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] =
        word1[i - 1] === word2[j - 1]
          ? dp[i - 1][j - 1]
          : Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
  return dp[m][n]
}`,
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(mn)',
    pitfalls: [
      '首行首列要初始化为对应下标。',
      '三种操作的来源格子别搞混：删除看上、插入看左、替换看对角。',
    ],
    animation: 'edit-distance',
  },

  /* ==================== 技巧 ==================== */
  {
    id: '75',
    leetcodeNo: 75,
    title: '颜色分类',
    difficulty: 'medium',
    tags: ['数组', '双指针', '排序'],
    brief: '只含 0、1、2 的数组原地排序，使 0 在前、1 居中、2 在后。',
    insight:
      '三指针：lo 管 0 的边界、hi 管 2 的边界，mid 扫描；遇到 0 换到前面，遇到 2 换到后面，遇到 1 直接跳过。',
    derivation: [
      'nums[mid] = 0：与 lo 交换，lo++、mid++。',
      'nums[mid] = 2：与 hi 交换，hi--，mid 不动（换来的数没检查）。',
      'nums[mid] = 1：mid++。',
    ],
    code: `function sortColors(nums: number[]): void {
  let lo = 0, mid = 0, hi = nums.length - 1
  while (mid <= hi) {
    if (nums[mid] === 0) {
      [nums[lo], nums[mid]] = [nums[mid], nums[lo]]
      lo++; mid++
    } else if (nums[mid] === 2) {
      [nums[mid], nums[hi]] = [nums[hi], nums[mid]]
      hi--
    } else {
      mid++
    }
  }
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '换到 2 时 mid 不能增，新换过来的数还要检查。',
      '换到 0 时 mid 要增，因为前面的数已经处理过。',
    ],
    animation: 'sort-colors',
  },
  {
    id: '31',
    leetcodeNo: 31,
    title: '下一个排列',
    difficulty: 'medium',
    tags: ['数组', '双指针', '数学'],
    brief: '原地把数组重排成字典序的下一个更大排列，不存在则变为最小排列。',
    insight:
      '从右往左找第一个「上升点」i；再从右找第一个比 nums[i] 大的 j 交换；最后把 i 之后的后缀翻转。',
    derivation: [
      '找 i：nums[i] < nums[i+1]。',
      '找 j：右侧第一个 nums[j] > nums[i]。',
      '交换 i、j 后翻转 i 之后的后缀（后缀原本降序，翻转后升序）。',
    ],
    code: `function nextPermutation(nums: number[]): void {
  let i = nums.length - 2
  while (i >= 0 && nums[i] >= nums[i + 1]) i--
  if (i >= 0) {
    let j = nums.length - 1
    while (nums[j] <= nums[i]) j--
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }
  let l = i + 1, r = nums.length - 1
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]]
    l++; r--
  }
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      '找 j 时要用严格大于，不能取等于。',
      '完全降序时 i=-1，整体翻转就是最小排列。',
    ],
    animation: 'next-permutation',
  },
  {
    id: '287',
    leetcodeNo: 287,
    title: '寻找重复数',
    difficulty: 'medium',
    tags: ['数组', '双指针', '二分查找'],
    brief: '长度 n+1 的数组中数字都在 1..n，且只有一个数重复，找出它（不修改数组）。',
    insight:
      '把 i → nums[i] 视作链表指针，重复数字就是入环点，直接套用 Floyd 快慢指针两阶段。',
    derivation: [
      'slow 走一步 nums[slow]、fast 走两步 nums[nums[fast]]。',
      '相遇后，一个指针回到 0 与 slow 同速前进。',
      '再次相遇的位置即重复数。',
    ],
    code: `function findDuplicate(nums: number[]): number {
  let slow = nums[0]
  let fast = nums[nums[0]]
  while (slow !== fast) {
    slow = nums[slow]
    fast = nums[nums[fast]]
  }
  let finder = 0
  while (finder !== slow) {
    finder = nums[finder]
    slow = nums[slow]
  }
  return finder
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      'fast 初始就要比 slow 多走一步，避免起点误判相遇。',
      '不能排序或用哈希表（要求 O(1) 空间且不改数组）。',
    ],
    animation: 'find-duplicate',
  },
]
