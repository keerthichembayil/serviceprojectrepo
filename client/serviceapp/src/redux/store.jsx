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
import providerdetailsad from "./slices/providerdetailadmSlice";
import userListReducer from "./slices/userListSlice";
import providerverifyreducer from "./slices/verifyproviderSlice"; // Import provider slice
import freshproviderreducer from "./slices/setfreshproviderSlice";
import fetchrequestdetabyprovidereducer from "./slices/viewrequestbyproviderSlice";
import paymentReducer from "./slices/paymentSlice"; // Import payment slice
import specificuseradReducer from "./slices/userspecificdetailsSlice";
import providerprofilereducer from  "./slices/providerProfileSlice";





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
    providerDetails: providerDetailsReducer,
    userList:userListReducer,
    providerDetailsad:providerdetailsad,
    providerverify:providerverifyreducer,
    providerfresh:freshproviderreducer,
    requests:fetchrequestdetabyprovidereducer,
    payment: paymentReducer,
    serviceRequest:specificuseradReducer,
    providerdt:providerprofilereducer
    
  },
});

export default store;
