import { useState } from 'react'
import Dropdown from 'src/components/lib/Dropdown'
import i18next from 'i18next'
import IconCaretDown from 'src/components/icon/IconCaretDown'
import VNFlag from 'src/assets/images/flags/VN.svg'
import ENFlag from 'src/assets/images/flags/EN.svg'
import useLayoutStore from 'src/stores/layoutStore'

const DropdownLang = ({ className, button, btnClassName, handleChange }) => {
  const themeConfig = useLayoutStore((state) => state)
  const isRtl = themeConfig.rtlClass === 'rtl' ? true : false

  const [flag, setFlag] = useState(themeConfig.locale)

  const setLocale = (flag) => {
    setFlag(flag)
    if (typeof handleChange === 'function') {
      handleChange(flag)
    }
  }

  return (
    <div className={className ?? 'dropdown ms-auto w-max'}>
      <Dropdown
        offset={[0, 8]}
        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
        btnClassName={
          btnClassName ??
          'flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black'
        }
        button={
          button ?? (
            <>
              <div>
                <img
                  src={flag.toUpperCase() === 'EN' ? ENFlag : VNFlag}
                  alt="flag"
                  className="h-5 w-5 rounded-full object-cover"
                />
              </div>
              <div className="text-base font-bold uppercase">{flag}</div>
              <span className="shrink-0">
                <IconCaretDown />
              </span>
            </>
          )
        }
      >
        <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
          {themeConfig.languageList.map((item) => {
            return (
              <li key={item.code}>
                <button
                  type="button"
                  className={`flex w-full hover:text-primary rounded-lg ${flag === item.code ? 'bg-primary/10 text-primary' : ''}`}
                  onClick={() => {
                    i18next.changeLanguage(item.code).catch((error) => {
                      console.log(error)
                    })
                    // setFlag(item.code);
                    setLocale(item.code)
                  }}
                >
                  <img
                    src={item.code.toUpperCase() === 'EN' ? ENFlag : VNFlag}
                    alt="flag"
                    className="w-5 h-5 object-cover rounded-full"
                  />
                  <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </Dropdown>
    </div>
  )
}

export default DropdownLang
