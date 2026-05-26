const { Before, AfterStep } = require("@cucumber/cucumber");
const playwright = require('playwright');
const {POManager} = require('../../Pageobjects/POManager');
const path = require("node:path");

Before(async function () {
    const browser = await playwright.chromium.launch({headless: false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    
    this.poManager = new POManager(this.page);
});

AfterStep(async function (result) {
        const screenshot = await this.page.screenshot({path: path.join("screenshots", `screenshot-${Date.now()}.png`)});
    
});