const conn = require("../../config/sequelize");
const path = require("path");
const fs = require("fs");
const Product = require("./model");

const getProducts = async (req, res) => {
  try {
    const product = await Product.findAll();
    //res.send(product);
    res.send({
      status: "success",
      response: product,
    });
  } catch (err) {
    console.log(err);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(product[0]);
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Product Deleted",
    });
  } catch (err) {
    console.log(err);
  }
};

const postProduct = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({
        users_id,
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3000/public/${image.originalname}`,
      });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};

const updateProduct = async (req, res) => {
  const { users_id, name, price, stock, status, image_url } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
  try {
    const product = await Product.update(
      {
        users_id,
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3000/public/${image.originalname}`,
      },
      {
        where: {
          id: req.params.id
        },
      });
      res.send({
        status: "success",
        response: product,
      });
  } catch (err) {
    res.send(err);
  }
}
};

// const updateProduct = async (req, res) => {
//   try {
//     const result = await Product.update(req.body, {
//       where: {
//         id: req.params.id
//       }
//     });
//     res.send(result);
//   } catch (err) {
//     console.log(err)
//   }
// }

module.exports = {
  getProducts,
  postProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
