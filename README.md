# LeetCode Hot 100 · 算法记忆卡片

> by [@Prisdvl](https://github.com/Prisdvl) · 仓库：[Prisdvl/leetcode-hot100](https://github.com/Prisdvl/leetcode-hot100)

一个基于「闪卡 + 间隔重复」的 LeetCode Hot 100 刷题记忆应用。每张卡片正面是题意，翻到背面包含核心洞察、分步推导、**可逐帧播放的算法动画**、TypeScript 代码模板、复杂度分析与易错点，帮助你把解题套路真正记进长期记忆。

纯前端实现，数据保存在浏览器本地，无需注册和后端。

## 功能特性

- **119 张题目卡片**：覆盖 Hot 100 全部题型（哈希、双指针、滑动窗口、链表、二叉树、图论、回溯、动态规划、栈/堆、贪心、位运算等）。
- **一题一动画**：每道题配有专属的步进式算法动画（双指针、滑动窗口、BFS、DP 填表、链表反转……），可播放 / 暂停 / 单步跟踪。
- **SM-2 间隔重复**：翻牌后按 `再来 / 困难 / 良好 / 简单` 四档评分，自动调度每张卡片的下次复习时间（Anki 同款算法）。
- **两种模式**
  - 复习模式：只刷到期卡片，按记忆曲线安排节奏；
  - 练习模式：自带思考计时器（可暂停），记录每题用时。
- **收藏与统计**：收藏薄弱题目，统计面板查看练习用时记录。
- **数据本地持久化**：复习进度、收藏、用时均存入 `localStorage`，支持一键导出 / 导入 JSON 备份。
- **移动端适配**：响应式布局，手机上也能随时刷卡。

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | React 18 + TypeScript |
| 构建 | Vite 5 |
| 样式 | Tailwind CSS 3 |
| 动画 | Framer Motion 11 |
| 其他 | ogl（背景渲染）、@hugeicons/core-free-icons |

## 快速开始

环境要求：Node.js 18+

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 类型检查 + 生产构建
npm run build

# 本地预览构建产物（http://localhost:4173）
npm run preview
```

其他脚本：

```bash
# 将本地 preview 服务通过 localtunnel 暴露到公网
npm run tunnel
```

## 项目结构

```
src/
├── App.tsx                    # 应用入口：翻牌、模式切换、计时与数据编排
├── main.tsx
├── data/
│   ├── types.ts               # CardData / AnimationKey 类型定义
│   ├── cards.ts               # 卡片数据汇总（基础 15 题）
│   ├── cards-extra.ts         # 扩展卡片（60 题）
│   └── cards-hot100.ts        # Hot 100 补全卡片（44 题）
├── components/
│   ├── CardFront.tsx          # 卡片正面：题意 / 标签 / 难度
│   ├── CardBack.tsx           # 卡片背面：洞察、推导、动画、代码、易错点
│   ├── AlgorithmPlayer.tsx    # 算法动画步进播放器
│   ├── FlashCard.tsx
│   ├── TopBar.tsx             # 底部导航：复习 / 练习模式、进度、导入导出
│   ├── RatingButtons.tsx      # SM-2 四档评分按钮
│   ├── StatsPanel.tsx         # 练习用时统计
│   └── animations/            # 各题专属动画 + ANIMATION_REGISTRY 注册表
├── hooks/
│   ├── useReviewQueue.ts      # 到期卡片队列与评分调度
│   └── useStepPlayer.ts       # 动画单步播放逻辑
└── utils/
    ├── sm2.ts                 # SM-2 间隔重复算法
    └── storage.ts             # localStorage 读写 / JSON 导入导出
```

## 卡片数据结构

每张卡片遵循 [CardData](src/data/types.ts) 接口：

```ts
interface CardData {
  id: string              // LeetCode 题号，作为唯一 id
  leetcodeNo: number
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]          // 例如 ['哈希表', '数组']
  brief: string           // 一句话题意（卡片正面）
  insight: string         // 一句话核心洞察
  derivation: string[]    // 分步骤推导
  code: string            // TypeScript 代码模板
  timeComplexity: string
  spaceComplexity: string
  pitfalls: string[]      // 易错点
  animation: AnimationKey // 对应 animations/ 注册表中的动画
}
```

### 新增一道题

1. 在 `src/data/` 下的数据文件中追加一个 `CardData` 对象（会被 `cards.ts` 汇总进 `CARDS`）；
2. 在 `src/data/types.ts` 的 `AnimationKey` 联合类型中新增动画 key；
3. 在 `src/components/animations/` 中实现动画组件（接收 `stepIndex` 逐帧渲染），并注册到 `animations/index.tsx` 的 `ANIMATION_REGISTRY`。

## 间隔重复算法（SM-2）

实现见 [sm2.ts](src/utils/sm2.ts)，与 SuperMemo 2 / Anki 思路一致：

- 每张卡片维护 `repetitions`（连续答对次数）、`intervalDays`（间隔天数）、`easeFactor`（难度系数，初始 2.5，下限 1.3）；
- 评分调度：
  - **再来 (again)**：重置进度，10 分钟后重新出现，难度系数 -0.2；
  - **困难 (hard)**：间隔约 ×1.2，难度系数 -0.15；
  - **良好 (good)**：首次 1 天 → 第二次 6 天 → 之后按当前难度系数递增；
  - **简单 (easy)**：首次 4 天 → 第二次 10 天 → 间隔再 ×1.3，难度系数 +0.15。

所有进度通过 [useReviewQueue](src/hooks/useReviewQueue.ts) 实时过滤到期卡片，并持久化到 `localStorage`。

## 数据与隐私

应用完全在浏览器本地运行，不收集任何数据。本地存储的键名：

- `leetcode100.progress.v1`：各卡片的 SM-2 复习进度
- `leetcode100.favorites.v1`：收藏题目
- `leetcode100.timings.v1`：练习模式用时记录

可通过底部导航的导出按钮下载 JSON 备份，或在清除浏览器数据前先导出。

## 部署

项目为纯静态站点，`npm run build` 产物在 `dist/`，可部署到任意静态托管。仓库已包含 Vercel 配置（`.vercel/`），导入 Vercel 后框架预设选择 **Vite** 即可零配置发布。
