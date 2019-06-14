const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c0edd7e111d453106e09ff75c17397b8/' + latitude + ',' + longitude + '?units=si';

    request({ url, json: true }, (error, response) => {

        const {currently} = response.body;
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback(response.body.error, undefined)
        } else {
            callback (
                undefined,
                'Now is ' + currently.temperature + ' degrees.',
                response.body.daily.data[0].summary
            )
        }
    })
}

module.exports = forecast;
