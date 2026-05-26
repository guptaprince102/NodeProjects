import {APIRequestContext} from '@playwright/test';

const baseURL = "https://rahulshettyacademy.com";
const loginApiResource = "/api/ecom/auth/login";
const createOrderApiResource = "/api/ecom/order/create-order";

class APIUtils{

    apiContext : APIRequestContext;
    loginPayload : string;

    constructor(apiContext : APIRequestContext, loginPayload : string){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
   

    async getToken(){
        const loginResponse = await this.apiContext.post(baseURL+loginApiResource,{
                data: this.loginPayload
            })
            const loginResponseJson = await loginResponse.json();
            const token = loginResponseJson.token;
            return token;
    }

    async createOrder(createOrderPayload : string){
        let returnObject : {token : string, orderId : string} = {
            token: "",
            orderId: ""
        }
        returnObject.token = await this.getToken();
        const createOrderResponse = await this.apiContext.post(baseURL+createOrderApiResource,{
                data: createOrderPayload,
                headers:{
                    'Authorization': returnObject.token,
                    'Content-Type': 'application/json'
                }
            })
            const createOrderResponseJson = await createOrderResponse.json();
            const orderId = createOrderResponseJson.orders[0];
            returnObject.orderId = orderId
            return returnObject;
    }
}

module.exports = {APIUtils}