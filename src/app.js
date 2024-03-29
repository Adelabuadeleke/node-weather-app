const path = require('path')
const  express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 5000


// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.json({extended:false}));



app.get('',(req, res) => {
  res.render('index', {
    title:'Weather',
    name:'KaMaL'
  })
})
app.get('/about',(req, res) => {
  res.render('about',{
    title:'About',
    name:'KaMaL'
  })
})

app.get('/help',(req, res)=>{
  res.render('help', {
    title:'Help',
    message:'This is our help page, having issues?, contact Us',
    name:'KaMaL'
  })
})

app.get('/weather', (req, res)=>{
  
  if (!req.query.address) {
    return res.send({
      error:'please provide an address'
    })
  } 
    geocode(req.query.address, (error, { latitude, longtitude, location} = {}) =>{
      if (error) {
        return res.send({error})
      }
      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
         return res.send({error})
        }

        res.send({
          address:req.query.address,
          forecast:forecastData,
          location
        })
      })
    })
    


})

app.get('/products', (req, res) =>{
  if(!req.query.search) {
    return res.send({
      error:'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/help/*', (req, res) => {
  res.render('404',{
    title:'Help',
    message:'Help article not found',
    name:'KaMaL'
  })
})

app.get('*',(req,res) => {
  res.render('404',{
    title:'Error',
    message:'Page not found',
    name:'KaMaL'
  })
})

app.listen(port, ()=>{
  console.log('Server is up on port ' + port)
})