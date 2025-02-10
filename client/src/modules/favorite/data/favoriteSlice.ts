import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FavoritesState, Item } from './types'

const initialState: FavoritesState = {
  userFavorites: {},
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<{ userId: string; item: Item }>) => {
      const { userId, item } = action.payload
      if (!state.userFavorites[userId]) {
        state.userFavorites[userId] = []
      }
      if (!state.userFavorites[userId].some((favItem) => favItem.id === item.id)) {
        state.userFavorites[userId].push(item)
      }
    },
    removeFavorite: (state, action: PayloadAction<{ userId: string; itemId: string }>) => {
      const { userId, itemId } = action.payload
      if (state.userFavorites[userId]) {
        state.userFavorites[userId] = state.userFavorites[userId].filter((item) => item.id !== itemId)
      }
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions

export default favoritesSlice.reducer
