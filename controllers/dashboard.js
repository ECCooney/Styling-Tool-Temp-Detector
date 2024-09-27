"use strict";
const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const deviceStore = require("../models/device-store");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");

    const loggedInUser = accounts.getCurrentUser(request);
    const devices = deviceStore.getUserDevices(loggedInUser.id);
    devices.sort((a, b) => a.name.localeCompare(b.name));

    const viewData = {
      title: "Style Control Dashboard",
      devices: devices,
      user: loggedInUser,
    };
    logger.info("about to render", deviceStore.getAllDevices());
    response.render("dashboard", viewData);
  },

  deleteDevice(request, response) {
    const deviceId = request.params.id;
    logger.debug(`Deleting device ${deviceId}`);
    deviceStore.removeDevice(deviceId);
    response.redirect("/dashboard");
  },

  addDevice(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newdevice = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      type: request.body.type,
      chart: request.body.chart,
      newRead: {},
      readings: [],
    };
    deviceStore.addDevice(newdevice);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;