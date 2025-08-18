import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlicer';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;