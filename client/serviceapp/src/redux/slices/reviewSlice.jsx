import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Submit Review
export const submitReview = createAsyncThunk("review/submitreview", 
    async (reviewData, { rejectWithValue ,getState}) => {
  try {
    const token = getState().auth.token; 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      };
    const response = await axios.post("/review/submitreview", reviewData,config);
    return response.data;
  } catch (error) {
    console.error("Submit review error:", error.response?.data?.message);
    return rejectWithValue(error.response?.data?.message || "Failed to submit review.");
  }
});

// // Fetch Provider Reviews
// export const fetchProviderReviews = createAsyncThunk("reviews/fetchProviderReviews", async (providerId, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`/api/reviews/${providerId}`);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data.message);
//   }
// });

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    //   .addCase(fetchProviderReviews.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchProviderReviews.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.reviews = action.payload;
    //   })
    //   .addCase(fetchProviderReviews.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

export default reviewSlice.reducer;
