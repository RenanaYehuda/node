const express = require("express");
const path = require("path");
const http = require("http");
const { routesInit } = require("./routes/appRoutes");
require("dotenv").config();

const port = process.env.PORT || 3002;

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

routesInit(app);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
