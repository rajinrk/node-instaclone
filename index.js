const express = require("express");
const mongoose = require("mongoose");
const app = express();
const postRoute = require("./Routes/routes");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"))
const url =
  "mongodb+srv://rajinrk:1RLdyeLz8uyvHHMh@cluster0.pt8bbn4.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error in connection", err);
  });

app.use("/", postRoute);
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
