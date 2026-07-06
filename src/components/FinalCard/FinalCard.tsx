import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TypingText } from '@/components/TypingText/TypingText'
import { FullScreen } from '@/components/ui/FullScreen'
import { GentleButton } from '@/components/ui/GentleButton'
import { PaperSheet } from '@/components/ui/PaperSheet'
import {
  TRANSITION_TO_GROUP,
  cardDissolve,
  paperContentContainer,
  paperContentItem,
} from '@/constants/animations'

interface FinalCardProps {
  author: string
  photoUrl: string
  message: string
  onContinue: () => void
}

export function FinalCard({
  author,
  photoUrl,
  message,
  onContinue,
}: FinalCardProps) {
  const [paperOpen, setPaperOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [typingDone, setTypingDone] = useState(false)
  const [skipTyping, setSkipTyping] = useState(false)

  const hasMessage = message.trim().length > 0

  const handleTypingComplete = () => {
    setTypingDone(true)
    window.setTimeout(() => setIsTransitioning(true), 700)
  }

  useEffect(() => {
    if (!isTransitioning) return

    const timer = window.setTimeout(onContinue, TRANSITION_TO_GROUP * 1000)
    return () => window.clearTimeout(timer)
  }, [isTransitioning, onContinue])

  return (
    <FullScreen
      className="justify-center overflow-hidden px-5 py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8"
      instantExit
    >
      <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
        <motion.div
          variants={cardDissolve}
          initial="visible"
          animate={isTransitioning ? 'hidden' : 'visible'}
        >
          <p className="mb-6 text-center text-[0.65rem] tracking-[0.35em] text-ink-faint uppercase sm:mb-8 sm:text-xs">
            Una carta más
          </p>

          <PaperSheet onOpenComplete={() => setPaperOpen(true)}>
            <motion.div
              variants={paperContentContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={paperContentItem} className="overflow-hidden">
                <img
                  src={photoUrl}
                  alt={author}
                  className="aspect-[4/3] w-full object-cover object-top"
                />
              </motion.div>

              <div className="px-6 py-8 sm:px-8 sm:py-10">
                <motion.h2
                  variants={paperContentItem}
                  className="font-serif text-2xl font-normal tracking-wide text-ink sm:text-3xl"
                >
                  {author}
                </motion.h2>

                <motion.div variants={paperContentItem} className="mt-8 sm:mt-10">
                  <TypingText
                    text={message}
                    speed={48}
                    active={paperOpen}
                    skip={skipTyping}
                    onComplete={handleTypingComplete}
                  />
                </motion.div>
              </div>
            </motion.div>
          </PaperSheet>

          {hasMessage && !typingDone && !isTransitioning && (
            <div className="mt-8 flex justify-center">
              <GentleButton
                onClick={() => setSkipTyping(true)}
                className="text-xs text-ink-faint"
              >
                Saltear lectura
              </GentleButton>
            </div>
          )}
        </motion.div>
      </div>
    </FullScreen>
  )
}
