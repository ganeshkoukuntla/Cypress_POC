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
    HomePage.enterMessageAndSend(Utterances,['C2']);
    HomePage.verifyTheChartMessages(Utterances,['B3', 'B5', 'B6']);
    HomePage.enterMessageAndSend(Utterances,['C6']);
    HomePage.verifyTheChartMessages(Utterances,['B7']);
    HomePage.clickOnLinkInChartBox(Utterances,'C4','D4');
});

When('close browser',()=>{
    HomePage.closeChartBotDialog();
})



