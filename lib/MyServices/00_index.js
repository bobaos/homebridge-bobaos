const MyFanAccessory = require('./02_fan');
const MyLightBulbAccessory = require('./04_lightbulb');

module.exports = [
  {
    type: "Fan",
    init: MyFanAccessory
  },
  {
    type: "Lightbulb",
    init: MyLightBulbAccessory
  }
];