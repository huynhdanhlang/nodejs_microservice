const express = require("express");
const cors = require("cors");
const { customer, appEvents } = require("./api");
const { CreateChannel, SubscribeMessage } = require("./utils");
const ErrorHandler = require("./utils/error-handler");

/**
 *
 * @param {express.Application} app
 */
module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));
  app.use((req, res, next) => ErrorHandler(null, req, res, next));

  //api
  // appEvents(app);

  const channel = await CreateChannel();

  customer(app, channel);
  // error handling
};
