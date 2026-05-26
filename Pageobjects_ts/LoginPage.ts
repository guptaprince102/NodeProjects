import {Locator, Page} from "@playwright/test";

export class LoginPage{

    page : Page;
    username  : Locator;
    password : Locator;
    loginButton : Locator;


    constructor(page : Page){
        this.page = page;
        this.username = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
    }

    async goTo(URL : string){
         await this.page.goto(URL);

    }

    async login(username : string, password : string){
        
            //Sign In
            await this.username.fill(username);
            await this.password.fill(password);
            await this.loginButton.click();
            
    }
}
// module.exports = {LoginPage};