import { useEffect, useState } from 'react'
import { PhotoMerge } from '@/components/GroupPhoto/PhotoMerge'
import { FullScreen } from '@/components/ui/FullScreen'
import type { Friend } from '@/types'

interface GroupPhotoProps {
  friends: Friend[]
  imageUrl: string
  alt: string
  onComplete: () => void
}

export function GroupPhoto({ friends, imageUrl, alt, onComplete }: GroupPhotoProps) {
  const [animationDone, setAnimationDone] = useState(false)

  useEffect(() => {
    if (!animationDone) return

    const timer = window.setTimeout(onComplete, 1000)
    return () => window.clearTimeout(timer)
  }, [animationDone, onComplete])

  return (
    <FullScreen className="justify-center px-5 py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8">
      <div className="mx-auto w-full max-w-sm sm:max-w-md">
        <PhotoMerge
          friends={friends}
          groupImageUrl={imageUrl}
          groupAlt={alt}
          onComplete={() => setAnimationDone(true)}
        />
      </div>
    </FullScreen>
  )
}
