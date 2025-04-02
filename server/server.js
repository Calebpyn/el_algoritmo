const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/server.routes");

const app = express();

const port = process.env.PORT || 8081;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(port, () => console.info(`Listening on port: ${port}`));
