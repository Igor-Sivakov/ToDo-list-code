import { FC, memo, useEffect, useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import listSvg from '../../assets/img/list.svg'
import addSvg from '../../assets/img/add.svg'
import rightSvg from '../../assets/img/right.svg'
import leftSvg from '../../assets/img/left.svg'

import { useAppDispatch, useAppSelector } from '../../redux/store'

import { getChosenList, ListType } from '../../redux/lists/listSlice'

import { getListStatusSelect } from '../../redux/lists/selectors'

import { AddListPopup, List } from '..'

import styles from './SideBar.module.scss'

type PropsType = {
  items: ListType[]
  activeList: ListType | null
}

export const SideBar: FC<PropsType> = memo(({ items, activeList }) => {
  const isLoading =
    useAppSelector(getListStatusSelect) === 'loading' ? true : false

  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [activeAll, setActiveAll] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [isSmallMenu, setSmallMenu] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (activeList) {
      setActiveItem(activeList.id)
      setActiveAll(false)
    }
  }, [activeList])

  const onClickShowAllLists = () => {
    setActiveAll(!activeAll)
    if (!activeAll) setActiveItem(null)
    dispatch(getChosenList(null))
  }

  const onClickShowOneList = (id: string) => {
    setActiveItem(id)
    setActiveAll(false)
    dispatch(getChosenList(id))
  }

  return (
    <section
      className={cn(styles.root, { [styles.root__closeMenu]: isSmallMenu })}
    >
      <img
        onClick={() => setSmallMenu(!isSmallMenu)}
        className={styles.menuToggler}
        src={isSmallMenu ? rightSvg : leftSvg}
        alt='menu togglerIcon'
      />

      <ul className={styles.menu}>
        <li
          onClick={onClickShowAllLists}
          className={cn({ [styles.active]: activeAll })}
        >
          <Link to='/'>
            <i>
              <img src={listSvg} alt='listIcon' />
            </i>
            <span>All lists</span>
          </Link>
        </li>

        {items.map((item) => (
          <List
            key={item.id}
            activeItem={activeItem}
            onClickShowOneList={onClickShowOneList}
            item={item}
            setActiveAll={setActiveAll}
          />
        ))}

        {isLoading && (
          <li style={{ marginLeft: '8px', opacity: 0.6 }}>
            Loading new or exist edited list...
          </li>
        )}

        <li onClick={() => setShowPopup(true)}>
          <i>
            <img src={addSvg} alt='btnIcon' />
          </i>
          {!isSmallMenu && <span>Add list</span>}
        </li>
      </ul>

      {showPopup && <AddListPopup onClickClose={setShowPopup} />}
    </section>
  )
})
