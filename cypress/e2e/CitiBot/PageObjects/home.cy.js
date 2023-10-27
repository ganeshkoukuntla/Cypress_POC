class Homepage{
    getOrganisationsSection(){
        return cy.xpath('//section[@class="list"]//*[contains(text(),"Organisations")]');
    }

    getIntentsSection(){
        return cy.xpath('//section[@class="list"]//*[contains(text(),"Intents")]');
    }

    getIntentsSectionPage(){
        return cy.xpath('//*[@class="intents"]');
    }

    getOrganisationsSectionPage(){
        return cy.xpath('//*[@class="organisation"]');
    }

    getCitiBotLogo(){
        return cy.get('[class="logo"]');
    }

    getLogoutButton(){
        return cy.get('[class="logOut-btn"]');
    }
}

export default Homepage

