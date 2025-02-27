import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminAuthReducer from "./slices/adminauthSlice";
import providerReducer from "./slices/providerSlice";
import providerListReducer from "./slices/providerListSlice";
import clientProviderReducer from "./slices/clientProviderSlice"; // Import new slice
import userProfileReducer  from "./slices/userProfileSlice"; 
import clientRequestReducer from "./slices/serviceRequestSlice";
import clientRequestDetailsReducer from "./slices/clientRequestDetailsSlice";
import providerDetailsReducer from "./slices/providerdetailsSlice"; // Import provider details slice



const store = configureStore({
  reducer: {
    
    auth: authReducer,
    adminAuth: adminAuthReducer, 
    provider:providerReducer,
    providerList: providerListReducer,
    clientProviderList: clientProviderReducer, 
    userProfile: userProfileReducer,// Add new reducer
    clientRequestDetails:clientRequestDetailsReducer,
    clientRequest:clientRequestReducer,
    providerDetails: providerDetailsReducer
  },
});

export default store;
