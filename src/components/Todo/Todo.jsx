
import AddTaskForm from "../AddTaskForm/AddTaskForm"
import SearchTaskForm from "../SearchTaskForm/SearchTaskForm"
import TodoInfo from "../TodoInfo/TodoInfo"
import TodoList from "../TodoList/TodoList"
import Button from "../Button/Button"
import { TaskContext } from "../../context/TaskContext"
import { useContext } from "react"

const Todo = () => {
    const {firstIncompleteTaskRef} = useContext(TaskContext)
         
    return (
        <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <TodoInfo />
      <Button
      onClick={()=>firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}>Show first uncomplete task</Button>
      <TodoList/>
    </div>
    )
}

export default Todo