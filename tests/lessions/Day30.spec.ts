import test from "@playwright/test";
import HomePage from "models/pages/HomePage";


test.describe("Day 30 Tests", () => {

    test("Test POM - Footer Link List Component Interaction", async ({ page }) => {
        await page.goto('/');

        const homePage = new HomePage(page);
        const footer = homePage.footerComponent();

        const linkTexts = await (await footer.inforColLinkList()).getLinkTexts();
        console.log(linkTexts);

    });

});