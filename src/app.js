const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path= require('path')
const express= require('express')
const hbs=require('hbs')

const app=express()
const port=process.env.PORT || 3000

//define paths for express config
const dir=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

//setup static directory to serve
app.use(express.static(dir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Hamdi Nait Limam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hamdi Nait Limam'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Hamdi Nait Limam'
    })
})

app.get('/weather', (req, res) => {
   if(!req.query.address){
    return res.send({
        error:'Please provide an address'
    })
   }
   geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
     if (error){
         return res.send({error})
     }
     forecast(latitude,longitude,(error,forecastData)=>{
         if(error){
            return  res.send({error})
         }
         res.send({
             forecast:forecastData,
             location,
             address:req.query.address
         })
     })
   })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Hamdi Nait Limam',
        Errormsg:"Help Page Not Found"
    })
})


app.get('*',(req,res)=>{
   res.render('error',{
    title:'404',
    name:'Hamdi Nait Limam',
    Errormsg:"Page Not Found"
   })
})

app.listen(port,()=>{
    console.log('Server is up on Port '+ port)
})