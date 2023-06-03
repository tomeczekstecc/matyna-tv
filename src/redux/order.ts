import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  orderId: '',
  total: 0,
  amount: 0,
}
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      setOrder: (state, action) => {
        state.orderId = action.payload.orderId;
        state.total = action.payload.total;
        state.amount = action.payload.amount;
      }
    }
  }
)

export const {setOrder} = orderSlice.actions;

export default orderSlice.reducer;
