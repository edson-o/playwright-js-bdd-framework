const { Given, When } = require("@cucumber/cucumber");
const LoginPage = require("../pageobjects/LoginPage");

Given('the user opens the login page', async function () {
    this.loginpage = new LoginPage(this.page, this.context, this.attach);
    await this.loginpage.openWeb();

    console.log('Example get .env file : ' + process.env.USERNAME);
})

When('the user selects the option {string}', async function (option) {
    await this.loginpage.all(option);
})