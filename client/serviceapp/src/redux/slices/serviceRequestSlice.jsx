export const requestService = createAsyncThunk(
    "service/request",
    async ({ providerId, userId, details }, { rejectWithValue }) => {
      try {
        const response = await axios.post("/service/request", { providerId, userId, details });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to request service");
      }
    }
  );
  