import {LoginPage} from "./LoginPage";
import {Dashboard} from "./Dashboard";
import {Cart} from "./Cart";
import {PlaceOrder} from "./PlaceOrder";
import {Orders} from "./Orders";
import { Page } from "@playwright/test";

export class POManager{

    loginPage : LoginPage;
    dashboard : Dashboard;
    cart : Cart;
    placeOrder : PlaceOrder;
    orders : Orders;

    constructor(page : Page){
        // this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboard = new Dashboard(page);
        this.cart = new Cart(page);
        this.placeOrder = new PlaceOrder(page);
        this.orders = new Orders(page);

    }
    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboard;
    }
    getCartPage(){
        return this.cart;
    }
     getPlaceOrderPage(){
        return this.placeOrder;
    }
     getOrdersPage(){
        return this.orders;
    }

}
// module.exports = {POManager};