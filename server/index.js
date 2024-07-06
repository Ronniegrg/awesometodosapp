require("dotenv").config();
// import express
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require('path');

// create an instance of express called app
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// import our todos router
const router = require("./routes");

// use /api to prefix our endpoints
app.use("/api", router);

// create a port variable
const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectToMongoDB();
  // listen to our server on our local host
  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
};
startServer();
