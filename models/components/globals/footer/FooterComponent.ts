import { Locator } from "@playwright/test";
import InfoColumnComponent from "./InfoColumnComponent";
import CustomerSerColumnComponent from "./CustomerSerColumnComponent";

export default class FooterComponent {
    public static readonly SELECTOR = '.footer';

    // Narrow down the locator to the component level, so that we can reuse the component in other pages if needed
    constructor(private component: Locator) {
        this.component = component;
    }

    public async inforColLinkList(): Promise<InfoColumnComponent> {
        return new InfoColumnComponent(this.component.locator(InfoColumnComponent.SELECTOR));
    }

    public async customerSerColLinkList(): Promise<InfoColumnComponent> {
        return new CustomerSerColumnComponent(this.component.locator(CustomerSerColumnComponent.SELECTOR))
    }

    public async powerText(): Promise<string> {
        return await this.component.locator('.footer-poweredby').innerText() ?? '';
    }

}