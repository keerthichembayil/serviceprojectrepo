import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Provider Details
export const fetchProviderDetails = createAsyncThunk("providerDetails/fetchProviderDetails", async (id) => {
  const response = await axios.get(`/api/admin/provider/${id}`);
  return response.data;
});

// Approve Provider
export const approveProvider = createAsyncThunk("providerDetails/approveProvider", async (id) => {
  await axios.put(`/api/admin/approve-provider/${id}`);
  return id;
});

const providerDetailsSlice = createSlice({
  name: "providerDetails",
  initialState: { provider: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.provider = action.payload;
      })
      .addCase(fetchProviderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(approveProvider.fulfilled, (state) => {
        if (state.provider) {
          state.provider.isVerified = true;
        }
      });
  },
});

export default providerDetailsSlice.reducer;
