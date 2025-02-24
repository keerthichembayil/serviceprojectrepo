import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviders, clearMessage } from "../redux/slices/providerListSlice";

const ProviderList = () => {
  const dispatch = useDispatch();
  const { providers, loading, error } = useSelector((state) => state.providerList);

  useEffect(() => {
    dispatch(fetchProviders());

    // return () => {
    //   dispatch(clearMessage()); // Clears error message when leaving the page
    // };
  }, [dispatch]);

  if (loading) return <p>Loading providers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Service Providers</h2>
      <ul>
        {providers.map((provider) => (
          <li key={provider._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
            <img 
              src={provider.image} 
              alt={provider.name} 
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} 
            />
            <p><strong>Name:</strong> {provider.name}</p>
            <p><strong>Service:</strong> {provider.service}</p>
            <p><strong>Email:</strong> {provider.userId?.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProviderList;
