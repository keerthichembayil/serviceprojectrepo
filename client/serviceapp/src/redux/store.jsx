import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminAuthReducer from "./slices/adminauthSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer, 
  },
});

export default store;
