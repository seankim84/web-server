const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/432750072e7cd4e174fae944e7e96bad/${latitude},${longitude}`
    request({ url, json: true }, (error, { body }) => {
        console.log(body)
        if (error) {
            callback('Unable open this file', undefined)
        } else {
            callback(undefined, body.daily.summary)
        }
    })
}

module.exports = forecast