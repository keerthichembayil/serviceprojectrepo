import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk to fetch all users
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().adminAuth.admintoken; // Get auth token from Redux store
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("usertoken",token);

      const response = await axios.get("/admin/getUsers", config);
      console.log(response.data);
      return response.data; // Assuming response contains an array of users
    } catch (error) {

      return rejectWithValue(error.response?.data || { error: "Failed to fetch users" });
    }
  }
);

// Slice definition
const userListSlice = createSlice({
  name: "userList",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "An error occurred";
      });
  },
});

export const { clearUserError } = userListSlice.actions;
export default userListSlice.reducer;
