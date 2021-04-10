const express = require("express");
const cors = require("cors");
const requestLogger = require("./utilities/requestLogger");
const routing = require("./routes/routing");
const errorLogger = require("./utilities/errorLogger");
const helmet = require("helmet");
const data = require("./utilities/data");
const connection = require("./utilities/connection");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.get("/setupdb", async (req, res, next) => {
  let model = await connection.getProductConnection();
  await model.deleteMany();
  let insertData = await model.create(data);
  res.status(200);
  res.send(
    `${insertData.length} has been successfully inserted into the database`
  );
  next();
});
app.use("/", routing);
app.use(errorLogger);
app.listen(process.env.PORT, (err) => {
  if (!err)
    console.log(`Product Server is started at port ${process.env.PORT}`);
  else console.log("Error in product server setup");
});

module.exports = app;
