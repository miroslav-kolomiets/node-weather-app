const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaWFtbWlybyIsImEiOiJjandzMGZ4NGQwMGhvNDhwNTN1M2hoOHZlIn0.mWPe1HiTGtwG49qVI1mmLg'

    request({ url, json: true }, (error, response) => {

        const {message, features} = response.body;
        
        if (error) {
            callback('Unable to connect to geolocate service!');
        } else if (message) {
            callback(message)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode;
