import { createContext, useMemo } from "react";
import useTasks from "./useTasks";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll";

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
        setSearchQuery,
        disappearingTaskId,
        appearingTaskId
    } = useTasks()

    const {
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
    } = useIncompleteTaskScroll(tasks)


    const value = useMemo(() => ({
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
        setSearchQuery,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
    }),[tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef,
        searchQuery,
        setSearchQuery,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskId,
        firstIncompleteTaskRef])


    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}