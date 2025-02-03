import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { FavoritesState, Item } from './types'

const initialState: FavoritesState = {
  favorites: [],
}

const persistConfig = {
  key: 'favorites',
  storage,
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Item>) => {
      if (!state.favorites.some((item) => item.id === action.payload.id)) {
        state.favorites.push(action.payload)
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload)
    },
  },
})

const persistedFavoritesReducer = persistReducer(persistConfig, favoritesSlice.reducer)

export const { addFavorite, removeFavorite } = favoritesSlice.actions

export default persistedFavoritesReducer
