import DefaultLayout from 'src/components/layouts/DefaultLayout'
import React from 'react'

const ErrorRoutes = () => {
  const Lazy404 = React.lazy(async () => await import('src/pages/errors/Error404'))

  const Lazy500 = React.lazy(async () => await import('src/pages/errors/Error500'))

  const Lazy503 = React.lazy(async () => await import('src/pages/errors/Error503'))

  const LazyMaintenence = React.lazy(async () => await import('src/pages/errors/Maintenence'))

  const routes = {
    path: '/errors',
    Component: DefaultLayout,
    children: [
      {
        path: '404',
        element: <Lazy404 />,
        isLazy: true,
      },
      {
        path: '500',
        element: <Lazy500 />,
        isLazy: true,
      },
      {
        path: '503',
        element: <Lazy503 />,
        isLazy: true,
      },
      {
        path: 'maintenence',
        element: <LazyMaintenence />,
        isLazy: true,
      },
    ],
  }

  return routes
}
export default ErrorRoutes
