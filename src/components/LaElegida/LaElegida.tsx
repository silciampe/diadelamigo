import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { DURATION, EASE } from '@/constants/animations'
import { hasDialogue, mineArt, mineStops, RIDE_MS, type MineStop } from '@/components/LaElegida/mine'
import { ExitButton, GoldButton, MineProgress, MineScene } from '@/components/LaElegida/MineChrome'
import { MineTrack } from '@/components/LaElegida/MineTrack'
import { GoldEnding } from '@/components/LaElegida/GoldEnding'
import { MineDialogue } from '@/components/LaElegida/MineDialogue'
import { NuggetGame } from '@/components/LaElegida/NuggetGame'

interface LaElegidaProps {
  onBack: () => void
}

type Phase = 'story' | 'sign' | 'intro' | 'ride' | 'stop' | 'gold' | 'game'

const story =
  'Era una vez una mujer hecha y derecha que quería encontrar el sentido de su cruz, y alivianarla, tal vez para poder estar un poco más en paz con ella misma y con los que la rodean… resulta que esta mujer tenía un grupo de amigas muy particular y una de ellas (la recontra particular) le contó que hablando con gente del más allá (o del menos acá) que tal vez ella era LA ELEGIDA. Las personas que estábamos (alcoholizadas) pensamos que había algo de sentido en esa frase. Hoy éstas personas locas que te acompañan te invitan a que hagas un viaje a descubrir si algo de todo esto tiene sentido.'

const signText =
  'En este viaje cada una pensó porqué te elije ella en su vida, tal vez así te ayudamos a entenderte un poco más...'

export function LaElegida({ onBack }: LaElegidaProps) {
  const [phase, setPhase] = useState<Phase>('story')
  const [stopIndex, setStopIndex] = useState(0)
  const stop = mineStops[stopIndex]
  const total = mineStops.length
  const onTheRoad = phase === 'intro' || phase === 'ride' || phase === 'stop'

  const showSign = useCallback(() => setPhase('sign'), [])
  const enterCart = useCallback(() => setPhase('intro'), [])
  const startRide = useCallback(() => setPhase('ride'), [])
  const arrive = useCallback(() => setPhase('stop'), [])

  const continueJourney = useCallback(() => {
    if (stopIndex >= total - 1) {
      setPhase('gold')
      return
    }
    setStopIndex((index) => index + 1)
    setPhase('ride')
  }, [stopIndex, total])

  return (
    <div className="min-h-dvh bg-[#070604] text-[#f6e7d4]">
      <AnimatePresence mode="wait">
        {phase === 'story' && <Story key="story" onContinue={showSign} onExit={onBack} />}
        {phase === 'sign' && <GameSign key="sign" onContinue={enterCart} onExit={onBack} />}
        {onTheRoad && stop && (
          <Journey
            key="journey"
            phase={phase}
            index={stopIndex}
            total={total}
            stop={stop}
            onStart={startRide}
            onArrive={arrive}
            onContinue={continueJourney}
            onExit={onBack}
          />
        )}
        {phase === 'gold' && (
          <GoldEnding key="gold" onBack={onBack} onPlay={() => setPhase('game')} />
        )}
        {phase === 'game' && <NuggetGame key="game" onBack={() => setPhase('gold')} />}
      </AnimatePresence>
    </div>
  )
}

