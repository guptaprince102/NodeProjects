class Orders{
    constructor(page){
        this.page = page;
        this.orderRowsLocator = page.locator("tbody tr");
        this.orderIdInsideOrderRowLocator = this.orderRowsLocator.locator("th");
    }
    async goToOrderDetail(orderId){
        await this.orderRowsLocator.first().waitFor();
        for(let i = 0 ; i < await this.orderRowsLocator.count() ; i++){
            const orderIdInsideOrderRow = await this.orderIdInsideOrderRowLocator.nth(i).textContent();
            if(orderId.includes(orderIdInsideOrderRow)){
            await this.orderRowsLocator.locator("td button").first().click();
            break;
            }
        }
    }
    
}
module.exports = {Orders};

