import Login from '../../PageObjects/Login.cy'
import Home from '../../PageObjects/home.cy'
import {Given, When, Then} from "cypress-cucumber-preprocessor/steps"
const loginPage = new Login();
const HomePage = new Home();

Given('Open the citibot url', () => {
    cy.visit('/');
    loginPage.getLoginPage().should('be.visible');
});

When('I enter username and password', () => {
    loginPage.getUserName().type('rob@citibot.io');
    loginPage.getPassword().type('CitibotDev2020!');
});

When('click on login button', () => {
    loginPage.getLoginButton().click();
});

When('Verifying the Organisations page', () => {
    cy.wait(5);
    HomePage.getCitiBotLogo().should('be.visible');
    HomePage.getOrganisationsSectionPage().should('be.visible');
});

When('click on Intents section',()=>{
    HomePage.getIntentsSection().click();
});

Then('verify the Intents in citibot homepage',()=>{
    HomePage.getIntentsSectionPage().should('be.visible');
});

Then('Logout from citibot', () => {
    HomePage.getLogoutButton().click();
    loginPage.getLoginPage().should('be.visible');
});
