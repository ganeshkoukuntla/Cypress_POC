
class Homepage {
    homePage_organisationsSection = '//section[@class="list"]//*[contains(text(),"Organisations")]';
    homePage_IntentsSection = '//section[@class="list"]//*[contains(text(),"Intents")]';
    homePage_IntentsPage = '//*[@class="intents"]'
    homePage_organisationsPage = '//*[@class="organisation"]'
    homePage_citiBotLogo = '[class="logo"]';
    homePage_logoutButton = '[class="logOut-btn"]';
    homePage_chartBox = '//div[@id="root"]//img';
    homePage_chartBoxDialog = '//h3[contains(text(),"Ask Winter Haven")]';
    homePage_chartBoxDialogFirstChartText = '//div[contains(@class,"MessageCard_textColorBot")]'
    homePage_chartBoxDialogChartText = '//div[contains(@class,"MessageCard_textColorBot") and contains(text(),"chartText")]'
    homePage_messageInputBox = '//input[contains(@class,"MuiInputBase-input")]'
    homePage_messageSendButton = '//button[contains(@class,"message-box_sendButton")][2]'
    homePage_chartBoxUserMessage = '//div[contains(@class,"MessageCard_textColorUser") and contains(text(),"chartText")]'
    homePage_chartBoxLink = '//div[contains(@class,"MessageCard_links")]//span[contains(text(),"linkText")]/../..//a'
    homePage_visitUsPageLogo = '//a[@id="ember5"]//img[@alt="City of Winter Haven Logo"]'
    homePage_chartBoxDialogCloseButton = '//div[@id="root"]//img'



    clickOnOrganisationsSection() {
        cy.xpath(this.homePage_organisationsSection).should('be.visible');
        cy.xpath(this.homePage_organisationsSection).click();
    }

    clickOnIntentsSection() {
        cy.xpath(this.homePage_IntentsSection).should('be.visible');
        cy.xpath(this.homePage_IntentsSection).click();
    }

    verifyIntentsSectionPage() {
        cy.xpath(this.homePage_IntentsPage).should('be.visible');
    }

    verifyOrganisationsSectionPage() {
        cy.xpath(this.homePage_organisationsPage).should('be.visible');
    }

    verifyCitiBotLogo() {
        cy.wait(500);
        cy.get(this.homePage_citiBotLogo).should('be.visible');
    }

    clickOnLogoutButton() {
        cy.get(this.homePage_logoutButton).should('be.visible');
        cy.get(this.homePage_logoutButton).click();
    }

    clickOnChartBox() {
        cy.xpath(this.homePage_chartBox).should('be.visible');
        cy.xpath(this.homePage_chartBox).click();
    }

    verifyChartBoxOpened() {
        cy.frameLoaded("#citibot");
        cy.iframe().xpath(this.homePage_chartBoxDialogFirstChartText).click();
        cy.iframe().xpath(this.homePage_chartBoxDialogFirstChartText).invoke('text').then((text) => {
            cy.readExcelCell({
                filename: 'AskWinterHeaven1.xlsx',
                sheetName: 'Broken tree',
                cellReference: 'B2',
            }).then((cellValue) => {
                const excelText = cellValue.v.replace(/\r/g, '').trim;
                expect(excelText).to.equal(text.replace("I\\", 'I').trim);
            });
        });

    }
    enterMessageAndSend(sheetName, cellValues) {
        for (let i = 0; i < cellValues.length; i++) {
            cy.readExcelCell({
                filename: 'AskWinterHeaven1.xlsx',
                sheetName: sheetName,
                cellReference: cellValues[i],
            }).then((cellValue) => {
                cy.frameLoaded("#citibot");
                cy.iframe().xpath(this.homePage_messageInputBox).click();
                cy.iframe().xpath(this.homePage_messageInputBox).type(cellValue.v);
                cy.iframe().xpath(this.homePage_messageInputBox).invoke('text').then((text) => {
                    cy.iframe().xpath(this.homePage_messageInputBox).should('have.value', cellValue.v);
                    cy.iframe().xpath(this.homePage_messageSendButton).should('be.visible');
                    cy.iframe().xpath(this.homePage_messageSendButton).click();
                    cy.iframe().xpath(this.homePage_chartBoxUserMessage.replace('chartText',cellValue.v)).invoke('text').then((userMessage) => {
                        expect(userMessage).to.equal(cellValue.v);
                    });
                });
            });
        }
    }

    verifyTheChartMessages(sheetName, cellValues) {
        for (let i = 0; i < cellValues.length; i++) {
            cy.readExcelCell({
                filename: 'AskWinterHeaven1.xlsx',
                sheetName: sheetName,
                cellReference: cellValues[i],
            }).then((cellValue) => {
                cy.frameLoaded("#citibot");
                cy.iframe().xpath(this.homePage_chartBoxDialogChartText.replace('chartText',cellValue.v)).should('have.length', 1);
                cy.iframe().xpath(this.homePage_chartBoxDialogChartText.replace('chartText',cellValue.v)).should('have.length', 1).should('exist');
                cy.iframe().xpath(this.homePage_chartBoxDialogChartText.replace('chartText',cellValue.v)).invoke('text').then((chartMessage) => {
                    expect(chartMessage).to.equal(cellValue.v);
                });
            });
        }
    }

    clickOnLinkInChartBox(sheetName, linkCellValue) {
        cy.readExcelCell({
            filename: 'AskWinterHeaven1.xlsx',
            sheetName: sheetName,
            cellReference: linkCellValue,
        }).then((linkCellValue) => {
            cy.frameLoaded("#citibot");
            cy.iframe().xpath(this.homePage_chartBoxLink.replace('linkText', linkCellValue.v)).should('have.length', 1);
            cy.iframe().xpath(this.homePage_chartBoxLink.replace('linkText', linkCellValue.v)).should('exist');
            cy.iframe().xpath(this.homePage_chartBoxLink.replace('linkText', linkCellValue.v)).invoke('removeAttr', 'target').click({ force: true });
            cy.wait(10000);
            cy.iframe().xpath(this.homePage_visitUsPageLogo).should('exist');
        });
    }
    closeChartBotDialog(){
        cy.xpath(this.homePage_chartBoxDialogCloseButton).should('be.visible');
        cy.xpath(this.homePage_chartBoxDialogCloseButton).click();
    }
    
}

export default Homepage

