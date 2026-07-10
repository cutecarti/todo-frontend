import { memo } from "react"
import TodoItem from "./TodoItem"
import { TaskContext } from "../context/TaskContext"
import { useContext } from "react"
const TodoList = () => {

    const {
        tasks,
        filteredTasks,

    } = useContext(TaskContext)

    const hasTasks = tasks.length > 0
    const isEmptyFilteredTasks = filteredTasks?.length === 0

    if  (!hasTasks) {
        return <div className="todo__empty-message">There are no tasks yet</div>
    }

    if (hasTasks && isEmptyFilteredTasks) {
        return <div className="todo__empty-message">Tasks not found</div>
    }
    return (
        <ul className="todo__list">
        {(filteredTasks ?? tasks).map((task)=> (
            <TodoItem 
            className="todo__item"
            key={task.id}
            {...task}/>
        ))}
      </ul>
    )
}

export default memo(TodoList)