import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { API_TOKEN_KEY } from 'src/web.config';
const defaultState = {
  profile: null,
  token: null,
  isAuthenticated: false,
  isVerify: false,
  isLoading: false,
};

const useAuthStore = create()(
  devtools(
    persist(
      (set, get) => ({
        ...defaultState,
        setLoginRequest() {
          set((state) => ({
            ...state,
            isLoading: true,
          }));
        },
        setLoginInfo(token) {
          localStorage.setItem(API_TOKEN_KEY, token);
          set((state) => ({
            ...state,
            token: token,
            isAuthenticated: true,
          }));
        },
        setProfileInfo(profile) {
          set((state) => ({
            ...state,
            profile: profile,
            isLoading: false,
            isVerify: true,
          }));
        },
        setLogoutInfo() {
          set((state) => ({
            profile: null,
            token: null,
            isAuthenticated: false,
            isVerify: false,
            isLoading: false,
          }));
        },
      }),
      {
        name: 'auth',
      },
    ),
    { enabled: true },
  ),
);

export default useAuthStore;
