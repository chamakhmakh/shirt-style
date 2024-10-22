import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import dalleRoutes from "./routes/dalle.routes.js";

dotenv.config(); // to read .env file

const app = express(); // create express app
app.use(cors()); // enable cors
app.use(express.json({ limit: "50mb" })); // enable json body parsing

app.use("/api/v1/dalle", dalleRoutes); //  use routes

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server!" }); // send response
});

app.listen(5000, () => console.log("Server started on port 5000"));
