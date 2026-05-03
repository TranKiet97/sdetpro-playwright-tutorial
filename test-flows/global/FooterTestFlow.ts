import { expect, Page } from "@playwright/test";
import FooterColumnComponent from "models/components/global/footer/FooterColumnComponent";
import FooterComponent from "models/components/global/footer/FooterComponent";
import HomePage from "models/pages/HomePage";

export default class FooterTestFlow {

    constructor(private page: Page) {
        this.page = page;
    }

    public async verifyFooterComponent() {
        const homePage = new HomePage(this.page);
        await this.verifyInformationColumn(homePage.footerComponent());
        await this.verifyCustomerServiceColumn(homePage.footerComponent());
    }

    private async verifyInformationColumn(footerComp: FooterComponent) {
        const infoColComp = footerComp.infoColComp();
        const expectedTexts: string[] = [
            'Sitemap',
            'Shipping & Returns',
            'Privacy Notice',
            'Conditions of Use',
            'About us',
            'Contact us'
        ];
        const expectedHrefs: string[] = [
            '/sitemap',
            '/shipping-returns',
            '/privacy-policy',
            '/conditions-of-use',
            '/about-us',
            '/contactus'
        ];
        await this.verifyFooterColumn(await infoColComp, expectedTexts, expectedHrefs);
    }

    private async verifyCustomerServiceColumn(footerComp: FooterComponent) {
        const customerSerColComp = footerComp.customerSerColComp();
        const expectedTexts: string[] = [
            'Search',
            'News',
            'Blog',
            'Recently viewed products',
            'Compare products list',
            'New products'
        ];
        const expectedHrefs: string[] = [
            '/search',
            '/news',
            '/blog',
            '/recentlyviewedproducts',
            '/compareproducts',
            '/newproducts'
        ];
        await this.verifyFooterColumn(await customerSerColComp, expectedTexts, expectedHrefs);
    }

    private async verifyFooterColumn(
        footerColumnComp: FooterColumnComponent,
        expectedTexts: string[],
        expectedHrefs: string[]
    ) {
        expect(await footerColumnComp.getLinkTexts()).toStrictEqual(expectedTexts);
        expect(await footerColumnComp.getLinkList()).toStrictEqual(expectedHrefs);
    }

}