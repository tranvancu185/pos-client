import { useEffect, useState } from 'react';
import App from 'src/App';
import Footer from './components/Footer';
import Header from './components/Header';
import Setting from './components/Setting';
import Sidebar from './components/Sidebar';
import Portals from 'src/components/Portals';
import { Outlet } from 'react-router-dom';
import Loader from '../common/Loader';
import useLayoutStore from 'src/stores/layoutStore';
import { MantineProvider } from '@mantine/core';
import ProcessingPage from 'src/hooks/ProcessingPage';

const DefaultLayout = () => {
  const themeConfig = useLayoutStore((state) => state);

  const { toggleSidebar } = themeConfig;

  const [showLoader, setShowLoader] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);

  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const onScrollHandler = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);

    const screenLoader = document.getElementsByClassName('screen_loader');
    if (screenLoader?.length) {
      screenLoader[0].classList.add('animate__fadeOut');
      setTimeout(() => {
        setShowLoader(false);
      }, 200);
    }

    return () => {
      window.removeEventListener('onscroll', onScrollHandler);
    };
  }, []);

  return (
    <>
      <App>
        <ProcessingPage />
        {/* BEGIN MAIN CONTAINER */}
        <div className="relative">
          {/* sidebar menu overlay */}
          <div
            className={`${(!themeConfig.sidebar && 'hidden') || ''} fixed inset-0 bg-[black]/60 z-50 lg:hidden`}
            onClick={() => toggleSidebar()}
          ></div>
          {/* screen loader */}
          {showLoader && <Loader />}
          <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-50">
            {showTopButton && (
              <button
                type="button"
                className="btn btn-outline-primary rounded-full p-2 animate-pulse bg-[#fafafa] dark:bg-[#060818] dark:hover:bg-primary"
                onClick={goToTop}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                </svg>
              </button>
            )}
          </div>

          {/* BEGIN APP SETTING LAUNCHER */}
          <Setting />
          {/* END APP SETTING LAUNCHER */}

          <div
            className={`${themeConfig.navbar} main-container text-black dark:text-white-dark min-h-screen`}
          >
            {/* BEGIN SIDEBAR */}
            <Sidebar />
            {/* END SIDEBAR */}

            <div className="main-content flex flex-col min-h-screen">
              {/* BEGIN TOP NAVBAR */}
              <Header />
              {/* END TOP NAVBAR */}

              {/* BEGIN CONTENT AREA */}
              {/* <Suspense> */}
              {/* <div className={`${themeConfig.animation} p-6 animate__animated`}> */}
              <Outlet />
              {/* </div> */}
              {/* </Suspense> */}
              {/* END CONTENT AREA */}

              {/* BEGIN FOOTER */}
              <Footer />
              {/* END FOOTER */}
              <Portals />
            </div>
          </div>
        </div>
      </App>
    </>
  );
};

export default DefaultLayout;
