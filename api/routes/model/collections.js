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

    }
        
    
})

module.exports=mongoose.model('Collections',collectionsSchema)