import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { DURATION, EASE } from '@/constants/animations'

export function MineScene({
  image,
  alt,
  moving = false,
  scrim = 'soft',
  bright = false,
  fill = false,
  children,
}: {
  image: string
  alt: string
  moving?: boolean
  scrim?: 'soft' | 'strong' | 'ride'
  bright?: boolean
  fill?: boolean
  children: ReactNode
}) {
  return (
    <motion.section
      className="relative flex h-dvh min-h-dvh w-full flex-col overflow-hidden bg-[#070604]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.normal, ease: EASE }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img src={image} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-lg" />
        <motion.img
          src={image}
          alt={alt}
          className={[
            'absolute inset-0 h-full w-full',
            fill ? 'object-cover object-[center_42%]' : 'object-contain',
            bright ? 'brightness-125 contrast-110' : '',
          ].join(' ')}
          initial={{ scale: moving ? 1 : 1.02 }}
          animate={{ scale: moving ? 1.07 : 1.02, y: moving ? [0, 7, 0] : 0 }}
          transition={
            moving
              ? {
                  scale: { duration: 3.2, ease: 'linear' },
                  y: { duration: 1.45, repeat: Infinity, ease: 'easeInOut' },
                }
              : { duration: 0.8, ease: EASE }
          }
        />
        <div
          className={[
            'absolute inset-0',
            scrim === 'strong'
              ? 'bg-gradient-to-t from-black/85 via-black/55 to-black/45'
              : scrim === 'ride'
                ? 'bg-[linear-gradient(to_top,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.18)_22%,transparent_46%)]'
                : 'bg-gradient-to-t from-black/80 via-black/15 to-black/35',
          ].join(' ')}
        />
      </div>
      {children}
    </motion.section>
  )
}

export function ExitButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-[max(0.85rem,env(safe-area-inset-top))] left-4 z-30 cursor-pointer text-[0.68rem] tracking-[0.18em] text-[#f6e7d4]/75 uppercase"
    >
      Salir
    </button>
  )
}

export function GoldButton({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="min-h-12 cursor-pointer rounded-full bg-[#e2b15a] px-8 text-[0.78rem] font-medium tracking-[0.16em] whitespace-nowrap text-[#2a2118] shadow-[0_10px_24px_rgba(0,0,0,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6e2b5]"
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}

export function MineProgress({
  active,
  total,
}: {
  active: number
  total: number
}) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={[
            'h-1.5 rounded-full',
            index === active ? 'w-4 bg-[#f6e2b5]' : 'w-1.5',
            index < active ? 'bg-[#e2b15a]' : '',
            index > active ? 'bg-white/25' : '',
          ].join(' ')}
        />
      ))}
    </div>
  )
}
