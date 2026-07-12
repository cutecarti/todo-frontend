import { memo, useMemo, useContext} from "react"
import { TaskContext } from "@/entities/todo"
const TodoInfo = ({styles}) =>{
    const {
        tasks,
        deleteAllTasks,
    } = useContext(TaskContext)

    const total = tasks.length
    const done = useMemo(()=>{
        return tasks.filter(({isDone}) => isDone).length
    }, [tasks])
    const hasTasks = total > 0


    return(
        <div className={styles.info}>
        <div className={styles.totalTasks}>Done {done} form {total}</div>
        {hasTasks && (
            <button className={styles.deleteAllButton} type="button"
            onClick={deleteAllTasks}
            >Delete all
            </button>
        )}
      </div>
    )
}

export default memo(TodoInfo)