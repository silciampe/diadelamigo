import { useCallback, useState } from 'react'
import type { ExperienceActions, ExperienceState, Screen } from '@/types'

const initialState: ExperienceState = {
  currentScreen: 'welcome',
  selectedFriendId: null,
  friendsViewed: [],
  animationCompleted: false,
}

export function useExperienceState() {
  const [state, setState] = useState<ExperienceState>(initialState)

  const setScreen = useCallback((screen: Screen) => {
    setState((prev) => ({ ...prev, currentScreen: screen }))
  }, [])

  const selectFriend = useCallback((friendId: string) => {
    setState((prev) => ({ ...prev, selectedFriendId: friendId }))
  }, [])

  const markFriendViewed = useCallback((friendId: string) => {
    setState((prev) => {
      if (prev.friendsViewed.includes(friendId)) return prev
      return { ...prev, friendsViewed: [...prev.friendsViewed, friendId] }
    })
  }, [])

  const setAnimationCompleted = useCallback((completed: boolean) => {
    setState((prev) => ({ ...prev, animationCompleted: completed }))
  }, [])

  const resetSelection = useCallback(() => {
    setState((prev) => ({ ...prev, selectedFriendId: null }))
  }, [])

  const actions: ExperienceActions = {
    setScreen,
    selectFriend,
    markFriendViewed,
    setAnimationCompleted,
    resetSelection,
  }

  return { ...state, ...actions }
}

export type UseExperienceStateReturn = ReturnType<typeof useExperienceState>
