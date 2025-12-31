const { connectToDatabase } = require("./utils/db");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: "https://ai-diet-recommendation.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());

// IMPORTING ROUTES
const AuthRoutes = require("./routes/Authentication");
const UserRoutes = require("./routes/User");
const AiRoutes = require("./routes/AiRecommend");

app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/ai", AiRoutes);

app.get("/", (req, res) => {
  res.json("An Error Occured");
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is now running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database. Server not started.", error);
  });
