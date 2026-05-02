import { Page } from "@playwright/test";
import { TIMEOUTS } from "../../constants/timeouts";

export default class LoginPageMethod01 {
    // Scope for selectors
    private usernameSel: string = '#Email';
    private passwordSel: string = '#Password'
    private loginBtnSel: string = '.login-button';

    // Constructor to initialize the page object
    constructor(private page: Page) {
        this.page = page;
    }

    // Main interaction method to perform login
    public async inputUsername(username: string): Promise<void> {
        await this.page.waitForSelector(this.usernameSel, { timeout: TIMEOUTS.SECOND_15 });
        await this.page.fill(this.usernameSel, username);
    }

    public async inputPassword(password: string): Promise<void> {
        await this.page.waitForSelector(this.passwordSel, { timeout: TIMEOUTS.SECOND_15 });
        await this.page.fill(this.passwordSel, password);
    }

    public async clickOnLoginBtn(): Promise<void> {
        await this.page.waitForSelector(this.loginBtnSel, { timeout: TIMEOUTS.SECOND_15 });
        await this.page.click(this.loginBtnSel);
    }

    public async doLogin(loginCreds: { username: string; password: string }): Promise<void> {
        await this.inputUsername(loginCreds.username);
        await this.inputPassword(loginCreds.password);
        await this.clickOnLoginBtn();
    }
}
