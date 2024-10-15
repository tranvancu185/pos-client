import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserById } from 'src/apis/user/user'
import { useTranslation } from 'react-i18next'

import IconPhone from 'src/components/icon/IconPhone'
import useLayoutStore from 'src/stores/layoutStore'
import IconHome from 'src/components/icon/IconHome'
import IconDollarSignCircle from 'src/components/icon/IconDollarSignCircle'
import IconUser from 'src/components/icon/IconUser'
import HomeTab from './components/HomeTab'
import Loading from 'src/components/common/Loading'

const TableDetailPage = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const themeConfig = useLayoutStore((state) => state)
  const { setPageTitle } = themeConfig

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    setPageTitle('User Detail - ' + id)
  }, [setPageTitle, id])

  const [tabs, setTabs] = useState('home')

  const toggleTabs = (name) => {
    setTabs(name)
  }

  useEffect(() => {
    setLoading(true)
    if (id) {
      fetchUsers({
        id,
        successCallBack: (response) => {
          setData(response.data)
          console.log(response.data)
        },
        errorCallBack: (response) => {
          console.error('Error:', response)
        },
      })
    }
  }, [id])

  const fetchUsers = async ({ id, successCallBack = false, errorCallBack = false }) => {
    try {
      const response = await getUserById({ id })
      if (response.status === 200) {
        if (typeof successCallBack === 'function') {
          successCallBack(response)
        }
      } else {
        if (typeof errorCallBack === 'function') {
          errorCallBack(response)
        }
      }
    } catch (error) {
      console.error('Error:', error)
      // TODO: handle error here
    }
    setLoading(false)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/pos" className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
            <IconHome className="w-4 h-4" />
          </Link>
        </li>
        <li>
          <Link
            to="/admin/user/list"
            className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2"
          >
            {t('user_management')}
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>{t('profile')}</span>
        </li>
      </ul>
      <div className="pt-5">
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">{t('user_details')}</h5>
        </div>
        <div>
          <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
            <li className="inline-block">
              <button
                onClick={() => toggleTabs('home')}
                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
              >
                <IconHome />
                {t('home')}
              </button>
            </li>
            <li className="inline-block">
              <button
                onClick={() => toggleTabs('payment-details')}
                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'payment-details' ? '!border-primary text-primary' : ''}`}
              >
                <IconDollarSignCircle />
                {t('payment_details')}
              </button>
            </li>
            <li className="inline-block">
              <button
                onClick={() => toggleTabs('preferences')}
                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'preferences' ? '!border-primary text-primary' : ''}`}
              >
                <IconUser className="w-5 h-5" />
                {t('preferences')}
              </button>
            </li>
            <li className="inline-block">
              <button
                onClick={() => toggleTabs('danger-zone')}
                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'danger-zone' ? '!border-primary text-primary' : ''}`}
              >
                <IconPhone />
                {t('danger_zone')}
              </button>
            </li>
          </ul>
        </div>
        {tabs === 'home' && <HomeTab profile={data} />}
      </div>
    </div>
  )
}

export default TableDetailPage
