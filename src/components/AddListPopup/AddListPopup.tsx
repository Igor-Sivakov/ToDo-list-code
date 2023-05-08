import { FC, useState } from 'react'

import DB from '../../assets/db.json'

import closeSvg from '../../assets/img/close.svg'

import { useAppDispatch } from '../../redux/store'

import { fetchAddList } from '../../redux/lists/asyncActions'

import { Badge } from '..'

import styles from './AddListPopup.module.scss'
import '../../index.scss'

type PropsType = {
  onClickClose: (value: boolean) => void
}

export const AddListPopup: FC<PropsType> = ({ onClickClose }) => {
  const { colors } = DB
  const [selectedColor, setSelectedColor] = useState(colors[0].id)
  const [inputValue, setInputValue] = useState('')

  const dispatch = useAppDispatch()

  const addListSubmit = () => {
    if (!inputValue) {
      alert('Add name of list.')
      return
    }

    dispatch(fetchAddList({ id: '', name: inputValue, colorId: selectedColor }))

    setInputValue('')
    onClickClose(false)
    setSelectedColor(colors[0].id)
  }

  return (
    <div className={styles.root}>
      <img
        onClick={() => onClickClose(false)}
        className={styles.closeIcon}
        src={closeSvg}
        alt='closeIcon'
      />

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type='text'
        placeholder='Enter list name...'
        className='field'
      />

      <div className={styles.colors}>
        {colors.map((color) => (
          <Badge
            key={color.hex}
            onClick={() => setSelectedColor(color.id)}
            color={color.name}
            className={selectedColor === color.id ? 'selected' : ''}
          />
        ))}
      </div>

      <button onClick={addListSubmit} className='button'>
        Add list
      </button>
    </div>
  )
}