function Journey({
  phase,
  index,
  total,
  stop,
  onStart,
  onArrive,
  onContinue,
  onExit,
}: {
  phase: 'intro' | 'ride' | 'stop'
  index: number
  total: number
  stop: MineStop
  onStart: () => void
  onArrive: () => void
  onContinue: () => void
  onExit: () => void
}) {
  useEffect(() => {
    if (phase !== 'ride') return
    const timeoutId = window.setTimeout(onArrive, RIDE_MS)
    return () => window.clearTimeout(timeoutId)
  }, [phase, index, onArrive])

  const last = index >= total - 1
  const talking = phase === 'stop' && hasDialogue(stop)

  return (
    <MineScene image={mineArt.tunnel} alt="Vías de la mina, con las paradas marcadas" scrim="strong">
      <ExitButton onClick={onExit} />
      <div className="relative z-10 min-h-0 flex-1">
        <div className="absolute inset-0 z-0">
          <MineTrack
            stops={mineStops}
            activeIndex={index}
            moving={phase === 'ride'}
            parked={phase === 'stop'}
          />
        </div>
        {talking ? (
          <div className="absolute inset-x-0 bottom-0 z-40 flex max-h-[70dvh] items-end px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] md:inset-y-0 md:right-0 md:left-auto md:w-[min(34rem,46%)] md:max-h-none md:items-center md:px-4 md:py-14">
            <MineDialogue
              stop={stop}
              index={index}
              total={total}
              isLast={last}
              onContinue={onContinue}
            />
          </div>
        ) : (
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center">
            <MineProgress active={index} total={total} />
            {phase === 'intro' && (
              <>
                <p className="font-hand text-5xl leading-none tracking-wide text-[#f6e2b5] sm:text-6xl">
                  LA ELEGIDA
                </p>
                <p className="max-w-xs text-sm leading-relaxed text-[#f6e7d4]">
                  Ana va en el carrito. En las vías están las paradas que la esperan.
                </p>
                <GoldButton onClick={onStart}>Subir al carrito</GoldButton>
              </>
            )}
            {phase === 'ride' && (
              <p className="text-sm text-[#fff6e4] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                El carrito avanza hacia {stop.name}…
              </p>
            )}
            {phase === 'stop' && (
              <>
                <p className="max-w-xs text-sm leading-relaxed text-[#f6e7d4]">
                  El carrito se detiene junto a {stop.name}.
                </p>
                <GoldButton onClick={onContinue}>{last ? 'Ir hacia el oro' : 'Seguir el viaje'}</GoldButton>
              </>
            )}
          </div>
        )}
      </div>
    </MineScene>
  )
}

function GameSign({ onContinue, onExit }: { onContinue: () => void; onExit: () => void }) {
  return (
    <motion.section
      className="flex h-dvh min-h-dvh w-full flex-col bg-[#070604]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.normal, ease: EASE }}
    >
      <ExitButton onClick={onExit} />
      <div className="flex flex-1 items-center justify-center px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <motion.article
          className="relative w-full max-w-md bg-[#6d4630] px-7 py-10 shadow-[0_22px_50px_rgba(0,0,0,0.45)] sm:px-10"
          initial={{ opacity: 0, y: 28, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span
            className="absolute top-3 left-8 h-3 w-3 rounded-full bg-[#2a2118] shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)]"
            aria-hidden
          />
          <span
            className="absolute top-3 right-8 h-3 w-3 rounded-full bg-[#2a2118] shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)]"
            aria-hidden
          />
          <p className="font-serif text-[1.2rem] leading-relaxed text-[#f8efe4] sm:text-[1.35rem]">
            {signText}
          </p>
          <div className="mt-8 flex justify-center">
            <GoldButton onClick={onContinue}>Al carrito</GoldButton>
          </div>
        </motion.article>
      </div>
    </motion.section>
  )
}

function Story({ onContinue, onExit }: { onContinue: () => void; onExit: () => void }) {
  const [before, after] = story.split('LA ELEGIDA')

  return (
    <motion.section
      className="flex h-dvh min-h-dvh w-full flex-col bg-[#070604]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.normal, ease: EASE }}
    >
      <ExitButton onClick={onExit} />
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-6 pt-16 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slower, ease: EASE, delay: 0.15 }}
        >
          <p className="font-serif text-[1.15rem] leading-[1.75] text-[#f6e7d4] sm:text-xl sm:leading-[1.8]">
            {before}
            <span className="text-[#f6e2b5]">LA ELEGIDA</span>
            {after}
          </p>
          <button
            type="button"
            onClick={onContinue}
            className="mt-10 cursor-pointer font-serif text-xl text-[#f6e2b5] italic"
          >
            Adelante…
          </button>
        </motion.div>
      </div>
    </motion.section>
  )
}
