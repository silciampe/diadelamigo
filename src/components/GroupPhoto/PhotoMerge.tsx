import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EASE, MERGE_CROSSFADE, MERGE_DURATION } from '@/constants/animations'
import type { Friend } from '@/types'

interface PhotoMergeProps {
  friends: Friend[]
  groupImageUrl: string
  groupAlt: string
  onComplete?: () => void
}

export function PhotoMerge({
  friends,
  groupImageUrl,
  groupAlt,
  onComplete,
}: PhotoMergeProps) {
  const [phase, setPhase] = useState<'gather' | 'merge' | 'reveal' | 'glow'>('gather')

  useEffect(() => {
    const mergeTimer = window.setTimeout(() => setPhase('merge'), 600)
    const revealTimer = window.setTimeout(() => setPhase('reveal'), 600 + MERGE_DURATION * 1000)
    const glowTimer = window.setTimeout(
      () => setPhase('glow'),
      600 + MERGE_DURATION * 1000 + MERGE_CROSSFADE * 1000,
    )

    return () => {
      window.clearTimeout(mergeTimer)
      window.clearTimeout(revealTimer)
      window.clearTimeout(glowTimer)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'glow') return
    const doneTimer = window.setTimeout(() => onComplete?.(), 1200)
    return () => window.clearTimeout(doneTimer)
  }, [phase, onComplete])

  const isMerging = phase === 'merge' || phase === 'reveal' || phase === 'glow'
  const showGroup = phase === 'reveal' || phase === 'glow'
  const showGlow = phase === 'glow'

  return (
    <figure className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-cream-dark ring-1 ring-black/[0.04] sm:aspect-[4/5]">
      {/* Mosaico de las ocho fotos */}
      <motion.div
        className="absolute inset-0 grid grid-cols-4 grid-rows-2"
        initial={{ gap: 14, opacity: 0 }}
        animate={{
          gap: isMerging ? 0 : 14,
          opacity: showGroup ? 0 : 1,
        }}
        transition={{
          gap: { duration: MERGE_DURATION, ease: EASE },
          opacity: { duration: MERGE_CROSSFADE, ease: EASE },
        }}
      >
        {friends.map((friend, index) => (
          <motion.div
            key={friend.id}
            className="overflow-hidden"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{
              opacity: showGroup ? 0 : 1,
              scale: 1,
              borderRadius: isMerging ? 0 : 10,
            }}
            transition={{
              opacity: { duration: MERGE_CROSSFADE, ease: EASE },
              scale: { duration: 0.8, ease: EASE, delay: index * 0.06 },
              borderRadius: { duration: MERGE_DURATION, ease: EASE },
            }}
          >
            <img
              src={friend.photoUrl}
              alt={friend.name}
              className="h-full w-full object-cover object-top"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Fotografía grupal — emerge al unificarse */}
      <motion.img
        src={groupImageUrl}
        alt={groupAlt}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0, scale: 1.015 }}
        animate={{
          opacity: showGroup ? 1 : 0,
          scale: showGroup ? 1 : 1.015,
        }}
        transition={{ duration: MERGE_CROSSFADE, ease: EASE }}
      />

      {/* Brillo sutil al finalizar */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-warm/0 via-warm/10 to-warm/0"
        initial={{ opacity: 0 }}
        animate={{ opacity: showGlow ? [0, 0.35, 0] : 0 }}
        transition={{ duration: 1.8, ease: EASE }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-[-20%] rounded-full bg-warm/15 blur-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          showGlow
            ? { opacity: [0, 0.4, 0], scale: [0.95, 1.05, 1] }
            : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 2, ease: EASE }}
        aria-hidden
      />
    </figure>
  )
}
