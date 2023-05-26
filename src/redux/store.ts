import {configureStore}  from "@reduxjs/toolkit";
import {shoppingCartSlice} from "./shoppingCart";

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartSlice.reducer,
  }
})



export default store
