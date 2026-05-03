import test from "@playwright/test";
import ComputerEssentialComponent from "models/components/computer/ComputerEssentialComponent";
import ComputerDetailsPage from "models/pages/ComputerDetailsPage";

test.describe("Day 32 Tests", () => {

    test("Test Cheap Computer Component", { tag: '@smoke' }, async ({ page }) => {
        await page.goto('/build-your-cheap-own-computer');
        const compDetailsPage = new ComputerDetailsPage(page);
        const cheapCompEssComponent: ComputerEssentialComponent = compDetailsPage.computerEssentialComponent("Cheap");
        await cheapCompEssComponent.selectProcessor('Fast');
        await cheapCompEssComponent.selectRAM('4 GB');
    });

    test("Test Standard Computer Component", { tag: '@smoke' }, async ({ page }) => {
        await page.goto('/build-your-own-computer');
        const compDetailsPage = new ComputerDetailsPage(page);
        const standardCompEssComponent: ComputerEssentialComponent = compDetailsPage.computerEssentialComponent("Standard");
        await standardCompEssComponent.selectProcessor('2.5 GHz');
        await standardCompEssComponent.selectRAM('4GB');
    });

    test("Test Expensive Computer Component", { tag: '@smoke' }, async ({ page }) => {
        await page.goto('/build-your-own-expensive-computer-2');
        const compDetailsPage = new ComputerDetailsPage(page);
        const expensiveCompEssComponent: ComputerEssentialComponent = compDetailsPage.computerEssentialComponent("Expensive");
        await expensiveCompEssComponent.selectProcessor('Fast');
        await expensiveCompEssComponent.selectRAM('4GB');
    });

});