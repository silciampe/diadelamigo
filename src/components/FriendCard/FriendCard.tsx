import { motion } from 'framer-motion'
import { useState } from 'react'
import { TypingText } from '@/components/TypingText/TypingText'
import { FullScreen } from '@/components/ui/FullScreen'
import { GentleButton } from '@/components/ui/GentleButton'
import { PaperSheet } from '@/components/ui/PaperSheet'
import { DURATION, EASE, paperContentContainer, paperContentItem } from '@/constants/animations'
import type { Friend } from '@/types'

interface FriendCardProps {
  friend: Friend
  onBack: () => void
}

export function FriendCard({ friend, onBack }: FriendCardProps) {
  const [paperOpen, setPaperOpen] = useState(false)
  const [typingDone, setTypingDone] = useState(false)
  const [skipTyping, setSkipTyping] = useState(false)

  const hasMessage = friend.message.trim().length > 0
  const showBack = !hasMessage || typingDone

  return (
    <FullScreen className="justify-center overflow-y-auto px-5 py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8">
      <div className="mx-auto w-full max-w-sm sm:max-w-md">
        <PaperSheet onOpenComplete={() => setPaperOpen(true)}>
          <motion.div
            variants={paperContentContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={paperContentItem} className="overflow-hidden">
              <img
                src={friend.photoUrl}
                alt={friend.name}
                className="aspect-[4/3] w-full object-cover object-top"
              />
            </motion.div>

            <div className="px-6 py-8 sm:px-8 sm:py-10">
              <motion.h2
                variants={paperContentItem}
                className="font-serif text-2xl font-normal tracking-wide text-ink sm:text-3xl"
              >
                {friend.name}
              </motion.h2>

              <motion.div variants={paperContentItem} className="mt-8 sm:mt-10">
                <TypingText
                  text={friend.message}
                  speed={48}
                  active={paperOpen}
                  skip={skipTyping}
                  onComplete={() => setTypingDone(true)}
                />
              </motion.div>
            </div>
          </motion.div>
        </PaperSheet>

        <div className="mt-10 flex flex-col items-center gap-5 sm:mt-12">
          {hasMessage && !typingDone && (
            <GentleButton
              onClick={() => setSkipTyping(true)}
              className="text-xs text-ink-faint"
            >
              Saltear lectura
            </GentleButton>
          )}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: showBack ? 1 : 0,
              y: showBack ? 0 : 8,
            }}
            transition={{ duration: DURATION.slow, ease: EASE }}
          >
            <GentleButton
              onClick={onBack}
              variant="ghost"
              className={showBack ? '' : 'pointer-events-none'}
            >
              Volver a la galería
            </GentleButton>
          </motion.div>
        </div>
      </div>
    </FullScreen>
  )
}
