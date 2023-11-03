import chartBots from '../PageObjects/chartBots'
import {Given, When, Then} from "cypress-cucumber-preprocessor/steps"
const chartBotsPage = new chartBots();
Given('launch html - {word}',(filename)=>{
    chartBotsPage.navigateToURL(filename);
});

Given('click chatbox',()=>{
    chartBotsPage.clickOnChartBox();
    
});

When('Validate chatbox message for {string}',(Utterances)=>{
    chartBotsPage.ValidateChatbotGeneric(Utterances);
});

When('close browser',()=>{
    chartBotsPage.closeChartBotDialog();
})



