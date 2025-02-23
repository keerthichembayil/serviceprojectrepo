import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk to fetch all service providers
export const fetchProviders = createAsyncThunk(
  "providers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("admintoken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get("admin/providers", config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
  }
);

const providerListSlice = createSlice({
  name: "providerList",
  initialState: {
    providers: [],
    loading: false,
    error: null,
    message: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload.providers;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = providerListSlice.actions;
export default providerListSlice.reducer;
