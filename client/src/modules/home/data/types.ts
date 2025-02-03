export interface IDish {
  _id?: string
  image: string
  averageRating: string
  name: string
  isFavorite?: boolean
}

export interface DataType {
  key: string
  name: string
  identifier: string
  points: number
  date: string
  time: string
}

export interface IDonor {
  _id: string
}

export interface IRecipient {
  name: string
  identifier: string
}

export interface IDonation {
  _id: string
  createdAt: string
  donor: IDonor
  recipient: IRecipient
  points: number
}

export interface IDonationHistory {
  id?: string
}
