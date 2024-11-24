import {Locator, expect} from '@playwright/test';
import {driver} from '../../base/driver/Driver';
import Container from '../../identifiers/Container';
import MainSiteButtons from '../../identifiers/mainSite/MainSiteButtons';
import {baseDriverSteps} from '../../base/step/BaseDriverSteps';
import Calendly from '../../identifiers/mainSite/Calendly';

class CalendlySteps {
	public async checkMemberCardCalendly(memberCard: Locator | undefined, memberData: {name: string; role: string}) {
		if (!memberCard) {
			throw new Error(`No card found for expert: ${memberData.name}`);
		}
		await expect(memberCard).toBeVisible();

		const name = memberCard.getByTestId(Container.MemberName);
		const role = memberCard.getByTestId(Container.MemberRole);
		const consultButton = memberCard.getByTestId(MainSiteButtons.ScheduleAConsultationInCalendly);
		const image = memberCard.locator('.member-foto');

		await expect(name).toHaveText(memberData.name);
		await expect(role).toHaveText(memberData.role);
		await expect(consultButton).toBeVisible();
		await expect(consultButton).toBeEnabled();
		await baseDriverSteps.checkImagesVisibility(image, 1);
	}

	public async findMatchingMemberCardByName(cardElements: Locator[], expertName: string) {
		for (const card of cardElements) {
			const cardName = await card.getByTestId(Container.MemberName).textContent();
			if (cardName === expertName) return card;
		}
	}

	public async checkAppropriateCalendlyModalOpensAndCloses(memberCard: Locator | undefined) {
		if (!memberCard) {
			throw new Error(`No card found`);
		}
		await memberCard.getByTestId(MainSiteButtons.ScheduleAConsultationInCalendly).click();
		const calendlyFrame = driver.frameLocator(Calendly.frame);
		await expect(calendlyFrame).toBeTruthy();
		await driver.locator(Calendly.close).click();
		await expect(driver.locator(Calendly.frame)).toBeHidden();
	}

	public async checkMemberCardCalendlyInForm(
		memberCard: Locator | undefined,
		memberData: {name: string; role: string}
	) {
		if (!memberCard) {
			throw new Error(`No card found for expert: ${memberData.name}`);
		}
		await expect(memberCard).toBeVisible();

		const nameByTestId = memberCard.getByTestId(Container.MemberName);
		const nameByClass = memberCard.locator('.h3.form-expert-name.opacity-1');
		const name = (await nameByTestId.count()) > 0 ? nameByTestId : nameByClass;

		const roleByTestId = memberCard.getByTestId(Container.MemberRole);
		const roleByClass = memberCard.locator('.h4.form-expert-position.opacity-1');
		const role = (await nameByTestId.count()) > 0 ? roleByTestId : roleByClass;

		const consultButton = memberCard.getByTestId(MainSiteButtons.ScheduleAConsultationInCalendly);

		const imageInBlock = memberCard.locator('.member-foto');
		const imageInFormSection = memberCard.locator('.expert-avatar');
		const image = (await imageInBlock.count()) > 0 ? imageInBlock : imageInFormSection;

		await expect(name).toHaveText(memberData.name);
		await expect(role).toHaveText(memberData.role);
		await expect(consultButton).toBeVisible();
		await expect(consultButton).toBeEnabled();
		await baseDriverSteps.checkImagesVisibility(image, 1);
	}
}

const calendlySteps = new CalendlySteps();

export {calendlySteps};
