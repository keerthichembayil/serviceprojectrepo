export const addServiceProvider = createAsyncThunk(
    "serviceProvider/add",
    async ({ name, email, phone, service, image }, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("service", service);
        formData.append("image", image);
  
        const response = await axios.post("/admin/add-provider", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add provider");
      }
    }
  );
  