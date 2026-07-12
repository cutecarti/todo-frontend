import { useRef } from 'react'
import type { Task } from '@/shared/types/task'

const useIncompleteTaskScroll = (tasks: Task[]) => {
  const firstIncompleteTaskRef = useRef<HTMLLIElement | null>(null)
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id

  return {
    firstIncompleteTaskId,
    firstIncompleteTaskRef,
  }
}

export default useIncompleteTaskScroll
