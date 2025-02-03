import { NavLink } from 'react-router-dom'
import Button from '../Button/Button'
import emptySearchIcon from '/Search_empty.png'

function EmptySearch() {
  return (
    <div className="empty_search">
      <img src={emptySearchIcon} alt="calendar icon" />
      <p className="text">
        Looks like nothing matches your search. Maybe try searching for something else?
      </p>
      <NavLink to={'/home/available-dishes'}>
        <Button type="primary">Available Dishes</Button>
      </NavLink>
    </div>
  )
}

export default EmptySearch
