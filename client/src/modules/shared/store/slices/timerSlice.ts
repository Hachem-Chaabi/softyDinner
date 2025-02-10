import { createSlice } from '@reduxjs/toolkit'

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

const getRemainingTime = (): TimeLeft => {
  const now = new Date()
  const endTime = new Date(new Date().setHours(12, 0, 0, 0))

  if (now >= endTime) return { hours: 0, minutes: 0, seconds: 0 }

  const diff = endTime.getTime() - now.getTime()
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

const timerSlice = createSlice({
  name: 'timer',
  initialState: getRemainingTime(),
  reducers: {
    updateTimer: (state) => Object.assign(state, getRemainingTime()),
  },
})

export const { updateTimer } = timerSlice.actions

export default timerSlice.reducer
