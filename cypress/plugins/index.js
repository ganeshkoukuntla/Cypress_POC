
const cucumber = require("cypress-cucumber-preprocessor").default;
const allureWriter = require('cypress-allure-plugin/writer');
module.exports = (on, config) => {

    on("file:preprocessor", cucumber());
    allureWriter(on, config); return config;
};

