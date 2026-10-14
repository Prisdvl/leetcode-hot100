import type { CardData } from './types'

/** Additional LeetCode Hot 100 cards (problems 16-100). */
export const EXTRA_CARDS: CardData[] = [
  // ---------- Array / Hash ----------
  {
    id: '242', leetcodeNo: 242, title: '有效的字母异位词', difficulty: 'easy',
    tags: ['哈希表', '字符串'],
    brief: '判断 t 是否是 s 的字母异位词。',
    insight: '26 位计数数组：s 中字符 +1，t 中字符 -1，最后全 0 即为异位词。',
    derivation: ['用长度 26 的数组 count，遍历 s 时 count[ch]++，遍历 t 时 count[ch]--。', '最后 every(v => v===0)。长度不等直接 false。'],
    code: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false
  const cnt = new Array(26).fill(0)
  const a = 'a'.charCodeAt(0)
  for (const ch of s) cnt[ch.charCodeAt(0) - a]++
  for (const ch of t) cnt[ch.charCodeAt(0) - a]--
  return cnt.every(v => v === 0)
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['先判断长度，否则会漏。', '进阶: Unicode 字符用 Map。'],
    animation: 'valid-anagram',
  },
  {
    id: '169', leetcodeNo: 169, title: '多数元素', difficulty: 'easy',
    tags: ['数组', '投票算法'],
    brief: '找出数组中出现超过 n/2 次的元素。',
    insight: 'Boyer-Moore 投票：候选 candidate，遇同数 count++，异数 count--，count 归零换候选。',
    derivation: ['维护 candidate 和 count。', '遍历：同则 +1，异则 -1，归 0 换 candidate。', '题目保证存在，最后 candidate 即答案。'],
    code: `function majorityElement(nums: number[]): number {
  let cand = nums[0], cnt = 0
  for (const x of nums) {
    if (cnt === 0) cand = x
    cnt += x === cand ? 1 : -1
  }
  return cand
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['题目保证存在，无需二次验证；不保证时需再扫一遍计数。'],
    animation: 'majority',
  },
  {
    id: '88', leetcodeNo: 88, title: '合并两个有序数组', difficulty: 'easy',
    tags: ['双指针', '数组'],
    brief: '把 nums2 合并进 nums1（nums1 尾部有足够空间）。',
    insight: '从后往前填：用两个指针 i、j 指向两数组末尾，p 指向合并位置，把较大者放入 p。',
    derivation: ['从后往前可以避免覆盖 nums1 未处理部分。', 'i=m-1, j=n-1, p=m+n-1。', '把 max(nums1[i], nums2[j]) 放到 p，谁小谁后退。', 'nums2 剩余时直接拷入。'],
    code: `function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let i = m - 1, j = n - 1, p = m + n - 1
  while (j >= 0) {
    nums1[p--] = i >= 0 && nums1[i] > nums2[j] ? nums1[i--] : nums2[j--]
  }
}`,
    timeComplexity: 'O(m+n)', spaceComplexity: 'O(1)',
    pitfalls: ['从前往后会覆盖 nums1，必须从后往前。'],
    animation: 'merge-sorted',
  },
  {
    id: '121', leetcodeNo: 121, title: '买卖股票的最佳时机', difficulty: 'easy',
    tags: ['数组', 'DP'],
    brief: '只能一次买卖，求最大利润。',
    insight: '一次遍历：维护到目前为止的 minPrice，每天利润 = price - minPrice，取 max。',
    derivation: ['minPrice 初始为 prices[0]。', '对每天 price：profit = price - minPrice，更新 ans = max(ans, profit)。', '同时 minPrice = min(minPrice, price)。'],
    code: `function maxProfit(prices: number[]): number {
  let min = prices[0], ans = 0
  for (const p of prices) {
    ans = Math.max(ans, p - min)
    min = Math.min(min, p)
  }
  return ans
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['不能先买后卖，所以必须用「到目前为止的最低价」。'],
    animation: 'stock',
  },
  {
    id: '217', leetcodeNo: 217, title: '存在重复元素', difficulty: 'easy',
    tags: ['哈希表'],
    brief: '数组中是否有重复值。',
    insight: 'Set 一边加一边查，发现已存在即返回 true。',
    derivation: ['用 Set 遍历：若 has(x) 则 true。', '否则 add(x)。'],
    code: `function containsDuplicate(nums: number[]): boolean {
  const set = new Set<number>()
  for (const x of nums) {
    if (set.has(x)) return true
    set.add(x)
  }
  return false
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
    pitfalls: ['排序后比较相邻也行，但 O(n log n)。'],
    animation: 'contains-duplicate',
  },
  {
    id: '36', leetcodeNo: 36, title: '有效的数独', difficulty: 'medium',
    tags: ['哈希表'],
    brief: '判断 9x9 数独是否有效（行列宫不重复）。',
    insight: '用三个 Set 集合（row/col/box），遍历到 (r,c) 时把 digit 分别加入三个 key 对应的 set，冲突即无效。',
    derivation: ['box 编号 = Math.floor(r/3)*3 + Math.floor(c/3)。', 'key 形如 "row-r-d"、"col-c-d"、"box-b-d"。', '任一 key 已存在则返回 false。'],
    code: `function isValidSudoku(board: string[][]): boolean {
  const seen = new Set<string>()
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
    const d = board[r][c]
    if (d === '.') continue
    const b = Math.floor(r/3)*3 + Math.floor(c/3)
    if (seen.has(\`r\${r}\${d}\`) || seen.has(\`c\${c}\${d}\`) || seen.has(\`b\${b}\${d}\`)) return false
    seen.add(\`r\${r}\${d}\`); seen.add(\`c\${c}\${d}\`); seen.add(\`b\${b}\${d}\`)
  }
  return true
}`,
    timeComplexity: 'O(81)', spaceComplexity: 'O(81)',
    pitfalls: ['只校验是否合法，不需要解出来。'],
    animation: 'sudoku',
  },
  {
    id: '268', leetcodeNo: 268, title: '丢失的数字', difficulty: 'easy',
    tags: ['位运算', '数学'],
    brief: '0..n 中缺一个数，找出来。',
    insight: '高斯求和：expected = n(n+1)/2，缺失 = expected - sum(nums)。或异或。',
    derivation: ['方法 1: 数学，O(1) 空间。', '方法 2: 全部异或 0..n 和 nums，剩下的就是缺失。'],
    code: `function missingNumber(nums: number[]): number {
  const n = nums.length
  const expected = n * (n + 1) / 2
  return expected - nums.reduce((a, b) => a + b, 0)
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['整型溢出问题在 JS 不用考虑。'],
    animation: 'missing-number',
  },

  // ---------- Two Pointers ----------
  {
    id: '125', leetcodeNo: 125, title: '验证回文串', difficulty: 'easy',
    tags: ['双指针', '字符串'],
    brief: '只考虑字母数字，忽略大小写，判断是否回文。',
    insight: '左右指针夹逼：跳过非字母数字，比较小写形式。',
    derivation: ['l=0, r=n-1。', 'l 右移直到 alphanumeric，r 左移直到 alphanumeric。', 'toLowerCase 不等则 false。'],
    code: `function isPalindrome(s: string): boolean {
  let l = 0, r = s.length - 1
  while (l < r) {
    while (l < r && !/[a-z0-9]/i.test(s[l])) l++
    while (l < r && !/[a-z0-9]/i.test(s[r])) r--
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false
    l++; r--
  }
  return true
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['跳过非字母数字时必须检查 l<r。'],
    animation: 'valid-palindrome',
  },
  {
    id: '392', leetcodeNo: 392, title: '判断子序列', difficulty: 'easy',
    tags: ['双指针'],
    brief: 's 是否是 t 的子序列（保持相对顺序）。',
    insight: '双指针扫 t：s 指针指到匹配字符就前进，最后 s 指针走完即 true。',
    derivation: ['i 指 s，j 指 t。', 't[j] === s[i] 时 i++。', 'j 始终前进。i 走完即 true。'],
    code: `function isSubsequence(s: string, t: string): boolean {
  let i = 0
  for (const ch of t) if (s[i] === ch) i++
  return i === s.length
}`,
    timeComplexity: 'O(|t|)', spaceComplexity: 'O(1)',
    pitfalls: ['进阶: 大量 s 查询时预处理 t 的 next 表。'],
    animation: 'subsequence',
  },
  {
    id: '167', leetcodeNo: 167, title: '两数之和 II - 输入有序数组', difficulty: 'medium',
    tags: ['双指针', '二分'],
    brief: '有序数组中找两数之和等于 target。',
    insight: '左右指针：和太小 l++，和太大 r--。',
    derivation: ['l=0, r=n-1。', 'sum = nums[l]+nums[r]。', 'sum==target 返回 [l+1,r+1]；< target l++；> target r--。'],
    code: `function twoSum(numbers: number[], target: number): number[] {
  let l = 0, r = numbers.length - 1
  while (l < r) {
    const s = numbers[l] + numbers[r]
    if (s === target) return [l + 1, r + 1]
    else if (s < target) l++
    else r--
  }
  return []
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['下标从 1 开始。'],
    animation: 'two-sum-sorted',
  },

  // ---------- Stack ----------
  {
    id: '20', leetcodeNo: 20, title: '有效的括号', difficulty: 'easy',
    tags: ['栈'],
    brief: '() [] {} 是否有效嵌套。',
    insight: '遇左括号入栈，遇右括号检查栈顶是否匹配对应左括号。',
    derivation: ['Map: )→(, ]→[, }→{。', '左括号 push；右括号 peek 不匹配或栈空则 false。', '遍历完栈必须空。'],
    code: `function isValid(s: string): boolean {
  const map: Record<string, string> = { ')': '(', ']': '[', '}': '{' }
  const stack: string[] = []
  for (const ch of s) {
    if (ch in map) {
      if (stack.pop() !== map[ch]) return false
    } else stack.push(ch)
  }
  return stack.length === 0
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
    pitfalls: ['栈空时 pop 返回 undefined，要处理。'],
    animation: 'valid-paren',
  },
  {
    id: '155', leetcodeNo: 155, title: '最小栈', difficulty: 'medium',
    tags: ['栈', '设计'],
    brief: '支持 push/pop/top 和 O(1) 获取最小值。',
    insight: '辅助栈：每个元素入栈时同步把「当前最小值」压入最小栈。',
    derivation: ['data 栈存元素，min 栈存对应时刻的最小值。', 'push(x): data.push(x); min.push(min(x, min.top))。', 'pop 时同步 pop 两个栈。'],
    code: `class MinStack {
  data: number[] = []; min: number[] = []
  push(x: number) {
    this.data.push(x)
    this.min.push(this.min.length ? Math.min(x, this.min[this.min.length - 1]) : x)
  }
  pop() { this.data.pop(); this.min.pop() }
  top() { return this.data[this.data.length - 1] }
  getMin() { return this.min[this.min.length - 1] }
}`,
    timeComplexity: 'O(1)', spaceComplexity: 'O(n)',
    pitfalls: ['最小值栈每次都要压，哪怕等于之前。'],
    animation: 'min-stack',
  },
  {
    id: '739', leetcodeNo: 739, title: '每日温度', difficulty: 'medium',
    tags: ['单调栈'],
    brief: '每天等几天才会更暖，找不到填 0。',
    insight: '单调递减栈存下标：新温度比栈顶高时弹出栈顶并计算距离。',
    derivation: ['栈存下标，对应温度单调递减。', 'for i: while 栈非空且 T[i] > T[top]：弹 top，ans[top] = i - top。', 'i 入栈。'],
    code: `function dailyTemperatures(t: number[]): number[] {
  const ans = new Array(t.length).fill(0)
  const stack: number[] = []
  for (let i = 0; i < t.length; i++) {
    while (stack.length && t[i] > t[stack[stack.length - 1]]) {
      const j = stack.pop()!
      ans[j] = i - j
    }
    stack.push(i)
  }
  return ans
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
    pitfalls: ['栈里存下标不是值。'],
    animation: 'daily-temp',
  },
  {
    id: '150', leetcodeNo: 150, title: '逆波兰表达式求值', difficulty: 'medium',
    tags: ['栈'],
    brief: '后缀表达式求值。',
    insight: '数字入栈，遇运算符弹两个数计算（注意顺序）。',
    derivation: ['tokens 逐个处理。', '数字 parseInt 后入栈。', '运算符: b=pop, a=pop, 计算 a op b 入栈。', '除法向 0 截断用 Math.trunc。'],
    code: `function evalRPN(tokens: string[]): number {
  const st: number[] = []
  for (const t of tokens) {
    if (/^[+-]?\\d+$/.test(t)) st.push(parseInt(t))
    else {
      const b = st.pop()!, a = st.pop()!
      st.push(t === '+' ? a+b : t === '-' ? a-b : t === '*' ? a*b : Math.trunc(a/b))
    }
  }
  return st[0]
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
    pitfalls: ['减法和除法顺序：先弹的是右操作数。'],
    animation: 'rpn',
  },

  // ---------- Linked List ----------
  {
    id: '206', leetcodeNo: 206, title: '反转链表', difficulty: 'easy',
    tags: ['链表', '双指针'],
    brief: '原地反转单链表。',
    insight: '三指针 prev/curr/next：每次 curr.next 指回 prev，然后整体右移。',
    derivation: ['prev=null, curr=head。', 'while curr: next=curr.next; curr.next=prev; prev=curr; curr=next。', 'return prev。'],
    code: `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null, curr = head
  while (curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['必须先用 next 保存 curr.next，否则断链。'],
    animation: 'reverse-ll',
  },
  {
    id: '21', leetcodeNo: 21, title: '合并两个有序链表', difficulty: 'easy',
    tags: ['链表', '递归'],
    brief: '升序合并两个链表。',
    insight: 'dummy 哑结点 + 尾指针：取两表头较小者接到尾后。',
    derivation: ['dummy = new ListNode(-1), tail=dummy。', 'l1/l2 都非空时，val 小的接 tail.next，该指针前进。', '剩余链表直接 tail.next = 非空者。'],
    code: `function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(-1)
  let tail = dummy
  while (l1 && l2) {
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next }
    else { tail.next = l2; l2 = l2.next }
    tail = tail.next
  }
  tail.next = l1 ?? l2
  return dummy.next
}`,
    timeComplexity: 'O(n+m)', spaceComplexity: 'O(1)',
    pitfalls: ['用 dummy 省掉头节点特判。'],
    animation: 'merge-ll',
  },
  {
    id: '141', leetcodeNo: 141, title: '环形链表', difficulty: 'easy',
    tags: ['链表', '快慢指针'],
    brief: '判断链表是否有环。',
    insight: '快慢指针：慢走 1 步快走 2 步，相遇即有环。',
    derivation: ['slow=head, fast=head。', 'while fast && fast.next: slow=slow.next; fast=fast.next.next。', '相遇 return true。'],
    code: `function hasCycle(head: ListNode | null): boolean {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow!.next
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['快指针要先检查 fast.next。'],
    animation: 'cycle-1',
  },
  {
    id: '2', leetcodeNo: 2, title: '两数相加', difficulty: 'medium',
    tags: ['链表', '数学'],
    brief: '两数逆序存储在链表中，相加返回新链表。',
    insight: '模拟竖式加法：逐位相加 + carry，任一链表非空或 carry 非零就继续。',
    derivation: ['dummy 头, p 指针。', 'while l1 || l2 || carry: sum = carry + (l1?.val??0) + (l2?.val??0)。', 'carry = sum/10, 新建节点(sum%10) 接 p。'],
    code: `function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0)
  let p = dummy, carry = 0
  while (l1 || l2 || carry) {
    const s = carry + (l1?.val ?? 0) + (l2?.val ?? 0)
    carry = Math.floor(s / 10)
    p.next = new ListNode(s % 10)
    p = p.next
    l1 = l1?.next ?? null; l2 = l2?.next ?? null
  }
  return dummy.next
}`,
    timeComplexity: 'O(max(n,m))', spaceComplexity: 'O(max(n,m))',
    pitfalls: ['最后 carry 可能多一位。'],
    animation: 'merge-ll',
  },
  {
    id: '19', leetcodeNo: 19, title: '删除链表倒数第 N 个节点', difficulty: 'medium',
    tags: ['链表', '双指针'],
    brief: '一趟扫描删除倒数第 n 个节点。',
    insight: '快慢指针：快指针先走 n 步，再同速走，快到末尾时慢指针恰在倒数第 n+1 个。',
    derivation: ['dummy 头，slow=fast=dummy。', 'fast 先走 n+1 步（dummy 算 0）。', '同步走直到 fast=null，slow.next 即要删的节点。'],
    code: `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head)
  let slow = dummy, fast = dummy
  for (let i = 0; i <= n; i++) fast = fast!.next!
  while (fast) { slow = slow.next!; fast = fast.next! }
  slow.next = slow.next!.next
  return dummy.next
}`,
    timeComplexity: 'O(L)', spaceComplexity: 'O(1)',
    pitfalls: ['用 dummy 处理删除头节点的情况。'],
    animation: 'reverse-ll',
  },

  // ---------- Tree ----------
  {
    id: '226', leetcodeNo: 226, title: '翻转二叉树', difficulty: 'easy',
    tags: ['树', 'DFS'],
    brief: '左右子树互换。',
    insight: '前序遍历：每到一个节点 swap(left, right)，再递归左右。',
    derivation: ['root 空返回 null。', 'swap(root.left, root.right)。', '递归 invert(left)、invert(right)。'],
    code: `function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null
  [root.left, root.right] = [root.right, root.left]
  invertTree(root.left)
  invertTree(root.right)
  return root
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(h)',
    pitfalls: ['任何遍历顺序都行。'],
    animation: 'invert-tree',
  },
  {
    id: '104', leetcodeNo: 104, title: '二叉树最大深度', difficulty: 'easy',
    tags: ['树', 'DFS'],
    brief: '根到最远叶节点的节点数。',
    insight: 'DFS: maxDepth(root) = 1 + max(depth(left), depth(right))。',
    derivation: ['空节点返回 0。', '否则 1 + max(左, 右)。'],
    code: `function maxDepth(root: TreeNode | null): number {
  if (!root) return 0
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(h)',
    pitfalls: ['也可以 BFS 层序计数。'],
    animation: 'tree-bfs',
  },
  {
    id: '543', leetcodeNo: 543, title: '二叉树直径', difficulty: 'easy',
    tags: ['树', 'DFS'],
    brief: '任意两节点最长路径边数。',
    insight: 'DFS 返回节点高度；过程中经过该节点的最长路径 = leftH + rightH，全局 max。',
    derivation: ['后序遍历。', '高度 = 1 + max(左右)。', '经过当前节点的路径长 = leftH + rightH，更新 ans。'],
    code: `function diameterOfBinaryTree(root: TreeNode | null): number {
  let ans = 0
  const dfs = (n: TreeNode | null): number => {
    if (!n) return 0
    const l = dfs(n.left), r = dfs(n.right)
    ans = Math.max(ans, l + r)
    return 1 + Math.max(l, r)
  }
  dfs(root)
  return ans
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(h)',
    pitfalls: ['直径是边数不是节点数。'],
    animation: 'tree-bfs',
  },
  {
    id: '100', leetcodeNo: 100, title: '相同的树', difficulty: 'easy',
    tags: ['树', 'DFS'],
    brief: '两树是否结构和值相同。',
    insight: '递归：p、q 同空 true；一空 false；值不等 false；再递归左右。',
    derivation: ['都 null → true。', '一 null → false。', 'val 不等 false；否则 isSame(p.left,q.left) && isSame(p.right,q.right)。'],
    code: `function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true
  if (!p || !q) return false
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(h)',
    pitfalls: ['先判空再取 val。'],
    animation: 'tree-bfs',
  },
  {
    id: '236', leetcodeNo: 236, title: '二叉树的最近公共祖先', difficulty: 'medium',
    tags: ['树', 'DFS'],
    brief: '找 p、q 的最近公共祖先。',
    insight: '后序 DFS：当前节点是 p 或 q 或 null 就返回；左右返回都非空则当前是 LCA，否则返回非空那侧。',
    derivation: ['dfs(root): root 空或 root 是 p/q 时 return root。', 'left=dfs(left), right=dfs(right)。', '左右都非空 → root 是 LCA。', '否则返回非空的一侧。'],
    code: `function lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  if (!root || root === p || root === q) return root
  const l = lowestCommonAncestor(root.left, p, q)
  const r = lowestCommonAncestor(root.right, p, q)
  if (l && r) return root
  return l ?? r
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(h)',
    pitfalls: ['函数返回的是「这侧是否含 p 或 q」。'],
    animation: 'lca',
  },
  {
    id: '102', leetcodeNo: 102, title: '二叉树层序遍历', difficulty: 'medium',
    tags: ['BFS', '树'],
    brief: '按层返回节点值。',
    insight: 'BFS：队列每层开始时记录当前 size，处理 size 个节点。',
    derivation: ['queue 初始化放 root。', 'while queue: sz=queue.length，处理 sz 个，收集 val。', '子节点入队。'],
    code: `function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return []
  const q: TreeNode[] = [root], ans: number[][] = []
  while (q.length) {
    const sz = q.length, level: number[] = []
    for (let i = 0; i < sz; i++) {
      const n = q.shift()!
      level.push(n.val)
      if (n.left) q.push(n.left)
      if (n.right) q.push(n.right)
    }
    ans.push(level)
  }
  return ans
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
    pitfalls: ['必须在每层开始时取 size。'],
    animation: 'tree-bfs',
  },
  {
    id: '98', leetcodeNo: 98, title: '验证二叉搜索树', difficulty: 'medium',
    tags: ['树', 'DFS'],
    brief: '是否是合法 BST。',
    insight: '中序遍历应严格递增；或 DFS 时传上下界 (low, high)。',
    derivation: ['dfs(node, low, high): node.val 必须在 (low, high) 内。', '左子树 high = node.val。', '右子树 low = node.val。'],
    code: `function isValidBST(root: TreeNode | null): boolean {
  const dfs = (n: TreeNode | null, lo: number, hi: number): boolean => {
    if (!n) return true
    if (n.val <= lo || n.val >= hi) return false
    return dfs(n.left, lo, n.val) && dfs(n.right, n.val, hi)
  }
  return dfs(root, -Infinity, Infinity)
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(h)',
    pitfalls: ['不能只比较父子，要传整棵子树的上下界。'],
    animation: 'tree-bfs',
  },
  {
    id: '230', leetcodeNo: 230, title: 'BST 中第 K 小的元素', difficulty: 'medium',
    tags: ['树', 'DFS'],
    brief: 'BST 中第 k 小（1-indexed）。',
    insight: '中序遍历是升序，数到第 k 个即停。',
    derivation: ['中序 DFS，维护计数器。', 'count++ 到 k 时记录 root.val。'],
    code: `function kthSmallest(root: TreeNode | null, k: number): number {
  let ans = 0, cnt = 0
  const dfs = (n: TreeNode | null) => {
    if (!n || cnt >= k) return
    dfs(n.left)
    if (++cnt === k) { ans = n.val; return }
    dfs(n.right)
  }
  dfs(root)
  return ans
}`,
    timeComplexity: 'O(h+k)', spaceComplexity: 'O(h)',
    pitfalls: ['中序是左根右。'],
    animation: 'tree-bfs',
  },
  {
    id: '112', leetcodeNo: 112, title: '路径总和', difficulty: 'easy',
    tags: ['树', 'DFS'],
    brief: '是否存在根到叶路径和等于 target。',
    insight: 'DFS 减 target：到叶时检查 target 减成 0。',
    derivation: ['dfs(node, target): node 空 false。', '叶节点 return node.val === target。', '否则 dfs(left, target-val) || dfs(right, target-val)。'],
    code: `function hasPathSum(root: TreeNode | null, target: number): boolean {
  if (!root) return false
  if (!root.left && !root.right) return root.val === target
  return hasPathSum(root.left, target - root.val) || hasPathSum(root.right, target - root.val)
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(h)',
    pitfalls: ['必须到叶节点。'],
    animation: 'tree-bfs',
  },

  // ---------- Graph / BFS ----------
  {
    id: '200', leetcodeNo: 200, title: '岛屿数量', difficulty: 'medium',
    tags: ['DFS', 'BFS', '网格'],
    brief: '1 是陆地 0 是水，数岛屿个数。',
    insight: '扫描每个格子，遇到未访问的 1 就 count++，并 DFS/BFS 把整块 1 染成 0。',
    derivation: ['双重循环遍历 grid。', 'grid[i][j] === 1 时 count++，DFS 把连通 1 全改为 0。', 'DFS 向四方向扩展。'],
    code: `function numIslands(grid: string[][]): number {
  let count = 0
  const dfs = (i: number, j: number) => {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === '0') return
    grid[i][j] = '0'
    dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1)
  }
  for (let i = 0; i < grid.length; i++) for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] === '1') { count++; dfs(i, j) }
  }
  return count
}`,
    timeComplexity: 'O(mn)', spaceComplexity: 'O(mn)',
    pitfalls: ['原地改 grid，否则要 visited 矩阵。'],
    animation: 'islands',
  },
  {
    id: '695', leetcodeNo: 695, title: '岛屿的最大面积', difficulty: 'medium',
    tags: ['DFS', '网格'],
    brief: '求最大岛屿面积。',
    insight: '每个连通块 DFS 返回面积，取 max。',
    derivation: ['dfs 返回本块面积 = 1 + 四方向 dfs。', '全局 max。'],
    code: `function maxAreaOfIsland(grid: number[][]): number {
  const dfs = (i: number, j: number): number => {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === 0) return 0
    grid[i][j] = 0
    return 1 + dfs(i+1,j) + dfs(i-1,j) + dfs(i,j+1) + dfs(i,j-1)
  }
  let ans = 0
  for (let i = 0; i < grid.length; i++) for (let j = 0; j < grid[0].length; j++)
    if (grid[i][j] === 1) ans = Math.max(ans, dfs(i, j))
  return ans
}`,
    timeComplexity: 'O(mn)', spaceComplexity: 'O(mn)',
    pitfalls: ['访问过的格子要置 0。'],
    animation: 'islands',
  },
  {
    id: '994', leetcodeNo: 994, title: '腐烂的橘子', difficulty: 'medium',
    tags: ['BFS', '队列'],
    brief: '每分钟腐烂橘子感染相邻橘子，多久全部腐烂。',
    insight: '多源 BFS：初始所有烂橘子入队，按层扩散，层数即分钟数。',
    derivation: ['统计新鲜橘子数 fresh。', '所有 2 入队。', 'while queue: 逐层处理，每层 minutes++，新鲜--。', '最后 fresh===0 返回 minutes，否则 -1。'],
    code: `function orangesRotting(grid: number[][]): number {
  const q: [number, number][] = []
  let fresh = 0, minutes = 0
  for (let i = 0; i < grid.length; i++) for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] === 2) q.push([i, j])
    else if (grid[i][j] === 1) fresh++
  }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]]
  while (q.length && fresh > 0) {
    minutes++
    for (let k = q.length; k > 0; k--) {
      const [i, j] = q.shift()!
      for (const [di, dj] of dirs) {
        const ni = i+di, nj = j+dj
        if (ni >= 0 && nj >= 0 && ni < grid.length && nj < grid[0].length && grid[ni][nj] === 1) {
          grid[ni][nj] = 2; fresh--; q.push([ni, nj])
        }
      }
    }
  }
  return fresh === 0 ? minutes : -1
}`,
    timeComplexity: 'O(mn)', spaceComplexity: 'O(mn)',
    pitfalls: ['多源 BFS，初始所有烂橘子都入队。'],
    animation: 'rotten',
  },
  {
    id: '207', leetcodeNo: 207, title: '课程表', difficulty: 'medium',
    tags: ['图', '拓扑排序', 'BFS'],
    brief: '学完所有课是否可能（ prerequisites 是有向边）。',
    insight: '拓扑排序 Kahn：统计入度，入度 0 入队，每次减少邻居入度，最后处理数等于 n 即无环。',
    derivation: ['建邻接表和 indegree 数组。', '所有 indegree=0 入队。', 'BFS: 出队 count++, 邻居 indegree--, 到 0 入队。', 'count===n 即可行。'],
    code: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const adj: number[][] = Array.from({ length: numCourses }, () => [])
  const indeg = new Array(numCourses).fill(0)
  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++ }
  const q: number[] = []
  indeg.forEach((d, i) => { if (d === 0) q.push(i) })
  let count = 0
  while (q.length) {
    const c = q.shift()!; count++
    for (const nxt of adj[c]) if (--indeg[nxt] === 0) q.push(nxt)
  }
  return count === numCourses
}`,
    timeComplexity: 'O(V+E)', spaceComplexity: 'O(V+E)',
    pitfalls: ['边方向: b→a 表示先 b 后 a。'],
    animation: 'topo-sort',
  },

  // ---------- Binary Search ----------
  {
    id: '704', leetcodeNo: 704, title: '二分查找', difficulty: 'easy',
    tags: ['二分'],
    brief: '有序数组中找 target。',
    insight: 'lo/hi 闭区间，mid = floor，比较后缩边界。',
    derivation: ['lo=0, hi=n-1。', 'while lo<=hi: mid=(lo+hi)>>1。', 'nums[mid]===target 返回；< target lo=mid+1；> hi=mid-1。'],
    code: `function search(nums: number[], target: number): number {
  let lo = 0, hi = nums.length - 1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (nums[mid] === target) return mid
    else if (nums[mid] < target) lo = mid + 1
    else hi = mid - 1
  }
  return -1
}`,
    timeComplexity: 'O(log n)', spaceComplexity: 'O(1)',
    pitfalls: ['循环条件 lo<=hi，不是 <。'],
    animation: 'binary-search',
  },
  {
    id: '74', leetcodeNo: 74, title: '搜索二维矩阵', difficulty: 'medium',
    tags: ['二分', '矩阵'],
    brief: '每行有序、每行首 > 上行末，二分找 target。',
    insight: '把矩阵看成一维数组：index = mid，r = mid / n，c = mid % n。',
    derivation: ['m 行 n 列，lo=0, hi=m*n-1。', 'mid → r=mid/n, c=mid%n。', '比较 mat[r][c] 缩边界。'],
    code: `function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length, n = matrix[0].length
  let lo = 0, hi = m * n - 1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    const v = matrix[Math.floor(mid / n)][mid % n]
    if (v === target) return true
    else if (v < target) lo = mid + 1
    else hi = mid - 1
  }
  return false
}`,
    timeComplexity: 'O(log(mn))', spaceComplexity: 'O(1)',
    pitfalls: ['除/取模注意整数除法。'],
    animation: 'binary-search',
  },
  {
    id: '153', leetcodeNo: 153, title: '寻找旋转排序数组中的最小值', difficulty: 'medium',
    tags: ['二分'],
    brief: '旋转过的升序数组中找最小值。',
    insight: '比较 nums[mid] 和 nums[hi]：mid > hi 说明最小值在右半，否则在左半。',
    derivation: ['lo=0, hi=n-1。', 'while lo<hi: mid。', 'nums[mid] > nums[hi] → lo=mid+1，否则 hi=mid。'],
    code: `function findMin(nums: number[]): number {
  let lo = 0, hi = nums.length - 1
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (nums[mid] > nums[hi]) lo = mid + 1
    else hi = mid
  }
  return nums[lo]
}`,
    timeComplexity: 'O(log n)', spaceComplexity: 'O(1)',
    pitfalls: ['和 nums[hi] 比，不是 nums[lo]。'],
    animation: 'find-min-rotated',
  },
  {
    id: '33', leetcodeNo: 33, title: '搜索旋转排序数组', difficulty: 'medium',
    tags: ['二分'],
    brief: '旋转数组中找 target，O(log n)。',
    insight: '每次 mid 把数组分成两半，必有一半有序；判断 target 在有序那半还是另一半。',
    derivation: ['if nums[lo..mid] 有序: target 在内 → hi=mid-1, else lo=mid+1。', 'else nums[mid..hi] 有序: target 在内 → lo=mid+1, else hi=mid-1。'],
    code: `function search(nums: number[], target: number): number {
  let lo = 0, hi = nums.length - 1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (nums[mid] === target) return mid
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1
      else lo = mid + 1
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1
      else hi = mid - 1
    }
  }
  return -1
}`,
    timeComplexity: 'O(log n)', spaceComplexity: 'O(1)',
    pitfalls: ['用 nums[lo] <= nums[mid] 判断左半有序（注意 = 处理重复）。'],
    animation: 'search-rotated',
  },
  {
    id: '875', leetcodeNo: 875, title: '爱吃香蕉的珂珂', difficulty: 'medium',
    tags: ['二分'],
    brief: 'h 小时内吃完 piles，求最小速度 k。',
    insight: '二分答案 k：每堆耗时 ceil(pile/k)，总和 <= h 则可行。',
    derivation: ['k 范围 [1, max(piles)]。', 'can(k) = sum(Math.ceil(p/k)) <= h。', '二分找最小 k。'],
    code: `function minEatingSpeed(piles: number[], h: number): number {
  let lo = 1, hi = Math.max(...piles)
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    const hours = piles.reduce((a, p) => a + Math.ceil(p / mid), 0)
    if (hours <= h) hi = mid
    else lo = mid + 1
  }
  return lo
}`,
    timeComplexity: 'O(n log maxP)', spaceComplexity: 'O(1)',
    pitfalls: ['二分答案模板：可行时 hi=mid。'],
    animation: 'binary-search',
  },

  // ---------- Heap / Top K ----------
  {
    id: '215', leetcodeNo: 215, title: '数组中的第 K 个最大元素', difficulty: 'medium',
    tags: ['快速选择', '堆'],
    brief: '不排序找第 k 大。',
    insight: 'QuickSelect：分区后 pivot 位置 == k-1 即返回，否则递归一侧。',
    derivation: ['随机选 pivot， Lomuto 分区。', 'pivot 排好后其 index pos。', 'pos === k-1 返回；< k-1 递归右；> 递归左。'],
    code: `function findKthLargest(nums: number[], k: number): number {
  const target = nums.length - k
  const quick = (l: number, r: number): number => {
    const p = nums[r]; let i = l
    for (let j = l; j < r; j++) if (nums[j] < p) { [nums[i], nums[j]] = [nums[j], nums[i]]; i++ }
    [nums[i], nums[r]] = [nums[r], nums[i]]
    if (i === target) return nums[i]
    return i < target ? quick(i+1, r) : quick(l, i-1)
  }
  return quick(0, nums.length - 1)
}`,
    timeComplexity: 'O(n) 平均', spaceComplexity: 'O(log n)',
    pitfalls: ['最坏 O(n²)，随机化 pivot 可避免。'],
    animation: 'quickselect',
  },
  {
    id: '347', leetcodeNo: 347, title: '前 K 个高频元素', difficulty: 'medium',
    tags: ['哈希表', '堆', '桶排序'],
    brief: '返回出现频率前 k 高的元素。',
    insight: 'Map 计数后桶排序：按频率做 bucket 数组，从高到低取 k 个。',
    derivation: ['Map<num, count>。', 'bucket: count → nums[]。', '从 bucket.length-1 往下取到 k 个。'],
    code: `function topKFrequent(nums: number[], k: number): number[] {
  const cnt = new Map<number, number>()
  for (const n of nums) cnt.set(n, (cnt.get(n) ?? 0) + 1)
  const bucket: number[][] = Array.from({ length: nums.length + 1 }, () => [])
  for (const [n, c] of cnt) bucket[c].push(n)
  const ans: number[] = []
  for (let i = bucket.length - 1; i >= 0 && ans.length < k; i--) ans.push(...bucket[i])
  return ans
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
    pitfalls: ['桶排序 O(n)，避免用堆 O(n log k)。'],
    animation: 'top-k-bucket',
  },

  // ---------- Intervals ----------
  {
    id: '57', leetcodeNo: 57, title: '插入区间', difficulty: 'medium',
    tags: ['数组', '区间'],
    brief: '在已排序无重叠区间中插入新区间，必要时合并。',
    insight: '三段扫描：左边不重叠的直接加；重叠的全部合并；右边直接加。',
    derivation: ['所有 end < newStart 的区间直接加入。', '所有 start <= newEnd 的区间合并 [min(s), max(e)]。', '剩余直接加入。'],
    code: `function insert(intervals: number[][], newInterval: number[]): number[][] {
  const ans: number[][] = []
  let i = 0, n = intervals.length
  while (i < n && intervals[i][1] < newInterval[0]) ans.push(intervals[i++])
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0])
    newInterval[1] = Math.max(newInterval[1], intervals[i][1])
    i++
  }
  ans.push(newInterval)
  while (i < n) ans.push(intervals[i++])
  return ans
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
    pitfalls: ['一次遍历即可，不需要先插入再合并。'],
    animation: 'merge-intervals',
  },

  // ---------- DP ----------
  {
    id: '70', leetcodeNo: 70, title: '爬楼梯', difficulty: 'easy',
    tags: ['DP', '斐波那契'],
    brief: '每次 1 或 2 步，到 n 阶有几种方法。',
    insight: 'dp[i] = dp[i-1] + dp[i-2]，滚动变量即可。',
    derivation: ['dp[0]=1, dp[1]=1。', 'for i=2..n: dp[i] = dp[i-1]+dp[i-2]。', '空间优化为两个变量。'],
    code: `function climbStairs(n: number): number {
  let a = 1, b = 1
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b]
  return b
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['初始 a=b=1。'],
    animation: 'climbing',
  },
  {
    id: '198', leetcodeNo: 198, title: '打家劫舍', difficulty: 'medium',
    tags: ['DP'],
    brief: '不能偷相邻两家，求最大金额。',
    insight: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])。',
    derivation: ['到 i 有两种选择：不偷 i → dp[i-1]；偷 i → dp[i-2]+nums[i]。', '取 max。'],
    code: `function rob(nums: number[]): number {
  let prev = 0, cur = 0
  for (const x of nums) {
    [prev, cur] = [cur, Math.max(cur, prev + x)]
  }
  return cur
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['两个变量滚动即可。'],
    animation: 'house-robber',
  },
  {
    id: '322', leetcodeNo: 322, title: '零钱兑换', difficulty: 'medium',
    tags: ['DP', '完全背包'],
    brief: '硬币无限个，凑 amount 的最少硬币数。',
    insight: 'dp[i] = min(dp[i], dp[i-coin] + 1) for each coin。',
    derivation: ['dp 数组初始 amount+1（不可达），dp[0]=0。', 'for i=1..amount: for coin: if i>=coin: dp[i]=min(dp[i], dp[i-coin]+1)。', 'dp[amount] > amount 则返回 -1。'],
    code: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(amount + 1)
  dp[0] = 0
  for (let i = 1; i <= amount; i++)
    for (const c of coins) if (c <= i) dp[i] = Math.min(dp[i], dp[i - c] + 1)
  return dp[amount] > amount ? -1 : dp[amount]
}`,
    timeComplexity: 'O(amount * coins)', spaceComplexity: 'O(amount)',
    pitfalls: ['初始值要大于 amount，不能用 Infinity（加法后变 NaN 风险）。'],
    animation: 'coin-change',
  },
  {
    id: '139', leetcodeNo: 139, title: '单词拆分', difficulty: 'medium',
    tags: ['DP'],
    brief: 's 能否用 wordDict 中的词拼出。',
    insight: 'dp[i] = 存在 j: dp[j] && s[j..i] 在字典里。',
    derivation: ['dp[0]=true。', 'for i=1..n: for word in dict: if i>=word.length && dp[i-len] && s.slice(i-len,i)===word: dp[i]=true。'],
    code: `function wordBreak(s: string, wordDict: string[]): boolean {
  const set = new Set(wordDict)
  const dp = new Array(s.length + 1).fill(false)
  dp[0] = true
  for (let i = 1; i <= s.length; i++)
    for (let j = 0; j < i; j++)
      if (dp[j] && set.has(s.slice(j, i))) { dp[i] = true; break }
  return dp[s.length]
}`,
    timeComplexity: 'O(n²)', spaceComplexity: 'O(n)',
    pitfalls: ['字典查 O(1) 用 Set。'],
    animation: 'word-break-dp',
  },
  {
    id: '300', leetcodeNo: 300, title: '最长递增子序列', difficulty: 'medium',
    tags: ['DP', '二分'],
    brief: 'LIS 长度。',
    insight: ['耐心排序：维护 tails 数组，tails[k] 是长度 k+1 的子序列最小末尾。', '每个 x 二分找第一个 >= x 的位置替换。', 'tails 长度即 LIS。'].join('\n'),
    derivation: [],
    code: `function lengthOfLIS(nums: number[]): number {
  const tails: number[] = []
  for (const x of nums) {
    let lo = 0, hi = tails.length
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (tails[mid] < x) lo = mid + 1
      else hi = mid
    }
    tails[lo] = x
  }
  return tails.length
}`,
    timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)',
    pitfalls: ['tails 本身不是 LIS，只是长度正确。'],
    animation: 'lis',
  },
  {
    id: '152', leetcodeNo: 152, title: '乘积最大子数组', difficulty: 'medium',
    tags: ['DP'],
    brief: '连续子数组最大乘积。',
    insight: ['负数 × 负数变正：同时维护 curMax 和 curMin。', '每步：candidates = [x, curMax*x, curMin*x]，curMax=max, curMin=min。'].join('\n'),
    derivation: [],
    code: `function maxProduct(nums: number[]): number {
  let max = nums[0], min = nums[0], ans = nums[0]
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i]
    if (x < 0) [max, min] = [min, max]
    max = Math.max(x, max * x)
    min = Math.min(x, min * x)
    ans = Math.max(ans, max)
  }
  return ans
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['遇到负数要交换 max/min。'],
    animation: 'kadane',
  },
  {
    id: '416', leetcodeNo: 416, title: '分割等和子集', difficulty: 'medium',
    tags: ['DP', '0/1 背包'],
    brief: '能否把数组分成和相等的两部分。',
    insight: ['总和必须偶数，target = sum/2。', '0/1 背包：dp[s] = 是否能凑出 s。', '每数从大到小更新 dp[s] |= dp[s-x]。'].join('\n'),
    derivation: [],
    code: `function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((a, b) => a + b, 0)
  if (sum % 2) return false
  const target = sum / 2
  const dp = new Array(target + 1).fill(false)
  dp[0] = true
  for (const x of nums)
    for (let s = target; s >= x; s--) dp[s] = dp[s] || dp[s - x]
  return dp[target]
}`,
    timeComplexity: 'O(n * target)', spaceComplexity: 'O(target)',
    pitfalls: ['必须逆序遍历，否则同一个数用多次。'],
    animation: 'knapsack',
  },
  {
    id: '62', leetcodeNo: 62, title: '不同路径', difficulty: 'medium',
    tags: ['DP'],
    brief: 'm×n 网格从左上到右下，只能右/下，多少条路。',
    insight: 'dp[i][j] = dp[i-1][j] + dp[i][j-1]，首行首列全 1。',
    derivation: ['第一行、第一列都是 1。', '其余 dp[i][j] = 上 + 左。', '可滚动为一维数组。'],
    code: `function uniquePaths(m: number, n: number): number {
  const dp = new Array(n).fill(1)
  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++) dp[j] += dp[j - 1]
  return dp[n - 1]
}`,
    timeComplexity: 'O(mn)', spaceComplexity: 'O(n)',
    pitfalls: ['一维 dp 时每行从左到右累加。'],
    animation: 'unique-paths',
  },

  // ---------- Greedy ----------
  {
    id: '55', leetcodeNo: 55, title: '跳跃游戏', difficulty: 'medium',
    tags: ['贪心', '数组'],
    brief: 'nums[i] 是最大跳几步，能否到最后。',
    insight: '维护最远可达位置 maxReach：遍历 i，若 i > maxReach 则失败，否则 maxReach = max(maxReach, i + nums[i])。',
    derivation: ['maxReach=0。', 'for i: if i>maxReach false; maxReach=max(maxReach, i+nums[i])。', '遍历完 true。'],
    code: `function canJump(nums: number[]): boolean {
  let reach = 0
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false
    reach = Math.max(reach, i + nums[i])
  }
  return true
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['不是每步都要跳到最远，而是记录最远可达。'],
    animation: 'jump-game',
  },
  {
    id: '134', leetcodeNo: 134, title: '加油站', difficulty: 'medium',
    tags: ['贪心'],
    brief: 'gas[i] - cost[i] 为净油量，找起点能绕一圈。',
    insight: ['总净油量 < 0 必无解。', '从 0 开始累加 tank，tank<0 时把起点设为 i+1，tank 清零。', '最终起点即答案。'].join('\n'),
    derivation: [],
    code: `function canCompleteCircuit(gas: number[], cost: number[]): number {
  let total = 0, tank = 0, start = 0
  for (let i = 0; i < gas.length; i++) {
    const d = gas[i] - cost[i]
    total += d; tank += d
    if (tank < 0) { start = i + 1; tank = 0 }
  }
  return total >= 0 ? start : -1
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['如果总净 < 0 直接 -1。'],
    animation: 'gas-station',
  },

  // ---------- Bit ----------
  {
    id: '136', leetcodeNo: 136, title: '只出现一次的数字', difficulty: 'easy',
    tags: ['位运算'],
    brief: '除一个数外都出现两次，找出那个数。',
    insight: '异或：a^a=0, a^0=a。全部异或结果即唯一数。',
    derivation: ['ans=0。', 'for x: ans ^= x。', '成对的数异或抵消，剩下唯一数。'],
    code: `function singleNumber(nums: number[]): number {
  return nums.reduce((a, b) => a ^ b, 0)
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    pitfalls: ['异或交换律结合律。'],
    animation: 'single-xor',
  },
  {
    id: '191', leetcodeNo: 191, title: '位 1 的个数', difficulty: 'easy',
    tags: ['位运算'],
    brief: '无符号整数二进制中 1 的个数。',
    insight: 'n & (n-1) 消掉最低位的 1，循环计数直到 n=0。',
    derivation: ['while n: count++; n &= n-1。', '每次消一个 1。'],
    code: `function hammingWeight(n: number): number {
  let c = 0
  while (n) { n &= n - 1; c++ }
  return c
}`,
    timeComplexity: 'O(1)', spaceComplexity: 'O(1)',
    pitfalls: ['JS 中用 >>> 0 转无符号。'],
    animation: 'hamming-weight',
  },
  {
    id: '338', leetcodeNo: 338, title: '比特位计数', difficulty: 'easy',
    tags: ['位运算', 'DP'],
    brief: '0..n 每个数的 1 的个数。',
    insight: 'dp[i] = dp[i >> 1] + (i & 1)。',
    derivation: ['i 右移一位和 i 的 1 的个数只差最低位。', 'dp[i] = dp[i>>1] + (i&1)。'],
    code: `function countBits(n: number): number[] {
  const ans = new Array(n + 1).fill(0)
  for (let i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1)
  return ans
}`,
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
    pitfalls: ['也可用 i & (i-1): ans[i] = ans[i&(i-1)] + 1。'],
    animation: 'count-bits',
  },

  // ---------- Math ----------
  {
    id: '9', leetcodeNo: 9, title: '回文数', difficulty: 'easy',
    tags: ['数学'],
    brief: '判断整数是否回文。',
    insight: '负数不是；反转后半部分，比较前后两半。',
    derivation: ['x<0 false。', 'while x > rev: rev = rev*10 + x%10; x = floor(x/10)。', '结束后 x === rev 或 x === floor(rev/10)（奇数位）。'],
    code: `function isPalindrome(x: number): boolean {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false
  let rev = 0
  while (x > rev) { rev = rev * 10 + (x % 10); x = Math.floor(x / 10) }
  return x === rev || x === Math.floor(rev / 10)
}`,
    timeComplexity: 'O(log n)', spaceComplexity: 'O(1)',
    pitfalls: ['末尾为 0 的非 0 数必不是回文。'],
    animation: 'palindrome-num',
  },

  // ---------- Backtracking ----------
  {
    id: '17', leetcodeNo: 17, title: '电话号码的字母组合', difficulty: 'medium',
    tags: ['回溯'],
    brief: '数字 2-9 映射字母，返回所有组合。',
    insight: ['逐位选择当前数字对应的字母，DFS。', 'map: 2→abc, 3→def...', 'dfs(pos, path): pos===n 时收集结果。'].join('\n'),
    derivation: [],
    code: `function letterCombinations(digits: string): string[] {
  if (!digits) return []
  const map: Record<string, string> = { '2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz' }
  const ans: string[] = []
  const dfs = (i: number, path: string) => {
    if (i === digits.length) { ans.push(path); return }
    for (const ch of map[digits[i]]) dfs(i + 1, path + ch)
  }
  dfs(0, '')
  return ans
}`,
    timeComplexity: 'O(4^n)', spaceComplexity: 'O(n)',
    pitfalls: ['空字符串输入返回 []。'],
    animation: 'tree-bfs',
  },
  {
    id: '39', leetcodeNo: 39, title: '组合总和', difficulty: 'medium',
    tags: ['回溯'],
    brief: 'candidates 无重复，每个可无限选，凑 target 的组合。',
    insight: ['DFS + 剪枝：按起始 index 搜索，避免重复。', 'dfs(start, target, path): target===0 收集。', 'for i=start..: dfs(i, target-cand[i], path+[cand[i]])。'].join('\n'),
    derivation: [],
    code: `function combinationSum(candidates: number[], target: number): number[][] {
  const ans: number[][] = []
  const dfs = (start: number, target: number, path: number[]) => {
    if (target === 0) { ans.push([...path]); return }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > target) continue
      path.push(candidates[i])
      dfs(i, target - candidates[i], path)
      path.pop()
    }
  }
  dfs(0, target, [])
  return ans
}`,
    timeComplexity: 'O(n^(target/min))', spaceComplexity: 'O(target/min)',
    pitfalls: ['递归传 i（不是 i+1）因为可重复选。'],
    animation: 'tree-bfs',
  },
  {
    id: '46', leetcodeNo: 46, title: '全排列', difficulty: 'medium',
    tags: ['回溯'],
    brief: '互不相同的数字所有排列。',
    insight: ['用 used 数组标记已用，DFS 每步选一个未用数字。', 'path 长度 === n 时收集。'].join('\n'),
    derivation: [],
    code: `function permute(nums: number[]): number[][] {
  const ans: number[][] = []
  const used = new Array(nums.length).fill(false)
  const dfs = (path: number[]) => {
    if (path.length === nums.length) { ans.push([...path]); return }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue
      used[i] = true; path.push(nums[i])
      dfs(path)
      path.pop(); used[i] = false
    }
  }
  dfs([])
  return ans
}`,
    timeComplexity: 'O(n·n!)', spaceComplexity: 'O(n)',
    pitfalls: ['每步回溯 used 和 path。'],
    animation: 'tree-bfs',
  },
  {
    id: '78', leetcodeNo: 78, title: '子集', difficulty: 'medium',
    tags: ['回溯'],
    brief: '所有子集（含空集）。',
    insight: ['每个元素选或不选，DFS 到末尾收集当前 path。', '或按 start index 递归：for i: 选 nums[i]，dfs(i+1)。'].join('\n'),
    derivation: [],
    code: `function subsets(nums: number[]): number[][] {
  const ans: number[][] = []
  const dfs = (start: number, path: number[]) => {
    ans.push([...path])
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i])
      dfs(i + 1, path)
      path.pop()
    }
  }
  dfs(0, [])
  return ans
}`,
    timeComplexity: 'O(n·2^n)', spaceComplexity: 'O(n)',
    pitfalls: ['每个节点都要收集，不是只在叶节点。'],
    animation: 'tree-bfs',
  },
  {
    id: '22', leetcodeNo: 22, title: '括号生成', difficulty: 'medium',
    tags: ['回溯', '字符串'],
    brief: 'n 对括号所有合法组合。',
    insight: ['回溯：open<n 可加 (，close<open 可加 )。', 'path 长度 2n 收集。'].join('\n'),
    derivation: [],
    code: `function generateParenthesis(n: number): string[] {
  const ans: string[] = []
  const dfs = (open: number, close: number, path: string) => {
    if (path.length === 2 * n) { ans.push(path); return }
    if (open < n) dfs(open + 1, close, path + '(')
    if (close < open) dfs(open, close + 1, path + ')')
  }
  dfs(0, 0, '')
  return ans
}`,
    timeComplexity: 'O(Catalan(n))', spaceComplexity: 'O(n)',
    pitfalls: ['右括号数 < 左括号数 才能加 )。'],
    animation: 'valid-paren',
  },
  {
    id: '79', leetcodeNo: 79, title: '单词搜索', difficulty: 'medium',
    tags: ['DFS', '回溯', '网格'],
    brief: '网格中能否走出 word。',
    insight: ['每格 DFS，用过的格子临时标记 #。', '四个方向扩展。', '失败回溯恢复标记。'].join('\n'),
    derivation: [],
    code: `function exist(board: string[][], word: string): boolean {
  const dfs = (i: number, j: number, k: number): boolean => {
    if (k === word.length) return true
    if (i < 0 || j < 0 || i >= board.length || j >= board[0].length || board[i][j] !== word[k]) return false
    const ch = board[i][j]
    board[i][j] = '#'
    const found = dfs(i+1,j,k+1) || dfs(i-1,j,k+1) || dfs(i,j+1,k+1) || dfs(i,j-1,k+1)
    board[i][j] = ch
    return found
  }
  for (let i = 0; i < board.length; i++) for (let j = 0; j < board[0].length; j++)
    if (dfs(i, j, 0)) return true
  return false
}`,
    timeComplexity: 'O(m·n·3^L)', spaceComplexity: 'O(L)',
    pitfalls: ['访问过的格子要原地标记再恢复。'],
    animation: 'word-search',
  },
]
