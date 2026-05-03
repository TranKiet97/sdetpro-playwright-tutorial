import ComputerEssentialComponent from "models/components/computer/ComputerEssentialComponent";
import BasePage from "./BasePage";
import CheapCompEssComponent from "models/components/computer/CheapCompEssComponent";
import StandardCompEssComponent from "models/components/computer/StandardCompEssComponent";
import ExpensiveCompEssComponent from "models/components/computer/ExpensiveCompEssComponent";
import { error } from "node:console";

export default class ComputerDetailsPage extends BasePage {

    // Variants of ComputerEssentialComponent
    public computerEssentialComponent(componentName: string): ComputerEssentialComponent {
        switch (componentName.toUpperCase()) {
            case "CHEAP":
                return new CheapCompEssComponent(this.page.locator(CheapCompEssComponent.SELECTOR));
            case "STANDARD":
                return new StandardCompEssComponent(this.page.locator(StandardCompEssComponent.SELECTOR));
            case "EXPENSIVE":
                return new ExpensiveCompEssComponent(this.page.locator(ExpensiveCompEssComponent.SELECTOR));
            default:
                throw error("it does not have any matching Component")
        }
    }

}