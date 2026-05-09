import { Page } from "@playwright/test";
import ComputerEssentialComponent from "models/components/computer/ComputerEssentialComponent";
import ComputerDetailsPage from "models/pages/ComputerDetailsPage";
import { ComputerDataType } from "test-data/ComputerDataType";

export default class OrderComputerFlow {

    constructor(private page: Page, private computerData: ComputerDataType) {
        this.page = page;
        this.computerData = computerData;
    }

    public async buildComputerSpecAndAddToCart() {
        const { computerCompType, processor, ram, hdd, software, os } = this.computerData;
        const compDetailsPage = new ComputerDetailsPage(this.page);
        const compEssComponent: ComputerEssentialComponent = compDetailsPage.computerEssentialComponent(computerCompType);
        await compEssComponent.unselectAllOptions();
        await compEssComponent.selectProcessor(processor);
        await compEssComponent.selectRAM(ram);
        await compEssComponent.selectHDD(hdd);
        await compEssComponent.selectSoftware(software);
        if (os) {
            await compEssComponent.selectOS(os);
        }
    }

}