import ComputerEssentialComponent from "./ComputerEssentialComponent";

export default class CheapCompEssComponent extends ComputerEssentialComponent{

    public async selectProcessor(value: string): Promise<number> {
        return this.extractAdditionalPrice(await this.selectCompOption(value));
    }

    public async selectRAM(value: string): Promise<number> {
        return this.extractAdditionalPrice(await this.selectCompOption(value));
    }

}