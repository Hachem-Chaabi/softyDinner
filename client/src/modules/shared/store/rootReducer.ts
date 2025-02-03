import { combineReducers } from '@reduxjs/toolkit'
import { sharedsPersistedReducer } from './persist/sharedPersist'
import { api } from './services/api'
import authReducer from '../../auth/data/authSlice'
import timerReducer from './slices/timerSlice'
import forgetPasswordReducer from '../../auth/data/forgetPasswordSlice'
import favoriteSlice from '../../favorite/data/favoriteSlice'
import todosReducer from '../../todos/data/todoSlice'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  shared: sharedsPersistedReducer,
  auth: authReducer,
  timer: timerReducer,
  forgetPassword: forgetPasswordReducer,
  favorite: favoriteSlice,
  todos: todosReducer,
})

export default rootReducer
