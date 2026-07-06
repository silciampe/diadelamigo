import { motion } from 'framer-motion'
import { DURATION, EASE } from '@/constants/animations'

interface ProgressProps {
  current: number
  total: number
}

export function Progress({ current, total }: ProgressProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="flex flex-col items-center gap-3" aria-label={`${current} de ${total} cartas descubiertas`}>
      <div className="h-px w-32 overflow-hidden bg-ink-faint/20 sm:w-40">
        <motion.div
          className="h-full bg-warm/60"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: DURATION.slower, ease: EASE }}
        />
      </div>
      <span className="text-xs tracking-widest text-ink-faint uppercase">
        {current} / {total}
      </span>
    </div>
  )
}
