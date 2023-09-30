const mongoose=require('mongoose')

const collectionsSchema=new mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    // image:{
    //     type:String,
    //     required:true
    // },
    

    productName: {
        type: String,
        required: true, 
    },
    price: {
        type: Number,
        required: true, 
    },
    discount: {
        type: Number,
        required: true, 
    },
    category:{
        type:String,
        required:true,

    },
    image1: {
        type: String,
        required: true, // You can change this to false if images are optional
    },
    image2: {
        type: String,
        required: true, // You can change this to false if images are optional
    },
        
    
})

module.exports=mongoose.model('Collections',collectionsSchema)