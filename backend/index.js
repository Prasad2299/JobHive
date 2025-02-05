const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./utils/db");

const userRoute = require("./routes/user.route");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "Ping pong",
    status: true,
  });
});

//apis
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at PORT ${PORT}`);
});
