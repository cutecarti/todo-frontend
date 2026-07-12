import { createSelector } from '@reduxjs/toolkit'

export const selectTasks = (state) => state.tasks.items
export const selectTasksStatus = (state) => state.tasks.status
export const selectTasksError = (state) => state.tasks.error

export const selectCurrentTask = (state) => state.tasks.currentTask
export const selectCurrentStatus = (state) => state.tasks.currentStatus
export const selectCurrentError = (state) => state.tasks.currentError

export const selectTasksStats = createSelector([selectTasks], (tasks) => {
  const total = tasks.length
  const done = tasks.filter(({ isDone }) => isDone).length
  return { total, done, hasTasks: total > 0 }
})
