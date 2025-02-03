/* eslint-disable @typescript-eslint/no-explicit-any */
import GuestLayout from '../../shared/layout/GuestLayout/GuestLayout'
import { Navigate, RouteProps } from 'react-router-dom'
import { Fragment, lazy } from 'react'
import { PATH } from './paths'
import GuestGuard from '../../shared/guards/GuestGuard'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  {
    exact: true,
    path: PATH.ROOT,
    guard: GuestGuard,
    component: () => <Navigate to="/login" />,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: PATH.LOGIN,
    component: lazy(() => import('../features/Login/Login')),
    layout: GuestLayout,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: PATH.RESET,
    component: lazy(() => import('../features/ResetPassword/ResetPassword')),
    layout: GuestLayout,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: PATH.VERIFY,
    component: lazy(() => import('../features/VerifyEmail/VerifyEmail')),
    layout: GuestLayout,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: PATH.CREATE,
    component: lazy(() => import('../features/CreateNewPassword/CreateNewPassword')),
    layout: GuestLayout,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: PATH.REGISTER,
    component: lazy(() => import('../features/Register/Register')),
    layout: GuestLayout,
  },
]

export default routes
