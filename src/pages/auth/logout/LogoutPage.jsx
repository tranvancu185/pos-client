import { useEffect } from 'react';
import useAuthStore from 'src/stores/authStore';

import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { setLogoutInfo } = useAuthStore();

  useEffect(() => {
    setLogoutInfo();
    navigate('/auth/login');
  }, [navigate, setLogoutInfo]);
};

export default LogoutPage;
