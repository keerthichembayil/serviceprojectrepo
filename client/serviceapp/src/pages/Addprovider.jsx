import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProvider} from "../redux/slices/providerSlice";

const AddProvider = () => {
  const [userId, setUserId] = useState("");
  const [service, setService] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null);
  
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector((state) => state.provider);
//   const providerState = useSelector((state) => state.provider || {});
// const { loading = false, success, error, message } = providerState;


  const handleImageChange = (e) => {
    console.log(e.target.files[0]); // Debugging
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId || !service || !experience || !image) {
      return;
    }
    
    dispatch(addProvider({ userId, service, experience, image }));
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add Service Provider</h2>
      {message && <p className={success ? "text-green-500" : "text-red-500"}>{message}</p>}

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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Provider"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AddProvider;
