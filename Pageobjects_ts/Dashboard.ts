import {Locator, Page} from "@playwright/test";

export class Dashboard{
    
    page  : Page;
    cardBoxLocator : Locator;
    cardBodyLocator : Locator;
    cartLocator : Locator;
    myOrdersLocator : Locator;

    constructor(page : Page){
        this.page = page;
        this.cardBoxLocator = page.locator('.card-body');
        this.cardBodyLocator = page.locator('.card-body b');
        this.cartLocator = page.locator("[routerlink*='cart']");
        this.myOrdersLocator = page.locator("button[routerlink*='myorders']")
        
    }

    async goToCart(){
        await this.cartLocator.click();
    }
    async goToOrders(){
        await this.myOrdersLocator.click();
    }

    async addToCart(desiredProd : string){
        await this.cardBodyLocator.first().waitFor();
        const cardTitle = await this.cardBodyLocator.allTextContents();

        // Iterate to get the details of the desired product and add it to Cart

        for(let i=0; i< cardTitle.length;i++){
        
        if (await this.cardBoxLocator.nth(i).locator("b").textContent() === desiredProd){
            await this.cardBoxLocator.nth(i).locator("text=Add to Cart").click();
            break;
        }
    }
    }
}
// module.exports = {Dashboard};

