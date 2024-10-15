import React from 'react';
import IconUser from 'src/components/icon/IconUser';
import IconLockDots from 'src/components/icon/IconLockDots';

import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
const LoginForm = ({ submitForm }) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5 dark:text-white">
      <div>
        <label htmlFor="Username">{t('username')}</label>
        <div className="relative text-white-dark">
          <input
            {...register('username')}
            id="username"
            type="text"
            placeholder="Enter Username"
            className="form-input ps-10 placeholder:text-white-dark"
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconUser fill={true} />
          </span>
        </div>
      </div>
      <div>
        <label htmlFor="Password">{t('password')}</label>
        <div className="relative text-white-dark">
          <input
            {...register('password')}
            id="Password"
            type="password"
            placeholder="Enter Password"
            className="form-input ps-10 placeholder:text-white-dark"
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
        </div>
      </div>
      <div></div>
      <button
        type="submit"
        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
        {t('sign_in')}
      </button>
    </form>
  );
};

export default LoginForm;
