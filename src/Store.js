import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlics.js"
import authSliceReducer from './slices/authSlice.js'
//import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;

