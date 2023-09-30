const moongose=require('mongoose')
const contactusSchema=new moongose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        validate: {
          validator: function (value) {
            
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
          },
          message: 'Invalid email address format',
        },
      },
      phoneNumber:{
        type:Number,
        required:true,
        min:10
      },

      query:{
        type:String,
        required:true
      }
})

module.exports=moongose.model("contactus",contactusSchema)