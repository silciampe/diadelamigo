import { motion } from 'framer-motion'
import { FullScreen } from '@/components/ui/FullScreen'
import { endingMessageReveal, endingPhotoReveal } from '@/constants/animations'

interface EndingProps {
  imageUrl: string
  imageAlt: string
  message: string
}

export function Ending({ imageUrl, imageAlt, message }: EndingProps) {
  const lines = message.split('\n').filter(Boolean)

  return (
    <FullScreen className="justify-center px-6 py-[max(2rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center sm:max-w-md">
        <motion.figure
          className="w-full overflow-hidden rounded-2xl ring-1 ring-black/[0.04]"
          variants={endingPhotoReveal}
          initial="hidden"
          animate="visible"
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            className="aspect-[3/4] w-full object-cover sm:aspect-[4/5]"
          />
        </motion.figure>

        <motion.div
          className="mt-12 text-center sm:mt-14"
          variants={endingMessageReveal}
          initial="hidden"
          animate="visible"
        >
          {lines.map((line, index) => (
            <p
              key={index}
              className={[
                'font-serif leading-relaxed text-balance text-ink',
                index === 0 ? 'text-xl sm:text-2xl' : 'mt-4 text-base text-ink-muted sm:text-lg',
              ].join(' ')}
            >
              {line}
            </p>
          ))}
        </motion.div>
      </div>
    </FullScreen>
  )
}
