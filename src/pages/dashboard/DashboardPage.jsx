import React from 'react'
import { useEffect } from 'react'
import useLayoutStore from 'src/stores/layoutStore'

const DashboardPage = () => {
  const themeConfig = useLayoutStore((state) => state)
  const { setPageTitle, handleToggleSidebar } = themeConfig

  useEffect(() => {
    setPageTitle('POS Dashboard')
    handleToggleSidebar(true)
  }, [handleToggleSidebar, setPageTitle])

  return <div>Dashboard</div>
}

export default DashboardPage
