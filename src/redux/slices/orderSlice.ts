import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderItem, RecipientDetails, Product } from '../../types';

interface OrderState {
  currentOrder: {
    items: OrderItem[];
    recipient: RecipientDetails | null;
  };
  orders: Order[];
}

const initialState: OrderState = {
  currentOrder: {
    items: [],
    recipient: null,
  },
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItemToOrder: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        selectedColor: string;
        selectedSize: string;
      }>
    ) => {
      const existingIndex = state.currentOrder.items.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingIndex >= 0) {
        state.currentOrder.items[existingIndex] = action.payload;
      } else {
        state.currentOrder.items.push(action.payload);
      }
    },
    removeItemFromOrder: (state, action: PayloadAction<string>) => {
      state.currentOrder.items = state.currentOrder.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    setRecipientDetails: (state, action: PayloadAction<RecipientDetails>) => {
      state.currentOrder.recipient = action.payload;
    },
    confirmOrder: (state) => {
      if (state.currentOrder.recipient && state.currentOrder.items.length > 0) {
        const newOrder: Order = {
          id: Math.random().toString().slice(2, 10),
          items: state.currentOrder.items,
          recipient: state.currentOrder.recipient,
          createdAt: new Date().toISOString(),
        };
        state.orders.push(newOrder);
        state.currentOrder = {
          items: [],
          recipient: null,
        };
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = {
        items: [],
        recipient: null,
      };
    },
  },
});

export const {
  addItemToOrder,
  removeItemFromOrder,
  setRecipientDetails,
  confirmOrder,
  clearCurrentOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
