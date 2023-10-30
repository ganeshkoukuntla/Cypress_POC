class Homepage{
    homePage_organisationsSection = '//section[@class="list"]//*[contains(text(),"Organisations")]';
    homePage_IntentsSection = '//section[@class="list"]//*[contains(text(),"Intents")]';
    homePage_IntentsPage = '//*[@class="intents"]'
    homePage_organisationsPage = '//*[@class="organisation"]'
    homePage_citiBotLogo = '[class="logo"]';
    homePage_logoutButton ='[class="logOut-btn"]';


    clickOnOrganisationsSection(){
        cy.xpath(this.homePage_organisationsSection).should('be.visible');
        cy.xpath(this.homePage_organisationsSection).click();
    }

    clickOnIntentsSection(){
        cy.xpath(this.homePage_IntentsSection).should('be.visible');
        cy.xpath(this.homePage_IntentsSection).click();
    }

    verifyIntentsSectionPage(){
        cy.xpath(this.homePage_IntentsPage).should('be.visible');
    }

    verifyOrganisationsSectionPage(){
        cy.xpath(this.homePage_organisationsPage).should('be.visible');
    }

    verifyCitiBotLogo(){
        cy.wait(500);
        cy.get(this.homePage_citiBotLogo).should('be.visible');
    }

    clickOnLogoutButton(){
        cy.get(this.homePage_logoutButton).should('be.visible');
        cy.get(this.homePage_logoutButton).click();
    }
}

export default Homepage

