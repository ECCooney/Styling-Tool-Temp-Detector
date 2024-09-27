"use strict";

const express = require("express");
const router = express.Router();

const about = require("./controllers/about.js");
const dashboard = require("./controllers/dashboard.js");
const device = require('./controllers/device.js');
const accounts = require('./controllers/accounts.js');


//accounts
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/account', accounts.accountDetails);
router.post('/accounts/editmember', accounts.editMember);

//dashboards
router.get("/dashboard", dashboard.index);
router.get('/dashboard/deletedevice/:id', dashboard.deleteDevice);
router.post('/dashboard/adddevice', dashboard.addDevice);


//devices
router.get("/device/:id", device.index);
router.get('/device/:id/deletereading/:readingid', device.deleteReading);
router.post('/device/:id/addreading', device.addReading);

//about
router.get("/about", about.index);


module.exports = router;
