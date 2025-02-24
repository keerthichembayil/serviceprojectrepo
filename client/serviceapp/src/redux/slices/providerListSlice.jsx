import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk to fetch all service providers
export const fetchProviders = createAsyncThunk(
  "admin/listproviders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("admintoken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get("admin/listproviders", config);
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
    // message: "",
  },
  reducers: {},
  // reducers: {
  //   clearMessage: (state) => {  this is used if we need to add sucess mesage when provider fetched
  //and clear that message after some time using this reducer 
  //     state.message = "";
  //     state.error = null;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload || [];
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = providerListSlice.actions;
export default providerListSlice.reducer;
