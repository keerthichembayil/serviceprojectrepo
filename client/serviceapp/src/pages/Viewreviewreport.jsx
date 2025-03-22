import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useSelector } from "react-redux";
import axios from "../axios";
import '../css/Report.css'



const Viewreviewreport = () => {


    const token = useSelector((state) => state.adminAuth.admintoken);
    const [reviewData, setReviewData] = useState([]);
  
    useEffect(() => {
      const fetchReviewReport = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const response = await axios.get("/admin/max-ratings", config);
          setReviewData(response.data);
        } catch (error) {
          console.error("Error fetching review report:", error);
        }
      };
  
      fetchReviewReport();
    }, [token]);
  return (
    <div className="reportdes">
    <div className="container">
      <h2 className="pt-3 pb-4">Service Provider Max Ratings</h2>
      {reviewData.length > 0 ? (
        <div className="chart-container" style={{ width: "600px", height: "400px" }}>
          <BarChart width={600} height={400} data={reviewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="providerName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="maxRating" fill="#003300" />
          </BarChart>
        </div>
      ) : (
        <p>Loading review report...</p>
      )}
    </div>
    </div>
  )
}

export default Viewreviewreport

