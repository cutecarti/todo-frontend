import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/shared/store'

export const selectTasks = (state: RootState) => state.tasks.items
export const selectTasksStatus = (state: RootState) => state.tasks.status
export const selectTasksError = (state: RootState) => state.tasks.error

export const selectCurrentTask = (state: RootState) => state.tasks.currentTask
export const selectCurrentStatus = (state: RootState) =>
  state.tasks.currentStatus
export const selectCurrentError = (state: RootState) => state.tasks.currentError

export const selectTasksStats = createSelector([selectTasks], (tasks) => {
  const total = tasks.length
  const done = tasks.filter(({ isDone }) => isDone).length
  return { total, done, hasTasks: total > 0 }
})
