import { Locator } from "@playwright/test";

export default class ProductEssentialComponent {

    public static readonly SELECTOR = '.product-essential';
    private allOptionsSel: string = '.option-list li'
    private quatitySel: string = 'input[id^="addtocart"]'
    private basePriceSel: string = '[itemprop="price"]';
    private addToCartBtnSel: string = 'input[id^="add-to-cart-button"]';


    constructor(protected component: Locator) {
        this.component = component;
    }

    public async unselectAllOptions(): Promise<void> {
        (await this.component.locator(this.allOptionsSel).all()).forEach(async item => {
            if (await item.getAttribute("checked") === "checked") {
                await item.click();
            }
        });
    }

    public async inputQuantity(value: number): Promise<void> {
        await this.component.locator(this.quatitySel).fill(value.toString());
    }

    public async basePrice(): Promise<number> {
        return Number(await this.component.locator(this.basePriceSel).textContent());
    }

    public async extractAdditionalPrice(value: string | null) {
        // Use regex to find the digits between the plus/minus and the closing bracket
        const match = value?.match(/\[([+-]?\d+(?:\.\d{2})?)\]/);
        return match ? parseFloat(match[1]) : 0;
    }

    public async clickAddToCart(): Promise<string> {
        this.component.locator(this.addToCartBtnSel).click();
        return `**/addproducttocart/**`;
    }

}