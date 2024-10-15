import DefaultLayout from 'src/components/layouts/DefaultLayout'
import React from 'react'

const SettingRoutes = () => {
  const LazySetting = React.lazy(async () => await import('src/pages/settings/SettingPage'))

  const routes = {
    path: '/setting',
    Component: DefaultLayout,
    children: [
      {
        element: <LazySetting />,
        isLazy: true,
      },
    ],
  }

  return routes
}
export default SettingRoutes
