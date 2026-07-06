export const DURATION = {
  fast: 0.4,
  normal: 0.5,
  slow: 0.8,
  slower: 1.2,
} as const

export const EASE = [0.25, 0.1, 0.25, 1] as const

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.normal, ease: EASE },
  },
}

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: DURATION.normal, ease: EASE },
  },
}

export const slideUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: DURATION.normal, ease: EASE },
  },
}

export const blurVariants = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: DURATION.slower, ease: EASE },
  },
  exit: {
    opacity: 0,
    filter: 'blur(4px)',
    transition: { duration: DURATION.normal, ease: EASE },
  },
}

export const fadeSlideItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE },
  },
}

export const fadeSlideContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
}

export const paperVariants = {
  hidden: {
    opacity: 0,
    rotateX: 14,
    y: 48,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.slower, ease: EASE },
  },
  exit: {
    opacity: 0,
    rotateX: -8,
    y: -24,
    scale: 0.98,
    transition: { duration: DURATION.normal, ease: EASE },
  },
}

export const paperContentItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE },
  },
}

export const paperContentContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.5 },
  },
}

export const MERGE_DURATION = 3.2
export const MERGE_CROSSFADE = 1.8

export const TRANSITION_TO_GROUP = 1.5

export const cardDissolve = {
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: 'blur(6px)',
    transition: { duration: TRANSITION_TO_GROUP, ease: EASE },
  },
}

export const ENDING_REVEAL = 2.8

export const endingPhotoReveal = {
  hidden: { opacity: 0, scale: 1.02, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: ENDING_REVEAL, ease: EASE },
  },
}

export const endingMessageReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ENDING_REVEAL, ease: EASE, delay: 2.2 },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE },
  },
}
