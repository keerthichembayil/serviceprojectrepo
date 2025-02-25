import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


// User & Provider Login (Shared Login API)
export const userLogin = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post("/auth/login", { email, password });
    
   
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || `login failed`);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    //i m using local storag ebcoz i am storing while logging so i can fetch it like this initiazliztion state
    //if not local storage set during login how to fetch so call in other componets the state
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null, 
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.role = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    
      
      // User Login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role =  action.payload.user.role;
        state.error = null;
        localStorage.setItem("token", action.payload.token);//setted in local storage to preserce do not lost aftr refresh
        localStorage.setItem("role", action.payload.user.role); // Role from backend 
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
