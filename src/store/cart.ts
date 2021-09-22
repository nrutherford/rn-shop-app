import { createEntityAdapter, createSlice, nanoid, PayloadAction, createSelector } from '@reduxjs/toolkit'

import { Product } from '../types'
import { RootState } from './index'

export interface CartEntry {
  id: string
  product: Product
}

const cartAdapter = createEntityAdapter<CartEntry>()

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartAdapter.getInitialState(),
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      cartAdapter.addOne(state, { id: nanoid(), product: action.payload })
    },
    removeFromCart: cartAdapter.removeOne,
    clearCart: cartAdapter.removeAll,
  },
})

const cartSelectors = cartAdapter.getSelectors((state: RootState) => state.cart)

export const totalSelector = createSelector(cartSelectors.selectAll, (items) =>
  items.reduce((total, item) => total + item.product.price, 0),
)

export const { selectAll, selectTotal } = cartSelectors

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export const cartReducer = cartSlice.reducer
