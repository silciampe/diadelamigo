import { motion } from 'framer-motion'
import type { MineStop } from '@/components/LaElegida/mine'
import { GoldButton, MineProgress } from '@/components/LaElegida/MineChrome'

interface MineDialogueProps {
  stop: MineStop
  index: number
  total: number
  isLast: boolean
  onContinue: () => void
}

const ink = '#141414'

export function MineDialogue({ stop, index, total, isLast, onContinue }: MineDialogueProps) {
  return (
    <motion.div
      className="relative z-20 flex max-h-full min-h-0 w-full max-w-xl flex-col"
      initial={{ opacity: 0, scale: 0.7, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
    >
      <div className="mb-2 flex justify-center">
        <MineProgress active={index} total={total} />
      </div>

      <div className="relative">
        <svg
          className="pointer-events-none absolute -top-3 left-[8%] h-6 w-16"
          viewBox="0 0 68 24"
          fill="none"
          aria-hidden
        >
          <path d="M2 18c8-2 12-8 16-16" stroke="#f6e2b5" strokeWidth="4" strokeLinecap="round" />
          <path d="M24 20c8-3 14-9 20-16" stroke="#f6e2b5" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <svg
          className="pointer-events-none absolute -top-2 right-[10%] h-5 w-12"
          viewBox="0 0 48 20"
          fill="none"
          aria-hidden
        >
          <path d="M4 16c10-4 22-8 40-14" stroke="#f6e2b5" strokeWidth="4" strokeLinecap="round" />
        </svg>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-[1.7rem] [background-image:radial-gradient(circle,#f4efe6_1.25px,transparent_1.4px)] [background-size:7px_7px] [mask-image:linear-gradient(128deg,transparent_42%,#000_70%)]"
        />

        <svg
          className="absolute -top-[18px] left-[60%] z-20 h-8 w-[4.5rem] -translate-x-1/2"
          viewBox="0 0 72 36"
          aria-hidden
        >
          <path
            d="M8 34c8-10 14-22 28-32 10 10 18 20 28 32"
            fill="#fff"
            stroke={ink}
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path d="M10 30h52v10H10z" fill="#fff" />
        </svg>

        <article
          className="relative z-10 flex max-h-[min(52dvh,36rem)] min-h-0 flex-col overflow-hidden rounded-[1.7rem] border-[6px] bg-white text-[#1a1a1a] md:max-h-[min(68dvh,36rem)] md:border-[7px]"
          style={{ borderColor: ink }}
        >
          <div className="flex min-h-0 flex-1 flex-col px-5 pt-5 pb-4 sm:px-7">
            <header className="mb-3 flex shrink-0 items-center gap-3">
              <img
                src={stop.photoUrl}
                alt=""
                className="h-11 w-11 rounded-full object-cover ring-2 ring-[#141414]"
              />
              <p className="font-hand text-4xl leading-none text-[#141414]">{stop.name.toUpperCase()}</p>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto pr-2 pb-1">
              <p className="font-serif text-[1.02rem] leading-relaxed whitespace-pre-wrap sm:text-[1.08rem]">
                {stop.message}
              </p>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-4 flex justify-center">
        <GoldButton onClick={onContinue}>{isLast ? 'Ir hacia el oro' : 'Seguir el viaje'}</GoldButton>
      </div>
    </motion.div>
  )
}
