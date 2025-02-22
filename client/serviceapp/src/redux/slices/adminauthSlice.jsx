import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


// Admin Login
export const adminLogin = createAsyncThunk("auth/adminlogin", async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/admin/adminlogin", { email, password });
      // localStorage.setItem("admintoken", response.data.token);
      // localStorage.setItem("role", "admin");
      // localStorage.setItem("admin", JSON.stringify(response.data.admin));//admin object with full details
      return response.data;//this is the action .payload
    } catch (error) {
      return rejectWithValue(error.response?.data || "Admin login failed");
    }
  });
  

  
const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    admin: JSON.parse(localStorage.getItem("admin")) || null,
    admintoken: localStorage.getItem("admintoken") || null,
    role: localStorage.getItem("role") || null,
    loading: false,
    error: null,
  },
  reducers: {// Synchronous Reducers
    adminLogout: (state) => {
      localStorage.removeItem("admintoken");
      localStorage.removeItem("admin");
      localStorage.removeItem("role");
      state.admin = null;
      state.admintoken = null;
      state.role=null;
      state.error = null;
    },
  },
  // When the createAsyncThunk action is dispatched and fulfilled, it automatically updates the Redux state using the reducer.return response.data; sends this object as the payload of the action.
  extraReducers: (builder) => {  // Handles Async Actions
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admintoken = action.payload.token;
        state.admin = action.payload.admin;
        state.role = "admin"; 
        state.error = null;
         // Store in localStorage
//          The adminLogin function returns response.data, which becomes action.payload in extraReducers.
// Inside extraReducers, you only have access to action.payload, not the original response object.response is only available inside the adminLogin function (inside createAsyncThunk).
         localStorage.setItem("admintoken", action.payload.token);
         localStorage.setItem("role", "admin");
         localStorage.setItem("admin", JSON.stringify(action.payload.admin));


      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { adminLogout } = adminAuthSlice.actions;  
export default adminAuthSlice.reducer;//->It combines the reducers from reducers and extraReducers into a single //reducer function.
//Redux will use this reducer to update the state when actions are dispatched.

// extraReducers is required for createAsyncThunk because it's handling async actions (pending, fulfilled, rejected).
// extraReducers lets you manage loading states, errors, and API responses easily.


