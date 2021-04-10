const express = require('express');
const routes=express.Router();
const service=require('../services/user');

routes.put('/getprod',async(req,res,next)=>{
    try {
        let getprod=await service.getProd(req.body);
        res.json({prod:getprod}).status(200);
    } catch (error) {
        next(error);
    }
})

routes.get('/product',async(req,res,next)=>{
    try {
        let prod=await service.prod();
        res.json({prod:prod}).status(200);
    } catch (error) {
        next(error);
    }
})


routes.get('/product/:category',async(req,res,next)=>{
    let category=req.params.category;
    try {
        let productList=await service.productList(category);
        res.status(200);
        res.send(productList);
    } catch (error) {
        next(error);
    }
})
routes.get('/product/:category/:pid',async(req,res,next)=>{
    let category=req.params.category;
    let pid=req.params.pid;
    try {
        let productDetail=await service.productDetail(category,pid);
        res.status(200);
        res.send(productDetail);
    } catch (error) {
        next(error);
    }
})
module.exports=routes;