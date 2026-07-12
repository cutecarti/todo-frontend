'use client'

import type { CSSProperties, ReactNode, MouseEventHandler } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  isDisabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  style?: CSSProperties
}

const Button = (props: ButtonProps) => {
  const {
    className = '',
    type = 'button',
    children,
    isDisabled,
    onClick,
  } = props

  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Button
