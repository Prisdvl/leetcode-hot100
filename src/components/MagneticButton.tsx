import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onClick: () => void
  className?: string
  children: React.ReactNode
  ariaLabel?: string
  dataCursorLabel?: string
}

/**
 * Magnetic button: cursor pulls the button slightly; tap scales down.
 */
export const MagneticButton: React.FC<Props> = ({ onClick, className = '', children, ariaLabel, dataCursorLabel }) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      aria-label={ariaLabel}
      data-cursor-label={dataCursorLabel}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        const x = e.clientX - r.left - r.width / 2
        const y = e.clientY - r.top - r.height / 2
        setOffset({ x: x * 0.12, y: y * 0.12 })
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  )
}
