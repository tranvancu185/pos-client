import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const defaultState = {
  notification: {
    title: '',
    message: '',
    html: '',
    icon: '',
    type: '',
    open: false,
    duration: 3000,
    position: 'top-end',
    background: '',
    footer: '',
    showConfirmButton: false,
    showCloseButton: false,
    showCancelButton: false,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    reverseButtons: false,
    confirmCallBack: false,
    cancelCallBack: false,
    customeClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger',
      popup: 'sweet-alerts',
    },
  },
};

const useAppStore = create()(
  devtools(
    persist(
      (set, get) => ({
        ...defaultState,
        setNotification(notification) {
          set((state) => ({
            ...state,
            notification: {
              ...state.notification,
              ...notification,
            },
          }));
        },
        clearNotification() {
          set((state) => ({
            ...state,
            notification: {
              ...defaultState.notification,
            },
          }));
        },
      }),
      {
        name: 'app',
      }
    ),
    { enabled: true }
  )
);

export default useAppStore;
