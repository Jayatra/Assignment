const express = require('express')
const ProductDb = require('../model/model')
const router = express.Router();


//SUBMITS A POSTS
router.post('/',async (req,res)=>{
    const productDetails = new ProductDb({
        name:req.body.name,
        price:req.body.price
    });
        try{
            const savedData = await productDetails.save();
            res.json(savedData);
        }
        catch(err){
            res.status(200).json({message:err})
        }
})

//DELETE A POST
router.delete('/:productDetailsId',async (req,res)=>{
    try{
     const removedProduct = await ProductDb.remove({_id:req.params.postId});
     res.json(removedProduct);
    }
    catch(err){
     res.status(200).json({message:err})
    }
 })
 
 //Update A POST
 router.patch('/:productDetailsId',async (req,res)=>{
     try{
      const updatedProduct = await ProductDb.updateOne({_id:req.params.productDetailId},{$set:{ name:req.body.name,
        price:req.body.price}});
      res.json(updatedProduct);
     }
     catch(err){
      res.status(200).json({message:err})
     }
  })
  
 module.exports = router