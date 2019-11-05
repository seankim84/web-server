const request = require('request');

//callback 이란 자기자신을 한번더 호출하는 것을 의미한다
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2VhbmtpbSIsImEiOiJjazJnMHl6MW8wcTY0M2xvMDVlOHd3MzVsIn0.v2I7Y3x5djsMa_39oCUPJw`
    request({
        url: url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable connect to location System', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode;