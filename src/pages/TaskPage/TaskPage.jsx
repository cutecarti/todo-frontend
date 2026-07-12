import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTaskById,
  clearCurrentTask,
} from '@/entities/todo/model/tasksSlice'
import {
  selectCurrentTask,
  selectCurrentStatus,
} from '@/entities/todo/model/selectors'

const TaskPage = () => {
  const { id: taskId } = useParams()
  const dispatch = useDispatch()

  const task = useSelector(selectCurrentTask)
  const currentStatus = useSelector(selectCurrentStatus)

  useEffect(() => {
    dispatch(fetchTaskById(taskId))
    return () => {
      dispatch(clearCurrentTask())
    }
  }, [dispatch, taskId])

  if (currentStatus === 'loading' || currentStatus === 'idle') {
    return <div>loading</div>
  }

  if (currentStatus === 'failed' || !task) {
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
