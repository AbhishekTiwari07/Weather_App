const path = require('path')
const express = require('express')
const hbs = require('hbs')
const location = require('./geocoding.js')
const forecast = require('./weather.js')
const app = express()

const dirViews = path.join(__dirname,'../template/views')
const dirPartials = path.join(__dirname,'../template/partials')
const dirPublic = path.join(__dirname,'../public')

//setup handlebars
app.set('views', dirViews)
app.set('view engine', 'hbs')
hbs.registerPartials(dirPartials)

app.use(express.static(dirPublic))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"JUZo"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"JUZo"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"JUZo"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
        return res.send('Please provide address!!!')
    location.geocoding(req.query.address,(error,{latitude,longitude,place})=>{
    if(error)
        return res.send({error})
    else {
        forecast.weather(latitude,longitude,(error,{temp,humidity})=>{
            if(error)
                return res.send({error})
            return res.send({
                temp,
                humidity,
            })
            })
        }
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Page not Found",
        errorContent:"Try help section",
        name:"JUZo"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:"Page not Found",
        errorContent:"Try other Pages",
        name:"JUZo"
    })
})

app.listen(3000,(error)=>{
    if(error)
        console.log(error)
    else
        console.log('Server is up on port 3000')
})
