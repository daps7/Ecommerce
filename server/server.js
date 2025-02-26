const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Ensure Express can handle JSON requests

mongoose.connect("mongodb://localhost:27017/D00265421", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const instrumentsRoutes = require("./routes/instruments"); // Import routes
const users = require('./routes/users'); // Import users route
app.use("/api", instrumentsRoutes); // Prefix all routes with `/api`
app.use('/users', users); // Use users route

app.get("/", (req, res) => {
    res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
