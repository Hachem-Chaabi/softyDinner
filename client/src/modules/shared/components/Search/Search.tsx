import SearchIcon from '../../assets/icons/search/search-icon.svg?react'

function Search() {
  return (
    <div className="search">
      <div className="search_container">
        <SearchIcon />
        <input id='search' name='search' type="text" className="search_input" placeholder="Search" />
      </div>
    </div>
  )
}

export default Search
