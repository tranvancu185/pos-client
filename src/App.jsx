import React, { useEffect } from 'react';
import useLayoutStore from './stores/layoutStore';

function App({ children }) {
  const themeConfig = useLayoutStore((state) => state);
  const {
    toggleTheme,
    toggleMenu,
    toggleLayout,
    toggleRTL,
    toggleAnimation,
    toggleNavbar,
    toggleLocale,
    toggleSemidark,
  } = themeConfig;

  useEffect(() => {
    toggleTheme(localStorage.getItem('theme') || themeConfig.theme);
    toggleMenu(localStorage.getItem('menu') || themeConfig.menu);
    toggleLayout(localStorage.getItem('layout') || themeConfig.layout);
    toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass);
    toggleAnimation(localStorage.getItem('animation') || themeConfig.animation);
    toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar);
    toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
    toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark);
  }, []);

  return (
    <div
      className={`${(themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
        themeConfig.rtlClass
      } main-section antialiased relative font-nunito text-sm font-normal`}>
      {children}
    </div>
  );
}

export default App;
