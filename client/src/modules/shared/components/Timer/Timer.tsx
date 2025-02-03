import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { updateTimer } from '../../store/slices/timerSlice'

function Timer() {
  const dispatch = useAppDispatch()
  const timeLeft = useAppSelector((state) => state.timer)

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(updateTimer())
    }, 1000)

    return () => clearInterval(timer)
  }, [dispatch])

  const formatTime = (time: number): string => (time < 10 ? `0${time}` : `${time}`)

  return (
    <>
      <div className="timer_container">
        <div className="timer_box_container">
          <div className="timer_box_and_dots">
            <div className="timer_box">
              <span>{formatTime(timeLeft?.hours)}</span>
            </div>
            <div className="dots">
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        </div>
        <div className="timer_box_container">
          <div className="timer_box_and_dots">
            <div className="timer_box">
              <span>{formatTime(timeLeft?.minutes)}</span>
            </div>
            <div className="dots">
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        </div>
        <div className="timer_box_container">
          <div className="timer_box_and_dots">
            <div className="timer_box">
              <span>{formatTime(timeLeft?.seconds)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="timer_names">
        <p>
          <span style={{ paddingLeft: '13.5px' }}>Hours</span>
        </p>
        <p>
          <span style={{ paddingLeft: '12.1px' }}>Minutes</span>
        </p>
        <p>
          <span style={{ paddingLeft: '18px' }}>Seconds</span>
        </p>
      </div>
    </>
  )
}

export default Timer
