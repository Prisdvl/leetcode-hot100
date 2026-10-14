import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { CardData } from '../data/types'
import { CardFront } from './CardFront'
import { CardBack } from './CardBack'
import type { AnimationEntry } from './animations'

interface Props {
  card: CardData
  animation: AnimationEntry
  onFlippedChange?: (flipped: boolean) => void
}

export const FlashCard: React.FC<Props> = ({ card, animation, onFlippedChange }) => {
  const [flipped, setFlipped] = useState(false)
  const clickLock = useRef(false)

  const toggle = () => {
    if (clickLock.current) return
    clickLock.current = true
    setTimeout(() => (clickLock.current = false), 250)
    setFlipped((f) => {
      const nf = !f
      onFlippedChange?.(nf)
      return nf
    })
  }

  return (
    <div className="perspective-1200 w-full">
      <motion.div
        className="preserve-3d relative w-full cursor-pointer select-none h-[52vh] min-h-[340px]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 80) toggle() }}
        onClick={(e) => {
          const target = e.target as HTMLElement
          if (target.closest('button')) return
          toggle()
        }}
      >
        <motion.div className="backface-hidden absolute inset-0 w-full h-full bg-white rounded-lg flashcard-shadow border border-gray-200">
          <CardFront card={card} />
        </motion.div>

        <motion.div
          className="backface-hidden absolute inset-0 w-full h-full bg-white rounded-lg flashcard-shadow border border-gray-200 overflow-hidden"
          style={{ rotateY: 180 }}
          initial={false}
          animate={{ opacity: flipped ? 1 : 0 }}
        >
          <CardBack card={card} animation={animation} resetKey={card.id} />
        </motion.div>
      </motion.div>
    </div>
  )
}
