const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
const collectionsRoute=require('./api/routes/collections')
const paymentGateway=require('./api/routes/paymentgateway')
const bodyParsher=require('body-parser')

mongoose.connect('mongodb+srv://shivanshugaur6:qwertyuiop123@luxtee.laqr8tu.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.on('error',err=>{
    console.log('not connected')
})

mongoose.connection.on('connected',connected=>{
    console.log('connected successfully')
})


app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  
app.use(bodyParsher.urlencoded({extended:false}))
app.use(bodyParsher.json())

app.use('/collections',collectionsRoute)
app.use('/payment',paymentGateway)


app.use((req,res,next)=>{
    res.status(404).json({
        error:"url not found"
    })
})




module.exports =app