import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "./reducers/usersSlice";
import productsSlice from "./reducers/productsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducers,
    products: productsSlice,
  },
});
