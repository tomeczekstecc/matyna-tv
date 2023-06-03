import {configureStore}  from "@reduxjs/toolkit";
import {shoppingCartSlice} from "./shoppingCart";
import {orderSlice} from "@/redux/order";

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartSlice.reducer,
    order: orderSlice.reducer,
  }
})



export default store
