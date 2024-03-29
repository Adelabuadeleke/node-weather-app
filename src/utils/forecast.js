const request = require('request');

const forecast = (latitude, longtitude, callback) => {
const url = ('http://api.weatherstack.com/current?access_key=2ae414fc267922aba6a4a95f9312c286&query=' + latitude + ',' + longtitude + '&unit=m')
  
request({url, json:true}, (error, {body}) =>{

  if(error) {
    callback('Unable to connect to weather services', undefined )
  } else if(body.error) {
    callback('Unable to find location', undefined)
  } else {
    callback(undefined, body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + 'degrees out ,it feels like ' + body.current.feelslike + 'degrees out, and the humidity is ' + body.current.humidity + '%')
  }

})
}

module.exports = forecast;