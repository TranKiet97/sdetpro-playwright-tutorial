import { Locator } from "@playwright/test";

export default class CartItemRowComponent {

    public static readonly SELECTOR = '.cart-item-row';
    private unitPriceSel: string = '.product-unit-price'
    private quantitySel: string = ' input[class="qty-input"]';
    private subTotalSel: string = '.product-subtotal';

    constructor(private component: Locator) {
        this.component = component;
    }

    public async unitPrice(): Promise<number> {
        return Number((await this.component.locator(this.unitPriceSel).innerText()).trim());
    }

    public async quantity(): Promise<number> {
        return Number((await this.component.locator(this.quantitySel).inputValue()).trim());
    }

    public async subTotal(): Promise<number> {
        return Number((await this.component.locator(this.subTotalSel).innerText()).trim());
    }

}