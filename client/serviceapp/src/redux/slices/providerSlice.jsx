import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk to add servicer details by provider
export const addProvider = createAsyncThunk(
  "provider/addingProvider",
  async (formData, { rejectWithValue ,getState}) => {
    try {
      const token = getState().auth.token; // Get token from Redux store
      //when we implement here using token actually when we go to home and try to returned to prvider dashbaord
      //not returning ie state not mainted properly so taken auth.token

      
   
     
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      
      const response = await axios.post("/provider/addProvider", formData, config);
      console.log("response is",response);
      return response.data;
    } catch (error) {
      console.log("Error response:", error.response?.data); // Debugging
      return rejectWithValue(error.response?.data || { error: "Something went wrong" });
    }
  }
);

// Slice definition
const providerSlice = createSlice({
  name: "provider",
  initialState: {
    loading: false,
    success: false,
    error: null,
    message: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.message = "";
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProvider.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.message = "";
        state.error = null;
      })
      .addCase(addProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(addProvider.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.error || "An unexpected error occurred";
        
      });
  },
});

export const { clearMessage } = providerSlice.actions;
export default providerSlice.reducer;
// The named export allows you to use actions (clearMessage).
// The default export allows Redux to manage state updates (providerSlice.reducer).