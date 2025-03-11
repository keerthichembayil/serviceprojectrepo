import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchuserspecific = createAsyncThunk(
  "serviceRequest/fetchServiceRequest",
  async (id, { rejectWithValue,getState }) => {
    try {
      const token = getState().adminAuth.admintoken; 
      
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(`/admin/user/${id}`,config);
      console.log("response",response);
      return response.data;
    
    }
  catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch service request");
    }
  }
  
);

const serviceRequestSlice = createSlice({
  name: "serviceRequest",
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchuserspecific.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchuserspecific.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchuserspecific.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceRequestSlice.reducer;
