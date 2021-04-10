const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require('dotenv').config();

const url = process.env.URL;
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const productSchema = mongoose.Schema({
  _id: { type: Number, required: [true, "_id is required"] },
  name: { type: String, required: [true, "Name is required"] },
  description: { type: String, required: [true, "Description is required"] },
  rating: { type: Number, required: [true, "Rating is required"] },
  idealFor: {
    type: String,
    enum: {
      values: ["men", "women", "kids"],
      message: "Ideal for either Men,Women or Kids",
    },
  },
  category: {
    type: String,
    enum: {
      values: ["Sports", "Casual", "Formal"],
      message: "Category should be either Sports,Casual or Formal",
    },
  },
  size:{type:[String],required:[true,"Size is required"]},
  price: { type: Number, required: [true, "Price is required"] },
  color: { type: [String], required: [true, "Color is required"] },
  image: { type: [String], required: [true, "Image is required"] },
  discount: { type: Number },
  quantity: { type: Number, required: [true, "Quantity is required"] },
  shippingCharges: { type: Number },
});

let connection = {};
connection.getProductConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url, options);
    let model = dbConnection.model("Product", productSchema,"products");
    return model;
  } catch (error) {
    let err = new Error("Could not establish connection with database");
    err.status = 500;
    throw err;
  }
};
module.exports = connection;
