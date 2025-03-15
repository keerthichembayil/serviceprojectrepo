import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Fetch Provider Details (GET request)
export const fetchProviderDetails = createAsyncThunk(
  "provider/fetchProviderDetails",
  async (_, { rejectWithValue ,getState}) => {
    try {
        const token = getState().auth.token; 
        const config = {
            headers: {
              Authorization: `Bearer ${token}`, 
             // Send token in headers
            },
          };
      const response = await axios.get("provider/providerdte",config
      );
      return response.data.provider;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch provider details");
    }
  }
);

// Update Provider Details (PUT request)
export const updateProviderDetails = createAsyncThunk(
  "provider/updateprovider",
  async (providerData, { rejectWithValue ,getState}) => {
    try {
        const token = getState().auth.token; 
        const config = {
            headers: {
              Authorization: `Bearer ${token}`, 
              // Send token in headers
              "Content-Type": "multipart/form-data",
            },
          };
     
     

      const response = await axios.put("/provider/updateprovider", providerData, config
      );

      return response.data.updatedProvider;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to update provider details");
    }
  }
);

// Provider Slice
const providerSlice = createSlice({
  name: "providerdt",
  initialState: {
    details: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetUpdateState: (state) => {
      state.success = false; // Reset success message after update
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProviderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchProviderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProviderDetails.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateProviderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload; // Update state with new details
        state.success = true;
      })
      .addCase(updateProviderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetUpdateState } = providerSlice.actions;
export default providerSlice.reducer;
