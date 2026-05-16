import { expect, Page } from "@playwright/test";
import ComputerEssentialComponent from "models/components/computer/ComputerEssentialComponent";
import CheckoutOptionPage from "models/pages/CheckoutOptionPage";
import ComputerDetailsPage from "models/pages/ComputerDetailsPage";
import ShoppingCartPage from "models/pages/ShoppingCartPage";
import { ComputerDataType } from "test-data/ComputerDataType";

export default class OrderComputerFlow {
    private computerPrice: number = 0;
    private totalPrice: number = 0;

    constructor(private page: Page, private computerData: ComputerDataType) {
        this.page = page;
        this.computerData = computerData;
    }

    public async buildComputerSpecAndAddToCart() {
        const { computerCompType, processor, ram, hdd, software, os, quantity } = this.computerData;
        const compDetailsPage = new ComputerDetailsPage(this.page);
        const compEssComponent: ComputerEssentialComponent = compDetailsPage.computerEssentialComponent(computerCompType);
        await compEssComponent.unselectAllOptions();
        const processorAdditionalPrice = await compEssComponent.selectProcessor(processor);
        const ramAdditionalPrice = await compEssComponent.selectRAM(ram);
        const hddAdditionalPrice = await compEssComponent.selectHDD(hdd);
        const softwareAdditionalPrice = await compEssComponent.selectSoftware(software);
        let osAdditionalPrice = 0;
        if (os) {
            osAdditionalPrice = await compEssComponent.selectOS(os);
        }
        if (quantity) {
            await compEssComponent.inputQuantity(quantity);
        }
        let basePrice = await compEssComponent.basePrice();
        this.computerPrice = basePrice + processorAdditionalPrice + ramAdditionalPrice + hddAdditionalPrice + softwareAdditionalPrice + osAdditionalPrice
        this.totalPrice = this.computerPrice * (quantity ? quantity : 1);
        console.log(`Total price: ${this.totalPrice}`);

        const reqSlug = await compEssComponent.clickAddToCart();
        await this.page.waitForResponse(reqSlug);

        await compDetailsPage.headerComponent().clickOnShoppingCartLink();
    }

    public async verifyShoppingCart() {
        const shoppingCartPage = new ShoppingCartPage(this.page);
        const cartItemComponentList = await shoppingCartPage.cartItemComponentList();
        const totalsComponent = await shoppingCartPage.totalsComponent();

        expect(cartItemComponentList.length).toBeGreaterThan(0);
        let sumOfSubTotals = 0;
        for (const cartItem of cartItemComponentList) {
            expect(await cartItem.subTotal()).toEqual(await cartItem.unitPrice() * await cartItem.quantity());
            sumOfSubTotals += await cartItem.subTotal();
        }
        const priceCategories = await totalsComponent.priceCategories();
        expect(sumOfSubTotals).toEqual(priceCategories["Sub-Total"])
        expect(priceCategories["Total"]).toEqual(priceCategories["Sub-Total"] + priceCategories["Shipping"] + priceCategories["Tax"])

    }

    public async agreeTOSAndCheckout() {

        const shoppingCartPage = new ShoppingCartPage(this.page);
        const checkoutOptionPage = new CheckoutOptionPage(this.page)
        await (await shoppingCartPage.totalsComponent()).acceptTOS();
        await (await shoppingCartPage.totalsComponent()).clickCheckoutBtn();
        await checkoutOptionPage.clickCheckoutAsGuestBtn();

    }

}