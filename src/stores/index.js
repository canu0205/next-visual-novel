import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./accountSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});

export default store;
