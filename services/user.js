const validator = require("../utilities/validate");
const model = require("../models/user");

let userService = {};

userService.getProd=async(obj)=>{
  return await model.getProd(obj);
}
userService.prod=async()=>{
  return await model.prod();
}
userService.productList = async(category) => {
  return await model.productList(category);
};
userService.productDetail = async(category, pid) => {
  return await model.productDetail(category, pid);
};
module.exports = userService;
