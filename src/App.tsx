import { FC, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './redux/store'
import {
  getChosenTaskSelect,
  getListItemsSelect,
} from './redux/lists/selectors'
import { getTaskItemsSelect } from './redux/tasks/selectors'
import { fetchLists, fetchActiveList } from './redux/lists/asyncActions'
import { fetchTasks } from './redux/tasks/asyncActions'
import { addListTasksCount } from './redux/lists/listSlice'
import { Tasks, SideBar } from './components'
import styles from './App.module.scss'
import './index.scss'

const App: FC = () => {
  const listsState = useAppSelector(getListItemsSelect)
  const tasksState = useAppSelector(getTaskItemsSelect)
  const chosenTask = useAppSelector(getChosenTaskSelect)

  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchLists())
    dispatch(fetchTasks())

    if (location.pathname !== '/') {
      const id = location.pathname.substring(1)
      dispatch(fetchActiveList(id))
    }
  }, [])

  useEffect(() => {
    if (listsState.length > 0 && tasksState.length > 0) {
      dispatch(addListTasksCount(tasksState))
    }
  }, [tasksState])

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <SideBar items={listsState} activeList={chosenTask} />
        <main className={styles.main_content}>
          <Routes>
            <Route
              path='/'
              element={listsState.map((list) => (
                <Tasks key={list.id} list={list} items={tasksState} />
              ))}
            />
            {chosenTask && (
              <Route
                path='/:id'
                element={<Tasks list={chosenTask} items={tasksState} />}
              />
            )}
            <Route
              path='*'
              element={
                <div style={{ height: '70%' }} className='notFound'>
                  <p>Page not found :(</p>
                </div>
              }
            />
          </Routes>
          {!listsState.length && (
            <div className='notFound'>
              <p>Lists not found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
