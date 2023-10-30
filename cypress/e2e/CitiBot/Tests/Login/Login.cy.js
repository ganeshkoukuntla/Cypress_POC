import Login from '../../PageObjects/Login.cy'
import Home from '../../PageObjects/home.cy'
import {Given, When, Then} from "cypress-cucumber-preprocessor/steps"
const loginPage = new Login();
const HomePage = new Home();

Given('Open the citibot url', () => {
    cy.visit('/');
});

When('I enter username and password', () => {
    loginPage.enterUsername('rob@citibot.io');
    loginPage.enterPasssword('CitibotDev2020!');
});

When('click on login button', () => {
    loginPage.clickOnLoginButton();
});

Then('verify the Citibot homepage', () => {
    cy.wait(500);
    HomePage.verifyCitiBotLogo();
    HomePage.verifyOrganisationsSectionPage();
});

Then('Logout from citibot', () => {
    HomePage.clickOnLogoutButton();
    loginPage.VerifyLoginPageOpened();
});