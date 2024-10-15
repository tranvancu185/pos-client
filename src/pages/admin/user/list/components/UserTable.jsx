import React from 'react'
import moment from 'moment'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import IconPencil from 'src/components/icon/IconPencil'
import Status from 'src/components/common/Status'
import IconTrashLines from 'src/components/icon/IconTrashLines'
import UserDefaultAVT from 'src/assets/images/avatar-default.svg'

import { DataTable } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
import { Role } from 'src/components/common/Role'
import { Link } from 'react-router-dom'
import { PAGE_SIZES } from 'src/constants/common'
import { WS_URL } from 'src/web.config'

export const UserTable = ({
  isLoading = false,
  dataSource = [],
  totalItems = 0,
  setPage,
  setPageSize,
  page,
  pageSize,
}) => {
  const { t } = useTranslation()

  const columns = [
    {
      accessor: 'id',
      title: 'ID',
      render: ({ user_id }) => <strong className="text-info">#{user_id}</strong>,
    },
    {
      accessor: 'user_display_name',
      title: <>{t('full_name')}</>,
      render: ({ user_display_name, user_avatar }) => (
        <div className="flex items-center gap-2">
          <img
            src={
              user_avatar && user_avatar !== '' ? `${WS_URL}/images/${user_avatar}` : UserDefaultAVT
            }
            className="w-9 h-9 rounded-full max-w-none"
            alt="user-profile"
          />
          <div className="font-semibold">{user_display_name}</div>
        </div>
      ),
    },
    {
      accessor: 'user_phone',
      title: <>{t('phone')}</>,
    },
    {
      accessor: 'user_role_id',
      title: <>{t('role')}</>,
      render: ({ user_role_id }) => <Role role_id={user_role_id} />,
    },
    {
      accessor: 'user_status',
      title: <>{t('status')}</>,
      render: ({ user_status }) => <Status status={user_status} />,
    },
    {
      accessor: 'created_at',
      title: <>{t('create_date')}</>,
      render: ({ created_at }) => (
        <div className="whitespace-nowrap">{moment(created_at * 1000).format('DD/MM/YYYY')}</div>
      ),
    },
    {
      accessor: 'action',
      title: 'Action',
      titleClassName: '!text-center',
      render: ({ user_id }) => (
        <ul className="flex items-center justify-center gap-2">
          <li>
            <Tippy content="Edit">
              <Link to={`/admin/user/${user_id}`}>
                <IconPencil className="text-success" />
              </Link>
            </Tippy>
          </li>
          <li>
            <Tippy content="Delete">
              <button key={user_id} type="button">
                <IconTrashLines className="text-danger" />
              </button>
            </Tippy>
          </li>
        </ul>
      ),
    },
  ]

  return (
    <div className="table-responsive mb-5">
      <DataTable
        loading={isLoading}
        noRecordsText={t('no_data')}
        highlightOnHover
        className="whitespace-nowrap table-hover"
        records={dataSource}
        columns={columns}
        totalRecords={totalItems}
        minHeight={200}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
        paginationText={({ from, to, totalRecords }) =>
          `Showing  ${from} to ${to} of ${totalRecords} entries`
        }
      />
    </div>
  )
}
