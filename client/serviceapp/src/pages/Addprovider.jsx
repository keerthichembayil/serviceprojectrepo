import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProvider,clearMessage} from "../redux/slices/providerSlice";
import { Alert } from "react-bootstrap";

const AddProvider = () => {
 
  const [service, setService] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null); // New state for document upload

  
  const dispatch = useDispatch();
  
  const userId = useSelector((state) => state.auth.user?.id);
  useEffect(() => {
    console.log("UserId updated:", userId);
  }, [userId]);
  console.log("UserId before submitting:", userId);
  const { loading, success, error, message } = useSelector((state) => state.provider);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000); // Clear message after 3 seconds
  
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);
  

  // const handleImageChange = (e) => {
  //   console.log(e.target.files[0]); // Debugging
  //   setImage(e.target.files[0]);
  // };

  // const handleImageChange = (e) => {
  //   if (e.target.files.length > 0) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  const handleFileChange = (e, setFile) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( !service || !experience || !image||!document) {
      alert("All fields are required!");
      return;
    }

     // Create FormData
  const formData = new FormData();
  formData.append("userId", userId);
 
  formData.append("service", service);
  formData.append("experience", experience);
  console.log("Selected image:", image);
  formData.append("image", image); // Append image file
  formData.append("document", document); // Append document file


  console.log("FormData before dispatch:", Object.fromEntries(formData.entries()));
  // The image won't appear in this log because it's a file.
    
  dispatch(addProvider(formData));
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add Service Details</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

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
          <input
            type="file"
            className="w-full"
            onChange={(e) => handleFileChange(e, setImage)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold">Upload Document (PDF/DOC)</label>
          <input
            type="file"
            className="w-full"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange(e, setDocument)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600  p-2 rounded"
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
