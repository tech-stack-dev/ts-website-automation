import { expect } from '@playwright/test';
import ContainerByClass from "../../components/container/ContainerByClass";
import CareerButtons from "../../identifiers/career/CareerButtons";
import ContainersCareer from "../../identifiers/career/ContainersCareer";
import { containerSteps } from "../components/container/ContainerSteps";
import { CareerSteps } from "./CareerSteps";

class DesktopCareerSteps extends CareerSteps {
    public override async switchLanguageViaHeader(language: string): Promise<void> {
        const headerContainer = await containerSteps.getContainer(
            ContainerByClass,
            ContainersCareer.JobPageHeaderWrapper
        );
        let switcher: any;
        switch (language.toLowerCase()) {
            case 'ua':
                switcher = headerContainer.Element.getByTestId(CareerButtons.UaLanguageSwitcher);
                break;
            case 'en':
                switcher = headerContainer.Element.getByTestId(CareerButtons.EnLanguageSwitcher);
        }

        await switcher.click();
        await expect(switcher).toHaveClass(/active-locale/);
    }
}
const desktopCareerSteps = new DesktopCareerSteps();

export { desktopCareerSteps };
