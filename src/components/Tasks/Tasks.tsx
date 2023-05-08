import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import editIcon from '../../assets/img/edit.svg'
import { taskAddBtnSvg } from '../../assets/svgTSX/svg'

import { useAppDispatch, useAppSelector } from '../../redux/store'

import { fetchEditList } from '../../redux/lists/asyncActions'
import { fetchAddTask } from '../../redux/tasks/asyncActions'

import { getChosenList, ListType } from '../../redux/lists/listSlice'
import { TaskType } from '../../redux/tasks/taskSlice'

import { getTaskStatusSelect } from '../../redux/tasks/selectors'

import { Task } from '..'

import styles from './Tasks.module.scss'
import '../../index.scss'

type PropsType = {
  items: TaskType[]
  list: ListType
}

export const Tasks: FC<PropsType> = ({ items, list }) => {
  const isLoading =
    useAppSelector(getTaskStatusSelect) === 'loading' ? true : false

  const [tasks, setTasks] = useState<TaskType[]>([])
  const [titleInputValue, setTitleInputValue] = useState(list?.name)
  const [taskInputValue, setTaskInputValue] = useState('')
  const [isEditTitle, setIsEditTitle] = useState(false)
  const [isAddTask, setIsAddTask] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    addActualTasks()
  }, [items, list])

  useEffect(() => {
    setTitleInputValue(list.name)
  }, [list])

  const addActualTasks = () => {
    const actualTasks = items.filter((item) => item.listId === list.id)

    setTasks(actualTasks)
  }

  const onRenameList = () => {
    if (titleInputValue) {
      dispatch(fetchEditList({ list, value: titleInputValue })).then((res) => {
        const item = res.payload as ListType
        dispatch(getChosenList(item.id))
      })
      setIsEditTitle(false)
    }
    return
  }

  const addNewTask = () => {
    if (taskInputValue) {
      dispatch(fetchAddTask({ id: list.id, text: taskInputValue }))
      setIsAddTask(false)
      setTaskInputValue('')
    }
    setIsAddTask(false)
  }

  return (
    <div className={styles.root}>
      {isEditTitle ? (
        <div className={styles.renameList_input}>
          <input
            value={titleInputValue}
            autoFocus
            onChange={(e) => setTitleInputValue(e.target.value)}
            onBlur={onRenameList}
            className='field'
            placeholder='Enter list name...'
          />
        </div>
      ) : (
        <Link
          onClick={() => dispatch(getChosenList(list.id))}
          to={`/${list.id}`}
        >
          <h1 style={{ color: list.hex }} className={styles.title}>
            {list?.name}
            <img
              onClick={() => setIsEditTitle(true)}
              src={editIcon}
              alt='editIcon'
            />
          </h1>
        </Link>
      )}

      {!tasks.length ? (
        <div style={{ margin: '50px 0' }} className='notFound'>
          <p>Tasks not found</p>
        </div>
      ) : (
        tasks.map((item) => <Task key={item.id} item={item} />)
      )}

      {isLoading && (
        <div style={{ margin: '20px 0px 0px 39px', opacity: 0.6 }}>
          Loading new or exist edited task...
        </div>
      )}

      <div style={{ marginTop: '30px', height: '40px' }}>
        {isAddTask ? (
          <input
            value={taskInputValue}
            onChange={(e) => setTaskInputValue(e.target.value)}
            className='field'
            placeholder='Enter text of task...'
            autoFocus
            onBlur={addNewTask}
          />
        ) : (
          <div onClick={() => setIsAddTask(true)} className={styles.addBtn}>
            {taskAddBtnSvg}
            <span>Add new task</span>
          </div>
        )}
      </div>
    </div>
  )
}
