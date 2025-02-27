import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async action to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Get token from Redux store
      //No need to import authSlice – Redux slices are already part of the global store.
//Keeps your thunk function modular – It can access Redux state without needing external imports.
        console.log("entered uerprofileslice");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      };
      const response = await axios.get("client/getmyprofile", config);
      console.log(response);
      return response.data; // User details from backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user profile");
    }
  }
);


// Update user profile
export const updateUserProfile = createAsyncThunk(
  "userProfile/updatemyprofile",
  async (updatedData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put("client/updatemyprofile", updatedData, config);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);


// Delete user profile
export const deleteUserProfile = createAsyncThunk(
  "userProfile/deleteUserProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete("client/deletemyprofile", config);
      return null; // Return null to reset user state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete profile");
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {}, // No extra reducers needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update user details in Redux state
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUserProfile.fulfilled, (state) => {
        state.user = null; // Remove user from state after deletion
      })


      .addCase(deleteUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });




  },
});

export default userProfileSlice.reducer;
