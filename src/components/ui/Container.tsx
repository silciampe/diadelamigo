import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  narrow?: boolean
}

export function Container({ children, className = '', narrow = false }: ContainerProps) {
  return (
    <div
      className={[
        'mx-auto w-full px-6 sm:px-8 lg:px-12',
        narrow ? 'max-w-2xl' : 'max-w-5xl',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
