import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk to fetch client requests
export const fetchClientRequests = createAsyncThunk(
  "client/fetchClientRequests",
  async (_, { rejectWithValue ,getState}) => {
    try {
      const token = getState().auth.token; 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      };

      const response = await axios.get("/service/clientrequests", config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Unable to fetch requests");
    }
  }
);


// Cancel request
export const cancelClientRequest = createAsyncThunk(
  "clientRequests/cancel",
  async (requestId, { rejectWithValue,getState }) => {
    try {
      const token = getState().auth.token; 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      };
      await axios.patch(`/service/cancelreq/${requestId}`,{},config);
      return requestId; // Return ID so we can remove it from state
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      // .addCase(cancelClientRequest.fulfilled, (state, action) => {
      //   state.requests = state.requests.map((req) =>
      //     req._id === action.payload ? { ...req, status: "Cancelled" ,paymentStatus: "notneeded"} : req
      //   );
      // });
  },
});

export default clientRequestDetailsSlice.reducer;
