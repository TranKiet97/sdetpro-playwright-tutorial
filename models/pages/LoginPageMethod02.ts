import { Locator, Page } from "@playwright/test";
import { TIMEOUTS } from "../../constants/timeouts";

export default class LoginPageMethod02 {
    // Scope for locators
    private usernameLoc: Locator;
    private passwordLoc: Locator;
    private loginBtnLoc: Locator;

    // Constructor to initialize the page object
    constructor(private page: Page) {
        this.page = page;
        this.usernameLoc = this.page.locator('#Email');
        this.passwordLoc = this.page.locator('#Password');
        this.loginBtnLoc = this.page.locator('.login-button');
    }

    // Main interaction method to perform login
    public async inputUsername(username: string): Promise<void> {
        await this.usernameLoc.waitFor({ timeout: TIMEOUTS.SECOND_15 });
        await this.usernameLoc.fill(username);
    }

    public async inputPassword(password: string): Promise<void> {
        await this.passwordLoc.waitFor({ timeout: TIMEOUTS.SECOND_15 });
        await this.passwordLoc.fill(password);
    }

    public async clickOnLoginBtn(): Promise<void> {
        await this.loginBtnLoc.waitFor({ timeout: TIMEOUTS.SECOND_15 });
        await this.loginBtnLoc.click();
    }

    public async doLogin(loginCreds: { username: string; password: string }): Promise<void> {
        await this.inputUsername(loginCreds.username);
        await this.inputPassword(loginCreds.password);
        await this.clickOnLoginBtn();
    }
}
