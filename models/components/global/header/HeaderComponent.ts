import { Locator } from "@playwright/test";

export default class HeaderComponent {
    public static readonly SELECTOR = '.header';
    private shoppingCartLinkSel: string = '[id="topcartlink"] a';
    private goToCartBtnSel: string = '[value="Go to cart"]';

    // Narrow down the locator to the component level, so that we can reuse the component in other pages if needed
    constructor(private component: Locator) {
        this.component = component;
    }

    public async clickOnShoppingCartLink(): Promise<void> {
        await this.component.locator(this.shoppingCartLinkSel).hover();
        await this.component.locator(this.goToCartBtnSel).click();
    }

}