import { FadeSlide, FadeSlideGroup } from '@/components/ui/FadeSlide'
import { FullScreen } from '@/components/ui/FullScreen'
import { GentleButton } from '@/components/ui/GentleButton'
import { MinimalBackground } from '@/components/ui/MinimalBackground'

interface WelcomeProps {
  onBegin: () => void
}

export function Welcome({ onBegin }: WelcomeProps) {
  return (
    <FullScreen>
      <MinimalBackground />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] sm:px-8">
        <FadeSlideGroup className="flex w-full max-w-sm flex-col items-center text-center sm:max-w-md">
          <FadeSlide>
            <p className="mb-8 text-[0.65rem] tracking-[0.35em] text-ink-faint uppercase sm:mb-10 sm:text-xs">
              Día del Amigo
            </p>
          </FadeSlide>

          <FadeSlide>
            <h1 className="font-serif text-[1.75rem] leading-snug font-normal text-balance text-ink sm:text-4xl sm:leading-tight">
              Hay historias que solo existen entre nosotras.
            </h1>
          </FadeSlide>

          <FadeSlide className="mt-14 sm:mt-16">
            <GentleButton
              variant="ghost"
              onClick={onBegin}
              className="min-h-12 min-w-36 bg-cream-dark/60 px-10 py-3 text-base text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-cream-dark sm:min-w-40"
            >
              Comenzar
            </GentleButton>
          </FadeSlide>
        </FadeSlideGroup>
      </div>
    </FullScreen>
  )
}
