import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

// i18n
import './i18n'
// confg css, scss, tailwind
import './tailwind.css'
import './styles/css/index.css'
import './styles/scss/index.scss'
import 'react-perfect-scrollbar/dist/css/styles.css'

import Loader from 'src/components/common/Loader'
import router from './router/index'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
)
