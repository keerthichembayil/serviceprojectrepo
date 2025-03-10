import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk for updating request status
export const updateRequestStatus = createAsyncThunk(
  "requests/updateStatus",
  async ({ requestId, status }, { rejectWithValue,getState }) => {
    try {

        const token = getState().auth.token; 
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`, // Send token in headers
                },
              };
      const response = await axios.put(`/service/updatestatus/${requestId}`, { status },config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update status");
    }
  }
);

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateRequestStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests.map((request) =>
          request._id === action.payload.updatedRequest._id
            ? action.payload.updatedRequest
            : request
        );
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default requestSlice.reducer;
