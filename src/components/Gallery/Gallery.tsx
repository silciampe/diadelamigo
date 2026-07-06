import { motion } from 'framer-motion'
import { Progress } from '@/components/Progress/Progress'
import { SIL_ID, galleryFriends } from '@/data/friends'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { GentleButton } from '@/components/ui/GentleButton'
import { PhotoFrame } from '@/components/ui/PhotoFrame'
import { ScreenWrapper } from '@/components/ui/ScreenWrapper'
import { staggerContainer, staggerItem } from '@/constants/animations'
import type { Friend } from '@/types'

interface GalleryProps {
  friends: Friend[]
  friendsViewed: string[]
  onSelectFriend: (friendId: string) => void
  onSkipToEnd: () => void
}

export function Gallery({
  friends,
  friendsViewed,
  onSelectFriend,
  onSkipToEnd,
}: GalleryProps) {
  const readableFriends = galleryFriends(friends)
  const viewedCount = friendsViewed.filter((id) => id !== SIL_ID).length

  return (
    <ScreenWrapper className="justify-start pt-12 pb-[max(2rem,env(safe-area-inset-bottom))] sm:pt-16">
      <Container className="flex flex-col items-center">
        <FadeIn className="mb-10 text-center sm:mb-12">
          <h2 className="font-serif text-3xl font-normal text-ink sm:text-4xl">
            Ellas
          </h2>
          <p className="mt-4 text-sm text-ink-muted sm:text-base">
            Tocá una foto para descubrir su carta
          </p>
        </FadeIn>

        <motion.div
          className="grid w-full max-w-md grid-cols-2 gap-x-6 gap-y-8 sm:max-w-2xl sm:grid-cols-4 sm:gap-x-8 sm:gap-y-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {friends.map((friend) => {
            const isSil = friend.id === SIL_ID
            const isViewed = friendsViewed.includes(friend.id)

            return (
              <motion.div
                key={friend.id}
                variants={staggerItem}
                className="flex flex-col items-center gap-3"
              >
                <PhotoFrame
                  src={friend.photoUrl}
                  alt={friend.name}
                  size="sm"
                  onClick={isSil ? undefined : () => onSelectFriend(friend.id)}
                  className="sm:hidden"
                />
                <PhotoFrame
                  src={friend.photoUrl}
                  alt={friend.name}
                  size="md"
                  onClick={isSil ? undefined : () => onSelectFriend(friend.id)}
                  className="hidden sm:block"
                />
                <span
                  className={[
                    'text-xs tracking-wide transition-colors duration-500',
                    isViewed && !isSil ? 'text-warm' : 'text-ink-faint',
                  ].join(' ')}
                >
                  {friend.name}
                </span>
              </motion.div>
            )
          })}
        </motion.div>

        <FadeIn delay={0.8} className="mt-12 flex flex-col items-center gap-8 sm:mt-16">
          <Progress current={viewedCount} total={readableFriends.length} />
          <GentleButton onClick={onSkipToEnd} className="text-xs text-ink-faint">
            Ir al final
          </GentleButton>
        </FadeIn>
      </Container>
    </ScreenWrapper>
  )
}
