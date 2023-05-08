import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cn from 'classnames'

import removeSvg from '../../assets/img/remove.svg'

import { useAppDispatch } from '../../redux/store'

import { fetchRemoveList } from '../../redux/lists/asyncActions'

import { ListType } from '../../redux/lists/listSlice'

import { Badge } from '..'

import styles from '../SideBar/SideBar.module.scss'

type PropsType = {
  item: ListType
  activeItem: string | null
  onClickShowOneList: (id: string) => void
  setActiveAll: (value: boolean) => void
}

export const List: FC<PropsType> = ({
  item,
  activeItem,
  onClickShowOneList,
  setActiveAll,
}) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const onRemoveItem = () => {
    dispatch(fetchRemoveList(item.id)).then((res) => {
      if (res.payload) {
        navigate('/')
        setActiveAll(true)
      }
    })
  }

  return (
    <li
      key={item.id}
      onClick={() => onClickShowOneList(item.id)}
      className={cn({ [styles.active]: activeItem === item.id })}
    >
      <Link to={`/${item.id}`}>
        <div>
          <Badge color={item.color} />
        </div>

        <span>
          {item.name} {`(${item.tasksCount ? item.tasksCount : 0})`}
        </span>

        <img
          src={removeSvg}
          className={styles.menu__removeIcon}
          alt='removeIcon'
          onClick={onRemoveItem}
        />
      </Link>
    </li>
  )
}
