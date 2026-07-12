'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import AddTaskForm from '@/features/add-task'
import SearchTaskForm from '@/features/search-task'
import TodoInfo from '@/features/stats'
import { TodoList, useIncompleteTaskScroll } from '@/entities/todo'
import {
  fetchTasks,
  addTask,
  deleteTask,
  deleteAllTasks,
  toggleTaskComplete,
  removeTask,
} from '@/entities/todo/model/tasksSlice'
import { selectTasks } from '@/entities/todo/model/selectors'
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import Button from '@/shared/ui/Button'

import styles from './Todo.module.scss'

const Todo = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)

  const [searchQuery, setSearchQuery] = useState('')
  const [appearingTaskId, setAppearingTaskId] = useState<string | null>(null)
  const [disappearingTaskId, setDisappearingTaskId] = useState<string | null>(
    null,
  )

  const newTaskInputRef = useRef<HTMLInputElement | null>(null)
  const { firstIncompleteTaskId, firstIncompleteTaskRef } =
    useIncompleteTaskScroll(tasks)

  useEffect(() => {
    newTaskInputRef.current?.focus()
    void dispatch(fetchTasks())
  }, [dispatch])

  const handleAddTask = useCallback(
    async (title: string) => {
      const addedTask = await dispatch(addTask(title)).unwrap()
      setSearchQuery('')
      newTaskInputRef.current?.focus()
      setAppearingTaskId(addedTask.id)
      setTimeout(() => setAppearingTaskId(null), 400)
    },
    [dispatch],
  )

  const handleDeleteTask = useCallback(
    async (taskId: string) => {
      await dispatch(deleteTask(taskId)).unwrap()
      setDisappearingTaskId(taskId)
      setTimeout(() => {
        dispatch(removeTask(taskId))
        setDisappearingTaskId(null)
      }, 400)
    },
    [dispatch],
  )

  const handleToggleComplete = useCallback(
    (taskId: string, isDone: boolean) => {
      void dispatch(toggleTaskComplete({ id: taskId, isDone }))
    },
    [dispatch],
  )

  const handleDeleteAll = useCallback(() => {
    const isConfirmed = confirm('Sure?')
    if (isConfirmed) {
      void dispatch(deleteAllTasks())
    }
  }, [dispatch])

  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>To Do List</h1>
      <AddTaskForm
        styles={styles}
        onAddTask={handleAddTask}
        newTaskInputRef={newTaskInputRef}
      />
      <SearchTaskForm
        styles={styles}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />
      <TodoInfo styles={styles} onDeleteAll={handleDeleteAll} />
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({
            behavior: 'smooth',
          })
        }
      >
        Show first uncomplete task
      </Button>
      <TodoList
        styles={styles}
        searchQuery={searchQuery}
        appearingTaskId={appearingTaskId}
        disappearingTaskId={disappearingTaskId}
        firstIncompleteTaskId={firstIncompleteTaskId}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        onDeleteTask={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  )
}

export default Todo
