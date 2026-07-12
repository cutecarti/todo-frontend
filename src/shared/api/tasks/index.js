import { api } from '../instance'

const tasksAPI = {
  getAll: () => {
    return api.get('/tasks').then((response) => response.data)
  },

  add: (task) => {
    return api.post('/tasks', task).then((response) => response.data)
  },

  delete: (id) => {
    return api.delete(`/tasks/${id}`)
  },

  deleteAll: (tasks) => {
    return Promise.all(tasks.map(({ id }) => tasksAPI.delete(id)))
  },

  toggleComplete: (id, isDone) => {
    return api.patch(`/tasks/${id}`, { isDone })
  },

  getById: (id) => {
    return api.get(`/tasks/${id}`).then((response) => response.data)
  },
}

export default tasksAPI
