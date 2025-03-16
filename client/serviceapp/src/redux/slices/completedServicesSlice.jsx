import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk to fetch completed and paid service requests
export const fetchCompletedServices = createAsyncThunk(
  "completedServices/fetchCompletedServices",
  async (_, { rejectWithValue ,getState}) => {
    try {
        const token = getState().auth.token; 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      };

      const response = await axios.get("/review/completedrequests",config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch completed services");
    }
  }
);

const completedServicesSlice = createSlice({
  name: "completedServices",
  initialState: {
    completedServices: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedServices.fulfilled, (state, action) => {
        state.loading = false;
        state.completedServices = action.payload;
      })
      .addCase(fetchCompletedServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default completedServicesSlice.reducer;
