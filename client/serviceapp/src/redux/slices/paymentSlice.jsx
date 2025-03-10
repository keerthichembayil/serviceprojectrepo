import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Async thunk for creating a Stripe checkout session
export const createPaymentSession = createAsyncThunk(
  "payment/createSession",
  async ({ requestId, amount, clientEmail }, { rejectWithValue ,getState}) => {
    try {
      const token = getState().auth.token; // Get token from Redux store
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      };
      const response = await axios.post(`payment/create-checkout-session`, {
        requestId,
        amount, // Pass actual service price dynamically
        clientEmail},config);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data || "Payment error";
    return rejectWithValue(errorMessage);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    sessionId: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.sessionId = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionId = action.payload.sessionId;
      })
      .addCase(createPaymentSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
