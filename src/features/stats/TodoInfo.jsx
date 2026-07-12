import { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectTasksStats } from '@/entities/todo/model/selectors'

const TodoInfo = ({ styles, onDeleteAll }) => {
  const { total, done, hasTasks } = useSelector(selectTasksStats)

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
