const request = require("request")

const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoidmlzaG51MTI5NyIsImEiOiJjang2ODhiemQwOTZyNDltdzE2Z21jeGRoIn0.KQvrx7gtiiQPArhFPNR0Nw&limit=1"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to mapbox",undefined)
        }
        else if(body.features.length===0){
            callback("unable to find location",undefined)
        }
        else{
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode