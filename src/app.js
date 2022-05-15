const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express and handlebars config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// setup a route to serve handle bars template to users
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Leon Smith'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Leon Smith'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Leon Smith'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    address = req.query.address

    // get address location
    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, 'f', (error, { weather_description, current_temp, feels_like } = {}) => {

            if (error) {
                return res.send({
                    error: error
                })
            }

            currentLocation = 'Current weather in ' + location
            weatherMessage = weather_description + '. It is currently ' + current_temp + ' degrees out. It feels like ' + feels_like + ' degrees outside.'

            res.send({
                location: location,
                tempurature: current_temp,
                address: address,
                message: {
                    location: currentLocation,
                    forecast: weatherMessage
                }
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// setup 404 page
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Leon Smith',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Leon Smith',
        errorMessage: 'Page not found'
    })
})

// Starts the web server
app.listen(3000, () => {
    console.log('Web server is up on port 3000')
})