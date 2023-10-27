class Login{
    getUserName(){
        return cy.get("input[type='email']");
    }

    getPassword(){
        return cy.get("input[type='password']");
    }

    getLoginButton(){
        return cy.get("button[type='submit']");
    }

    getLoginPage(){
        return cy.xpath('//*[@class="heading" and contains(text(),"Login")]');
    }
}

export default Login