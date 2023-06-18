const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 5000;

// database
const connectDB = require("./config/connectDB");
connectDB(process.env.MONGO_URI);
const resetMongos_id = require("./config/resetMongos_id");
resetMongos_id();

// Express app setup: Enable CORS, parse requests
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/uploads", authMiddleware, express.static("uploads"));
app.use(express.static("uploads"));

// Middleware setup: loggin incoming requests
const logger = require("./middleware/logger");
app.use(logger);

// sources routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/guides", require("./routes/guideRoutes"));
app.use("/api/tourists", require("./routes/touristRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/hotels", require("./routes/hotelRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/places", require("./routes/placeRoutes"));
app.use("/api/cities", require("./routes/cityRoutes"));

// Middleware setup: Formating responding errors
const { errorHandler } = require("./middleware/errorMiddleware");
app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));

