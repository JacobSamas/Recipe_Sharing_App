const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

app.listen(process.env.PORT || 5001, () => {
  console.log("Server is running on port 5001");
});
