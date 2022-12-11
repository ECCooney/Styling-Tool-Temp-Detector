"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const deviceStore = {
  store: new JsonStore("./models/device-store.json", {
    deviceCollection: [],
  }),
  collection: "deviceCollection",

  getAllDevices() {
    return this.store.findAll(this.collection);
  },

  getDevice(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserDevices(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  addDevice(device) {
    this.store.add(this.collection, device);
    this.store.save();
  },
  
  removeDevice(id) {
    const device = this.getDevice(id);
    this.store.remove(this.collection, device);
    this.store.save();
  },
  
  addReading(id, reading) {
    const device = this.getDevice(id);
    device.readings.push(reading);
    this.store.save();
  },

  removeReading(id, readingId) {
    const device = this.getDevice(id);
    const readings = device.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
  },

  getReading(id, readingId) {
    const device = this.store.findOneBy(this.collection, { id: id });
    const readings = device.readings.filter(
      (reading) => reading.id == readingId
    );
    return readings[0];
  },

  updateDevice(device, updatedDevice) {
    device.name = updatedDevice.name;
    device.latitude = updatedDevice.latitude;
    device.longitude = updatedDevice.longitude;
    this.store.save();
  },
  
  
};


module.exports = deviceStore;
