import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk to request a service
export const requestService = createAsyncThunk(
  "client/requestService",
  async ({ providerId, additionalNotes }, { rejectWithValue,getState }) => {
    try {
      const token = getState().auth.token; 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      };

      const response = await axios.post("/service/request", { providerId, additionalNotes }, config);
      console.log("response inside servicerequestslice",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
  }
);

const clientRequestSlice = createSlice({
  name: "clientRequest",
  initialState: { loading: false, error: null, successMessage: null },
  reducers: { clearMessage: (state) => { state.successMessage = null; state.error = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(requestService.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(requestService.fulfilled, (state, action) => { state.loading = false; state.successMessage = action.payload.message; })
      .addCase(requestService.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearMessage } = clientRequestSlice.actions;
export default clientRequestSlice.reducer;
