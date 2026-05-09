import ProductEssentialComponent from "../ProductEssentialComponent";

export default abstract class ComputerEssentialComponent extends ProductEssentialComponent {

    public abstract selectProcessor(value: string): Promise<void>;
    public abstract selectRAM(value: string): Promise<void>;

    public async selectHDD(value: string): Promise<void> {
        await this.selectCompOption(value);
    }

    public async selectSoftware(value: string): Promise<void> {
        await this.selectCompOption(value);
    }

    public async selectOS(value: string): Promise<void> {
        await this.selectCompOption(value);
    }

    protected async selectCompOption(value: string): Promise<void> {
        const optionSel = `//label[starts-with(text(), "${value}")]`
        await this.component.locator(optionSel).click();
    }

}