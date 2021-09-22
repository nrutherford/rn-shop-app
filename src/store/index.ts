import { combineReducers } from 'redux'
import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { productsReducer } from './product'
import { cartReducer } from './cart'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
})

const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
