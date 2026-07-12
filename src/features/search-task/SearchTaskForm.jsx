import Field from '@/shared/ui/Field'

const SearchTaskForm = ({ styles, searchQuery, onSearchQueryChange }) => {
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
        onInput={(event) => onSearchQueryChange(event.target.value)}
      />
    </form>
  )
}

export default SearchTaskForm
