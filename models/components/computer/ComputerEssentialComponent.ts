import ProductEssentialComponent from "../ProductEssentialComponent";

export default abstract class ComputerEssentialComponent extends ProductEssentialComponent {

    public abstract selectProcessor(value: string): Promise<number>;
    public abstract selectRAM(value: string): Promise<number>;

    public async selectHDD(value: string): Promise<number> {
        return this.extractAdditionalPrice(await this.selectCompOption(value));
    }

    public async selectSoftware(value: string): Promise<number> {
        return this.extractAdditionalPrice(await this.selectCompOption(value));
    }

    public async selectOS(value: string): Promise<number> {
        return this.extractAdditionalPrice(await this.selectCompOption(value));
    }

    protected async selectCompOption(value: string): Promise<string | null> {
        const optionSel = `//label[starts-with(text(), "${value}")]`
        const optionLoc = this.component.locator(optionSel).first();
        await optionLoc.click();
        return optionLoc.textContent();
    }

}