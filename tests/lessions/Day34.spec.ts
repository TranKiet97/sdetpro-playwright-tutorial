import test from "@playwright/test";
import { standardComputerData } from "test-data/computer/StandardComputerData";
import OrderComputerFlow from "test-flows/computer/OrderComputerFlow";

test.describe("Day 34 Tests", () => {
    test("Test Standard Computer Component", { tag: '@smoke' }, async ({ page }) => {
        await page.goto('/build-your-own-computer');
        const orderComputerFlow = new OrderComputerFlow(page, standardComputerData)
        await orderComputerFlow.buildComputerSpecAndAddToCart();
    });

});