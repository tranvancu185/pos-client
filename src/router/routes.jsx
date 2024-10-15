import React from 'react'
import { Navigate } from 'react-router-dom'
import AuthRoutes from 'src/pages/auth/routes'
import AdminRoutes from 'src/pages/admin/routes'
import ReceiptDasboardRoutes from 'src/pages/dashboard/routes'
import SettingRoutes from 'src/pages/settings/routes'
import Loader from 'src/components/common/Loader'
import ErrorRoutes from 'src/pages/errors/routes'

export const ROUTER_DASHBOARD = '/pos'

const routes = [
  {
    path: '/',
    element: <Navigate to={ROUTER_DASHBOARD} replace />,
  },
  AuthRoutes(),
  ReceiptDasboardRoutes(),
  AdminRoutes(),
  SettingRoutes(),
  ErrorRoutes(),
  {
    path: '*',
    element: <Navigate to={'/errors/404'} replace />,
  },
]

const getRoute = ({ index, path, Component, element, children, isLazy }) => {
  let newElement = element
  if (isLazy) {
    newElement = <React.Suspense fallback={<Loader />}>{element}</React.Suspense>
  }
  return {
    path,
    Component,
    element: newElement,
    ...(children
      ? {
          children: children.map((child) => getRoute(child)),
        }
      : { index }),
  }
}

export const getRoutes = () => {
  return routes.map((route) => getRoute(route))
}

export default routes
