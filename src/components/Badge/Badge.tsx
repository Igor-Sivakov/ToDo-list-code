import { FC } from 'react'
import './Badge.scss'

type PropsType = {
  color: string
  className?: string | ''
  onClick?: () => void
}

export const Badge: FC<PropsType> = ({ color, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`badge badge__${color} ${className}`}
    ></div>
  )
}
