const {test, expect} = require('@playwright/test');
const URL = 'https://rahulshettyacademy.com/client/';
const {POManager} = require('../Pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('../Utils/E2ETestPOMDataset.json')));

test('@POM End to End Test', async ({page}) => {
    
    const poManager = new POManager(page);
    // const username = 'prince.gupta@gmail.com';
    // const password = 'Prince@123';
    // const desiredProd = "ADIDAS ORIGINAL";
    const loginPage = poManager.getLoginPage();
    
    // Load the Sign In page 
    await loginPage.goTo(URL);
    
    // Verify that the Sign In page is loaded
    const pageTitleLocator = page.locator('.login-title');
    await pageTitleLocator.waitFor();
    await expect(pageTitleLocator).toBeVisible();
   
    // Sign In
    await loginPage.login(dataset.username, dataset.password);
    const blinkingTextLocator = page.locator('.blinkingText'); 
    await expect(blinkingTextLocator).toBeVisible();
    
    // Add desiredProd to cart
    
    const dashboard = poManager.getDashboardPage();
    await dashboard.addToCart(dataset.desiredProd);
   
    // Go to Shopping Cart 
    await  dashboard.goToCart();
    
    // verify the added item is in the cart
    const addeditemLocator = page.locator(".cartSection h3");
    const cartitem = addeditemLocator.first().textContent();
    expect(cartitem === dataset.desiredProd).toBeTruthy;
    
    // Click on Checkout and verify that desired item is in there
    const cart = poManager.getCartPage();
    await cart.checkOut();
    const checkOutitemLocator = page.locator(".item__title");
    const checkOutItemQuatLocator = page.locator(".item__quantity");
    const checkoutItem = await checkOutitemLocator.textContent();
    expect(checkoutItem === dataset.desiredProd).toBeTruthy;
    const itemQuantity = (await checkOutItemQuatLocator.textContent()).split(": ")[1];
    expect(itemQuantity===1).toBeTruthy;
    
    // Fill Necessary details and Submit
    const signedInEmailLocator = page.locator(".user__name [type='text']");
    expect(signedInEmailLocator.first()).toHaveText(dataset.username);
    const coupon = "rahulshettyacademy";
    const placeOrder = poManager.getPlaceOrderPage();
    await placeOrder.applyCoupon(coupon);
    const couponAppliedLocator = page.locator("p.ng-star-inserted");
    await couponAppliedLocator.waitFor();
    await expect(couponAppliedLocator).toBeVisible();
    await placeOrder.selectCountry("ind","India");
    await placeOrder.submit();
    
    //Verify that order is placed successfully and capture order id
    const successMessageLocator = page.locator(".hero-primary");
    const orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted");
    await expect(successMessageLocator).toContainText("Thankyou");
    expect(successMessageLocator.isVisible).toBeTruthy();
    await expect(successMessageLocator).toBeVisible();
    const orderId = (await orderIdLocator.textContent()).split("| ")[1].split(" |")[0];
    
    //Go to My Orders, Verify if the orderId is included there
    await dashboard.goToOrders();
    const orders = poManager.getOrdersPage();
    await orders.goToOrderDetail(orderId);
    const orderIdInsideOrderDetailLocator = page.locator(".col-text");
    const orderIdInsideOrderDetail = await orderIdInsideOrderDetailLocator.textContent();
    expect(orderId.includes(orderIdInsideOrderDetail)).toBeTruthy();

})
