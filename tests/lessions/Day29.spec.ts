import test from "@playwright/test";
import LoginPageMethod01 from "../../models/pages/LoginPageMethod01";
import LoginPageMethod02 from "../../models/pages/LoginPageMethod02";
import { SLUGS } from "constants/slugs";
import HomePage from "models/pages/HomePage";

const LOGIN_CREDS = {
    username: "kiet.tran@gmail.com",
    password: "Tosca1234!"
}

test.describe("Day 29 Tests", () => {
    test("Login with valid credentials", async ({ page }) => {
        const loginPage = new LoginPageMethod01(page);
        await page.goto(SLUGS.LOGIN_PAGE);
        await loginPage.inputUsername(LOGIN_CREDS.username);
        await loginPage.inputPassword(LOGIN_CREDS.password );
        await loginPage.clickOnLoginBtn();
    });

    test("Login with valid credentials version 2", {tag: '@smoke'}, async ({ page }) => {
        const loginPage = new LoginPageMethod02(page);
        await page.goto(SLUGS.LOGIN_PAGE);
        await loginPage.doLogin(LOGIN_CREDS);
    });

    test("Test POM - Component Interaction", {tag: '@smoke'}, async ({ page }) => { 
        await page.goto('/');

        const homePage = new HomePage(page);
        const footer = homePage.footerComponent();

        const powerText = await footer.powerText();
        console.log(powerText);
    });

    test("Test POM - List of Components Interaction", async ({ page }) => { 
        await page.goto('/');

        const homePage = new HomePage(page);

        (await homePage.pageBodyComp().productItemComponentList()).map(async item => console.log(await item.getProductName()));
    });
});