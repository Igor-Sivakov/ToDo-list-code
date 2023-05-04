import { ChangeEvent, FC, useState } from 'react'
import editIcon from '../../assets/img/edit.svg'
import removeSvg from '../../assets/img/remove.svg'
import { checkboxSvg } from '../../assets/svgTSX/svg'
import { useAppDispatch } from '../../redux/store'
import { TaskType } from '../../redux/tasks/taskSlice'
import {
  fetchCompleteTask,
  fetchEditTask,
  fetchRemoveTask,
} from '../../redux/tasks/asyncActions'
import styles from './Task.module.scss'

type PropsType = {
  item: TaskType
}

export const Task: FC<PropsType> = ({ item }) => {
  const [editTaskInputValue, setEditTaskInputValue] = useState('')
  const [isEditTask, setIsEditTask] = useState(false)

  const dispatch = useAppDispatch()

  const openTaskEditor = (textValue: string) => {
    setEditTaskInputValue(textValue)
    setIsEditTask(true)
  }

  const onEditTask = () => {
    if (editTaskInputValue) {
      dispatch(fetchEditTask({ task: item, text: editTaskInputValue }))
      setIsEditTask(false)
    }
    return
  }

  const onChangeCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(fetchCompleteTask({ task: item, completed: event.target.checked }))
  }

  return (
    <div className={styles.item}>
      <div className={styles.checkbox}>
        <input
          onChange={onChangeCheckBox}
          id={`task-${item.id}`}
          type='checkbox'
          checked={item.completed}
        />
        <label htmlFor={`task-${item.id}`}>{checkboxSvg}</label>
      </div>
      {isEditTask ? (
        <input
          value={editTaskInputValue}
          onChange={(e) => setEditTaskInputValue(e.target.value)}
          className='field'
          placeholder='Enter text of task...'
          autoFocus
          onBlur={onEditTask}
        />
      ) : (
        <div className={styles.text}>
          {item.text}
          <div className={styles.editBar}>
            <img
              onClick={() => openTaskEditor(item.text)}
              src={editIcon}
              alt='editIcon'
              className={styles.item__editIcon}
            />
            <img
              onClick={() => dispatch(fetchRemoveTask(item.id))}
              src={removeSvg}
              alt='removeIcon'
              className={styles.item__editIcon}
            />
          </div>
        </div>
      )}
    </div>
  )
}
