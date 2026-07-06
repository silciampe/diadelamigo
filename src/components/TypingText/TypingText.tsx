import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { DURATION, EASE } from '@/constants/animations'

interface TypingTextProps {
  text: string
  speed?: number
  startDelay?: number
  onComplete?: () => void
  className?: string
  active?: boolean
  skip?: boolean
}

function delayForChar(char: string, baseSpeed: number): number {
  if ('.!?'.includes(char)) return baseSpeed + 420
  if (char === ',') return baseSpeed + 180
  if (char === '\n') return baseSpeed + 280
  if (char === ' ') return baseSpeed + 40
  return baseSpeed
}

export function TypingText({
  text,
  speed = 48,
  startDelay = 0,
  onComplete,
  className = '',
  active = true,
  skip = false,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const onCompleteRef = useRef(onComplete)

  onCompleteRef.current = onComplete

  useEffect(() => {
    if (skip && text) {
      setDisplayed(text)
      setIsComplete(true)
      onCompleteRef.current?.()
      return
    }

    if (!text || !active) {
      setDisplayed('')
      setIsComplete(false)
      return
    }

    setDisplayed('')
    setIsComplete(false)

    let index = 0
    let timeoutId: ReturnType<typeof setTimeout>

    const typeNext = () => {
      index += 1
      setDisplayed(text.slice(0, index))

      if (index >= text.length) {
        setIsComplete(true)
        onCompleteRef.current?.()
        return
      }

      const char = text[index - 1] ?? ''
      timeoutId = setTimeout(typeNext, delayForChar(char, speed))
    }

    timeoutId = setTimeout(typeNext, startDelay)

    return () => clearTimeout(timeoutId)
  }, [text, speed, startDelay, active, skip])

  if (!text) {
    return (
      <p
        className={[
          'font-serif text-base leading-relaxed italic text-ink-faint sm:text-lg',
          className,
        ].join(' ')}
      />
    )
  }

  return (
    <motion.p
      className={[
        'font-serif text-base leading-[1.85] text-ink sm:text-lg',
        className,
      ].join(' ')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.normal, ease: EASE }}
    >
      {displayed}
      {!isComplete && (
        <motion.span
          className="ml-0.5 inline-block h-[1em] w-px bg-warm/50 align-middle"
          animate={{ opacity: [1, 0.2] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      )}
    </motion.p>
  )
}
