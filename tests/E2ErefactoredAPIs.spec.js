const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../Utils/APIUtils');
const URL = 'https://rahulshettyacademy.com/client/';
const loginPayload = {userEmail:"prince.gupta@gmail.com",userPassword:"Prince@123"}
const createOrderPayload = {orders:[{country:"India",productOrderedId:"6960ea76c941646b7a8b3dd5"}]}
let response;


test.beforeAll(async()=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response =  await apiUtils.createOrder(createOrderPayload);

})

test('@API End to End Test', async ({page}) => {

    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    }, response.token);

    await page.goto(URL);

    const myOrdersLocator = page.getByRole("List").getByRole("button",{name:"Orders"});
    const orderRowsLocator = page.locator("tbody tr");
    const orderIdInsideOrderRowLocator = orderRowsLocator.locator("th");
    
    await myOrdersLocator.click();
    await orderRowsLocator.first().waitFor();
    await expect(page.getByText(response.orderId)).toBeVisible();
    for(let i = 0 ; i < await orderRowsLocator.count() ; i++){
        const orderIdInsideOrderRow = await orderIdInsideOrderRowLocator.nth(i).textContent();
        if(response.orderId.includes(orderIdInsideOrderRow)){
            await orderRowsLocator.getByRole("button",{name:"View"}).nth(i).click();
            break;
        }
    }
    await expect(page.getByText(response.orderId)).toBeVisible();
})
