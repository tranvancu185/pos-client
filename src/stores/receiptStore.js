import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const defaultState = {
  currentReceipt: {
    receipt_id: '',
    customer: '',
    items: [],
    total: 0,
    discount: 0,
    payment: 0,
    change: 0,
    status: 'pending',
    created_at: '',
    updated_at: '',
    isPrinted: false,
  },
  receiptList: [],
  receiptListLoading: false,
};

const useReceiptStore = create()(
  devtools(
    persist(
      (set, get) => ({
        ...defaultState,
      }),
      {
        name: 'receipt',
      }
    ),
    { enabled: true }
  )
);

export default useReceiptStore;
