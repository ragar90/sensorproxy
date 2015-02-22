module.exports =  {
  "stretch": {
    "description":"adafruit stretch sensor",
    "pin": 0,
    "driver":"analogSensor",
    "lowerLimit":0,
    "upperLimit":10000,
    "enabled":true
  },
  "compositionButton": {
    "description":"my button demo",
    "pin": 2,
    "driver": "button",
    "controlEventPush":"toggleComposition",
    "controlEventRelease":null,
    "enabled": true
  },
  "potentiometer": {
    "description":"rotary pot",
    "pin": 6,
    "driver":"analogSensor",
    "lowerLimit": 0,
    "upperLimit": 1100,
    "invert":true,
    "enabled":false
  },
  "softpot":{
    "description":"softpot resistor",
    "pin": 0,
    "driver":"analogSensor",
    "lowerLimit":0,
    "upperLimit":500,
    "enabled":true
  }
}
