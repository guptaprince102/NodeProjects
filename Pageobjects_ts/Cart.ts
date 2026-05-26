import {Locator, Page} from "@playwright/test";

export class Cart{

    page : Page;
    checkoutButton : Locator;


    constructor(page : Page){
        this.page = page;
        this.checkoutButton = page.locator("text=Checkout");

    }
    async checkOut(){
        await this.checkoutButton.click();
    }
}
// module.exports = {Cart};

