export type Task = {
  id: string
  title: string
  isDone: boolean
  createdAt: string
  updatedAt: string
}

export type CreateTaskInput = {
  title: string
  isDone?: boolean
}
