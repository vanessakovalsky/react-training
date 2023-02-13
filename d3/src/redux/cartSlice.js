import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    product: []
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIncart = state.product.find((item) => item.name === action.payload.name);
      if (itemIncart) {
          itemIncart.quantity++;
        }
        else {
          state.product.push({ ...action.payload, quantity: 1});
        }
    }
  }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;