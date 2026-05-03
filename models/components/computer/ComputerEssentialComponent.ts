import ProductEssentialComponent from "../ProductEssentialComponent";

export default abstract class ComputerEssentialComponent extends ProductEssentialComponent {

    public abstract selectProcessor(value: string): Promise<void>;
    public abstract selectRAM(value: string): Promise<void>;


    protected async selectCompOption(value: string): Promise<void> {
        const optionSel = `//label[contains(text(), "${value}")]`
        await this.component.locator(optionSel).click();
    }

}