import calendar from '/Calendar_empty.png'

function EmptyDinnerState() {
  return (
    <div className="box empty_dinner_state_box">
      <img src={calendar} alt="calendar" />
      <p>
        It's <span>Sunday</span> , so no dinner is scheduled for tonight.
      </p>
    </div>
  )
}

export default EmptyDinnerState
