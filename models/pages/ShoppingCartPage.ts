import { Page } from "@playwright/test";
import BasePage from "./BasePage";
import CartItemRowComponent from "models/components/shopping-cart/CartItemRowComponent";
import TotalsComponent from "models/components/shopping-cart/TotalsComponent";

export default class ShoppingCartPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    public async cartItemComponentList(): Promise<CartItemRowComponent[]> {
        return (await this.page.locator(CartItemRowComponent.SELECTOR).all()).map(item => new CartItemRowComponent(item));
    }

    public async totalsComponent(): Promise<TotalsComponent> {
        return new TotalsComponent(this.page.locator(TotalsComponent.SELECTOR));
    }
}