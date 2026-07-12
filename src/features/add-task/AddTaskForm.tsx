'use client'

import { useState } from 'react'
import type { FormEvent, RefObject } from 'react'
import Button from '@/shared/ui/Button'
import Field from '@/shared/ui/Field'

type AddTaskFormProps = {
  styles: Record<string, string>
  onAddTask: (title: string) => Promise<void>
  newTaskInputRef: RefObject<HTMLInputElement | null>
}

const AddTaskForm = ({
  styles,
  onAddTask,
  newTaskInputRef,
}: AddTaskFormProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState('')

  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0
    setNewTaskTitle(value)
    setError(hasOnlySpaces ? 'The task cannot be empty' : '')
  }

  const clearNewTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isNewTaskTitleEmpty) {
      await onAddTask(clearNewTaskTitle)
      setNewTaskTitle('')
      setError('')
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Field
        className={styles.field}
        label="NewTaskTitle"
        id="new-task"
        error={error}
        value={newTaskTitle}
        onInput={onInput}
        ref={newTaskInputRef}
      />
      <Button type="submit" isDisabled={isNewTaskTitleEmpty}>
        Add
      </Button>
    </form>
  )
}

export default AddTaskForm
