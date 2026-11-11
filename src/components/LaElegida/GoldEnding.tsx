import { motion } from 'framer-motion'
import { DURATION, EASE } from '@/constants/animations'
import { mineArt } from '@/components/LaElegida/mine'
import { GoldButton } from '@/components/LaElegida/MineChrome'

const sparks = [
  { left: '14%', top: '16%', delay: 0.2, size: 5 },
  { left: '78%', top: '12%', delay: 0.8, size: 4 },
  { left: '86%', top: '28%', delay: 0.4, size: 3 },
  { left: '8%', top: '34%', delay: 1.1, size: 4 },
  { left: '22%', top: '48%', delay: 0.6, size: 3 },
  { left: '70%', top: '42%', delay: 1.4, size: 5 },
  { left: '90%', top: '58%', delay: 0.3, size: 3 },
  { left: '18%', top: '66%', delay: 0.9, size: 4 },
  { left: '48%', top: '10%', delay: 1.2, size: 3 },
  { left: '60%', top: '72%', delay: 0.5, size: 4 },
  { left: '34%', top: '78%', delay: 1.5, size: 3 },
  { left: '82%', top: '80%', delay: 0.7, size: 5 },
]

export function GoldEnding({ onBack, onPlay }: { onBack: () => void; onPlay: () => void }) {
  return (
    <motion.section
      className="relative min-h-dvh overflow-x-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.normal, ease: EASE }}
    >
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <img src={mineArt.tunnel} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <motion.img
          src={mineArt.gold}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.8, ease: EASE, delay: 0.25 }}
        />
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0.92 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.6, ease: EASE, delay: 0.15 }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,214,120,0.42),transparent_62%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.8, ease: EASE }}
        />
        {sparks.map((spark) => (
          <motion.span
            key={`${spark.left}-${spark.top}`}
            className="absolute rounded-full bg-[#ffe7a3]"
            style={{ left: spark.left, top: spark.top, width: spark.size, height: spark.size }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 0.95, 0.35], y: [8, -10, 8] }}
            transition={{ duration: 3.2, delay: 1.1 + spark.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center px-5 pt-[12vh] pb-8 text-center md:pt-[18vh] md:pb-[max(6.5rem,env(safe-area-inset-bottom))]">
        <motion.p
          className="font-hand text-6xl leading-none text-[#fff4d2] drop-shadow-[0_2px_10px_rgba(80,40,0,0.8)] sm:text-7xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 1.7, ease: EASE }}
        >
          Llegaste
        </motion.p>
        <motion.p
          className="mt-4 max-w-xs text-sm leading-relaxed text-[#fff6df] drop-shadow-[0_2px_8px_rgba(80,40,0,0.85)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.slow, delay: 2.15, ease: EASE }}
        >
          Se encendió todo. La mina está llena de oro.
        </motion.p>

        <motion.img
          src={mineArt.aventura}
          alt="Ana en la mina de oro"
          className="mt-6 w-full rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.35)] ring-2 ring-[#fff4d2] md:mt-8 md:w-[min(64rem,calc(100vw-1.5rem))] md:max-w-none"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slower, delay: 2.5, ease: EASE }}
        />

        <motion.img
          src={mineArt.amigas}
          alt="Las amigas juntas en el carrito"
          className="mt-5 w-full rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slower, delay: 3.15, ease: EASE }}
        />

        <motion.div
          className="mt-6 flex flex-col items-center gap-3 md:fixed md:bottom-[max(1rem,env(safe-area-inset-bottom))] md:left-1/2 md:z-20 md:mt-0 md:-translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: DURATION.slow }}
        >
          <GoldButton onClick={onPlay}>Jugar</GoldButton>
          <GoldButton onClick={onBack}>Volver a la portada</GoldButton>
        </motion.div>
      </div>
    </motion.section>
  )
}
