import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { APP_NAME } from 'src/web.config';
import themeConfig from 'src/theme.config';
import i18next from 'i18next';

const defaultState = {
  isDarkMode: false,
  mainLayout: 'app',
  theme: 'light',
  menu: 'vertical',
  layout: 'full',
  rtlClass: 'ltr',
  animation: 'animate__fadeIn',
  navbar: 'navbar-sticky',
  locale: 'vn',
  sidebar: false,
  pageTitle: '',
  languageList: [
    { code: 'en', name: 'English' },
    { code: 'vn', name: 'Vietnamese' },
  ],
  semidark: false,
};

const useLayoutStore = create()(
  devtools(
    persist(
      (set, get) => ({
        isDarkMode: false,
        mainLayout: 'app',
        theme: localStorage.getItem('theme') || themeConfig.theme,
        menu: localStorage.getItem('menu') || themeConfig.menu,
        layout: localStorage.getItem('layout') || themeConfig.layout,
        rtlClass: localStorage.getItem('rtlClass') || themeConfig.rtlClass,
        animation: localStorage.getItem('animation') || themeConfig.animation,
        navbar: localStorage.getItem('navbar') || themeConfig.navbar,
        locale: localStorage.getItem('i18nextLng') || themeConfig.locale,
        sidebar: localStorage.getItem('sidebar') || defaultState.sidebar,
        semidark: localStorage.getItem('semidark') || themeConfig.semidark,
        pageTitle: '',
        languageList: [
          { code: 'en', name: 'English' },
          { code: 'vn', name: 'Vietnamese' },
        ],
        toggleTheme(theme) {
          theme = theme || get().theme; // light | dark | system
          localStorage.setItem('theme', theme);
          const newTheme = theme;
          let newIsDarkMode = get().isDarkMode;
          if (theme === 'light') {
            newIsDarkMode = false;
          } else if (theme === 'dark') {
            newIsDarkMode = true;
          } else if (theme === 'system') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
              newIsDarkMode = true;
            } else {
              newIsDarkMode = false;
            }
          }
          if (newIsDarkMode) {
            document.querySelector('body')?.classList.add('dark');
          } else {
            document.querySelector('body')?.classList.remove('dark');
          }
          set((state) => ({
            ...state,
            isDarkMode: newIsDarkMode,
            theme: newTheme,
          }));
        },
        toggleMenu(menu) {
          menu = menu || get().menu; // vertical, collapsible-vertical, horizontal
          const newSidebar = false; // reset sidebar state
          localStorage.setItem('menu', menu);
          const newMenu = menu;
          set((state) => ({
            ...state,
            menu: newMenu,
            sidebar: newSidebar,
          }));
        },
        toggleLayout(layout) {
          layout = layout || get().layout; // full, boxed-layout
          localStorage.setItem('layout', layout);
          const newLayout = layout;
          set((state) => ({
            ...state,
            layout: newLayout,
          }));
        },
        toggleRTL(rtl) {
          rtl = rtl || get().rtlClass; // rtl, ltr
          localStorage.setItem('rtlClass', rtl);
          const newRtlClass = rtl;
          document.querySelector('html')?.setAttribute('dir', newRtlClass.rtlClass || 'ltr');
          set((state) => ({
            ...state,
            rtlClass: newRtlClass,
          }));
        },
        toggleAnimation(animation) {
          animation = animation || get().animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
          animation = animation?.trim();
          localStorage.setItem('animation', animation);
          const newAnimation = animation;
          set((state) => ({
            ...state,
            animation: newAnimation,
          }));
        },
        toggleNavbar(navbar) {
          navbar = navbar || get().navbar; // navbar-sticky, navbar-floating, navbar-static
          localStorage.setItem('navbar', navbar);
          const newNavbar = navbar;
          set((state) => ({
            ...state,
            navbar: newNavbar,
          }));
        },
        toggleSemidark(semidark) {
          const newSemidark = semidark === true || semidark === 'true' ? true : false;
          localStorage.setItem('semidark', newSemidark ? 'true' : 'false');
          set((state) => ({
            ...state,
            semidark: newSemidark,
          }));
        },
        toggleLocale(locale) {
          locale = locale || get().locale;
          i18next.changeLanguage(locale).catch((error) => {
            console.log(error);
          });
          const newLocale = locale;
          set((state) => ({
            ...state,
            locale: newLocale,
          }));
        },
        toggleSidebar() {
          const newSidebar = !get().sidebar;
          set((state) => ({
            ...state,
            sidebar: newSidebar,
          }));
        },
        handleToggleSidebar(sidebar) {
          const newSidebar = sidebar;
          set((state) => ({
            ...state,
            sidebar: newSidebar,
          }));
        },
        setPageTitle(title) {
          document.title = `${title} | ${APP_NAME}`;
          set((state) => ({
            ...state,
            pageTitle: title,
          }));
        },
      }),
      {
        name: 'theme_config',
      }
    ),
    { enabled: true }
  )
);

export default useLayoutStore;
