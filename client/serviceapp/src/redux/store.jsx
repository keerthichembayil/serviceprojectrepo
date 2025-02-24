import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminAuthReducer from "./slices/adminauthSlice";
import providerReducer from "./slices/providerSlice";
import providerListReducer from "./slices/providerListSlice";
import clientProviderReducer from "./slices/clientProviderSlice"; // Import new slice


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer, 
    provider:providerReducer,
    providerList: providerListReducer,
    clientProviderList: clientProviderReducer, // Add new reducer
  },
});

export default store;
