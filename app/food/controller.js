const path = require("path");
const fs = require("fs");
const FoodModel = require("./model");

// const store = async (req, res) => {
//     const {foodName, daysSinceIAte, foodImg} = req.body;
//     const food = new FoodModel({foodName: foodName, daysSinceIAte: daysSinceIAte, foodImg: foodImg});

//     try {
//         await food.save();
//         res.send("Inserted Data");
//     } catch (err) {
//         console.log(err)
//     }
// }

const store = async (req, res) => {
    const {foodName, daysSinceIAte} = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    await FoodModel.create({ 
        foodName,
        daysSinceIAte,
        foodImg: `http://localhost:3000/public/${image.originalname}`,
     })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

// const store = async (req, res) => {
//     const { foodName, daysSinceIAte } = req.body;
//     const image = req.file;
//     if (image) {
//       const target = path.join(__dirname, "../../uploads", image.originalname);
//       fs.renameSync(image.path, target);
//       await FoodModel.create({ 
//           foodName, 
//           daysSinceIAte,
//           foodImg: `http://localhost:3000/public/${image.originalname}`,
//        })
//         .then((result) => res.send(result))
//         .catch((error) => res.send(error));
//     }
//   };

module.exports = {
  store,
};
