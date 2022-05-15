const request = require("request");

const forecast = (latitude = "", longitude = "", unit = "", callback) => {
    // request string
    const weather_stack_url =
        "http://api.weatherstack.com/current?access_key=bd897804075c7857422483c8c13a1a12&query=" +
        latitude +
        "," +
        longitude +
        "&units=" +
        unit;

    // call api
    request({ url: weather_stack_url, json: true }, (error, { body }) => {
        // error handling
        if (error) {
            callback("Unable to connect to weather services.", undefined);
        } else if (body.error) {
            callback(response.body.error, undefined);
        } else {
            // return data fetched from request
            callback(undefined, {
                current_temp: body.current.temperature,
                feels_like: body.current.feelslike,
                weather_description: body.current.weather_descriptions[0],
            });
        }
    });
};

module.exports = forecast;