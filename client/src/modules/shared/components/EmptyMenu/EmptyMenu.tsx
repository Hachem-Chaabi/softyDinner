import calendar from '/Calendar_empty.png'

function EmptyMenu() {
  return (
    <div className="empty_menu">
      <img src={calendar} alt="calendar icon" />
      <p className="text">No dinner menu is available at the moment. Please check back later.</p>
    </div>
  )
}

export default EmptyMenu
