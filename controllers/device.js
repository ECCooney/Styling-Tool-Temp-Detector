"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const deviceStore = require("../models/device-store.js");
const uuid = require("uuid");

const device = {
    index(request, response) {
    const deviceId = request.params.id;

    const device = deviceStore.getDevice(deviceId);

    const type = device.type;

    const viewData = {
      title: "Device",
      device: device,
    };
    response.render("device", viewData);
  },

  deleteReading(request, response) {
    const deviceId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting reading ${readingId} from Device ${deviceId}`);
    deviceStore.removeReading(deviceId, readingId);
    response.redirect("/device/" + deviceId);
  },

  addReading(request, response) {
    const deviceId = request.params.id;
    const device = deviceStore.getDevice(deviceId);

    const newReading = {
      id: uuid.v1(),
      temperature: request.body.temperature,
      status: request.body.status,
      onSince: request.body.onSince,
      date: new Date().toLocaleString(), //reads 1 HOUR BEHIND! GMTString does the same as does all other functions
    };
    deviceStore.addReading(deviceId, newReading);
    response.redirect("/device/" + deviceId);
  },

};

module.exports = device;
