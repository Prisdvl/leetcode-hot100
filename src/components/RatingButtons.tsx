import React from 'react'
import type { Rating } from '../utils/sm2'
import { MagneticButton } from './MagneticButton'

interface Props {
  onRate: (r: Rating) => void
}

const OPTIONS: { key: Rating; label: string; primary?: boolean }[] = [
  { key: 'again', label: 'Again' },
  { key: 'hard', label: 'Hard' },
  { key: 'good', label: 'Good', primary: true },
  { key: 'easy', label: 'Easy' },
]

export const RatingButtons: React.FC<Props> = ({ onRate }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {OPTIONS.map((o) => (
        <MagneticButton
          key={o.key}
          onClick={() => onRate(o.key)}
          ariaLabel={o.label}
          className={`py-2 text-xs font-medium rounded-md fast-transition cursor-pointer cursor-target ${
            o.primary
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
          dataCursorLabel={o.label}
        >
          {o.label}
        </MagneticButton>
      ))}
    </div>
  )
}
