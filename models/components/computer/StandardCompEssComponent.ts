import { error } from "node:console";
import ComputerEssentialComponent from "./ComputerEssentialComponent";
import { Locator } from "@playwright/test";

export default class StandardCompEssComponent extends ComputerEssentialComponent {

    public async selectProcessor(value: string): Promise<number> {
        const processorDropdown = this.component.locator('(//select[contains(@id, "product_attribute")])[1]');
        return await this.selectOptionInDropdown(processorDropdown, value);
    }

    public async selectRAM(value: string): Promise<number> {
        const ramDropdown = this.component.locator('(//select[contains(@id, "product_attribute")])[2]');
        return await this.selectOptionInDropdown(ramDropdown, value);
    }

    private async selectOptionInDropdown(drodownLoc: Locator, value: string): Promise<number> {
        const optionList = (await drodownLoc.locator('//option').all()).map(async item => await item.innerText());
        let optionIndex = -1;
        for (const option of optionList) {
            if ((await option).includes(value)) {
                optionIndex = optionList.indexOf(option);
                break;
            }
        }

        if (optionIndex < 0) {
            throw error("It does not have matching option")
        }

        await drodownLoc.selectOption({ index: optionIndex })
        return this.extractAdditionalPrice(await optionList[optionIndex]);
    }

}