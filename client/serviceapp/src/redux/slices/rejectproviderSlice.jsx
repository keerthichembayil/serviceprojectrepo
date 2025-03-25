import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";






export const rejectProvider = createAsyncThunk(
  "providerDetails/rejectprovider",
  async (id, { rejectWithValue,getState }) => {
    try {
        const token = getState().adminAuth.admintoken; 
        const config = {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in headers
            },
          };
      const response = await axios.put(`/admin/rejectprovider/${id}`,{},config);
     
    console.log(response.data);
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch provider details");
    }
  }
);



const rejectproviderSlice = createSlice({
  name: "providerReject",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(rejectProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(rejectProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rejectproviderSlice.reducer;
