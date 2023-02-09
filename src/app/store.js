import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authRedcer from "../features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
// import notificationReducer from "../features/notificationSlice";
import adminMainSlice from "../features/admin/adminMainSlice";
const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authRedcer,
  admin: adminMainSlice,
});
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
