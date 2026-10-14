import React from 'react'
import { motion } from 'framer-motion'
import type { CardData } from '../data/types'
import { CodeBlock } from './CodeBlock'
import { AlgorithmPlayer } from './AlgorithmPlayer'
import type { AnimationEntry } from './animations'

interface Props {
  card: CardData
  animation: AnimationEntry
  resetKey?: string | number
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
}

export const CardBack: React.FC<Props> = ({ card, animation, resetKey }) => {
  const { Component: AnimationComponent } = animation
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="px-6 py-6"
    >
      <motion.div variants={item} className="mb-5">
        <div className="text-xs text-gray-400 font-medium mb-1">核心洞察</div>
        <p className="text-[14px] text-gray-900 leading-relaxed">{card.insight}</p>
      </motion.div>

      <motion.div variants={item} className="mb-5">
        <div className="text-xs text-gray-400 font-medium mb-2">推导过程</div>
        <ol className="space-y-1.5">
          {card.derivation.map((d, i) => (
            <li key={i} className="text-[13px] text-gray-700 leading-relaxed flex gap-2">
              <span className="text-gray-400 font-mono flex-shrink-0 w-4">{i + 1}.</span>
              <span>{d}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      <motion.div variants={item} className="mb-5">
        <AlgorithmPlayer
          AnimationComponent={AnimationComponent}
          totalSteps={animation.totalSteps}
          resetKey={resetKey}
        />
      </motion.div>

      <motion.div variants={item} className="mb-5">
        <div className="text-xs text-gray-400 font-medium mb-1.5">代码模板</div>
        <CodeBlock code={card.code} />
      </motion.div>

      <motion.div variants={item} className="flex gap-4 mb-5 text-xs">
        <div>
          <span className="text-gray-400">时间 </span>
          <span className="text-gray-900 font-mono">{card.timeComplexity}</span>
        </div>
        <div>
          <span className="text-gray-400">空间 </span>
          <span className="text-gray-900 font-mono">{card.spaceComplexity}</span>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="text-xs text-gray-400 font-medium mb-1.5">易错点</div>
        <ul className="space-y-1">
          {card.pitfalls.map((p, i) => (
            <li key={i} className="text-[12.5px] text-gray-600 leading-relaxed flex gap-1.5">
              <span className="text-gray-400">—</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
