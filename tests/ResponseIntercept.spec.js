const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../Utils/APIUtils');
const URL = 'https://rahulshettyacademy.com/client/';
const loginPayload = { userEmail: "prince.gupta@gmail.com", userPassword: "Prince@123" }
const createOrderPayload = { orders: [{ country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" }] }
let response;
const fakePayload = { data: [], message: "No Orders" }


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);

})

test('End to End Test', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto(URL);
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayload);
        await route.fulfill({
            response,
            body,
        })
    });
    const myOrdersLocator = page.getByRole("List").getByRole("button", { name: "Orders" });
    await myOrdersLocator.click();
    // await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await page.pause();
    await expect(page.locator('.mt-4')).toBeVisible();




})
