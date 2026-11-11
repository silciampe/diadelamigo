import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { DURATION, EASE } from '@/constants/animations'

interface CoverProps {
  onDiaDelAmigo: () => void
  onLaElegida: () => void
}

export function Cover({ onDiaDelAmigo, onLaElegida }: CoverProps) {
  return (
    <motion.section
      className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-[#fff6f2]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.normal, ease: EASE }}
    >
      <CoverBackground />
      <FloatingDoodles />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-7 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <motion.figure
          className="relative w-full max-w-xl bg-white px-3 pt-3 pb-1 shadow-[0_18px_46px_rgba(120,70,60,0.16)] sm:px-4 sm:pt-4"
          initial={{ opacity: 0, y: 28, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: -1.6 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <WashiTape />
          <img
            src="/portada.jpeg"
            alt="Las amigas juntas, sonriendo alrededor de una mesa"
            className="block h-auto w-full"
            fetchPriority="high"
          />
          <figcaption className="px-2 pt-1 pb-2 text-center sm:pt-2 sm:pb-3">
            <span className="font-hand text-[3.35rem] leading-none text-[#c45c5c] sm:text-7xl">
              AMIGAS
            </span>
            <Squiggle />
          </figcaption>

          <Sticker className="top-6 -left-3 h-11 w-11 sm:-left-4 sm:h-12 sm:w-12" delay={0.2}>
            <Heart className="h-6 w-6 text-[#e07a7a]" />
          </Sticker>
          <Sticker className="-top-3 -right-3 h-11 w-11 sm:-right-4" delay={0.55} duration={4.2}>
            <Star className="h-5 w-5 text-[#e2b15a]" />
          </Sticker>
          <Sticker className="-bottom-3 -left-3 h-11 w-11" delay={0.85} duration={5.1}>
            <Flower className="h-7 w-7" />
          </Sticker>
          <Sticker className="right-3 -bottom-4 h-10 w-10" delay={0.35} duration={3.8}>
            <Sparkle className="h-5 w-5 text-[#f0c14d]" />
          </Sticker>
        </motion.figure>

        <motion.div
          className="mt-9 flex w-full max-w-[17rem] flex-col gap-3 sm:mt-11"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE, delay: 0.4 }}
        >
          <CoverButton onClick={onDiaDelAmigo} tone="solid">
            DÍA DEL AMIGO
          </CoverButton>
          <CoverButton onClick={onLaElegida} tone="soft">
            LA ELEGIDA
          </CoverButton>
        </motion.div>
      </div>
    </motion.section>
  )
}

function CoverButton({
  children,
  onClick,
  tone,
}: {
  children: ReactNode
  onClick: () => void
  tone: 'solid' | 'soft'
}) {
  const tones = {
    solid:
      'bg-[#c45c5c] text-white shadow-[0_10px_22px_rgba(196,92,92,0.28)] hover:bg-[#b85050]',
    soft: 'border border-[#efc4c4] bg-white/85 text-[#a24b4b] hover:bg-white',
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={[
        'min-h-12 w-full cursor-pointer rounded-full px-6 text-[0.78rem] font-medium tracking-[0.18em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c45c5c]',
        tones[tone],
      ].join(' ')}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
    >
      {children}
    </motion.button>
  )
}

function CoverBackground() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute -top-24 left-1/2 h-72 w-[120vw] -translate-x-1/2 rounded-full bg-[#ffd9d4]/70 blur-3xl" />
      <div className="absolute right-[-10%] bottom-[-8%] h-64 w-64 rounded-full bg-[#ffe7c2]/80 blur-3xl" />
      <div className="absolute bottom-[18%] left-[-12%] h-48 w-48 rounded-full bg-[#f8c9d4]/50 blur-3xl" />
    </div>
  )
}

