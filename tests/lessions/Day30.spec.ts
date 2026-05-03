import test from "@playwright/test";
import HomePage from "models/pages/HomePage";


test.describe("Day 30 Tests", () => {

    test("Test POM - Footer Link List Component Interaction", {tag: '@smoke'}, async ({ page }) => {
        await page.goto('/');

        const homePage = new HomePage(page);
        const footer = homePage.footerComponent();

        const linkTexts = await (await footer.customerSerColComp()).getLinkTexts();
        console.log(linkTexts);
        const linkList = await (await footer.customerSerColComp()).getLinkList();
        console.log(linkList);

    });

});