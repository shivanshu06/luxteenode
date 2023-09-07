const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Collections=require('./model/collections')

router.post('/:category?', (req, res, next) => {
    const categoryParam = req.params.category;
   
  
    if (Object.keys(req.body).length === 0) {
        if (!categoryParam) {
            // If no category is provided in the URL, fetch all data
            Collections.find()
              .exec()
              .then((result) => {
                console.log(result);
                res.status(200).json({
                  collections: result,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          } else {
            // If a category is provided in the URL, filter data by category
            Collections.find({ category: categoryParam })
              .exec()
              .then((result) => {
                console.log(result);
                res.status(200).json({
                  collections: result,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        ;
    } else {
      const collections = new Collections({
        productName: req.body.productName,
        price: req.body.price,
        discount: req.body.discount,
        category: req.body.category, 
      });
  
      collections
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            newCollections: result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    }
  });
  

module.exports=router