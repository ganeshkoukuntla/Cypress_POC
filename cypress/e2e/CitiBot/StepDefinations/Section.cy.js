// import { holdReady } from 'cypress/types/jquery';
import Home from '../PageObjects/home.cy'
import {Given, When, Then} from "cypress-cucumber-preprocessor/steps"
const HomePage = new Home();

When('click on Intents section',()=>{
    HomePage.clickOnIntentsSection();
});

Then('verify the Intents in citibot homepage',()=>{
    HomePage.verifyIntentsSectionPage();
});

When('Validate chatbox message for {string}',(Utterances)=>{
    HomePage.ValidateChatbotGeneric(Utterances);
});

When('close browser',()=>{
    HomePage.closeChartBotDialog();
})



