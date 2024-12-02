import {Locator, expect} from '@playwright/test';
import {driver} from '../../base/driver/Driver';
import Container from '../../identifiers/Container';
import MainSiteButtons from '../../identifiers/mainSite/MainSiteButtons';
import {baseDriverSteps} from '../../base/step/BaseDriverSteps';
import Calendly from '../../identifiers/mainSite/Calendly';

class CalendlySteps {
	public async checkMemberCardCalendly(memberCard: Locator | null, memberData: {name: string; role: string}) {
		if (!memberCard) {
			throw new Error(`No card found for expert: ${memberData.name}`);
		}
		await expect(memberCard).toBeVisible();

		const name = memberCard.getByTestId(Container.MemberName);
		const role = memberCard.getByTestId(Container.MemberRole);
		const consultButton = memberCard.getByTestId(MainSiteButtons.ScheduleAConsultationInCalendly);
		const image = memberCard.getByTestId(Container.MemberImage);

		await expect(name).toHaveText(memberData.name);
		await expect(role).toHaveText(memberData.role);
		await expect(consultButton).toBeVisible();
		await expect(consultButton).toBeEnabled();
		await baseDriverSteps.checkImagesVisibility(image, 1);
	}

	public async findMatchingMemberCardByName(cardElements: Locator[], expertName: string) {
		for (const card of cardElements) {
			const cardName = await card.getByTestId(Container.MemberName).textContent();

			return cardName === expertName ? card : null;
		}
	}

	public async checkAppropriateCalendlyModalOpensAndCloses(memberCard: Locator | null) {
		if (!memberCard) {
			throw new Error(`No card found`);
		}
		await memberCard.getByTestId(MainSiteButtons.ScheduleAConsultationInCalendly).click();
		const calendlyFrame = driver.frameLocator(Calendly.frame);
		await expect(calendlyFrame).toBeTruthy();
		await driver.locator(Calendly.close).click();
		await expect(driver.locator(Calendly.frame)).toBeHidden();
	}
}

const calendlySteps = new CalendlySteps();

export {calendlySteps};
