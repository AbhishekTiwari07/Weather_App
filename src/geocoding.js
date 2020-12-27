const request = require('request')
const log = console.log

const geocoding = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoianV6byIsImEiOiJja2l3YmIycm4wdGU3MnRuejJ2MXJvcjNhIn0.P2V7-BtHEpGQ7gyBJCUqvg"

    request({url:url,json:true},(error,response)=>{
        if(error)
            callback(error.code,{
                latitude: undefined,
                longitude: undefined,
                place: undefined
            })
        else if(address==''||response.body.features.length==0)
            callback('Invalid location',{
                latitude: undefined,
                longitude: undefined,
                place: undefined
            })
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            })
        }
    })
}

module.exports ={
    geocoding,
}
