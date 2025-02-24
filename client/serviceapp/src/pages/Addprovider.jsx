import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProvider,clearMessage} from "../redux/slices/providerSlice";

const AddProvider = () => {
 
  const [service, setService] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null);
  
  const dispatch = useDispatch();
  // const authState = useSelector((state) => state.auth); // Only get 'auth' slice

  // useEffect(() => {
  //   console.log("Auth State:", authState);
  // }, [authState]);
  const userId = useSelector((state) => state.auth.user?.id);
  useEffect(() => {
    console.log("UserId updated:", userId);
  }, [userId]);
  const { loading, success, error, message } = useSelector((state) => state.provider);

  useEffect(() => {
    // Clear message on component mount
    dispatch(clearMessage());
  }, [dispatch]);


  const handleImageChange = (e) => {
    console.log(e.target.files[0]); // Debugging
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( !service || !experience || !image) {
      alert("All fields are required!");
      return;
    }

     // Create FormData
  const formData = new FormData();
  formData.append("userId", userId);
 
  formData.append("service", service);
  formData.append("experience", experience);
  formData.append("image", image); // Append image file

  console.log("FormData before dispatch:", Object.fromEntries(formData.entries()));
    
  dispatch(addProvider(formData));
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add Service Details</h2>
      {message && <p className={success ? "text-green-500" : "text-red-500"}>{message}</p>}

      <form onSubmit={handleSubmit}>
        

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
