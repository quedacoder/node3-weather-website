const request = require('request')

const geocode = (address = '', callback) => {

    // build request string
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicXVlZGFjb2RlciIsImEiOiJja2dtaWY5YzcwNndvMnlyemIwYWw4OGt0In0.Isc-wv6V4p0XtHApZxkYpg'

    // api request to mapapi
    request({ url: mapUrl, json: true }, (error, { body } = {}) => {

        // error handling
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (!body.features[0]) {
            callback('Unable to find location. Please try a different search.', undefined)
        } else {
            // return longitude, latitude, and location of search
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

// export the function
module.exports = geocode