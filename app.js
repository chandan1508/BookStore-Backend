const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");
const Book = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(cors());
app.use(express.json())
// routes
app.use("/api/v1", User);
app.use("/api/v1", Book);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);
// createing port
app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
});
