import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk to fetch providers for clients this list full providers availble
export const fetchClientProviders = createAsyncThunk(
  "client/listproviders",
  async (_, { rejectWithValue,getState }) => {
    try {
      const token = getState().auth.token; // Get token from Redux store
      //No need to import authSlice – Redux slices are already part of the global store.
//Keeps your thunk function modular – It can access Redux state without needing external imports.
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      };
      const response = await axios.get("/client/listproviders",config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
  }
);

const clientProviderSlice = createSlice({
  name: "clientProviderList",
  initialState: {
    providers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload || [];
      })
      .addCase(fetchClientProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clientProviderSlice.reducer;
