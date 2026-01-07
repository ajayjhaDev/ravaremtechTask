import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  addProductModalOpen: boolean;
  addProductSuccessModalOpen: boolean;
  productDetailsModalOpen: boolean;
  recipientDetailsModalOpen: boolean;
  orderSuccessModalOpen: boolean;
  sidebarCollapsed: boolean;
  activeMenu: string;
}

const initialState: UIState = {
  addProductModalOpen: false,
  addProductSuccessModalOpen: false,
  productDetailsModalOpen: false,
  recipientDetailsModalOpen: false,
  orderSuccessModalOpen: false,
  sidebarCollapsed: false,
  activeMenu: 'product-list',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAddProductModalOpen: (state, action: PayloadAction<boolean>) => {
      state.addProductModalOpen = action.payload;
    },
    setAddProductSuccessModalOpen: (state, action: PayloadAction<boolean>) => {
      state.addProductSuccessModalOpen = action.payload;
    },
    setProductDetailsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.productDetailsModalOpen = action.payload;
    },
    setRecipientDetailsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.recipientDetailsModalOpen = action.payload;
    },
    setOrderSuccessModalOpen: (state, action: PayloadAction<boolean>) => {
      state.orderSuccessModalOpen = action.payload;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    setActiveMenu: (state, action: PayloadAction<string>) => {
      state.activeMenu = action.payload;
    },
  },
});

export const {
  setAddProductModalOpen,
  setAddProductSuccessModalOpen,
  setProductDetailsModalOpen,
  setRecipientDetailsModalOpen,
  setOrderSuccessModalOpen,
  setSidebarCollapsed,
  setActiveMenu,
} = uiSlice.actions;
export default uiSlice.reducer;
