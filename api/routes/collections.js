const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Collections=require('./model/collections')

router.post('/',(req,res,next)=>{
    if(Object.keys(req.body).length===0){
        Collections.find()
        .exec()
        .then((result)=>{
            console.log(result)
            res.status(200).json({
                collections:result
            })

        })

        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
    }

    else{

    
    const collections=new Collections({
        // _id:mongoose.Schema.Types.ObjectId,
        productName:req.body.productName,
        price:req.body.price,
        discount:req.body.discount,
        category:req.body.category

    })
    collections.save()
    .then(result=>{
        console.log(result)
        res.status(200).json({
            newCollections:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
}
})

module.exports=router