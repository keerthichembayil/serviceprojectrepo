import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk to add a service provider
export const addProvider = createAsyncThunk(
  "provider/addingProvider",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
    console.log("entered provierslice",formData);
     
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      
      const response = await axios.post("provider/addProvider", formData, config);
      console.log("response is",response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An unexpected error occurred");
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
        state.error = null;
      })
      .addCase(addProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(addProvider.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = providerSlice.actions;
export default providerSlice.reducer;
// The named export allows you to use actions (clearMessage).
// The default export allows Redux to manage state updates (providerSlice.reducer).