import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch client requests
export const fetchClientRequests = createAsyncThunk(
  "client/fetchClientRequests",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get("/api/requests", config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Unable to fetch requests");
    }
  }
);

const clientRequestDetailsSlice = createSlice({
  name: "clientRequestDetails",
  initialState: { requests: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientRequests.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchClientRequests.fulfilled, (state, action) => { state.loading = false; state.requests = action.payload; })
      .addCase(fetchClientRequests.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default clientRequestDetailsSlice.reducer;
