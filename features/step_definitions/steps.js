const {Given, When, Then} = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');


Given('Login with valid credentials of {string} and {string}', {timeout: 60000}, async function (email, password) {
    
    const URL = 'https://rahulshettyacademy.com/client/';
    const loginPage = this.poManager.getLoginPage();
    
    // Load the Sign In page 
    await loginPage.goTo(URL);
    
    // Verify that the Sign In page is loaded
    const pageTitleLocator = this.page.locator('.login-title');
    await pageTitleLocator.waitFor();
    await expect(pageTitleLocator).toBeVisible();
   
    // Sign In
    this.email = email;
    await loginPage.login(email, password);
    const blinkingTextLocator = this.page.locator('.blinkingText'); 
    await blinkingTextLocator.waitFor();
    await expect(blinkingTextLocator).toBeVisible();
});

When('User add a product in cart {string}', async function (productName) {
    // Add desiredProd to cart
    
    this.dashboard = this.poManager.getDashboardPage();
    this.productName = productName;
    await this.dashboard.addToCart(productName);
});

Then('The product should be present in the Cart', async function () {
    // Go to Shopping Cart 
    await  this.dashboard.goToCart();    
        
    // verify the added item is in the cart
    const addeditemLocator = this.page.locator(".cartSection h3");
    const cartitem = await addeditemLocator.first().textContent();
    expect(cartitem === this.productName).toBeTruthy();
});

When('User checkout and place the order', {timeout: 60000}, async function () {
    // Click on Checkout and verify that desired item is in there
        const cart = this.poManager.getCartPage();
        await cart.checkOut();
        const checkOutitemLocator = this.page.locator(".item__title");
        const checkOutItemQuatLocator = this.page.locator(".item__quantity");
        const checkoutItem = await checkOutitemLocator.first().textContent();

        expect(checkoutItem.trim() === this.productName).toBeTruthy();
        const itemQuantity = (await checkOutItemQuatLocator.textContent()).split(": ")[1];
        expect(itemQuantity.trim()==="1").toBeTruthy();
        
        // Fill Necessary details and Submit
        const signedInEmailLocator = this.page.locator(".user__name [type='text']");
        expect(signedInEmailLocator.first()).toHaveText(this.email);
        const coupon = "rahulshettyacademy";
        const placeOrder = this.poManager.getPlaceOrderPage();
        await placeOrder.applyCoupon(coupon);
        const couponAppliedLocator = this.page.locator("p.ng-star-inserted");
        await couponAppliedLocator.waitFor();
        await expect(couponAppliedLocator).toBeVisible();
        await placeOrder.selectCountry("ind","India");
        await placeOrder.submit();
        
        //Verify that order is placed successfully and capture order id
        const successMessageLocator = this.page.locator(".hero-primary");
        const orderIdLocator = this.page.locator(".em-spacer-1 .ng-star-inserted");
        await expect(successMessageLocator).toContainText("Thankyou");
        expect(await successMessageLocator.isVisible()).toBeTruthy();
        await expect(successMessageLocator).toBeVisible();
        this.orderId = (await orderIdLocator.textContent()).split("| ")[1].split(" |")[0];
});

Then('The product should appear in the Order List', async function () {
    //Go to My Orders, Verify if the orderId is included there
    await this.dashboard.goToOrders();
    const orders = this.poManager.getOrdersPage();
    await orders.goToOrderDetail(this.orderId);
    const orderIdInsideOrderDetailLocator = this.page.locator(".col-text");
    const orderIdInsideOrderDetail = await orderIdInsideOrderDetailLocator.textContent();
    expect(this.orderId.includes(orderIdInsideOrderDetail)).toBeTruthy();
});