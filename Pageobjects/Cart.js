class Cart{
    constructor(page){
        this.page = page;
        this.checkoutButton = page.locator("text=Checkout");

    }
    async checkOut(){
        await this.checkoutButton.click();
    }
}
module.exports = {Cart};

