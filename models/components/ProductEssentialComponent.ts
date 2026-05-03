import { Locator } from "@playwright/test";

export default class ProductEssentialComponent {

    public static readonly SELECTOR = '.product-essential';


    constructor(protected component: Locator) {
        this.component = component;
    }

}