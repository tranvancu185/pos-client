/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Dropdown from '../../lib/Dropdown'
import IconMenu from '../../icon/IconMenu'
import IconSun from '../../icon/IconSun'
import IconMoon from '../../icon/IconMoon'
import IconLaptop from '../../icon/IconLaptop'
import IconLockDots from '../../icon/IconLockDots'
import IconLogout from '../../icon/IconLogout'
import IconMenuDashboard from '../../icon/menu/IconMenuDashboard'
import IconCaretDown from '../../icon/IconCaretDown'
import IconMenuApps from '../../icon/menu/IconMenuApps'
import DropdownLang from '../../common/DropdownLang'
import VNFlag from 'src/assets/images/flags/VN.svg'
import ENFlag from 'src/assets/images/flags/EN.svg'
import UserDefaultAVT from 'src/assets/images/avatar-default.svg'
import InsideLogo from 'src/assets/images/logo.png'
import useLayoutStore from 'src/stores/layoutStore'
import useAuthStore from 'src/stores/authStore'
import { WS_URL } from 'src/web.config'
import { MAPPED_ROLE_COLORS } from 'src/constants/role'
import IconUser from 'src/components/icon/IconUser'

const Header = () => {
  const location = useLocation()
  const themeConfig = useLayoutStore((state) => state)
  const profile = useAuthStore((state) => state.profile)

  const { isRtl, toggleSidebar, toggleTheme } = themeConfig

  const [flag, setFlag] = useState(themeConfig.locale)

  const { t } = useTranslation()

  useEffect(() => {
    const selector = document.querySelector(
      'ul.horizontal-menu a[href="' + window.location.pathname + '"]'
    )
    if (selector) {
      selector.classList.add('active')
      const all = document.querySelectorAll('ul.horizontal-menu .nav-link.active')
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active')
      }
      const ul = selector.closest('ul.sub-menu')
      if (ul) {
        let ele = ul.closest('li.menu').querySelectorAll('.nav-link')
        if (ele) {
          ele = ele[0]
          setTimeout(() => {
            ele?.classList.add('active')
          })
        }
      }
    }
  }, [location])

  // if (!profile) {
  //     return (<Navigate to="/auth/login" />);
  // }

  return (
    <header
      className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}
    >
      <div className="shadow-sm">
        <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
            <Link to="/" className="main-logo flex items-center shrink-0">
              <img className="w-8 ltr:-ml-1 rtl:-mr-1 inline" src={InsideLogo} alt="logo" />
              <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300">
                POS
              </span>
            </Link>
            <button
              type="button"
              className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
              onClick={() => {
                toggleSidebar()
              }}
            >
              <IconMenu className="w-5 h-5" />
            </button>
          </div>
          <div className="ltr:mr-2 rtl:ml-2 hidden sm:block"></div>
          <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
            <div>
              {themeConfig.theme === 'light' ? (
                <button
                  className={`${
                    themeConfig.theme === 'light' &&
                    'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => {
                    toggleTheme('dark')
                  }}
                >
                  <IconSun />
                </button>
              ) : (
                ''
              )}
              {themeConfig.theme === 'dark' && (
                <button
                  className={`${
                    themeConfig.theme === 'dark' &&
                    'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => {
                    toggleTheme('system')
                  }}
                >
                  <IconMoon />
                </button>
              )}
              {themeConfig.theme === 'system' && (
                <button
                  className={`${
                    themeConfig.theme === 'system' &&
                    'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => {
                    toggleTheme('light')
                  }}
                >
                  <IconLaptop />
                </button>
              )}
            </div>
            <div className="dropdown shrink-0">
              <DropdownLang
                className="dropdown shrink-0"
                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                  <img
                    className="w-5 h-5 object-cover rounded-full"
                    src={flag.toUpperCase() === 'EN' ? ENFlag : VNFlag}
                    alt="flag"
                  />
                }
                handleChange={setFlag}
              />
            </div>
            <div className="dropdown shrink-0 flex">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative group block"
                button={
                  <img
                    className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    src={
                      profile?.user_avatar
                        ? `${WS_URL}/images/${profile?.user_avatar}`
                        : UserDefaultAVT
                    }
                    alt="userProfile"
                  />
                }
              >
                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img
                        className="rounded-md w-10 h-10 object-cover"
                        src={
                          profile?.user_avatar
                            ? `${WS_URL}/images/${profile?.user_avatar}`
                            : UserDefaultAVT
                        }
                        alt="userProfile"
                      />
                      <div className="ltr:pl-4 rtl:pr-4 truncate">
                        <h4 className="text-base">
                          {profile?.user_display_name}
                          <span
                            className={`text-xs bg-${profile?.user_role_id ? MAPPED_ROLE_COLORS[profile?.user_role_id].color : 'default'}-light rounded text-${profile?.user_role_id ? MAPPED_ROLE_COLORS[profile?.user_role_id].color : 'default'} px-1 ltr:ml-2 rtl:ml-2`}
                          >
                            {profile?.user_role_id
                              ? MAPPED_ROLE_COLORS[profile?.user_role_id]?.name
                              : 'Guest'}
                          </span>
                        </h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                        >
                          {profile?.user_phone}
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <Link to={`/admin/user/${profile?.user_id}`} className="dark:hover:text-white">
                      <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2  shrink-0" />
                      {t('profile')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/boxed-lockscreen" className="dark:hover:text-white">
                      <IconLockDots className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                      {t('lock_screen')}
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <Link to="/auth/logout" className="text-danger !py-3">
                      <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                      {t('logout')}
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* horizontal menu */}
        <ul className="horizontal-menu hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-black text-black dark:text-white-dark">
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuDashboard className="shrink-0" />
                <span className="px-1">{t('POS')}</span>
              </div>
            </button>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuApps className="shrink-0" />
                <span className="px-1">{t('admin')}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <NavLink to="/admin/user/list">{t('user')}</NavLink>
              </li>
              <li>
                <NavLink to="/admin/table/list">{t('table')}</NavLink>
              </li>
              <li>
                <NavLink to="/admin/menu/list">{t('menu')}</NavLink>
              </li>
              <li>
                <NavLink to="/admin/receipt/history">{t('receipts')}</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
