require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');



const authRoutes = require('./routes/auth');

const adminRoutes=require('./routes/adminroute');
const serviceRoutes=require('./routes/servicerequest');

const clientRoutes=require('./routes/clientroutes');

const providerRoutes=require('./routes/providerroute');

const paymentRoutes=require('./routes/paymentroute');
const reviewRoutes=require('./routes/reviewroute');



const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Change this to your frontend URL
  credentials: true
}));
app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_URI//, { useNewUrlParser: true, useUnifiedTopology: true }//
    )
  .then(() => console.log('Connected to MongoDB atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));
  app.get("/",(req,res)=>{
    res.json("hello world");
  })


  // Routes
app.use("/api/auth", authRoutes);

app.use("/api/admin",adminRoutes);

app.use("/api/service",serviceRoutes);
app.use("/api/provider",providerRoutes);
app.use("/api/client",clientRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/review",reviewRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost: ${PORT}`));