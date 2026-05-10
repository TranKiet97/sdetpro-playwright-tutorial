import { Page } from "@playwright/test";
import FooterComponent from "models/components/global/footer/FooterComponent";
import HeaderComponent from "models/components/global/header/HeaderComponent";

export default class BasePage {
    protected page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    public footerComponent(): FooterComponent {
        return new FooterComponent(this.page.locator(FooterComponent.SELECTOR));
    }

    public headerComponent(): HeaderComponent {
        return new HeaderComponent(this.page.locator(HeaderComponent.SELECTOR));
    }
}