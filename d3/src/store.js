import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';
import productReducer from './redux/productSlice';
import cartReducer from './redux/cartSlice';
import translations from './l10n/translation';


// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    i18n: i18nReducer
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


const store =  configureStore({
  reducer: {
    persistedReducer,
    // rootReducer,
  },
})


export default store;
syncTranslationWithStore(store)
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('fr'));

export const persistor = persistStore(store)