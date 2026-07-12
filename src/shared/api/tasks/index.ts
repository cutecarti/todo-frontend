import { api } from '@/shared/api/instance'
import type { CreateTaskInput, Task } from '@/shared/types/task'

const tasksAPI = {
  getAll: (): Promise<Task[]> => {
    return api.get<Task[]>('/api/tasks').then((response) => response.data)
  },

  add: (task: CreateTaskInput): Promise<Task> => {
    return api.post<Task>('/api/tasks', task).then((response) => response.data)
  },

  delete: (id: string): Promise<void> => {
    return api.delete(`/api/tasks/${id}`).then(() => undefined)
  },

  deleteAll: (): Promise<void> => {
    return api.delete('/api/tasks').then(() => undefined)
  },

  toggleComplete: (id: string, isDone: boolean): Promise<Task> => {
    return api
      .patch<Task>(`/api/tasks/${id}`, { isDone })
      .then((response) => response.data)
  },

  getById: (id: string): Promise<Task> => {
    return api.get<Task>(`/api/tasks/${id}`).then((response) => response.data)
  },
}

export default tasksAPI
