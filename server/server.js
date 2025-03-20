require('dotenv').config();
const express = require("express");
const path = require("path");
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
// OR for PNG
app.use('/favicon.png', express.static(path.join(__dirname, 'public', 'favicon.png')));

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
   methods: 'GET,POST,PUT,DELETE',
   allowedHeaders: ["Content-Type", "Authorization"],
  // origin: process.env.FRONTEND_URL?.replace(/\/$/, '') || "http://localhost:5173", // Change this to your frontend URL
  credentials: true
}));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Pre-flight request
  }

  next();
});


app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_URI, { 
    // useNewUrlParser: true, useUnifiedTopology: true 
  }
    )
  .then(() => console.log('Connected to MongoDB atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));
  app.get("/",(req,res)=>{
    res.json("hello world");
  })
  // Example API route
app.get("/api/test", (req, res) => {
  res.json({ message: "Test API working!" });
});


  // Routes
app.use("/api/auth", authRoutes);

app.use("/api/admin",adminRoutes);

app.use("/api/service",serviceRoutes);
app.use("/api/provider",providerRoutes);
app.use("/api/client",clientRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/review",reviewRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
