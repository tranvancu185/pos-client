/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import PerfectScrollbar from 'react-perfect-scrollbar'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { APP_COMPANY } from 'src/web.config'

import IconCaretsDown from '../../icon/IconCaretsDown'
import IconMenuDashboard from '../../icon/menu/IconMenuDashboard'
import IconMinus from '../../icon/IconMinus'
import IconMenuChat from '../../icon/menu/IconMenuChat'
import IconMenuNotes from '../../icon/menu/IconMenuNotes'
import InsideLogo from 'src/assets/images/logo.png'
import useLayoutStore from 'src/stores/layoutStore'

const Sidebar = () => {
  // const [currentMenu, setCurrentMenu] = useState('');

  const themeConfig = useLayoutStore((state) => state)
  const { semidark, toggleSidebar } = themeConfig

  const location = useLocation()
  const { t } = useTranslation()

  // const toggleMenu = (value) => {
  //     setCurrentMenu((oldValue) => {
  //         return oldValue === value ? '' : value;
  //     });
  // };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    )
    if (selector) {
      selector.classList.add('active')
      const ul = selector.closest('ul.sub-menu')
      if (ul) {
        let ele = ul.closest('li.menu').querySelectorAll('.nav-link') || []
        if (ele.length) {
          ele = ele[0]
          setTimeout(() => {
            ele.click()
          })
        }
      }
    }
  }, [])

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      toggleSidebar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <div className={`${semidark ? 'dark' : ''}`}>
      <nav
        className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
      >
        <div className="bg-white dark:bg-black h-full">
          <div className="flex justify-between items-center px-4 py-3">
            <NavLink to="/pos" className="main-logo flex items-center shrink-0">
              <img className="w-8 ml-[5px] flex-none" src={InsideLogo} alt="logo" />
              <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                {t(APP_COMPANY)}
              </span>
            </NavLink>

            <button
              type="button"
              className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
              onClick={() => toggleSidebar()}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
              <li className="menu nav-item">
                {/* <button type="button" className={`${currentMenu === 'pos' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('pos')}>
                                    <div className="flex items-center">
                                        <NavLink to="/pos" className="group">
                                            <div className="flex items-center">
                                                <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('POS')}</span>
                                            </div>
                                        </NavLink>
                                    </div>
                                </button> */}
                <NavLink to="/pos" className={`nav-link group w-full`}>
                  <div className="flex items-center">
                    <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t('POS')}
                    </span>
                  </div>
                </NavLink>
              </li>

              <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                <IconMinus className="w-4 h-5 flex-none hidden" />
                <span>{t('admin')}</span>
              </h2>

              <li className="nav-item">
                <ul>
                  <li className="nav-item">
                    <NavLink to="/admin/user/list" className="group">
                      <div className="flex items-center">
                        <IconMenuChat className="group-hover:!text-primary shrink-0" />
                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                          {t('user')}
                        </span>
                      </div>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/admin/table/list" className="group">
                      <div className="flex items-center">
                        <IconMenuChat className="group-hover:!text-primary shrink-0" />
                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                          {t('table')}
                        </span>
                      </div>
                    </NavLink>
                  </li>

                  {/* <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('menu')}>
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('menu')}</span>
                                            </div>

                                            <div className={currentMenu !== 'invoice' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'invoice' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/apps/invoice/list">{t('list')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/preview">{t('preview')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/add">{t('add')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/edit">{t('edit')}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li> */}

                  <li className="nav-item">
                    <NavLink to="/admin/menu/list" className="group">
                      <div className="flex items-center">
                        <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                          {t('menu')}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/receipt/history" className="group">
                      <div className="flex items-center">
                        <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                          {t('receipts')}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                  {/* <li className="nav-item">
                                        <NavLink to="/admin/menu" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('menu')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}
                </ul>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
