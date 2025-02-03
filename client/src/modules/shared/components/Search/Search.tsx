import searchIcon from '/search-icon.png'

function Search() {
  return (
    <div className="search">
      <div className="search_container">
        <img src={searchIcon} alt="search icon" />
        <input id='search' name='search' type="text" className="search_input" placeholder="Search" />
      </div>
    </div>
  )
}

export default Search
