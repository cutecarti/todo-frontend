import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tasksAPI from '@/shared/api/tasks'

export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async () => tasksAPI.getAll(),
)

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchById',
  async (taskId) => tasksAPI.getById(taskId),
)

export const addTask = createAsyncThunk(
  'tasks/add',
  async (title) => {
    const newTask = { title, isDone: false }
    return tasksAPI.add(newTask)
  },
)

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (taskId) => {
    await tasksAPI.delete(taskId)
    return taskId
  },
)

export const deleteAllTasks = createAsyncThunk(
  'tasks/deleteAll',
  async (_, { getState }) => {
    const { items } = getState().tasks
    await tasksAPI.deleteAll(items)
  },
)

export const toggleTaskComplete = createAsyncThunk(
  'tasks/toggleComplete',
  async ({ id, isDone }) => {
    await tasksAPI.toggleComplete(id, isDone)
    return { id, isDone }
  },
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    currentTask: null,
    currentStatus: 'idle',
    currentError: null,
  },
  reducers: {
    clearCurrentTask(state) {
      state.currentTask = null
      state.currentStatus = 'idle'
      state.currentError = null
    },
    removeTask(state, action) {
      state.items = state.items.filter((task) => task.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(fetchTaskById.pending, (state) => {
        state.currentStatus = 'loading'
        state.currentError = null
        state.currentTask = null
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.currentStatus = 'succeeded'
        state.currentTask = action.payload
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.currentStatus = 'failed'
        state.currentError = action.error.message
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })

      .addCase(deleteAllTasks.fulfilled, (state) => {
        state.items = []
      })

      .addCase(toggleTaskComplete.fulfilled, (state, action) => {
        const { id, isDone } = action.payload
        const task = state.items.find((item) => item.id === id)
        if (task) {
          task.isDone = isDone
        }
        if (state.currentTask?.id === id) {
          state.currentTask.isDone = isDone
        }
      })
  },
})

export const { clearCurrentTask, removeTask } = tasksSlice.actions
export default tasksSlice.reducer
