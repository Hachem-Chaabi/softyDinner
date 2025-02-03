export interface IMenuItem {
  _id?: string
  averageRating: number
  dishes: IDishes
  isReserved: boolean
  isRated: boolean
  date: string
}

interface IDishes {
  sideDish: ISideDish[]
  mainDish: IMainDish
}

export interface ISideDish {
  name: string
}

interface IMainDish {
  name: string
  image: string
}
