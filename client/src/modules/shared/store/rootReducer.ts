import { combineReducers } from '@reduxjs/toolkit'
import { sharedsPersistedReducer } from './persist/sharedPersist'
import { persistedFavoritesReducer } from './persist/favoritePersist'
import { api } from './services/api'
import authReducer from '../../auth/data/authSlice'
import timerReducer from './slices/timerSlice'
import forgetPasswordReducer from '../../auth/data/forgetPasswordSlice'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  shared: sharedsPersistedReducer,
  auth: authReducer,
  timer: timerReducer,
  forgetPassword: forgetPasswordReducer,
  favorite: persistedFavoritesReducer,
})

export default rootReducer
