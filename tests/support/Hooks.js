const { Before, After } = require("@cucumber/cucumber");


Before(async function () {
    await this.launchBrowser();

})


After(async function (scenario) {
    await this.handleAttachments(scenario); // ✅ Move logic here
    await this.closeBrowser();
})



