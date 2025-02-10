import EmptySearchIcon from '../../assets/icons/emptySearch/search-empty-icon.svg?react'

import { NavLink } from 'react-router-dom'

import Button from '../Button/Button'

function EmptySearch() {
  return (
    <div className="empty_search">
      <EmptySearchIcon />
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
