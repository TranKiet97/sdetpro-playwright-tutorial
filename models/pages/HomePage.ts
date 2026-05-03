import PageBodyComponent from "models/components/PageBodyComponent";
import BasePage from "./BasePage";

export default class HomePage extends BasePage {

    public pageBodyComp(): PageBodyComponent {
        return new PageBodyComponent(this.page.locator(PageBodyComponent.SELECTOR));
    }

}