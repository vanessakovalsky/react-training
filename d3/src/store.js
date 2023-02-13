import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productReducer from './redux/productSlice'
import cartReducer from './redux/cartSlice'


// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer
  })


export const setupStore = preloadedState => {
    return configureStore({
        reducer: {rootReducer},
        preloadedState
    })
}

export default configureStore({
  reducer: {
    rootReducer,
  }
})