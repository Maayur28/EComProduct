const joi=require('joi');

let validator={};
validator.getProd=(obj)=>{
    const schema= joi.object({
      idealFor: joi.string().valid('men','women','kids').required(),
      pid:joi.number().min(1).required(),
      quantity:joi.number().min(1).max(5).required()
    })
    for(let i of obj)
    {
        console.log(i);
        let prod={};
        prod.idealFor=i.idealFor;
        prod.pid=i._id;
        prod.quantity=i.quantity;
        const {error,value}=schema.validate(prod)
        if(error)
        return false;
    }
    return true;
}
validator.productList=(obj)=>{
    const schema= joi.string().valid('men','women','kids').required()
    const {error,value}=schema.validate(obj)
    if(error)
    return false;
    else
    return true;
}

validator.productDetail =(category, pid) => {
    let obj={};
    obj.category=category;
    obj.pid=+pid;
    const schema= joi.object({
      category: joi.string().valid('men','women','kids').required(),
      pid:joi.number().min(1).required()
    }) 
    const {error,value}=schema.validate(obj)
    if(error)
    return false;
    else
    return true;
}

module.exports=validator;