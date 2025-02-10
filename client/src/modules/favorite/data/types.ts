export interface Item {
  id: string
  name: string
  image: string
  averageRating: string
}

// export interface FavoritesState {
//   favorites: Item[]
// }
export interface FavoritesState {
  userFavorites: Record<string, Item[]> // Keyed by user ID
}

