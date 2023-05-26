import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from "@prisma/client";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const initialState = {
  isCartOpen: false,
  cartItems: [] as CartItem[],
  items: [] as Product[],
  amount: 0,
  total: 0,
}


export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const alreadyAdded = state.cartItems?.find(item => item.id === action.payload.id)
      if (alreadyAdded) {
        state.cartItems = state.cartItems.map((item: any) => {
          if (item.id === action.payload.id) {
            return {
              ...item,

              quantity: item.quantity + 1,
              value: ((item.quantity + 1) * item.price) || item.price,
            };
          }
          return item;
        });

      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item: any) => item.id !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

    },
    decreaseQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item: any) => {
          amount += item.quantity;
          total += item.quantity * item.price;
        }
      )
      state.amount = amount;
      state.total = total;
    }
  },

});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  setIsCartOpen,
calculateTotals
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
