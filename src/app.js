const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publickDirectoryPath = path.join(__dirname, '../publlc');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//  Setup static directory to serve
app.use(express.static(publickDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help messege'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return console.log(error)
        }
    
        forecast(latitude, longitude, (error, forecastData, summary) => {
            if (error) {
                return console.log(error)
            }

            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address,
                summary: summary
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page is not exist'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})
