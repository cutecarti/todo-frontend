import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import tasksAPI from '@/shared/api/tasks'
import type { Task } from '@/shared/types/task'

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type TasksState = {
  items: Task[]
  status: RequestStatus
  error: string | null
  currentTask: Task | null
  currentStatus: RequestStatus
  currentError: string | null
}

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () =>
  tasksAPI.getAll(),
)

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchById',
  async (taskId: string) => tasksAPI.getById(taskId),
)

export const addTask = createAsyncThunk('tasks/add', async (title: string) => {
  return tasksAPI.add({ title, isDone: false })
})

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (taskId: string) => {
    await tasksAPI.delete(taskId)
    return taskId
  },
)

export const deleteAllTasks = createAsyncThunk('tasks/deleteAll', async () => {
  await tasksAPI.deleteAll()
})

export const toggleTaskComplete = createAsyncThunk(
  'tasks/toggleComplete',
  async ({ id, isDone }: { id: string; isDone: boolean }) => {
    await tasksAPI.toggleComplete(id, isDone)
    return { id, isDone }
  },
)

const initialState: TasksState = {
  items: [],
  status: 'idle',
  error: null,
  currentTask: null,
  currentStatus: 'idle',
  currentError: null,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearCurrentTask(state) {
      state.currentTask = null
      state.currentStatus = 'idle'
      state.currentError = null
    },
    removeTask(state, action: PayloadAction<string>) {
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
        state.error = action.error.message ?? 'Failed to fetch tasks'
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
        state.currentError = action.error.message ?? 'Failed to fetch task'
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
