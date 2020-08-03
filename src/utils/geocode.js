const request = require('request');



const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRlbGVrZTEwMCIsImEiOiJja2QzcHRiMmsxaDl0MnJxdnBuczJtazAxIn0.siNKhx740PPQZssrI_Sd-w'

  request({url, json:true}, (error, {body} ={}) => {
    if(error) {
      callback('unable to connect to location services!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location, Try another search')
    } else {
      callback(undefined, {
        latitude:body.features[0].center[1],
        longtitude:body.features[1].center[0],
        location:body.features[0].place_name
      })
    }
  })
}




module.exports = geocode;