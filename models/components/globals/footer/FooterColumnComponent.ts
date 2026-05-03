import { Locator } from "@playwright/test";

export default class FooterColumnComponent {

    protected component: Locator;
    private titleSel = "h3";
    private linkSel = "li a";

    constructor(component: Locator) {
        this.component = component;
    }

    public async getTitleText(): Promise<string> {
        return await this.component.locator(this.titleSel).innerText() ?? "";
    }

    public async getLinkTexts(): Promise<string[]> {
        return await Promise.all((await (this.component.locator(this.linkSel).all()))
            .map(item => item.innerText()))
    }

    public async getLinkList(): Promise<string[]> {
        return await Promise.all((await (this.component.locator(this.linkSel).all()))
            .map(item => item.getAttribute("href").then(attr => attr ?? "")))
    }

}
