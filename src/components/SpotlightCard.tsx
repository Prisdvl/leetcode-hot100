import React, { useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

/**
 * React Bits style spotlight card: a faint radial glow follows the cursor.
 */
export const SpotlightCard: React.FC<Props> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: -500, y: -500 })
  const [hover, setHover] = useState(false)

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPos({ x: -500, y: -500 }) }}
      className={`relative rounded-lg bg-white border overflow-hidden transition-colors duration-200 ${
        hover ? 'border-gray-300' : 'border-gray-200'
      } ${className}`}
      style={{
        background: hover
          ? `radial-gradient(480px circle at ${pos.x}px ${pos.y}px, rgba(0,0,0,0.035), transparent 45%), #fff`
          : '#fff',
      }}
    >
      {/* top hairline highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-200"
        style={{
          opacity: hover ? 1 : 0,
          background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.2), transparent)',
        }}
      />
      {children}
    </div>
  )
}
