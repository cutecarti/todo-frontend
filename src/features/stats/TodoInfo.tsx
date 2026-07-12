'use client'

import { memo } from 'react'
import { selectTasksStats } from '@/entities/todo/model/selectors'
import { useAppSelector } from '@/shared/store/hooks'

type TodoInfoProps = {
  styles: Record<string, string>
  onDeleteAll: () => void
}

const TodoInfo = ({ styles, onDeleteAll }: TodoInfoProps) => {
  const { total, done, hasTasks } = useAppSelector(selectTasksStats)

  return (
    <div className={styles.info}>
      <div className={styles.totalTasks}>
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button
          className={styles.deleteAllButton}
          type="button"
          onClick={onDeleteAll}
        >
          Delete all
        </button>
      )}
    </div>
  )
}

export default memo(TodoInfo)
