import { Locator } from "@playwright/test";

export default class ProductItemComponent {

    public static readonly SELECTOR = '.product-item';
    private titleSel: string = '.product-title';
    private priceSel: string = '.actual-price';

    constructor(private component: Locator) {
        this.component = component;
    }

    public async getProductName(): Promise<string> {
        return await this.component.locator(this.titleSel).innerText() ?? '';
    }

    public async getProductPrice(): Promise<string> {
        return await this.component.locator(this.priceSel).innerText() ?? '';
    }

}