import {createSlice} from '@reduxjs/toolkit';
import {Product} from "@prisma/client";
import _ from "lodash";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imgURL: string;
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
      console.log(action.payload, 'action.payload'  )
      const alreadyAdded = state.cartItems?.find(item => item.id === action.payload.id)
      if (alreadyAdded) {
        state.cartItems = state.cartItems.map((item: any) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
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
        if (item.id === action.payload.id && item.quantity > 0) {
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


    clearCart: (state) => {
      state.cartItems = [];

    },


    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item: any) => {
          amount += item.quantity;
          total += item.quantity * item.price;
        }
      )
      state.amount = _.round(amount, 2);
      state.total = _.round(total, 2);
    }
  },

});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  setIsCartOpen,
  calculateTotals,
  clearCart
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
