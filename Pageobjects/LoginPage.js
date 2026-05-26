class LoginPage{
    constructor(page){
        this.page = page;
        this.username = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
    }

    async goTo(URL){
         await this.page.goto(URL);

    }

    async login(username, password){
        
            //Sign In
            await this.username.fill(username);
            await this.password.fill(password);
            await this.loginButton.click();
            
    }
}
module.exports = {LoginPage};