const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  daysSinceIAte: {
    type: Boolean,
    require: true,
  },
  foodImg: {
    type: String
  }
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
