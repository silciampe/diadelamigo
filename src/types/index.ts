export type Screen =
  | 'welcome'
  | 'gallery'
  | 'friend-photo'
  | 'friend-card'
  | 'final-card'
  | 'group-photo'
  | 'ending'

export interface Friend {
  id: string
  name: string
  photoUrl: string
  /** Contenido de la carta — pendiente de escribir */
  message: string
}

export interface ExperienceState {
  currentScreen: Screen
  selectedFriendId: string | null
  friendsViewed: string[]
  animationCompleted: boolean
}

export interface ExperienceActions {
  setScreen: (screen: Screen) => void
  selectFriend: (friendId: string) => void
  markFriendViewed: (friendId: string) => void
  setAnimationCompleted: (completed: boolean) => void
  resetSelection: () => void
}

export type ExperienceContext = ExperienceState & ExperienceActions
