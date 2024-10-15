import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

import IconX from 'src/components/icon/IconX'

const ModalEdit = ({ profile, openEditModal, setOpenEditModal }) => {
  const { t } = useTranslation()
  return (
    <div>
      <Transition appear show={openEditModal} as={Fragment}>
        <Dialog as="div" open={openEditModal} onClose={() => setOpenEditModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 z-[999] bg-[black]/60">
            <div className="flex min-h-screen items-start justify-center px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="panel my-8 w-full max-w-5xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                  <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">{t('edit_user')}</h5>
                    <button
                      onClick={() => setOpenEditModal(false)}
                      type="button"
                      className="text-white-dark hover:text-dark"
                    >
                      <IconX />
                    </button>
                  </div>
                  <div className="p-5">
                    <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                      <h6 className="text-lg font-bold mb-5">{t('general_information')}</h6>
                      <div className="flex flex-col sm:flex-row">
                        <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                          <img
                            src={profile?.user_avatar ?? ''}
                            alt="img"
                            className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto"
                          />
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="name">{t('full_name')}</label>
                            <input
                              id="name"
                              type="text"
                              placeholder="Jimmy Turner"
                              className="form-input"
                            />
                          </div>
                          <div>
                            <label htmlFor="profession">Profession</label>
                            <input
                              id="profession"
                              type="text"
                              placeholder="Web Developer"
                              className="form-input"
                            />
                          </div>
                          <div>
                            <label htmlFor="country">Country</label>
                            <select
                              defaultValue="United States"
                              id="country"
                              className="form-select text-white-dark"
                            >
                              <option value="All Countries">All Countries</option>
                              <option value="United States">United States</option>
                              <option value="India">India</option>
                              <option value="Japan">Japan</option>
                              <option value="China">China</option>
                              <option value="Brazil">Brazil</option>
                              <option value="Norway">Norway</option>
                              <option value="Canada">Canada</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="address">Address</label>
                            <input
                              id="address"
                              type="text"
                              placeholder="New York"
                              className="form-input"
                            />
                          </div>
                          <div>
                            <label htmlFor="location">Location</label>
                            <input
                              id="location"
                              type="text"
                              placeholder="Location"
                              className="form-input"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone">{t('phone')}</label>
                            <input
                              id="phone"
                              type="text"
                              placeholder="+1 (530) 555-12121"
                              className="form-input"
                            />
                          </div>
                          <div className="sm:col-span-2 mt-3">
                            <button type="button" className="btn btn-primary">
                              {t('save')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="mt-8 flex items-center justify-end">
                      <button
                        onClick={() => setOpenEditModal(false)}
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        {t('discard')}
                      </button>
                      <button
                        onClick={() => setOpenEditModal(false)}
                        type="button"
                        className="btn btn-primary ltr:ml-4 rtl:mr-4"
                      >
                        {t('save')}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default ModalEdit
