import DefaultLayout from 'src/components/layouts/DefaultLayout';
import React from 'react';

const DashboardRoutes = () => {
  const LazyDashboard = React.lazy(async () => await import('src/pages/dashboard/DashboardPage'));

  const routes = {
    path: '/',
    Component: DefaultLayout,
    children: [
      {
        path: 'pos',
        element: <LazyDashboard />,
        isLazy: true,
        replace: true,
      },
    ],
  };

  return routes;
};
export default DashboardRoutes;
