import { Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class CheckoutOptionPage extends BasePage {

    private checkoutAsGuestSel: string = 'input[value="Checkout as Guest"]';

    constructor(page: Page) {
        super(page);
    }

    public async clickCheckoutAsGuestBtn(): Promise<void> {
        this.page.locator(this.checkoutAsGuestSel).click();
    }
}