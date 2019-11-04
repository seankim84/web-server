const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
 
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views') 
const paritalsPath = path.join(__dirname, '../templates/partials'); 

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(paritalsPath)
app.use(express.static(publicDirectoryPath));
 
app.get('', (req, res) => {
    res.render('index',  {
        title: 'Weather App',
        name: "Seankim"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Seankim',
        name: "Rebekah"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        name: "Help"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'You must provide  a address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location})=> {
        if(error){
            return res.send({ error })
        } 
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({ 
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
}); 

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query) //주소에 search?뒤에 붙는게 query
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.send('Help articles not founded');
})

app.get('*', (req, res) => { // 어떠한 route 와도 일치하지 않으면 404page 출력
    res.render('404', {
        title: '404',
        name: "Seankim Page is error",
        errorMessage:'Page not found'
    })
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sever start with ${PORT}`)   
})