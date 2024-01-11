import { expect } from '@playwright/test';
import ContainerByClass from "../../components/container/ContainerByClass";
import CareerButtons from "../../identifiers/career/CareerButtons";
import ContainersCareer from "../../identifiers/career/ContainersCareer";
import { containerSteps } from "../components/container/ContainerSteps";
import { CareerSteps } from "./CareerSteps";
import { driver } from '../../base/driver/Driver';

class MobileCareerSteps extends CareerSteps {
    public override async switchLanguageViaHeader(language: string): Promise<void> {
        // const headerContainer = await containerSteps.getContainer(
        //     ContainerByClass,
        //     ContainersCareer.JobPageHeaderWrapper
        // );
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
        // await driver.Page.locator("//button[@class='close-button-wrapper']").click();
        await expect(switcher).toHaveClass(/active-locale/);
    }
}
const mobileCareerSteps = new MobileCareerSteps();

export { mobileCareerSteps };
