import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer (persistConfig, rootReducer)

export const store =  configureStore({
  reducer: {
    persistedReducer,
    // rootReducer,
  }
})

export const persistor = persistStore(store)