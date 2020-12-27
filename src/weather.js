const request = require('request')
const log = console.log

const forecast = (lat,lon,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=90daee0ec4620fcd718dd425a6f7ee6c&units=metric'
    request( {url:url,json:true} , (error,response)=>{
        if(error)
            callback(error,{
                temp:undefined,
                humidity: undefined,
            })
        else if(response.body.cod != 200)
            callback(error,{
                temp:undefined,
                humidity: undefined,
            })
        else
            callback(undefined,{
                temp:response.body.main.temp,
                humidity: response.body.main.humidity,
            })
    })
}
module.exports = {
    weather: forecast
}
