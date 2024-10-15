import { useState, useEffect } from 'react'
import { SearchForm } from './components/SearchForm'
import { Link } from 'react-router-dom'
import { UserTable } from './components/UserTable'
import { PAGE_SIZES } from 'src/constants/common'
import { getListUser } from 'src/apis/user/user'
import { useTranslation } from 'react-i18next'

import useLayoutStore from 'src/stores/layoutStore'
import Loading from 'src/components/common/Loading'
import IconHome from 'src/components/icon/IconHome'

const TableListPage = () => {
  const { t } = useTranslation()
  const themeConfig = useLayoutStore((state) => state)
  const { setPageTitle } = themeConfig

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [totalItems, setTotalItems] = useState(0)
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(0)

  useEffect(() => {
    setPageTitle('User List')
  }, [setPageTitle])

  useEffect(() => {
    setLoading(1)
    fetchUsers({
      params: {
        page_size: pageSize,
        page: page,
      },
      successCallBack: (response) => {
        setDataSource(
          response.data.rows.map((item, index) => ({
            ...item,
            key: item.user_id,
          }))
        )
        setTotalItems(response.data.total)
      },
      errorCallBack: (response) => {
        console.error('Error:', response)
      },
    })
  }, [pageSize, page])

  const fetchUsers = async ({ params = {}, successCallBack = false, errorCallBack = false }) => {
    try {
      const response = await getListUser({ params })
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
    setLoading(0)
  }

  const handleSearchForm = async (values) => {
    setLoading(1)
    const bodyRequest = {
      page_size: pageSize,
      page: page,
      phone: values.code,
      name: values.code,
      status: values.status?.value,
    }
    await fetchUsers({
      params: bodyRequest,
      successCallBack: (response) => {
        setDataSource(response.data.rows)
        setTotalItems(response.data.total)
      },
      errorCallBack: (response) => {
        console.error('Error:', response)
      },
    })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/pos" className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
            <IconHome className="w-4 h-4" />
          </Link>
        </li>
        <li>
          <span className="text-default hover:underline">{t('user_management')}</span>
        </li>
      </ul>
      <div className="px-0 border-white-light dark:border-[#1b2e4b]">
        <h5 className="font-semibold text-lg dark:text-white-light mb-5">{t('user_management')}</h5>

        <div className="panel mx-4 gap-4 my-4">
          <SearchForm handleSearchForm={handleSearchForm} isLoading={loading} />
        </div>
        <div className="panel mx-4 gap-4 my-4">
          <UserTable
            isLoading={loading}
            dataSource={dataSource}
            totalItems={totalItems}
            setPage={setPage}
            setPageSize={setPageSize}
            page={page}
            pageSize={pageSize}
          />
        </div>
      </div>
    </>
  )
}

export default TableListPage
