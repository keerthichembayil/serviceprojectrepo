import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk for verification
export const verifyProvider = createAsyncThunk(
  "provider/verify",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/provider/verify/${token}`);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Unknown error");
    }
  }
);

const providerSlice = createSlice({
  name: "providerverify",
  initialState: {
    status: "Verifying...",
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyProvider.pending, (state) => {
        state.status = "Verifying...";
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyProvider.fulfilled, (state, action) => {
        state.status = action.payload;
        state.loading = false;
      })
      .addCase(verifyProvider.rejected, (state, action) => {
        state.status = "Verification Failed: " + action.payload;
        state.loading = false;
      });
  },
});

export default providerSlice.reducer;
