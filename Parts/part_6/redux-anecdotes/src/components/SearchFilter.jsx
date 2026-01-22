import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const SearchFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      Filter anecdotes:
      <input
        type="text"
        name="filter"
        onChange={({ target: { value } }) => dispatch(filterChange(value))}
      />
    </div>
  )
}

export default SearchFilter
