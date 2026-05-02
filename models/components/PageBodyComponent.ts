import { Locator } from "@playwright/test";
import ProductItemComponent from "./ProductItemComponent";

export default class PageBodyComponent {

    public static readonly SELECTOR = '.page-body';

    constructor(private component: Locator) {
        this.component = component;
    }

    public async productItemComponentList(): Promise<ProductItemComponent[]> {
        return (await this.component.locator(ProductItemComponent.SELECTOR).all())
        .map(item => new ProductItemComponent(item));
    }

}