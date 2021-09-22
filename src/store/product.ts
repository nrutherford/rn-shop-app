import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../types'

export interface ProductState {
  isLoading: boolean
  products: Product[]
}

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    return (await response.json()) as Product[]
  } catch (error) {
    throw error
  }
})

const initialState: ProductState = {
  isLoading: false,
  products: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
      })
  },
})

export const productsReducer = productsSlice.reducer
