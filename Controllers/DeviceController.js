const mongoose = require('mongoose')
const DeviceModel = mongoose.model('Device')
const nodemailer = require('nodemailer')
require('dotenv').config({path: '../variables.env'})
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.MAIL_ACCOUT,
        pass:process.env.MAIL_PASSWORD
    },
    tls:{
        rejectUnauthorized: false
    }
})
module.exports.createDevice = function(req,res){
    const name = req.body.name
    const type = req.body.type
    if(!name){
        res.status(400).send('Sin nombre')
    }
    const newDevice = new DeviceModel({
        name: name,
        type: type
    })
    newDevice.save().then(function(device){
        if(device){
            res.status(200).send('Ha funchionado')
        }else{
            res.status(400).send('no funchiona')
        }
    })
}
module.exports.getDevices = function(req,res){
    DeviceModel.find({}).then(function(devices){
        res.json(devices)
    })
}

module.exports.getDeviceById = function(req,res){
    const deviceId= req.query.id
    DeviceModel.findById(deviceId).then(function(device){
        if(device) {
            res.json(device)
        }else{
            res.status(400).send('no existe')
        }
    })
    .catch(function(error){
        res.status(400)
    })
}
module.exports.updateDevice = function(req,res){
    const deviceId= req.body.deviceId
    const newStatus=req.body.status
    console.log(deviceId)
    console.log(newStatus)
    DeviceModel.findByIdAndUpdate(deviceId,{status:newStatus}).then(function(device){
        if(device){
            res.status(200).send('update')

        }else{
            res.status(400).send('nooooo, erior al upadting')
        }
    })
}
module.exports.sendEmail = function(req,res){
    const deviceId = req.body.deviceId
    const date = new Date()
    const dateFormatted = date.toISOString()
    console.log(deviceId)
    const mailOptions={
        from: process.env.MAIL_ACCOUT,
        to:'unai.san.rod@techtalents.club',
        subject: dateFormatted + '|| ¡¡Un aviso en nombre de tu dispositivo :' + deviceId + ' !!',
        html:`<p>El dispositivo con ID:${deviceId} te ha enviado una alerta a ${dateFormatted} </p>`
    }
    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            console.log(err)
            res.status(400).json(err)
        }else{
            console.log(info)
            res.status(200).json(info)
        }
    })
}

