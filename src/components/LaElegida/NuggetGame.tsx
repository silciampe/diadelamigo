import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { mineArt } from '@/components/LaElegida/mine'
import { ExitButton, GoldButton } from '@/components/LaElegida/MineChrome'

const signs = [
  { id: 'miedo', label: 'MIEDO', top: '14%', left: '24%' },
  { id: 'culpa', label: 'CULPA', top: '14%', left: '74%' },
  { id: 'tristeza', label: 'TRISTEZA', top: '28%', left: '48%' },
  { id: 'inseguridad', label: 'INSEGURIDAD', top: '42%', left: '24%' },
  { id: 'dudas', label: 'DUDAS', top: '42%', left: '76%' },
  { id: 'soledad', label: 'SOLEDAD', top: '56%', left: '50%' },
] as const

type SignId = (typeof signs)[number]['id']

const cartPoint = { left: '24%', top: '74%' }

export function NuggetGame({ onBack }: { onBack: () => void }) {
  const [down, setDown] = useState<SignId[]>([])
  const [shots, setShots] = useState<{ id: SignId; key: number }[]>([])
  const cleared = down.length === signs.length

  function shoot(id: SignId) {
    if (down.includes(id) || shots.some((shot) => shot.id === id)) return
    setShots((current) => [...current, { id, key: Date.now() }])
  }

  function land(id: SignId, key: number) {
    setShots((current) => current.filter((shot) => shot.key !== key))
    setDown((current) => (current.includes(id) ? current : [...current, id]))
  }

  return (
    <section className="relative h-dvh min-h-dvh overflow-hidden bg-[#070604] text-[#f6e7d4]">
      <img src={mineArt.gold} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/35" />
      <ExitButton onClick={onBack} />

      <p className="absolute top-[max(0.85rem,env(safe-area-inset-top))] right-4 z-30 text-[0.68rem] tracking-[0.16em] text-[#fff6df]/80 uppercase">
        {down.length} de {signs.length}
      </p>

      <AnimatePresence>
        {signs.map((sign) =>
          down.includes(sign.id) ? null : (
            <motion.button
              key={sign.id}
              type="button"
              onClick={() => shoot(sign.id)}
              className="absolute z-20 min-h-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-md bg-[#6d4630] px-3 py-1.5 font-hand text-2xl tracking-wide text-[#f8efe4] shadow-[0_10px_18px_rgba(0,0,0,0.4)] ring-2 ring-[#2a2118] sm:text-4xl"
              style={{ top: sign.top, left: sign.left }}
              initial={{ opacity: 0, y: -16, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: [-2, 2, -2] }}
              exit={{ opacity: 0, y: 120, rotate: 18, scale: 0.6 }}
              transition={{
                opacity: { duration: 0.35 },
                y: { duration: 0.45 },
                rotate: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {sign.label}
            </motion.button>
          ),
        )}
      </AnimatePresence>

      {shots.map((shot) => {
        const sign = signs.find((item) => item.id === shot.id)
        if (!sign) return null
        return (
          <motion.span
            key={shot.key}
            className="absolute z-30 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe08a] shadow-[0_0_16px_rgba(255,214,120,0.95)]"
            initial={{ left: cartPoint.left, top: cartPoint.top, scale: 0.5 }}
            animate={{ left: sign.left, top: sign.top, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.2, 0.65, 0.2, 1] }}
            onAnimationComplete={() => land(shot.id, shot.key)}
          />
        )
      })}

      {!cleared && (
        <img
          src={mineArt.aventura}
          alt="Ana en el carrito"
          className="pointer-events-none absolute bottom-[max(4.5rem,env(safe-area-inset-bottom))] left-3 z-10 w-28 rounded-2xl shadow-[0_16px_30px_rgba(0,0,0,0.45)] ring-2 ring-[#fff4d2] sm:left-8 sm:w-52"
        />
      )}

      <AnimatePresence>
        {cleared && (
          <motion.div
            key="cena"
            className="absolute inset-0 z-40 flex flex-col items-center justify-end bg-black/45 px-4 pt-16 pb-[max(1rem,env(safe-area-inset-bottom))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={mineArt.cena}
              alt="Ana y las amigas en la fiesta"
              className="mb-4 max-h-[72dvh] w-full max-w-4xl rounded-2xl object-cover shadow-[0_18px_40px_rgba(0,0,0,0.45)] ring-2 ring-[#fff4d2]"
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            />
            <GoldButton onClick={onBack}>Volver a Llegaste</GoldButton>
          </motion.div>
        )}
      </AnimatePresence>

      {!cleared && (
        <div className="absolute inset-x-0 bottom-[max(0.8rem,env(safe-area-inset-bottom))] z-30 flex flex-col items-center gap-2 px-4 text-center">
          <p className="text-sm text-[#fff6df] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Tocá un cartel. Ana le tira una pepita.
          </p>
          <GoldButton onClick={onBack}>Volver a Llegaste</GoldButton>
        </div>
      )}
    </section>
  )
}
