'use client'

import { memo, useMemo } from 'react'
import type { RefObject } from 'react'
import TodoItem from '../TodoItem'
import { selectTasks } from '../../model/selectors'
import { useAppSelector } from '@/shared/store/hooks'

type TodoListProps = {
  styles: Record<string, string>
  searchQuery: string
  appearingTaskId: string | null
  disappearingTaskId: string | null
  firstIncompleteTaskId?: string
  firstIncompleteTaskRef: RefObject<HTMLLIElement | null>
  onDeleteTask: (id: string) => void
  onToggleComplete: (id: string, isDone: boolean) => void
}

const TodoList = ({
  styles,
  searchQuery,
  appearingTaskId,
  disappearingTaskId,
  firstIncompleteTaskId,
  firstIncompleteTaskRef,
  onDeleteTask,
  onToggleComplete,
}: TodoListProps) => {
  const tasks = useAppSelector(selectTasks)

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()
    if (clearSearchQuery.length === 0) {
      return null
    }
    return tasks.filter(({ title }) =>
      title.toLowerCase().includes(clearSearchQuery),
    )
  }, [searchQuery, tasks])

  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

  if (!hasTasks) {
    return <div className={styles.emptyMessage}>There are no tasks yet</div>
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>Tasks not found</div>
  }

  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className={styles.item}
          key={task.id}
          appearingTaskId={appearingTaskId}
          disappearingTaskId={disappearingTaskId}
          firstIncompleteTaskId={firstIncompleteTaskId}
          firstIncompleteTaskRef={firstIncompleteTaskRef}
          onDeleteTask={onDeleteTask}
          onToggleComplete={onToggleComplete}
          id={task.id}
          title={task.title}
          isDone={task.isDone}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)
