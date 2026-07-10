import { createContext } from "react";
import useTasks from "../hooks/useTasks";
import useIncompleteTaskScroll from "../hooks/useIncompleteTaskScroll";

export const TaskContext = createContext({})

export const TasksProvider = ({children}) =>{

    const {
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef,
        searchQuery,
        setSearchQuery
    } = useTasks()

    const {
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
    } = useIncompleteTaskScroll(tasks)

    return (
        <TaskContext.Provider value={{
            tasks,
            filteredTasks,
            firstIncompleteTaskId,
            firstIncompleteTaskRef,
            deleteTask,
            deleteAllTasks,
            toggleTaskComplete,
            addTask,
            newTaskTitle,
            setNewTaskTitle,
            newTaskInputRef,
            searchQuery,
            setSearchQuery
        }}>
            {children}
        </TaskContext.Provider>
    )
}