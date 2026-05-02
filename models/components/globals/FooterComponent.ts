import { Locator } from "@playwright/test";

export default class FooterComponent {
    public static readonly SELECTOR = '.footer';

    // Narrow down the locator to the component level, so that we can reuse the component in other pages if needed
    constructor(private component: Locator) {
        this.component = component;
    }

    public async powerText(): Promise<string> {
        return await this.component.locator('.footer-poweredby').innerText() ?? '';
    }

}