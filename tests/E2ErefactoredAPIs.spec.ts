import {test, expect, request} from '@playwright/test';
import {APIUtils} from '../Utils/APIUtils';
import {POManager} from '../Pageobjects_ts/POManager';

const URL = 'https://rahulshettyacademy.com/client/';
const loginPayload = {userEmail:"prince.gupta@gmail.com",userPassword:"Prince@123"}
const createOrderPayload = {orders:[{country:"India",productOrderedId:"6960ea76c941646b7a8b3dd5"}]}
let response : {token:string, orderId:string} = {token : "", orderId : ""};


test.beforeAll(async()=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response =  await apiUtils.createOrder(createOrderPayload);

})

test('@API End to End Test', async ({page}) => {

    const objectManager = new POManager(page);
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    }, response.token);

    await page.goto(URL);

    const dashboard = objectManager.getDashboardPage();
    await dashboard.goToOrders();
    
    const orders = objectManager.getOrdersPage();
    await orders.goToOrderDetail(response.orderId);
    
    await expect(page.getByText(response.orderId)).toBeVisible();
})
