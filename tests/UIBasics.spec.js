const {test, expect} = require('@playwright/test');
const { log } = require('node:console');
const URL = 'https://rahulshettyacademy.com/loginpagePractise/';

test.describe.configure({mode:'parallel'});

test('first test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
});

test('Blinking Link Test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(URL);
    const blinkingLinkLocator = page.locator("[href*='documents-request']");
    await expect(blinkingLinkLocator).toBeVisible();
    await expect(blinkingLinkLocator).toHaveText('Free Access to InterviewQues/ResumeAssistance/Material');
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkingLinkLocator.click()
    ]);
    await expect(newPage).toHaveTitle('RS Academy');  
   
});

test('@Login Sign In Negative Test', async ({page}) => {
    const userNameLocator = page.locator('#username');
    const passwordLocator = page.locator('#password');
    const signInBtnLocator = page.locator('#signInBtn');
    const alertDangerLocator = page.locator('.alert-danger');

    await page.goto(URL);
    await userNameLocator.fill('testuser');
    await passwordLocator.fill('learning');
    await signInBtnLocator.click();
    await expect(alertDangerLocator).toBeVisible();
});

test('@Login Sign In Positive Test', async ({page}) => {
    await page.goto(URL);
    const userNameLocator = page.locator('#username');
    const passwordLocator = page.locator('#password');
    const radioLocator = page.locator('.checkmark');
    const radioCount = await radioLocator.count();
    const buttonLocator = page.locator("[type='button']");
    const selectDropdownLocator = page.locator('select.form-control');
    const termsCheckboxLocator = page.locator('#terms');
    const signInBtnLocator = page.locator('#signInBtn');
    const cardTitlesLocator = page.locator('.card-body a');

    await userNameLocator.fill('rahulshettyacademy');
    await passwordLocator.fill('Learning@830$3mK2');
    for(let i=0; i<radioCount; i++){
        await radioLocator.nth(1).check();
        await buttonLocator.first().waitFor();
        await buttonLocator.nth(i).click();
        await expect(radioLocator.nth(i)).toBeChecked();
    }
    //await radioLocator.nth(1).check();
    //await buttonLocator.nth(0).click();
    //await expect(radioLocator.nth(0)).toBeChecked();
    //await radioLocator.nth(1).check();
    //await buttonLocator.nth(1).click();
    //await expect(radioLocator.nth(1)).toBeChecked();
    await selectDropdownLocator.selectOption('consult');
    await termsCheckboxLocator.check();
    await expect(termsCheckboxLocator).toBeChecked();
    await signInBtnLocator.click();
    await expect(cardTitlesLocator.first()).toBeVisible();
    
});

test('@Login Get All Product Titles Test', async ({page}) => {
    const userNameLocator = page.locator('#username');
    const passwordLocator = page.locator('#password');
    const signInBtnLocator = page.locator('#signInBtn');
    const cardTitlesLocator = page.locator('.card-body a');

    await page.goto(URL);
    await userNameLocator.fill('rahulshettyacademy');
    await passwordLocator.fill('Learning@830$3mK2');
    await signInBtnLocator.click();
    //console.log(await cardTitlesLocator.first().textContent());  
    //console.log(await cardTitlesLocator.nth(1).textContent());
    //await page.waitForLoadState('networkidle');
    await cardTitlesLocator.last().waitFor();
    const allProducts = await cardTitlesLocator.allTextContents();

});

