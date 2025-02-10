import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import favoritesReducer from '../../../favorite/data/favoriteSlice'

const persistConfig = {
  key: 'favorites',
  storage,
}

export const persistedFavoritesReducer = persistReducer(persistConfig, favoritesReducer)
