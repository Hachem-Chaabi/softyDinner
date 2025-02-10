export interface IMenuItem {
  _id?: string
  dishes: IDishes
  isReserved?: boolean
  isRated: boolean
  date: string
  reservationId: string | undefined
  reservations?: IReservations[]
}

interface IReservations {
  _id: string
}

interface IDishes {
  sideDish: ISideDish[]
  mainDish: IMainDish
}

export interface ISideDish {
  name: string
}

interface IMainDish {
  _id: string
  averageRating: string
  name: string
  image: string
}
