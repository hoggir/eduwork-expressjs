const path = require("path");
const fs = require("fs");
const Product = require("./model");

const index = (req, res) => {
  const { search } = req.query;
  if (search) {
    Product.find({ name: { '$regex' : search, '$options' : 'i' } })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    Product.find()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const view = (req, res) => {
  Product.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    Product.create({
      name,
      price,
      stock,
      status,
      image_url: `http://localhost:3000/public/${image.originalname}`,
    })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const updatePromise = async (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    await Product.updateOne(
      { _id: req.params.id },
      {
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3000/public/${image.originalname}`,
      }
    )
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const deletePromise = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndRemove(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = {
  index,
  store,
  view,
  updatePromise,
  deletePromise,
};
