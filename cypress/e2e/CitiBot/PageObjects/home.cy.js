const XLSX = require('xlsx');
const path = require('path');
let excelFileName;

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
    homePage_chartBoxDialogChartText = "//div[contains(@class,'MessageCard_textColorBot') and contains(text(),'chatText')]"
    homePage_messageInputBox = '//input[contains(@class,"MuiInputBase-input")]'
    homePage_messageSendButton = '//button[contains(@class,"message-box_sendButton")][2]'
    homePage_chartBoxUserMessage = '//div[contains(@class,"MessageCard_textColorUser") and contains(text(),"chatText")]'
    homePage_chartBoxLink = '//div[contains(@class,"MessageCard_links")]//span[contains(text(),"linkText")]/../..//a'
    homePage_visitUsPageLogo = '//a[@id="ember5"]//img[@alt="City of Winter Haven Logo"]'
    homePage_chartBoxDialogCloseButton = '//div[@id="root"]//img'
    chatMessage = "(//div[@class='MessageCard_textColorBot__3mBal'])[PARAMETER]";


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

    navigateToURL(filename) {
        excelFileName = filename;
        const html_file_path = path.join(__dirname, '../../../fixtures/HTML_Files/' + filename + '.html');
        cy.visit(html_file_path);
        cy.title().should('include', 'Citibot Sample Project');
    }

    clickOnChartBox() {
        cy.xpath(this.homePage_chartBox).should('be.visible');
        cy.xpath(this.homePage_chartBox).click();
    }

    verifyChartBoxOpened(sheetName, cellValue) {
        cy.frameLoaded("#citibot");
        cy.iframe().xpath(this.homePage_chartBoxDialogFirstChartText).invoke('text').then((text) => {
            cy.readExcelCell({
                filename: excelFileName,
                sheetName: sheetName,
                cellReference: cellValue,
            }).then((cellValue) => {
                const excelText = cellValue.v.replace(/\r/g, '').trim;
                expect(excelText).to.equal(text.replace("I\\", 'I').trim);
            });
        });

    }
    enterMessageAndSend(inputMessage) {
        cy.frameLoaded("#citibot");
        cy.iframe().xpath(this.homePage_messageInputBox).click();
        cy.iframe().xpath(this.homePage_messageInputBox).type(inputMessage);
        cy.iframe().xpath(this.homePage_messageInputBox).should('have.value', inputMessage);
        cy.iframe().xpath(this.homePage_messageSendButton).should('be.visible');
        cy.iframe().xpath(this.homePage_messageSendButton).click();
        cy.iframe().xpath(this.homePage_chartBoxUserMessage.replace('chatText', inputMessage)).invoke('text').then((userMessage) => {
            expect(userMessage).to.equal(inputMessage.toString());
        });
    }

    verifyTheChartMessage(sheetName, cellValue, parameter) {
        cy.log(cellValue)
        cy.readExcelCell({
            filename: excelFileName,
            sheetName: sheetName,
            cellReference: cellValue,
        }).then((cellValue) => {
            cy.frameLoaded("#citibot");
            cy.iframe().xpath(this.chatMessage.replace('PARAMETER', parameter)).should('have.length', 1);
            cy.iframe().xpath(this.chatMessage.replace('PARAMETER', parameter)).should('have.length', 1).should('exist');
            cy.iframe().xpath(this.chatMessage.replace('PARAMETER', parameter)).invoke('text').then((chartMessage) => {
                let cellText = cellValue.v
                expect(chartMessage.trim).to.equal(cellText.replace("I\\", 'I').trim);
            });
        });
    }

    verifyTheChartLinks(sheetName, cellValue) {
        cy.readExcelCell({
            filename: excelFileName,
            sheetName: sheetName,
            cellReference: cellValue,
        }).then((cellValue) => {
            cy.frameLoaded("#citibot");
            cy.iframe().xpath(this.homePage_chartBoxLink.replace('linkText', cellValue.v)).should('have.length', 1);
            cy.iframe().xpath(this.homePage_chartBoxLink.replace('linkText', cellValue.v)).should('have.length', 1).should('exist');
            cy.iframe().xpath(this.homePage_chartBoxLink.replace('linkText', cellValue.v)).invoke('text').then((chartLink) => {
                expect(chartLink).to.equal(cellValue.v);
            });
        });
    }

    clickOnLinkInChartBox(sheetName, linkCellValue) {
        cy.readExcelCell({
            filename: excelFileName,
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
    closeChartBotDialog() {
        cy.xpath(this.homePage_chartBoxDialogCloseButton).should('be.visible');
        cy.xpath(this.homePage_chartBoxDialogCloseButton).click();
    }

    getUrlFromLinkAndVisitItsStatus(linkCellValue) {
        cy.frameLoaded("#citibot");
        cy.iframe().xpath(this.homePage_chartBoxLink.replace('linkText', linkCellValue.v)).should('have.length', 1);
        cy.iframe().xpath(this.homePage_chartBoxLink.replace('linkText', linkCellValue.v)).should('exist');
        cy.iframe().xpath(this.homePage_chartBoxLink.replace('linkText', linkCellValue.v)).should('have.attr', 'href').then((url) => {
            cy.request('GET', url)
                .then((response) => {
                    // Validate the HTTP status code
                    expect(response.status).to.eq(200);
                });
        });
    }

    ValidateChatbotGeneric(sheetName) {
        let index = 1;
        cy.GetNumberOfRows({
            filename: excelFileName,
            sheetName: sheetName
        }).then((ExcelRowsCount) => {
            for (let i = 2; i <= ExcelRowsCount; i++) {
                cy.log(i);
                cy.readExcelCell({
                    filename: excelFileName,
                    sheetName: sheetName,
                    cellReference: 'A' + i,
                }).then((cellValue) => {
                    if (cellValue.v === 'Message') {
                        cy.readExcelCell({
                            filename: excelFileName,
                            sheetName: sheetName,
                            cellReference: 'C' + i,
                        }).then((inputMessage) => {
                            this.verifyTheChartMessage(sheetName, 'B' + i, index);
                            index = index + 1;
                            if (inputMessage != null) {
                                this.enterMessageAndSend(inputMessage.v);
                            }
                        });
                    } else if (cellValue.v === 'link') {
                        cy.readExcelCell({
                            filename: excelFileName,
                            sheetName: sheetName,
                            cellReference: 'C' + i,
                        }).then((inputMessage) => {
                            this.verifyTheChartLinks(sheetName, 'B' + i);
                            if (inputMessage != null) {
                                this.getUrlFromLinkAndVisitItsStatus(inputMessage);
                            }
                        });
                    }
                });
            }
        });
    }

}

export default Homepage

