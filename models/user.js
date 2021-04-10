const dbModel = require("../utilities/connection");

let userModel = {};

userModel.getProd = async (obj) => {
  let model = await dbModel.getProductConnection();
  let prod = await model.find({});
  if (prod) {
    let arr = [];
    for (let i of obj) {
      for (let j of prod) {
        if (i._id === j._id) {
          if (i.quantity > j.quantity) arr.push(i._id);
        }
      }
    }
    if (arr.length > 0) return arr;
    else {
      for (let i of obj) {
        let updatequan = await model.updateOne(
          { _id: i._id },
          { $inc: { quantity: -i.quantity } }
        );
      }
      return [];
    }
  } else {
    let err = new Error();
    err.status = 500;
    err.message = "No Item in Product List";
    throw err;
  }
};

userModel.prod = async () => {
  /* /product */
  let model = await dbModel.getProductConnection();
  let prod = await model.find().sort({ price: 1 }).limit(5);
  if (prod.length > 0) return prod;
  else {
    let err = new Error();
    err.status = 500;
    err.message = "Sorry! Server is busy,Please try again later";
    throw err;
  }
};

userModel.productList = async (category) => {
  let model = await dbModel.getProductConnection();
  let getproductList = await model.find({ idealFor: category });
  if (!getproductList || getproductList.length == 0) {
    let err = new Error();
    err.status = 500;
    err.message ="Sorry!Server is busy,Please try again later";
    throw err;
  } else return getproductList;
};

userModel.productDetail = async (category, pid) => {
  /* /product/category/id */
  let model = await dbModel.getProductConnection();
  let getproductDetail = await model.findOne({ idealFor: category, _id: pid });
  if (!getproductDetail) {
    let err = new Error();
    err.status = 500;
    err.message = "Sorry!Server is busy,Please try again later";
    throw err;
  } else return getproductDetail;
};
module.exports = userModel;
