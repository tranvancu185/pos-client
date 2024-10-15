import React from 'react'
import Select from 'react-select'
import IconPlus from 'src/components/icon/IconPlus'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { STATUS_OPTIONS } from 'src/constants/status'
import IconTrashLines from 'src/components/icon/IconTrashLines'
export const SearchForm = ({ handleSearchForm, deleteRow }) => {
  const { t } = useTranslation()

  return (
    <form onSubmit={handleSearchForm}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-2">
        <input name="code" type="text" placeholder="Enter code, id" className="form-input" />
        <input name="name" type="text" placeholder="Enter name" className="form-input" />
        {/* <Select name="status" options={STATUS_OPTIONS} placeholder="Select status" className="z-10" /> */}
      </div>
      <div className="">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex items-start justify-start lg:justify-start  flex-wrap">
            <button type="button" className="btn btn-primary">
              Search
            </button>
          </div>
          <div className="flex justify-end lg:justify-end">
            <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
              <IconTrashLines />
              {t('delete')}
            </button>
            <Link to="/apps/table/add" className="btn btn-primary gap-2">
              <IconPlus />
              {t('add_new')}
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}
