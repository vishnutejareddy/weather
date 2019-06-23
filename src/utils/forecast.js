const request = require("request")

const forecast = (longitude,latitude,callback)=>{
    const url = "https://api.darksky.net/forecast/7b1e8d03b24ef13bc0644beb5a27e58e/"+encodeURIComponent(longitude)+","+encodeURIComponent(latitude)
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to darksky",undefined)
        }
        else if(body.error){
            callback("unable to find coordinates",undefined)
        }
        else{
            callback(undefined,body.currently.summary+". The temperature is "+body.currently.temperature)
        }
    })
}

module.exports = forecast