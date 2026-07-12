'use client'

import type { FormEvent } from 'react'
import Field from '@/shared/ui/Field'

type SearchTaskFormProps = {
  styles: Record<string, string>
  searchQuery: string
  onSearchQueryChange: (value: string) => void
}

const SearchTaskForm = ({
  styles,
  searchQuery,
  onSearchQueryChange,
}: SearchTaskFormProps) => {
  return (
    <form
      className={styles.form}
      onSubmit={(event) => event.preventDefault()}
    >
      <Field
        className={styles.field}
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery}
        onInput={(event: FormEvent<HTMLInputElement>) =>
          onSearchQueryChange(event.currentTarget.value)
        }
      />
    </form>
  )
}

export default SearchTaskForm
