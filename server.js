const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });