import React from 'react'
import BlankLayout from 'src/components/layouts/BlankLayout'
import LoginPage from 'src/pages/auth/login/LoginPage'
import LogoutPage from './logout/LogoutPage'

const AuthRoutes = () => {
  // const LazyLogin = React.lazy(async () => await import('src/pages/auth/login/LoginPage'));

  const routes = {
    path: '/auth',
    Component: BlankLayout,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
        replace: true,
      },
      {
        path: 'logout',
        element: <LogoutPage />,
        replace: true,
      },
    ],
  }

  return routes
}
export default AuthRoutes
