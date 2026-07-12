'use client'

import type { FormEventHandler, Ref } from 'react'
import { SearchIcon } from '@/shared/ui/Icon'
import styles from './Field.module.scss'

type FieldProps = {
  className?: string
  id: string
  label: string
  type?: string
  onInput?: FormEventHandler<HTMLInputElement>
  value: string
  ref?: Ref<HTMLInputElement>
  error?: string
}

const Field = (props: FieldProps) => {
  const {
    className = '',
    id,
    label,
    type = 'text',
    onInput,
    value,
    ref,
    error,
  } = props

  return (
    <div className={`${styles.field} ${className}`}>
      <label className={`${styles.label}`} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.isInvalid : ''} ${
          type === 'search' ? styles.isSearch : ''
        }`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        value={value}
        onInput={onInput}
        ref={ref}
      />
      {type === 'search' && !value && (
        <SearchIcon className={styles.searchIcon} size={16} />
      )}
      {error && (
        <span className={styles.error} title={error}>
          {error}
        </span>
      )}
    </div>
  )
}

export default Field