function WashiTape() {
  return (
    <span
      className="pointer-events-none absolute top-0 left-1/2 z-20 h-7 w-24 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-[2px] opacity-90 shadow-sm"
      style={{
        background: 'repeating-linear-gradient(90deg, #f3b4b8 0 10px, #f8d5d6 10px 18px)',
      }}
      aria-hidden
    />
  )
}

function Squiggle() {
  return (
    <svg viewBox="0 0 140 16" className="mx-auto -mt-1 h-3 w-32 text-[#efb0b0] sm:w-40" fill="none" aria-hidden>
      <path
        d="M3 10c10-8 18 7 30 1s20-9 32 0 22 8 34-1 18-7 28 0 12 6 12 2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Sticker({
  children,
  className,
  delay = 0,
  duration = 4.6,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) {
  return (
    <motion.span
      className={[
        'absolute z-20 flex items-center justify-center rounded-full bg-white shadow-[0_8px_16px_rgba(120,70,60,0.14)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      animate={{ y: [0, -7, 0], rotate: [-8, -2, -8] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      {children}
    </motion.span>
  )
}

const floating = [
  { kind: 'heart', className: 'top-[7%] left-[8%] h-8 w-8 text-[#e07a7a] -rotate-12', duration: 5.4, delay: 0 },
  { kind: 'star', className: 'top-[8%] right-[9%] h-7 w-7 text-[#e2b15a] rotate-12', duration: 4.6, delay: 0.4 },
  { kind: 'sparkle', className: 'top-[18%] left-[6%] h-4 w-4 text-[#f0c14d]', duration: 3.6, delay: 0.8 },
  { kind: 'sparkle', className: 'top-[16%] right-[7%] h-3.5 w-3.5 text-[#e07a7a]', duration: 4, delay: 0.2 },
  { kind: 'heart', className: 'bottom-[7%] left-[12%] h-5 w-5 text-[#f0a0b0] rotate-6', duration: 5, delay: 0.6 },
  { kind: 'star', className: 'bottom-[6%] right-[14%] h-5 w-5 text-[#e2b15a] -rotate-6', duration: 4.4, delay: 1 },
  { kind: 'sparkle', className: 'bottom-[11%] right-[7%] h-3 w-3 text-[#f0c14d]', duration: 3.4, delay: 0.3 },
] as const

function FloatingDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {floating.map((item) => (
        <motion.span
          key={`${item.kind}-${item.className}`}
          className={['absolute block', item.className].join(' ')}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.kind === 'heart' && <Heart className="h-full w-full" />}
          {item.kind === 'star' && <Star className="h-full w-full" />}
          {item.kind === 'sparkle' && <Sparkle className="h-full w-full" />}
        </motion.span>
      ))}
    </div>
  )
}

function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 20.6s-7.1-4.5-9.4-8.3C.7 9.3 1.3 5.9 3.9 4.5c2.1-1.1 4.4-.6 5.8.9L12 8.1l2.3-2.7c1.4-1.5 3.7-2 5.8-.9 2.6 1.4 3.2 4.8 1.3 7.8-2.3 3.8-9.4 8.3-9.4 8.3z"
      />
    </svg>
  )
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.1 14.5 8.6l6.8.5-5.2 4.4 1.7 6.6L12 16.7 6.2 20.1l1.7-6.6L2.7 9.1l6.8-.5L12 2.1z"
      />
    </svg>
  )
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M12 0.6 13.7 9 22.4 12 13.7 15 12 23.4 10.3 15 1.6 12 10.3 9 12 0.6z" />
    </svg>
  )
}

function Flower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="7.5" r="5" fill="#f3a6b8" />
      <circle cx="24.5" cy="16" r="5" fill="#f3a6b8" />
      <circle cx="16" cy="24.5" r="5" fill="#f3a6b8" />
      <circle cx="7.5" cy="16" r="5" fill="#f3a6b8" />
      <circle cx="16" cy="16" r="3.6" fill="#f6d36b" />
    </svg>
  )
}
