const { expect } = require('@playwright/test');
const fs = require('fs');
const { baseURL } = require('../../config');


class LoginPage {

    constructor(page, context, attach) {
        this.page = page;
        this.context = context;
        this.attach = attach;
        this.url = baseURL;
        this.username = '#name-input';
        this.select = '#automation';
    }

    async openWeb() {
        await this.page.goto(this.url);
    }

    tabs(obj) {
        return `//a[contains(text(),'${obj}')]`;
    }


    async all(option) {

        await expect(this.page.locator(this.tabs(option))).toBeVisible({ timeout: 8000 });
        await this.page.locator(this.tabs(option)).click();

        if (option === 'Form Fields') {

            await this.page.locator(this.username).fill('Testetando');
            await this.page.locator(this.select).selectOption({ index: 1 }) //value: '', label: '', [{label: ''},{value: ''}]

        } else if (option === 'Window Operations') {

            const [newTab] = await Promise.all([
                this.context.waitForEvent('page'),
                this.page.locator("//button[@onclick='newTab()']").click()
            ]);

            await newTab.waitForLoadState();
            await newTab.locator("//span[text()='Reviews']").click();

        } else if (option === 'Iframes') {
            const frameId = await this.page.frameLocator('#iframe-1');
            await frameId.locator('//a[text()="Community"]').click();
        }


        const pathScreen = 'test-result/screen/data' + Date.now() + '.png';
        await this.page.screenshot({ path: pathScreen, fullPage: true });

        const image = fs.readFileSync(pathScreen);
        this.attach(image, 'image/png');

    }

}

module.exports = LoginPage;