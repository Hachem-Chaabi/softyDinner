export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  roles: any
  points: number
  identifier: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface validateEmailPayload {
  email: string
}

export interface validateCodePayload {
  email: string
  code: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  phone?: string | null
  age?: number | null
  birthDate?: string | null
}
