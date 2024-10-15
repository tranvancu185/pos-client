import React, { useState } from 'react';
import IconCreditCard from 'src/components/icon/IconCreditCard';
import IconPencilPaper from 'src/components/icon/IconPencilPaper';
import IconPhone from 'src/components/icon/IconPhone';
import IconShoppingBag from 'src/components/icon/IconShoppingBag';
import IconTag from 'src/components/icon/IconTag';
import ModalEdit from './ModalEdit';
import UserDefaultAVT from 'src/assets/images/avatar-default.svg';

import { WS_URL } from 'src/web.config';
import { useTranslation } from 'react-i18next';

const HomeTab = ({ profile }) => {
  const { t } = useTranslation();
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
      <div className="panel">
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">{t('profile')}</h5>
          <button
            onClick={() => setOpenEditModal(true)}
            className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
            <IconPencilPaper />
          </button>
        </div>
        <div className="mb-5">
          <div className="flex flex-col justify-center items-center">
            <img
              src={
                profile?.user_avatar ? `${WS_URL}/images/${profile?.user_avatar}` : UserDefaultAVT
              }
              alt="img"
              className="w-24 h-24 rounded-full object-cover  mb-5"
            />
            <p className="font-semibold text-primary text-xl">{profile?.user_display_name}</p>
          </div>
          <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
            <li className="flex items-center gap-2">
              <IconPhone />
              <span className="whitespace-nowrap" dir="ltr">
                {profile?.user_phone}
              </span>
            </li>
          </ul>
          <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
            <li className="flex items-center gap-2">
              <IconPhone />
              <span className="whitespace-nowrap" dir="ltr">
                {profile?.user_phone}
              </span>
            </li>
          </ul>
          <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
            <li className="flex items-center gap-2">
              <IconPhone />
              <span className="whitespace-nowrap" dir="ltr">
                {profile?.user_phone}
              </span>
            </li>
          </ul>
          <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
            <li className="flex items-center gap-2">
              <IconPhone />
              <span className="whitespace-nowrap" dir="ltr">
                {profile?.user_phone}
              </span>
            </li>
          </ul>
          <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
            <li className="flex items-center gap-2">
              <IconPhone />
              <span className="whitespace-nowrap" dir="ltr">
                {profile?.user_phone}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="panel lg:col-span-2 xl:col-span-3">
        <div className="mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Summary</h5>
        </div>
        <div className="space-y-4">
          <div className="border border-[#ebedf2] rounded dark:bg-[#1b2e4b] dark:border-0">
            <div className="flex items-center justify-between p-4 py-2">
              <div className="grid place-content-center w-9 h-9 rounded-md bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light">
                <IconShoppingBag />
              </div>
              <div className="ltr:ml-4 rtl:mr-4 flex  items-start justify-between flex-auto font-semibold">
                <h6 className="text-white-dark text-[13px] dark:text-white-dark">
                  Income
                  <span className="block text-base text-[#515365] dark:text-white-light">
                    $92,600
                  </span>
                </h6>
                <p className="ltr:ml-auto rtl:mr-auto text-secondary">90%</p>
              </div>
            </div>
          </div>
          <div className="border border-[#ebedf2] rounded dark:bg-[#1b2e4b] dark:border-0">
            <div className="flex items-center justify-between p-4 py-2">
              <div className="grid place-content-center w-9 h-9 rounded-md bg-info-light dark:bg-info text-info dark:text-info-light">
                <IconTag />
              </div>
              <div className="ltr:ml-4 rtl:mr-4 flex items-start justify-between flex-auto font-semibold">
                <h6 className="text-white-dark text-[13px] dark:text-white-dark">
                  Profit
                  <span className="block text-base text-[#515365] dark:text-white-light">
                    $37,515
                  </span>
                </h6>
                <p className="ltr:ml-auto rtl:mr-auto text-info">65%</p>
              </div>
            </div>
          </div>
          <div className="border border-[#ebedf2] rounded dark:bg-[#1b2e4b] dark:border-0">
            <div className="flex items-center justify-between p-4 py-2">
              <div className="grid place-content-center w-9 h-9 rounded-md bg-warning-light dark:bg-warning text-warning dark:text-warning-light">
                <IconCreditCard />
              </div>
              <div className="ltr:ml-4 rtl:mr-4 flex items-start justify-between flex-auto font-semibold">
                <h6 className="text-white-dark text-[13px] dark:text-white-dark">
                  Expenses
                  <span className="block text-base text-[#515365] dark:text-white-light">
                    $55,085
                  </span>
                </h6>
                <p className="ltr:ml-auto rtl:mr-auto text-warning">80%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalEdit
        profile={profile}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
    </div>
  );
};

export default HomeTab;
