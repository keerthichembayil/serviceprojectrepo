import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk to fetch provider's requests
export const fetchProviderRequests = createAsyncThunk(
  "requests/fetchProviderRequests",
  async (_, { rejectWithValue ,getState}) => {

     try {
            const token = getState().auth.token; 
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`, // Send token in headers
                },
              };
          const response = await axios.get(`service/providerrequests/`,config);
         
        
          return response.data;
          
        } 
        catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch request details");
          }
  
  }
);

const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviderRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchProviderRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default requestsSlice.reducer;
