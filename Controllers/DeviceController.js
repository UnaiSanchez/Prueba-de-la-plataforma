const mongoose = require('mongoose')
const DeviceModel = mongoose.model('Device')

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

