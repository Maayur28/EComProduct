const validator = require("../utilities/validate");
const model = require("../models/user");

let userService = {};

userService.getProd=async(obj)=>{
  if(validator.getProd(obj))
  return await model.getProd(obj);
  else
  {
    let err = new Error();
    err.status = 400;
    err.message = "Items not found,Please check the items and try again";
    throw err;
  }
}
userService.prod=async()=>{
  return await model.prod();
}
userService.productList = async(category) => {
  if(validator.productList(category))
  return await model.productList(category);
  else
  {
    let err = new Error();
    err.status = 400;
    err.message = "URL not found,Please check the url and try again";
    throw err;
  }
};
userService.productDetail = async(category, pid) => {
  if(validator.productDetail(category,pid))
  return await model.productDetail(category, pid);
  else
  {
    let err = new Error();
    err.status = 400;
    err.message = "URL not found,Please check the url and try again";
    throw err;
  }
};
module.exports = userService;
