import { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import TodoItem from '../TodoItem'
import { selectTasks } from '../../model/selectors'

const TodoList = ({
  styles,
  searchQuery,
  appearingTaskId,
  disappearingTaskId,
  firstIncompleteTaskId,
  firstIncompleteTaskRef,
  onDeleteTask,
  onToggleComplete,
}) => {
  const tasks = useSelector(selectTasks)

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
          {...task}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)
