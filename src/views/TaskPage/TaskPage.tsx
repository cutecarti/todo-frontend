'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import {
  fetchTaskById,
  clearCurrentTask,
} from '@/entities/todo/model/tasksSlice'
import {
  selectCurrentTask,
  selectCurrentStatus,
} from '@/entities/todo/model/selectors'
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'

const TaskPage = () => {
  const params = useParams<{ id: string }>()
  const taskId = params?.id
  const dispatch = useAppDispatch()

  const task = useAppSelector(selectCurrentTask)
  const currentStatus = useAppSelector(selectCurrentStatus)

  useEffect(() => {
    if (!taskId) {
      return
    }

    void dispatch(fetchTaskById(taskId))
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
