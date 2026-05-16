import { Locator } from "@playwright/test";

export default class {

    public static readonly SELECTOR = '.totals';
    private priceTableRowSel: string = '.cart-total tr';
    private priceTypeSel: string = '.cart-total-left';
    private priceValueSel: string = '.cart-total-right';
    private termsOfServiceSel: string = '#termsofservice';
    private checkoutBtnSel: string = '#checkout';

    constructor(private component: Locator) {
        this.component = component;
    }

    public async priceCategories(): Promise<{ [key: string]: number }> {

        let priceCategories: { [key: string]: number } = {};
        const priceTableRowLocList = await this.component.locator(this.priceTableRowSel).all();
        for (const priceTableRowLoc of priceTableRowLocList) {
            priceCategories[(await priceTableRowLoc.locator(this.priceTypeSel).innerText()).trim().replace(":", "")] =
                Number((await priceTableRowLoc.locator(this.priceValueSel).innerText()).trim());
        }
        return priceCategories;

    }

    public async acceptTOS(): Promise<void> {
        await this.component.locator(this.termsOfServiceSel).click();
    }

    public async clickCheckoutBtn(): Promise<void> { 
        await this.component.locator(this.checkoutBtnSel).click();
    }

}