import { memo } from 'react'
import { Link } from 'react-router-dom'

import styles from './TodoItem.module.scss'

const TodoItem = (props) => {
  const {
    className = '',
    id,
    title,
    isDone,
    appearingTaskId,
    disappearingTaskId,
    firstIncompleteTaskId,
    firstIncompleteTaskRef,
    onDeleteTask,
    onToggleComplete,
  } = props

  return (
    <li
      className={`${styles.todoItem} ${className}
        ${disappearingTaskId === id ? styles.isDisappearing : ''}
        ${appearingTaskId === id ? styles.isAppearing : ''}`}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
    >
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={isDone}
        onChange={({ target }) => {
          onToggleComplete(id, target.checked)
        }}
      />
      <label className={`${styles.label} visually-hidden`} htmlFor={id}>
        {title}
      </label>

      <Link to={`/tasks/${id}`} aria-label="Task detail page">
        {title}
      </Link>

      <button
        className={styles.deleteButton}
        aria-label="Delete"
        title="Delete"
        onClick={() => onDeleteTask(id)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </li>
  )
}

export default memo(TodoItem)
