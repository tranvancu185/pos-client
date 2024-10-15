import DefaultLayout from 'src/components/layouts/DefaultLayout';
import React from 'react';

const AdminRoutes = () => {
  const LazyReceiptHistory = React.lazy(
    async () => await import('src/pages/admin/receipt/ReceiptHistoryPage'),
  );

  const LazyReceiptDetail = React.lazy(
    async () => await import('src/pages/admin/receipt/ReceiptDetailPage'),
  );

  const LazyMenu = React.lazy(async () => await import('src/pages/admin/menu/MenuListPage'));

  const LazyMenuDetail = React.lazy(
    async () => await import('src/pages/admin/menu/MenuDetailPage'),
  );

  const LazyTable = React.lazy(
    async () => await import('src/pages/admin/table/list/TableListPage'),
  );

  const LazyTableDetail = React.lazy(
    async () => await import('src/pages/admin/table/detail/TableDetailPage'),
  );

  // const LazyReconcileHistory = React.lazy(async () => await import('src/pages/admin/reconcile/ReconcileHistory.page'));

  // const LazyReconcileDetail = React.lazy(async () => await import('src/pages/admin/reconcile/ReconcileDetail.page'));

  const LazyUserList = React.lazy(
    async () => await import('src/pages/admin/user/list/UserListPage'),
  );

  const LazyUserDetail = React.lazy(
    async () => await import('src/pages/admin/user/detail/UserDetailPage'),
  );

  const routes = {
    path: '/admin',
    Component: DefaultLayout,
    children: [
      {
        path: 'receipt',
        children: [
          {
            path: 'history',
            element: <LazyReceiptHistory />,
            isLazy: true,
          },
          {
            path: ':id',
            element: <LazyReceiptDetail />,
            isLazy: true,
          },
        ],
      },
      // {
      //     path: 'reconcile',
      //     children: [
      //         {
      //             path: 'history',
      //             element: <LazyReconcileHistory />,
      //             isLazy: true,
      //         },
      //         {
      //             path: ':id',
      //             element: <LazyReconcileDetail />,
      //             isLazy: true,
      //         }
      //     ]
      // },
      {
        path: 'menu',
        children: [
          {
            path: 'list',
            element: <LazyMenu />,
            isLazy: true,
          },
          {
            path: ':id',
            element: <LazyMenuDetail />,
            isLazy: true,
          },
        ],
      },
      {
        path: 'table',
        children: [
          {
            path: 'list',
            element: <LazyTable />,
            isLazy: true,
          },
          {
            path: ':id',
            element: <LazyTableDetail />,
            isLazy: true,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'list',
            element: <LazyUserList />,
            isLazy: true,
          },
          {
            path: ':id',
            element: <LazyUserDetail />,
            isLazy: true,
          },
        ],
      },
    ],
  };

  return routes;
};
export default AdminRoutes;
