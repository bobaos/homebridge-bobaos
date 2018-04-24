const BdsdClient = require('bdsd.client');
const BobaosAccessory = require('./lib/accessory');

let Service, Characteristic;
let myBobaos;

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerPlatform("homebridge-bobaos", "Bobaos", BobaosPlatform);
};

function BobaosPlatform(log, config) {
  this._config = {};
  this.log = log;
  if (Object.prototype.hasOwnProperty.call(config, 'sockfile')) {
    myBobaos = new BdsdClient(config['sockfile']);
  } else {
    myBobaos = new BdsdClient();
  }
  if (Object.prototype.hasOwnProperty.call(config, 'accessories')) {
    this._config.accessories = config['accessories'].slice();
  }
}

BobaosPlatform.prototype = {
  accessories: function (cb) {
    let foundAccessories = [];
    let params = {
      Service: Service,
      Characteristic: Characteristic,
      Bobaos: myBobaos,
      log: this.log
    };
    this._config.accessories.forEach(a => {
      let newAccessory = new BobaosAccessory(Object.assign({accessory: a}, params));
      foundAccessories.push(newAccessory);
    });
    cb(foundAccessories);
  }
};
