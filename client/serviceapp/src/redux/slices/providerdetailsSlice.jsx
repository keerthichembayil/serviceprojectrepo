import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async action to fetch provider details specific provider when request service clicked
export const fetchProviderDetails = createAsyncThunk(
  "providerDetails/fetchProviderDetails",
  async (id, { rejectWithValue,getState }) => {
    try {
        const token = getState().auth.token; 
        const config = {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in headers
            },
          };
      const response = await axios.get(`client/listproviderdetails/${id}`,config);
     
    
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch provider details");
    }
  }
);

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
        state.error = action.payload;
      });
  },
});

export default providerDetailsSlice.reducer;
