const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')


require('dotenv').config({path:'./variables.env'})


mongoose.connect(process.env.DATABASE)

mongoose.connection.on('error',function(error){
    console.log('database error:',error)
})


require('./Models/Device')
require('./Models/Data')

const app = express()


app.use(bodyParser())
app.use(cors())

app.get('/',function(req,res){
    res.send('funciona')
})

const routes = require('./Routes/Routes')
app.use('/',routes)

app.listen(process.env.PORT,function(){
    console.log('funcionando en el puerto', process.env.PORT)
})