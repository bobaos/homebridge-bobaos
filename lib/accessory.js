let Service, Characteristic;
let Bobaos;

const MyServices = require('./MyServices/00_index');

function BobaosAccessory(params) {
  Service = params.Service;
  Characteristic = params.Characteristic;
  Bobaos = params.Bobaos;
  this.log = params.log;
  this._name = params.accessory.name;
  this._services = params.accessory.services.slice();
  this.services = [];

  // Create information service for accessory.
  let informationService = new Service.AccessoryInformation();
  informationService
    .setCharacteristic(Characteristic.Manufacturer, "Bobaos")
    .setCharacteristic(Characteristic.Model, "<unknown>")
    .setCharacteristic(Characteristic.SerialNumber, "<unknown>");
  this.services.push(informationService);
  // Now parse _services, create service for each of them.
  this._services.forEach(s => {
    // Now get characteristics from config.
    let newService;
    let params = {
      Service: Service,
      Characteristic: Characteristic,
      Bobaos: Bobaos,
      log: this.log,
      config: s
    };
    const findByServiceType = t => {
      return t.type === s.type
    };
    const MyService = MyServices.find(findByServiceType);
    if (MyService) {
      newService = MyService.init(params);
    } else {
      throw new Error('Cannot find service: ' + s.type);
    }
    this.services.push(newService);
  })
}

BobaosAccessory.prototype.getServices = function () {
  return this.services;
};

module.exports = BobaosAccessory;