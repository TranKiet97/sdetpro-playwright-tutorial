import { Locator } from "@playwright/test";

export default class ProductEssentialComponent {

    public static readonly SELECTOR = '.product-essential';
    private allOptionsSel: string = '.option-list li'


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

}