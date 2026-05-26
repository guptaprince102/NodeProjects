const {test, expect} = require('@playwright/test');
const URL = 'https://rahulshettyacademy.com/client/';

test('End to End Test', async ({page}) => {
    const email = 'prince.gupta@gmail.com';
    const password = 'Prince@123';

    // Load the Sign In page and get the Locators
    await page.goto(URL);
    const pageTitleLocator = page.locator('.login-title');
    
   

    //Verify that the Sign In page is loaded
    const emailLocator = page.locator('#userEmail');
    const passwordLocator = page.locator('#userPassword');
    const loginBtnLocator = page.locator('#login');
    await pageTitleLocator.waitFor();
    await expect(pageTitleLocator).toBeVisible();

    //Sign In
    const blinkingTextLocator = page.locator('.blinkingText'); 
    await emailLocator.fill(email);
    await passwordLocator.fill(password);
    await loginBtnLocator.click();
    await expect(blinkingTextLocator).toBeVisible();

    //Get Details of all Cards
    const cardBoxLocator = page.locator('.card-body');
    const cardBodyLocator = page.locator('.card-body b');
    await cardBodyLocator.first().waitFor();
    const cardTitle = await cardBodyLocator.allTextContents();

    //Iterate to get the details of the desired product and add it to Cart
    const desiredProd = "ADIDAS ORIGINAL";

    for(let i=0; i< cardTitle.length;i++){
        
        if (await cardBoxLocator.nth(i).locator("b").textContent() === desiredProd){
            await cardBoxLocator.nth(i).locator("text=Add to Cart").click();
            break;
        }
    }

    //Go to Shopping Cart and verify the added item is in the cart
    const cartLocator = page.locator("[routerlink*='cart']");
    const addeditemLocator = page.locator(".cartSection h3");

    await cartLocator.click();
    const cartitem = addeditemLocator.first().textContent();
    expect(cartitem === desiredProd).toBeTruthy;

    //Click on Checkout and verify that desired item is in there
    await page.locator("text=Checkout").click();
    const checkOutitemLocator = page.locator(".item__title");
    const checkOutItemQuatLocator = page.locator(".item__quantity");

    const checkoutItem = await checkOutitemLocator.textContent();
    expect(checkoutItem === desiredProd).toBeTruthy;

    const itemQuantity = (await checkOutItemQuatLocator.textContent()).split(": ")[1];
    expect(itemQuantity===1).toBeTruthy;

    //Fill Necessary details and Submit
    const selectCountrylocator = page.locator("[placeholder*='Country']");
    const dropdownLocator = page.locator(".ta-results");
    const signedInEmailLocator = page.locator(".user__name [type='text']");
    const couponInputLocator = page.locator("input[name='coupon']");
    const couponButtonLocator = page.locator("button[type='submit']");
    const couponAppliedLocator = page.locator("p.ng-star-inserted");
    const submitButtonLocator = page.locator(".action__submit");

    expect(signedInEmailLocator.first()).toHaveText(email);
    await couponInputLocator.fill("rahulshettyacademy");
    await couponButtonLocator.click();
    await couponAppliedLocator.waitFor();
    await expect(couponAppliedLocator).toBeVisible();

    await selectCountrylocator.pressSequentially("ind", {delay: 150});
    await dropdownLocator.waitFor();
    const dropdownResultCount = await dropdownLocator.locator("button").count();
    for(let i = 0 ; i<dropdownResultCount; i++){
        const countryText = (await dropdownLocator.locator("button").nth(i).textContent()).trim();
        if(countryText==="India"){
           await dropdownLocator.locator("button").nth(i).click();
           break;
        }
    }
    await submitButtonLocator.click();

    //Verify that order is placed successfully and capture order id
    const successMessageLocator = page.locator(".hero-primary");
    const orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted");

    await expect(successMessageLocator).toContainText("Thankyou");
    expect(successMessageLocator.isVisible).toBeTruthy();
    await expect(successMessageLocator).toBeVisible();

    const orderId = (await orderIdLocator.textContent()).split("| ")[1].split(" |")[0];
    
    //Go to My Orders, Verify if the orderId is included there
    const myOrdersLocator = page.locator("button[routerlink*='myorders']");
    const orderRowsLocator = page.locator("tbody tr");
    const orderIdInsideOrderRowLocator = orderRowsLocator.locator("th");
    const orderIdInsideOrderDetailLocator = page.locator(".col-text");

    await myOrdersLocator.click();
    await orderRowsLocator.first().waitFor();
    for(let i = 0 ; i < await orderRowsLocator.count() ; i++){
        const orderIdInsideOrderRow = await orderIdInsideOrderRowLocator.nth(i).textContent();
        if(orderId.includes(orderIdInsideOrderRow)){
            await orderRowsLocator.locator("td button").first().click();
            break;
        }
    }
    const orderIdInsideOrderDetail = await orderIdInsideOrderDetailLocator.textContent();
    expect(orderId.includes(orderIdInsideOrderDetail)).toBeTruthy();

})
