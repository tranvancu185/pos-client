import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useLayoutStore from 'src/stores/layoutStore';

import bgGradient from 'src/assets/images/auth/bg-gradient.png';
import polygonObject from 'src/assets/images/auth/polygon-object.svg';
import loginIcon from 'src/assets/images/auth/login.svg';
import DropdownLang from 'src/components/common/DropdownLang';
import VNFlag from 'src/assets/images/flags/VN.svg';
import ENFlag from 'src/assets/images/flags/EN.svg';
import Logo from 'src/assets/images/auth/logo-white.svg';

import LoginForm from './components/LoginForm';
import { login } from 'src/apis/auth/login';
import useAuthStore from 'src/stores/authStore';
import Loader from 'src/components/common/Loader';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const themeConfig = useLayoutStore((state) => state);
  const { isLoading } = useAuthStore((state) => state);
  const { setLoginInfo, setLoginRequest } = useAuthStore();
  const { setPageTitle } = themeConfig;

  const [flag, setFlag] = useState(themeConfig.locale);

  useEffect(() => {
    setPageTitle('LOGIN PAGE');
  }, [setPageTitle]);

  const loginRequest = async ({ data = {}, successCallBack = false, errorCallBack = false }) => {
    try {
      const response = await login({ data });
      if (response.status === 200) {
        if (typeof successCallBack === 'function') {
          successCallBack(response);
        }
      } else {
        if (typeof errorCallBack === 'function') {
          errorCallBack(response);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // TODO: handle error here
    }
  };

  const submitForm = async (values) => {
    setLoginRequest();
    const bodyRequest = {
      username: values.username,
      password: values.password,
    };
    await loginRequest({
      data: bodyRequest,
      successCallBack: (response) => {
        setLoginInfo(response.data?.token);
        navigate('/');
      },
      errorCallBack: (response) => {
        console.error('Error:', response);
      },
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="absolute inset-0">
        <img src={bgGradient} alt="bgGradient" className="h-full w-full object-cover" />
      </div>
      <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
        <img src={polygonObject} alt="polygon" className="absolute bottom-0 end-[28%]" />
        <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
          <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
            <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
            <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
              <Link to="/" className="w-48 block lg:w-72 ms-10">
                <img src={Logo} alt="Logo" className="w-full" />
              </Link>
              <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                <img src={loginIcon} alt="loginIcon" className="w-full" />
              </div>
            </div>
          </div>
          <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
            <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
              <Link to="/" className="w-8 block lg:hidden">
                <img src={Logo} alt="Logo" className="mx-auto w-10" />
              </Link>
              <div className="dropdown ms-auto w-max">
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
            </div>
            <div className="w-full max-w-[440px] lg:mt-16">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
                  {t('sign_in')}
                </h1>
                <p className="text-base font-bold leading-normal text-white-dark">
                  {t('enter_your_username_and_password_to_login')}
                </p>
              </div>
              <LoginForm submitForm={submitForm} />
            </div>
            <p className="absolute bottom-6 w-full text-center dark:text-white">
              © {new Date().getFullYear()}.HASAKI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
