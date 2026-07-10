import { useContext, useState } from 'react'
import Button from '../Button/Button'
import Field from '../Field/Field'
import { TaskContext } from '../../context/TaskContext'
const AddTaskForm = () => {
  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
  } = useContext(TaskContext)

  const [error, setError] = useState('')

  const onInput = (event) => {
    const {value} = event.target
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0
    setNewTaskTitle(value)
    setError(hasOnlySpaces ? "The task cannot be empty" : '')
  }

  const clearNewTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0



  const onSubmit = (event) => {
    event.preventDefault()

    if (!isNewTaskTitleEmpty){
          addTask(clearNewTaskTitle)
    }
  }
    return (
       <form className="todo__form" onSubmit={onSubmit}>
        <Field 
        className="todo__field"
        label="NewTaskTitle"
        id="new-task"
        error={error}
        value={newTaskTitle}
        onInput={onInput}
        ref={newTaskInputRef}
        />
        <Button type="submit" isDisabled={isNewTaskTitleEmpty}>Add</Button>
      </form> 
    )
}

export default AddTaskForm