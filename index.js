const Bobaos = require("bobaos.sub");
const BobaosAccessory = require("./lib/accessory");

let Service, Characteristic;
let myBobaos;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerPlatform("homebridge-bobaos", "Bobaos", BobaosPlatform);
};

function BobaosPlatform(log, config) {
  this._config = {};
  this.log = log;
  if (Object.prototype.hasOwnProperty.call(config, "redis")) {
    myBobaos = new Bobaos(config["redis"]);
  } else {
    myBobaos = new Bobaos();
  }
  myBobaos.setMaxListeners(0);
  myBobaos.on("error", e => {
    console.log(`Bobaos error: ${e.message}`);
  });
  if (Object.prototype.hasOwnProperty.call(config, "accessories")) {
    this._config.accessories = config["accessories"].slice();
  }
}

BobaosPlatform.prototype = {
  accessories: function(cb) {
    let foundAccessories = [];
    let params = {
      Service: Service,
      Characteristic: Characteristic,
      Bobaos: myBobaos,
      log: this.log
    };
    this._config.accessories.forEach(a => {
      let newAccessory = new BobaosAccessory(Object.assign({ accessory: a }, params));
      foundAccessories.push(newAccessory);
    });
    cb(foundAccessories);
  }
};
