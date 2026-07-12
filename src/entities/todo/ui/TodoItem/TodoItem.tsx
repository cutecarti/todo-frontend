'use client'

import { memo } from 'react'
import Link from 'next/link'
import type { RefObject } from 'react'
import { CheckIcon, CloseIcon } from '@/shared/ui/Icon'

import styles from './TodoItem.module.scss'

type TodoItemProps = {
  className?: string
  id: string
  title: string
  isDone: boolean
  appearingTaskId: string | null
  disappearingTaskId: string | null
  firstIncompleteTaskId?: string
  firstIncompleteTaskRef: RefObject<HTMLLIElement | null>
  onDeleteTask: (id: string) => void
  onToggleComplete: (id: string, isDone: boolean) => void
}

const TodoItem = (props: TodoItemProps) => {
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
      <span className={styles.checkboxWrapper}>
        <input
          className={styles.checkbox}
          id={id}
          type="checkbox"
          checked={isDone}
          onChange={({ target }) => {
            onToggleComplete(id, target.checked)
          }}
        />
        {isDone && <CheckIcon className={styles.checkIcon} size={16} />}
      </span>
      <label className={`${styles.label} visually-hidden`} htmlFor={id}>
        {title}
      </label>

      <Link
        href={`/tasks/${id}`}
        aria-label="Task detail page"
        className={isDone ? styles.titleDone : undefined}
      >
        {title}
      </Link>

      <button
        className={styles.deleteButton}
        aria-label="Delete"
        title="Delete"
        onClick={() => onDeleteTask(id)}
      >
        <CloseIcon size={20} />
      </button>
    </li>
  )
}

export default memo(TodoItem)
