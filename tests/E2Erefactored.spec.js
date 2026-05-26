const {test, expect} = require('@playwright/test');
const {customtest} = require('../Utils/TestBase');
const URL = 'https://rahulshettyacademy.com/client/';

customtest('End to End Test', async ({page,testData}) => {
    const email = 'prince.gupta@gmail.com';
    const password = 'Prince@123';

    // Load the Sign In page and get the Locators
    await page.goto(URL);
    // const pageTitleLocator = page.locator('.login-title');
    const pageTitleLocator = page.getByText("Log in");
    

    //Verify that the Sign In page is loaded
    const emailLocator = page.getByPlaceholder("email@example.com");
    const passwordLocator = page.getByPlaceholder("enter your passsword");
    const loginBtnLocator = page.getByRole("button", {name:"Login"});
   
    await pageTitleLocator.waitFor();
    await expect(pageTitleLocator).toBeVisible();

    //Sign In
    const blinkingTextLocator = page.getByText("Get Shortlisted by Recruiters");
    await emailLocator.fill(testData.username);
    await passwordLocator.fill(testData.password);
    await loginBtnLocator.click();
    await expect(blinkingTextLocator).toBeVisible();

    //Get Details of all Cards
    const cardBoxLocator = page.locator('.card-body');
    // const cardBodyLocator = page.locator('.card-body b');
    
    await cardBoxLocator.first().waitFor();
    // const cardTitle = await cardBodyLocator.allTextContents();
    const desiredProd = "ADIDAS ORIGINAL";

    await cardBoxLocator.filter({hasText:(testData.desiredProd)}).getByRole("button",{name:"Cart"}).click();

    //Iterate to get the details of the desired product and add it to Cart
    const cartLocator = page.getByRole("list").getByRole("button",{name:"cart"});
    const addeditemLocator = page.getByText(testData.desiredProd);
    

    await cartLocator.waitFor();
    await cartLocator.click();
    await expect(addeditemLocator).toBeVisible();

    await page.getByRole("button",{name:"Checkout"}).click();
    await expect(page.getByText(testData.desiredProd)).toBeVisible();
    await expect(page.getByText(" Quantity: 1 ")).toBeVisible();

    const dropdownLocator = page.locator(".ta-results");
    const selectCountrylocator = page.getByPlaceholder("Select Country");
    const couponInputLocator = page.locator("input[name='coupon']");
    const couponButtonLocator = page.getByRole("button",{name:"Apply Coupon"});
    const couponAppliedLocator = page.getByText("* Coupon Applied");
    const submitButtonLocator = page.getByText("Place Order ");


    await expect(page.getByText(testData.username)).toBeVisible();
    await couponInputLocator.fill("rahulshettyacademy");
    await couponButtonLocator.click();
    await couponAppliedLocator.waitFor();
    await expect(couponAppliedLocator).toBeVisible();

    await selectCountrylocator.pressSequentially("ind", {delay: 150});
    await dropdownLocator.waitFor();
    const dropdownResultCount = await dropdownLocator.getByRole("button").count();
    for(let i = 0 ; i<dropdownResultCount; i++){
        const countryText = (await dropdownLocator.getByRole("button").nth(i).textContent()).trim();
        if(countryText==="India"){
           await dropdownLocator.locator("button").nth(i).click();
           break;
        }
    }
    await submitButtonLocator.click();

    const orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted");
    const successMessageLocator = page.getByText("Thankyou");

    expect(successMessageLocator.isVisible).toBeTruthy();
    await expect(successMessageLocator).toBeVisible();

    const orderId = (await orderIdLocator.textContent()).split("| ")[1].split(" |")[0];
    
    const myOrdersLocator = page.getByRole("List").getByRole("button",{name:"Orders"});
    const orderRowsLocator = page.locator("tbody tr");
    const orderIdInsideOrderRowLocator = orderRowsLocator.locator("th");
    
    await myOrdersLocator.click();
    await orderRowsLocator.first().waitFor();
    await expect(page.getByText(orderId)).toBeVisible();
    for(let i = 0 ; i < await orderRowsLocator.count() ; i++){
        const orderIdInsideOrderRow = await orderIdInsideOrderRowLocator.nth(i).textContent();
        if(orderId.includes(orderIdInsideOrderRow)){
            await orderRowsLocator.getByRole("button",{name:"View"}).nth(i).click();
            break;
        }
    }
    await expect(page.getByText(orderId)).toBeVisible();

})
