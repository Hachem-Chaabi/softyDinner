import CalendarIcon from '../../assets/icons/shared/calendar-icon.svg?react'

function EmptyMenu() {
  return (
    <div className="empty_menu">
      <CalendarIcon />
      <p className="text">No dinner menu is available at the moment. Please check back later.</p>
    </div>
  )
}

export default EmptyMenu
