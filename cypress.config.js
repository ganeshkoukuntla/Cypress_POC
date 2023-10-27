const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const { configureAllureAdapterPlugins } = require('@mmisty/cypress-allure-adapter/plugins');
module.exports = defineConfig({
  e2e: {
    env: {
      allure: true,
    },
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      configureAllureAdapterPlugins(on, config);
  
      return config;
    },
    testIsolation: false,
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
    baseUrl:'https://webchat-admin.staging.citibot.io/login',
  },
});