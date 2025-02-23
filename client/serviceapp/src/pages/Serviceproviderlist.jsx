import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviders, clearMessage } from "../redux/slices/providerListSlice";

const ProviderList = () => {
  const dispatch = useDispatch();
  const { providers, loading, error } = useSelector((state) => state.providerList);

  useEffect(() => {
    dispatch(fetchProviders());

    return () => {
      dispatch(clearMessage()); // Clears error message when leaving the page
    };
  }, [dispatch]);

  if (loading) return <p>Loading providers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Service Providers</h2>
      <ul>
        {providers.map((provider) => (
          <li key={provider._id}>
            <p>Name: {provider.name}</p>
            <p>Service: {provider.service}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProviderList;
