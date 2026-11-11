import { motion } from 'framer-motion'
import { anaPortrait, type MineStop } from '@/components/LaElegida/mine'

interface MineTrackProps {
  stops: MineStop[]
  activeIndex: number
  moving: boolean
  parked: boolean
}

const START_TOP = 68

function stationTop(index: number, total: number) {
  const distance = total <= 1 ? 0 : index / (total - 1)
  return 62 - distance * 52
}

export function MineTrack({ stops, activeIndex, moving, parked }: MineTrackProps) {
  const ties = Array.from({ length: 16 }, (_, index) => index)
  const cartTop = moving || parked ? stationTop(activeIndex, stops.length) : START_TOP

  return (
    <div className="relative h-full w-full">
      <div className="relative mx-auto h-full w-full max-w-[26rem]">
        <svg
          viewBox="0 0 200 640"
          preserveAspectRatio="xMidYMax meet"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          <motion.g
            animate={moving ? { y: [0, 42] } : { y: 0 }}
            transition={moving ? { duration: 0.55, repeat: Infinity, ease: 'linear' } : { duration: 0.2 }}
          >
            {ties.map((tie) => {
              const t = tie / (ties.length - 1)
              const y = 20 + t * 600
              const half = 4 + t * 72
              return (
                <line
                  key={tie}
                  x1={100 - half}
                  y1={y}
                  x2={100 + half}
                  y2={y}
                  stroke="#7a5b3e"
                  strokeWidth={3 + t * 2}
                  strokeLinecap="round"
                />
              )
            })}
          </motion.g>
          <line x1="100" y1="18" x2="26" y2="630" stroke="#f3eadc" strokeWidth="2.5" />
          <line x1="100" y1="18" x2="174" y2="630" stroke="#f3eadc" strokeWidth="2.5" />
        </svg>

        <div className="absolute top-[1%] left-1/2 flex -translate-x-1/2 flex-col items-center">
          <span className="h-3 w-3 rounded-full bg-[#f6d36b] shadow-[0_0_16px_rgba(246,211,107,0.95)]" />
          <span className="mt-1 text-[0.62rem] tracking-[0.2em] text-[#f6e2b5] uppercase">Oro</span>
        </div>

        {stops.map((stop, index) => (
          <StopMarker
            key={stop.id}
            stop={stop}
            index={index}
            total={stops.length}
            passed={index < activeIndex || (parked && index < activeIndex)}
            current={index === activeIndex && (moving || parked)}
            parked={parked && index === activeIndex}
          />
        ))}

        <motion.div
          className="absolute left-1 z-10 w-24 -translate-y-1/2 md:left-0 md:z-30 md:w-32 md:-translate-x-full"
          initial={false}
          animate={{ top: `${cartTop}%` }}
          transition={{ duration: moving ? 2.55 : 0.35, ease: [0.45, 0.05, 0.2, 1] }}
        >
          <motion.div
            animate={moving ? { y: [0, -10, 0], rotate: [-2, 2, -2] } : { y: 0, rotate: 0 }}
            transition={
              moving
                ? { duration: 0.38, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.25 }
            }
          >
            <img
              src={anaPortrait}
              alt="Ana en el carrito"
              className="h-32 w-24 rounded-2xl object-cover object-[center_38%] shadow-[0_16px_32px_rgba(0,0,0,0.55)] ring-2 ring-[#f6e2b5] md:h-44 md:w-32"
            />
            {moving && (
              <span className="absolute -top-3 left-1/2 h-8 w-10 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,214,140,0.55),transparent_70%)]" />
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function StopMarker({
  stop,
  index,
  total,
  passed,
  current,
  parked,
}: {
  stop: MineStop
  index: number
  total: number
  passed: boolean
  current: boolean
  parked: boolean
}) {
  const size = parked ? 72 : Math.round(54 - (index / Math.max(total - 1, 1)) * 22)

  return (
    <motion.div
      className="absolute z-10 left-[54%] -translate-x-1/2 -translate-y-1/2 md:left-[62%]"
      style={{ top: `${stationTop(index, total)}%` }}
      animate={{ opacity: passed ? 0.4 : 1, scale: parked ? 1.06 : 1 }}
      transition={{ duration: 0.35 }}
    >
      <img
        src={stop.photoUrl}
        alt={stop.name}
        className={[
          'rounded-full object-cover shadow-[0_8px_18px_rgba(0,0,0,0.45)]',
          current ? 'ring-[3px] ring-[#f6e2b5]' : 'ring-2 ring-[#e2b15a]/70',
        ].join(' ')}
        style={{ width: size, height: size }}
      />
      <span
        className={[
          'absolute top-1/2 left-[calc(100%+0.4rem)] -translate-y-1/2 font-hand leading-none whitespace-nowrap text-[#f6e2b5] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]',
          parked ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl',
        ].join(' ')}
      >
        {stop.name}
      </span>
    </motion.div>
  )
}
