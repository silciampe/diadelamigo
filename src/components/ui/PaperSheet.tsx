import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { paperVariants } from '@/constants/animations'

interface PaperSheetProps {
  children: ReactNode
  className?: string
  onOpenComplete?: () => void
}

export function PaperSheet({ children, className = '', onOpenComplete }: PaperSheetProps) {
  return (
    <div className="w-full [perspective:1200px]">
      <motion.article
        className={[
          'overflow-hidden rounded-2xl bg-[#fdfcfa] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.04)]',
          'ring-1 ring-black/[0.04]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ transformStyle: 'preserve-3d' }}
        variants={paperVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onAnimationComplete={(definition) => {
          if (definition === 'visible') onOpenComplete?.()
        }}
      >
        {children}
      </motion.article>
    </div>
  )
}
