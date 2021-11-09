import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptocurrencies';
//import cryptoReducer from '../slices/cryptoSlice';

//rename this file to index.js

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        //crypto: cryptoReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptoApi.middleware),
});