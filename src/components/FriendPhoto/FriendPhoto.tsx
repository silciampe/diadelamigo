import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { GentleButton } from '@/components/ui/GentleButton'
import { PhotoFrame } from '@/components/ui/PhotoFrame'
import { blurVariants } from '@/constants/animations'
import type { Friend } from '@/types'

interface FriendPhotoProps {
  friend: Friend
  onContinue: () => void
  onBack: () => void
}

export function FriendPhoto({ friend, onContinue, onBack }: FriendPhotoProps) {
  return (
    <motion.section
      className="relative flex min-h-dvh flex-col items-center justify-center py-16 sm:py-20"
      variants={blurVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Container narrow className="flex flex-col items-center text-center">
        <PhotoFrame
          src={friend.photoUrl}
          alt={friend.name}
          size="hero"
          isActive
          className="shadow-none"
        />

        <motion.div
          className="mt-10 sm:mt-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl font-normal text-ink sm:text-4xl">
            {friend.name}
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-6 sm:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <GentleButton onClick={onContinue}>Leer carta</GentleButton>
          <GentleButton variant="ghost" onClick={onBack}>
            Volver
          </GentleButton>
        </motion.div>
      </Container>
    </motion.section>
  )
}
