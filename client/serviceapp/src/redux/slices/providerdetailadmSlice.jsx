import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";






export const fetchProviderDetails = createAsyncThunk(
  "providerDetails/fetchProviderDetails",
  async (id, { rejectWithValue,getState }) => {
    try {
        const token = getState().adminAuth.admintoken; 
        const config = {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in headers
            },
          };
      const response = await axios.get(`/admin/viewprovider/${id}`,config);
     
    console.log(response.data);
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch provider details");
    }
  }
);
export const approveProvider = createAsyncThunk(
  "providerDetails/approveProvider",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().adminAuth.admintoken; 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(`/admin/approveprovider/${id}`, {}, config);
      return data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to approve provider");
    }
  }
);


const providerDetailsSlice = createSlice({
  name: "providerDetailsad",
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
  state.error = action.payload || "Failed to fetch provider details";
  console.error("Fetch Error:", action.payload); // Log the exact error
      })
      .addCase(approveProvider.fulfilled, (state) => {
        if (state.provider) {
          state.provider.isVerified = true;
        }
      });
  },
});

export default providerDetailsSlice.reducer;
