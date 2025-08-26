import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './slicer';

const store = configureStore({
  reducer:  rootReducer
  
});

export default store;