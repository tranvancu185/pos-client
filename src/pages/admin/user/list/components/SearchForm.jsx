import React from 'react';
import Select from 'react-select';
import IconPlus from 'src/components/icon/IconPlus';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { USER_STATUS_OPTIONS } from 'src/constants/status';
import { useForm, Controller } from 'react-hook-form';

export const SearchForm = ({ handleSearchForm }) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleSearchForm)}>
          <div className="grid grid-cols-4 gap-x-4 mb-4.5">
            <input
              {...register('code')}
              type="text"
              placeholder="Enter code, id, phone"
              className="form-input"
            />
            <input
              {...register('name')}
              type="text"
              placeholder="Enter name"
              className="form-input"
            />
            {/* <Select name="status" options={USER_STATUS_OPTIONS} placeholder="Select status" className="z-10" /> */}
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="z-10"
                  placeholder="Select status"
                  options={USER_STATUS_OPTIONS.map((e) => {
                    return {
                      value: e.value,
                      label: t(e.label),
                    };
                  })}
                />
              )}
            />
            <div>
              <button type="submit" className="btn btn-primary">
                {t('search')}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="grid grid-cols-2 gap-x-4 w-[40%]">
              <Link to="/apps/table/add" className="btn btn-primary gap-2">
                <IconPlus />
                {t('add_new')}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
