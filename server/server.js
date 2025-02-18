require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');


const authRoutes = require('./routes/auth');
// const serviceRoutes=require('./routes/service');
const adminRoutes=require('./routes/adminroute');
// const clientRoutes=require('./routes/clientprofile');
// const paymentRoutes=require('./routes/paymentroute');
// const providerRoutes=require('./routes/providerroute');


const app = express();


app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));
  app.get("/",(req,res)=>{
    res.json("hello world");
  })


  // Routes
app.use("/api/auth", authRoutes);
// app.use("api/service",serviceRoutes);
app.use("api/admin",adminRoutes);
// app.use("api/client",clientRoutes);
// app.use("api/provider",providerRoutes);
// app.use("api/payment",paymentRoutes);


  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost: ${PORT}`));