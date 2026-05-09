import test from "@playwright/test";
import { cheapComputerData } from "test-data/computer/CheapComputerData";
import { expensiveComputerData } from "test-data/computer/ExpensiveComputerData";
import { standardComputerData } from "test-data/computer/StandardComputerData";
import OrderComputerFlow from "test-flows/computer/OrderComputerFlow";

test.describe("Day 32 Tests", () => {

    test("Test Cheap Computer Component", { tag: '@smoke' }, async ({ page }) => {
        await page.goto('/build-your-cheap-own-computer');
        const orderComputerFlow = new OrderComputerFlow(page, cheapComputerData)
        await orderComputerFlow.buildComputerSpecAndAddToCart();
    });

    test("Test Standard Computer Component", { tag: '@smoke' }, async ({ page }) => {
        await page.goto('/build-your-own-computer');
        const orderComputerFlow = new OrderComputerFlow(page, standardComputerData)
        await orderComputerFlow.buildComputerSpecAndAddToCart();
    });

    test("Test Expensive Computer Component", { tag: '@smoke' }, async ({ page }) => {
        await page.goto('/build-your-own-expensive-computer-2');
        const orderComputerFlow = new OrderComputerFlow(page, expensiveComputerData)
        await orderComputerFlow.buildComputerSpecAndAddToCart();
    });

});