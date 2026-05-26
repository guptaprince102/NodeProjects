const {LoginPage} = require('../Pageobjects/LoginPage');
const {Dashboard} = require('../Pageobjects/Dashboard');
const {Cart} = require('../Pageobjects/Cart');
const {PlaceOrder} = require('../Pageobjects/PlaceOrder');
const {Orders} = require('../Pageobjects/Orders');

class POManager{
    constructor(page){
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
module.exports = {POManager};