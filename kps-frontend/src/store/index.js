import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import networkSlice from "./network";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    network: networkSlice.reducer,
  },
});

export default store;
