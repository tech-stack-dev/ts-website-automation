import {driver} from '../../base/driver/Driver';
import Career from '../../identifiers/Career';
import Containers from '../../identifiers/Containers';
import {stringUtils} from '../../utils/StringUtils';
import ContainerByClass from '../../components/Container/ContainerByClass';

class CareerSteps {
	public async verifyThatCareerWasCreated(careerName: string) {
		await driver.executeFunc(async () => {
			await driver.Page.reload();
			await driver.getByTestId(Career.searchCareerField).clear();
			await driver.getByTestId(Career.searchCareerField).fill(careerName);
			await driver.getByTestId(Career.searchButton).click();
			await driver
				.getByTestId(
					`${
						Containers.careerCardWithoutModifier
					}${stringUtils.convertToPascalCase(careerName)}`
				)
				.waitFor();
		}, 5);
	}

	public async clickOnCareerCard(careerName: string) {
		await driver
			.getByTestId(
				`${
					Containers.careerCardWithoutModifier
				}${stringUtils.convertToPascalCase(careerName)}`
			)
			.click();
	}

	public async getBreadcrumbsText() {
		const breadcrumbs = await driver.component(
			ContainerByClass,
			Career.breadcrumbsInCareer
		);
		return breadcrumbs.textContent();
	}
}

const careerSteps = new CareerSteps();

export {careerSteps};
