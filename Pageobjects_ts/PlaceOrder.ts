import {Locator, Page} from "@playwright/test";

    
export class PlaceOrder{

    page : Page;
    selectCountrylocator : Locator;
    dropdownLocator : Locator;
    couponInputLocator : Locator;
    couponButtonLocator : Locator;
    submitButtonLocator : Locator;

    constructor(page : Page){
        this.page = page;
        this.selectCountrylocator = page.locator("[placeholder*='Country']");
        this.dropdownLocator = page.locator(".ta-results");
        this.couponInputLocator = page.locator("input[name='coupon']");
        this.couponButtonLocator = page.locator("button[type='submit']");
        this.submitButtonLocator = page.locator(".action__submit");

    }
    async applyCoupon(coupon : string){
        await this.couponInputLocator.fill(coupon);
        await this.couponButtonLocator.click();
    }

    async selectCountry(searchText : string, country : string){
        await this.selectCountrylocator.pressSequentially(searchText, {delay: 150});
        await this.dropdownLocator.waitFor();
        const dropdownResultCount = await this.dropdownLocator.locator("button").count();
        for(let i = 0 ; i<dropdownResultCount; i++){
        const countryText = (await this.dropdownLocator.locator("button").nth(i).textContent() ?? "").trim();
            if(countryText===country){
            await this.dropdownLocator.locator("button").nth(i).click();
            break;
            }
        }
    }
    async submit(){
        await this.submitButtonLocator.click();
    }
   
}
// module.exports = {PlaceOrder};

