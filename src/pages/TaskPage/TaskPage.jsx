import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import tasksAPI from "@/shared/api/tasks"

const TaskPage = () => {
    const { id: taskId } = useParams()

    const [task, setTask] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        tasksAPI.getById(taskId).then((taskData) => {
            setTask(taskData)
            setHasError(false)
        })
        .catch(() => {
            setHasError(true)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [taskId])

    if (isLoading) {
        return <div>loading</div>
    }

    if (hasError) {
        return <div>task not found</div>
    }
    return (
        <div>
            <h1>{task.title}</h1>
            <p>{task.isDone ? 'complete' : 'not complete'}</p>
        </div>
    )
}

export default TaskPage