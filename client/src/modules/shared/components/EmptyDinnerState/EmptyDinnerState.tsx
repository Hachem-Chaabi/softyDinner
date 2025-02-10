import CalendarIcon from '../../assets/icons/shared/calendar-icon.svg?react'

function EmptyDinnerState() {
  return (
    <div className="box empty_dinner_state_box">
      <CalendarIcon />
      <p>
        It's <span>Sunday</span> , so no dinner is scheduled for tonight.
      </p>
    </div>
  )
}

export default EmptyDinnerState
