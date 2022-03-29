const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const app = express();
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);
dotenv.config();
app.use(express.json());
const DB = process.env.DB;

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo DB is connected"))
  .catch((error) => console.log(error));


  app.use("/api/users", userRoute)
  app.use("/api/pins", pinRoute);
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("Backend server connected to port " + PORT);
});
