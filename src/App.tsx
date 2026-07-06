import { AnimatePresence } from 'framer-motion'
import { useCallback, useMemo } from 'react'
import { Ending } from '@/components/Ending/Ending'
import { FinalCard } from '@/components/FinalCard/FinalCard'
import { FriendCard } from '@/components/FriendCard/FriendCard'
import { FriendPhoto } from '@/components/FriendPhoto/FriendPhoto'
import { Gallery } from '@/components/Gallery/Gallery'
import { GroupPhoto } from '@/components/GroupPhoto/GroupPhoto'
import { Particles } from '@/components/Particles/Particles'
import { Welcome } from '@/components/Welcome/Welcome'
import { endingMessage, finalCard, friends, galleryFriends, groupPhoto, SIL_ID } from '@/data/friends'
import { useExperienceState } from '@/hooks/useExperienceState'

export default function App() {
  const {
    currentScreen,
    selectedFriendId,
    friendsViewed,
    setScreen,
    selectFriend,
    markFriendViewed,
    resetSelection,
  } = useExperienceState()

  const selectedFriend = useMemo(
    () => friends.find((f) => f.id === selectedFriendId) ?? null,
    [selectedFriendId],
  )

  const handleSelectFriend = useCallback(
    (friendId: string) => {
      if (friendId === SIL_ID) return
      selectFriend(friendId)
      setScreen('friend-photo')
    },
    [selectFriend, setScreen],
  )

  const handleFriendCardBack = useCallback(() => {
    if (selectedFriendId && selectedFriendId !== SIL_ID) {
      markFriendViewed(selectedFriendId)
    }
    resetSelection()

    const readableTotal = galleryFriends(friends).length
    const viewedCount =
      selectedFriendId &&
      selectedFriendId !== SIL_ID &&
      !friendsViewed.includes(selectedFriendId)
        ? friendsViewed.filter((id) => id !== SIL_ID).length + 1
        : friendsViewed.filter((id) => id !== SIL_ID).length

    if (viewedCount >= readableTotal) {
      setScreen('final-card')
    } else {
      setScreen('gallery')
    }
  }, [
    selectedFriendId,
    markFriendViewed,
    resetSelection,
    friendsViewed,
    setScreen,
  ])

  const handleBackToGallery = useCallback(() => {
    resetSelection()
    setScreen('gallery')
  }, [resetSelection, setScreen])

  const handleSkipToEnd = useCallback(() => {
    resetSelection()
    setScreen('final-card')
  }, [resetSelection, setScreen])

  return (
    <div className="relative min-h-dvh bg-cream">
      {currentScreen !== 'welcome' && currentScreen !== 'ending' && <Particles count={14} />}

      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <Welcome key="welcome" onBegin={() => setScreen('gallery')} />
        )}

        {currentScreen === 'gallery' && (
          <Gallery
            key="gallery"
            friends={friends}
            friendsViewed={friendsViewed}
            onSelectFriend={handleSelectFriend}
            onSkipToEnd={handleSkipToEnd}
          />
        )}

        {currentScreen === 'friend-photo' && selectedFriend && (
          <FriendPhoto
            key={`photo-${selectedFriend.id}`}
            friend={selectedFriend}
            onContinue={() => setScreen('friend-card')}
            onBack={handleBackToGallery}
          />
        )}

        {currentScreen === 'friend-card' && selectedFriend && (
          <FriendCard
            key={`card-${selectedFriend.id}`}
            friend={selectedFriend}
            onBack={handleFriendCardBack}
          />
        )}

        {currentScreen === 'final-card' && (
          <FinalCard
            key="final-card"
            author={finalCard.author}
            photoUrl={finalCard.photoUrl}
            message={finalCard.message}
            onContinue={() => setScreen('group-photo')}
          />
        )}

        {currentScreen === 'group-photo' && (
          <GroupPhoto
            key="group-photo"
            friends={friends}
            imageUrl={groupPhoto.imageUrl}
            alt={groupPhoto.alt}
            onComplete={() => setScreen('ending')}
          />
        )}

        {currentScreen === 'ending' && (
          <Ending
            key="ending"
            imageUrl={groupPhoto.imageUrl}
            imageAlt={groupPhoto.alt}
            message={endingMessage.body}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
