const express = require("express");
const path = require("path");
const app = express();
const productRouter = require("./app/product/routes");
const productRouterV2 = require("./app/product_v2/routes");
const logger = require("morgan");
const port = 3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to Home Page');
});
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", productRouter);
app.use("/api/v2", productRouterV2);
app.use((req, res, next) => {
  res.status(404);
  // res.setHeader('Content-Type', 'text/plain');
  res.send({
    status: "Failed",
    message: "Resource " + req.originalUrl + " not found",
  });
});

app.listen(process.env.PORT || port, () =>
  console.log("Server: http://localhost:3000")
);
