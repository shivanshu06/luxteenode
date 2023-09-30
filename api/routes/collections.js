const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Collections = require('./model/collections')
// const multer=require('multer')
// const path=require('path')




router.post('/:category?', (req, res, next) => {

  
    const categoryParam = req.params.category;

    if (Object.keys(req.body).length === 0) {
        if (!categoryParam) {
            // If no category is provided in the URL, fetch all data
            Collections.find()
              .exec()
              .then((result) => {
                const collectionsWithDiscount = result.map(item => ({
                  ...item._doc,
                  priceAfterDiscount: calculateDiscount(item.price, item.discount),
                }));

                res.status(200).json({
                  collections: collectionsWithDiscount,
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
                const collectionsWithDiscount = result.map(item => ({
                  ...item._doc,
                  priceAfterDiscount: calculateDiscount(item.price, item.discount),
                }));

                res.status(200).json({
                  collections: collectionsWithDiscount,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
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
          const newCollectionWithDiscount = {
            ...result._doc,
            priceAfterDiscount: calculateDiscount(result.price, result.discount),
          };

          res.status(200).json({
            newCollections: newCollectionWithDiscount,
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

router.get('/:id',(req,res,next)=>{
    console.log(req.params.id)
    Collections.findById(req.params.id)
    .then(result=>{
      const collectionWithDiscount = {
        ...result._doc,
        priceAfterDiscount: calculateDiscount(result.price, result.discount),
      };

      res.status(200).json({
        collections: collectionWithDiscount,
      });
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json({
        error:err
      })
    })
    
});

function calculateDiscount(price, discount) {
    // Calculate the price after discount
    const priceAfterDiscount = price - (price * (discount / 100));
    return priceAfterDiscount;
}

module.exports = router;
