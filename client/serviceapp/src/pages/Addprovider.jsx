import { useState } from "react";
import axios from "../axios";

const AddProvider = () => {
  const [userId, setUserId] = useState("");
  const [service, setService] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Capture the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !service || !experience || !image) {
      setMessage("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("service", service);
    formData.append("experience", experience);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("admintoken"); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        "admin/addProvider", // Update this URL as needed
        formData,
        config 
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add Service Provider</h2>
      {message && <p className="text-red-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block font-semibold">User ID</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold">Service</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold">Experience (years)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold">Profile Image</label>
          <input type="file" className="w-full" onChange={handleImageChange} required />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Add Provider
        </button>
      </form>
    </div>
  );
};

export default AddProvider;
