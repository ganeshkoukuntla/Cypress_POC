const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const { configureAllureAdapterPlugins } = require('@mmisty/cypress-allure-adapter/plugins');
const { readXlsx, getNumberOfRows } = require('./cypress/plugins/read_excel')
module.exports = defineConfig({
  e2e: {
    env: {
      allure: true,
    },
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      configureAllureAdapterPlugins(on, config);
      on('task', {
        readXlsx: (args) => {
          const { filename, sheetName, cellReference } = args;
          return readXlsx(filename, sheetName, cellReference).then((result) => {
            return result;
          });
        }
      });
      on('task', {
        getNumberOfRows: (args) => {
          const { filename, sheetName } = args;
          return getNumberOfRows(filename, sheetName).then((result) => {
            return result;
          });
        }
      });
      return config;
    },
    testIsolation: false,
    defaultCommandTimeout: 30000,
    watchForFileChanges: false,
    chromeWebSecurity: false,
  },
});