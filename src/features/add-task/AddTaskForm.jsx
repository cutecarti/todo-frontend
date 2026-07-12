import { useState } from 'react'
import Button from '@/shared/ui/Button'
import Field from '@/shared/ui/Field'

const AddTaskForm = ({ styles, onAddTask, newTaskInputRef }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState('')

  const onInput = (event) => {
    const { value } = event.target
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0
    setNewTaskTitle(value)
    setError(hasOnlySpaces ? 'The task cannot be empty' : '')
  }

  const clearNewTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

  const onSubmit = async (event) => {
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
