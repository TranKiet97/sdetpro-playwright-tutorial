import test from "@playwright/test";
import FooterTestFlow from "test-flows/global/FooterTestFlow";

const PAGES = [
    { pageName: "Home Page", slug: '/' },
    { pageName: "Login Page", slug: '/login' },
    { pageName: "Register Page", slug: '/register' },
]

test.describe("Day 31 Tests", () => {
    
    PAGES.forEach(pageTest => {
        test(`${pageTest.pageName} - Footer Test Flow Interaction`, async ({ page }) => {
            await page.goto(pageTest.slug);
            const footerTestFlow = new FooterTestFlow(page);
            await footerTestFlow.verifyFooterComponent();
        })
    })

});