import { expect } from '@playwright/test';
import ContainerByClass from "../../components/container/ContainerByClass";
import CareerButtons from "../../identifiers/career/CareerButtons";
import ContainersCareer from "../../identifiers/career/ContainersCareer";
import { containerSteps } from '../../fixtures/DesktopMobileSetup';
import { CareerSteps } from "./CareerSteps";
import { driver } from '../../base/driver/Driver';

class DesktopCareerSteps extends CareerSteps {
    async switchLanguageViaHeader(language: string): Promise<void> {
        const headerContainer = await containerSteps.getContainer(
            ContainerByClass,
            { desktopLocator: ContainersCareer.JobPageHeaderWrapper }
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

    async clickOnFilter(): Promise<void> {
        console.log('This step is skipped for desktop');
        return Promise.resolve();
    }

    async clickOnApply(): Promise<void> {
        await driver.getByTestId(CareerButtons.ApplyNow).click();
    }

    async clickOnBurgerMenu(): Promise<void> {
        console.log('This step is skipped for desktop');
        return Promise.resolve();
    }

    async switchLanguage(language: string): Promise<void> {
        let switcher;
        const parent = await containerSteps.getContainer(ContainerByClass, { desktopLocator: ContainersCareer.NavigationHeaderClass });

        switch (language) {
            case 'ua': {
                switcher = parent.Element.getByTestId(CareerButtons.UaLanguageSwitcher);
                break;
            }
            case 'en': {
                switcher = parent.Element.getByTestId(CareerButtons.EnLanguageSwitcher);
                break;
            }
            default: {
                throw new Error(`${language} is not exist`);
            }
        }

        await switcher.click();
        await expect(switcher).toHaveClass(/active-locale/);
    }
}
const desktopCareerSteps = new DesktopCareerSteps();

export { desktopCareerSteps };
