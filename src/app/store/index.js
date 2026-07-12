import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '@/entities/todo/model/tasksSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
})
