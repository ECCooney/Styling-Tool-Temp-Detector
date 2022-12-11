"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login", viewData);
  },

  accountDetails(request, response) {
    const user = userstore.getUserByEmail(request.cookies.device);
    const viewData = {
      title: "Member Details",
      user: user,
    };
    response.render("accountDetails", viewData);
  },

  logout(request, response) {
    response.cookie("device", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/login");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("device", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.device;
    return userstore.getUserByEmail(userEmail);
  },

  editMember(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const updatedUser = {
      firstName: request.body.firstname,
      lastName: request.body.lastname,
      email: request.body.email,
    };
    userstore.updateUser(loggedInUser, updatedUser);
    const viewData = {
      title: "Account Details",
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
    };
    response.render("accountDetails", viewData);
  },
};

module.exports = accounts;
