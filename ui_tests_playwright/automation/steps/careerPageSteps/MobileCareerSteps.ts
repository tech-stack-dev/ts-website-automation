import { expect } from '@playwright/test';
import CareerButtons from "../../identifiers/career/CareerButtons";
import { CareerSteps } from "./CareerSteps";
import { driver } from '../../base/driver/Driver';
import AboutUsCareer from '../../identifiers/career/pages/AboutUsCareer';
import { containerSteps } from '../../fixtures/DesktopMobileSetup';
import ContainerByClass from '../../components/container/ContainerByClass';
import ContainersCareer from '../../identifiers/career/ContainersCareer';
import Buttons from '../../identifiers/Buttons';
import Header from '../../identifiers/mainSite/Header';

class MobileCareerSteps extends CareerSteps {
    async switchLanguageViaHeader(language: string): Promise<void> {
        let switcher: any;
        switch (language.toLowerCase()) {
            case 'ua':
                switcher = driver.getByTestId(CareerButtons.UaLanguageSwitcher);
                break;
            case 'en':
                switcher = driver.getByTestId(CareerButtons.EnLanguageSwitcher);
        }

        await driver.Page.locator("//div[contains(@class,'styledComponents__BurgerMenuWrapper')]").first().click();
        await switcher.click();
        await expect(switcher).toHaveClass(/active-locale/);
    }

    async clickOnFilter(): Promise<void> {
        await driver.getByTestId(CareerButtons.FilterButton).click();
    }

    async clickOnApply(): Promise<void> {
        await driver.getByTestId(AboutUsCareer.ApplyNowButton).click();
    }

    async clickOnBurgerMenu(): Promise<void> {
        let burgerMenu = await driver.getByTestId(Header.Menu).isVisible() ? driver.getByTestId(Header.Menu)
            : driver.locator("//div[contains(@class,'styledComponents__BurgerMenuWrapper')]").first();
        await burgerMenu.click();
    }

    async switchLanguage(language: string): Promise<void> {
        let switcher;
        const parent = await containerSteps.getContainer(ContainerByClass, { desktopLocator: ContainersCareer.MainModalMenuWrapper });

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

        await this.clickOnBurgerMenu();
        await switcher.click();
        await driver.Page.waitForLoadState('networkidle');
        await expect(switcher).toHaveClass(/active-locale/);
        await driver.getByTestId(Buttons.Close).click();
    }
}
const mobileCareerSteps = new MobileCareerSteps();

export { mobileCareerSteps };
