import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Fetch provider details (No need to pass providerId)
export const fetchProviderDetails = createAsyncThunk(
  "provider/fetchDetails",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Get token from Redux auth state
      if (!token) return rejectWithValue("Authentication token not found");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      };

      const response = await axios.get("/provider/meprovider", config);
      console.log("responseata",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch provider details");
    }
  }
);

// Slice
const providerSlice = createSlice({
  name: "providerfresh",
  initialState: { 
    loading: false,
    details: false, // Whether provider added details
    isVerified: false, // Verification status
    isPending: false, // Pending approval status
    isRejected: false, // Rejection status
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.details = false;
      state.isVerified = false;
      state.isPending = false;
      state.isRejected = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload.details;
        state.isVerified = action.payload.isVerified;
        state.isPending = action.payload.isPending;
        state.isRejected = action.payload.isRejected;
        state.error = null;
      })
      .addCase(fetchProviderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = providerSlice.actions;
export default providerSlice.reducer;
