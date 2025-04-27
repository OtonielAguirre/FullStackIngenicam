import express from "express";
import cors from "cors";
import taskRoutes from "./app/routes/routes.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Task Application." });
});

// Routes
taskRoutes(app);

// No db.sync needed anymore!

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
