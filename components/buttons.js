var sensors = require('../config/sensors')
var guid = require('easy-guid')
var poster = require('../poster')

module.exports = {
  registerSocketHandlers:function(my, socket) {
    for(var sensorName in sensors) {
      var sensor = my[sensorName];

      if(!sensors.hasOwnProperty(sensorName)) continue
      if(!sensors[sensorName].enabled == true) continue

      if(sensors[sensorName].driver=='button') {
        //install handlers
        console.log("installing socket handler for sensor: " + JSON.stringify(my[sensorName]))
        var controlEventPush = sensors[sensorName].controlEventPush;
        my[sensorName].on('push',function() {
          if (socket) {
            socket.emit(controlEventPush, {time: (new Date()).getTime()});
          }
        })

        var controlEventRelease = sensors[sensorName].controlEventRelease;
        my[sensorName].on('release',function() {
          if (socket) {
            socket.emit(controlEventRelease, {time: (new Date()).getTime()});
          }
        })
      }
    }
  },

  //add individual handlers here
  registerCompositionHandler : function(my) {
    if (my.compositionButton != undefined) {
      my.compositionButton.on('push', function() {
        console.log("adding composition")
        var compName = guid.new(16) // composition name
        // post new composition
        var composition = {
          "name": compName,
          "tempo": 80,
          "created_by": 1,
          "created_at": (new Date()).getTime()
        }

        poster.postComposition(composition, function(err,data) {
          if (err) {
            return console.log("couldn't post new composition: " + JSON.stringify(err))
          }
          console.log(JSON.stringify(data))
          
          // outputs to LCD
          var Cylon = require('cylon');

          function writeToScreen(screen, message) {
            screen.setCursor(0,0);
            screen.write(message);
          }

          Cylon
            .robot({ name: 'LCD'})
            .connection('edison', { adaptor: 'intel-iot' })
            .device('screen', { driver: 'upm-jhd1313m1', connection: 'edison' })
            .on('ready', function(my) {
              console.log("lcd display goes here")
              writeToScreen(my.screen, "Playing " + compName);
            })
            .start();
          
        })
      })
    }
  }
}
