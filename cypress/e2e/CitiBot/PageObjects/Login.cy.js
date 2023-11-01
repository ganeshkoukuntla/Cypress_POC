var path = require("path")
class Login{

    Login_usernameTextBox = 'input[type="email"]';
    Login_passwordTextBox = 'input[type="password"]';
    Login_loginButton = 'button[type="submit"]';
    Login_page = '//*[@class="heading" and contains(text(),"Login")]'

    navigateToChartBot(){
        cy.visit('https://webchat-admin.staging.citibot.io/login');
    }
    enterUsername(user_name){
        cy.get(this.Login_usernameTextBox).should('be.visible');
        cy.get(this.Login_usernameTextBox).type(user_name);
    }

    enterPasssword(password){
        cy.get(this.Login_passwordTextBox).should('be.visible');
        cy.get(this.Login_passwordTextBox).type(password);
    }

    clickOnLoginButton(){
        cy.get(this.Login_loginButton).click();
    }

    VerifyLoginPageOpened(){
        cy.xpath(this.Login_page).should('be.visible');
    }

    navigateToURL(filename){
        const html_file_path = path.join(__dirname,'../../../fixtures/HTML_Files/Ask_winter_heaven.html');
        cy.visit(html_file_path);
        cy.title().should('include', 'Citibot Sample Project');
    }
}


export default Login