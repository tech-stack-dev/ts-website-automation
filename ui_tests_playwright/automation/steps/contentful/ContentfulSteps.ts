import {contentfulUtils} from '../../utils/ContentfulUtils';

class ContentfulSteps {
	public async createCareerWithDefaultValue(careerName: string, careerId: string, careerDescriptionId: string) {
		await contentfulUtils.CreateAndPublishCareerDescription(careerDescriptionId);
		await contentfulUtils.CreateAndPublishCareer(careerId, careerName, careerDescriptionId);
	}

	public async createManyCareersWithDefaultValue(
		careerName: string,
		careerId: string,
		careerDescriptionId: string,
		countOfCareers: number
	) {
		const indexes = Array.from({length: countOfCareers}, (_, index) => index + 1);
		for (const index of indexes) {
			const asd = careerDescriptionId.slice(0, -1) + '1';
			await contentfulUtils.CreateAndPublishCareerDescription(asd);
			await contentfulUtils.CreateAndPublishCareer(
				`${careerId}${index}`,
				`${careerName}${index}`,
				`${careerDescriptionId}${index}`
			);
		}
	}

	public async deleteAndUnpublishCareer(careerId: string, careerDescriptionId: string) {
		await contentfulUtils.UnpublishCareerWithDescription(careerId, careerDescriptionId);
		await contentfulUtils.DeleteCareerWithDescription(careerId, careerDescriptionId);
	}

	public async deleteAndUnpublishManyCareersCareer(careerId: string, careerDescriptionId: string, countOfCareers: number) {
		const indexes = Array.from({length: countOfCareers}, (_, index) => index + 1);
		for (const index of indexes) {
			await contentfulUtils.UnpublishCareerWithDescription(`${careerId}${index}`, `${careerDescriptionId}${index}`);
			await contentfulUtils.DeleteCareerWithDescription(`${careerId}${index}`, `${careerDescriptionId}${index}`);
		}
	}
}

const contentfulSteps = new ContentfulSteps();
export {contentfulSteps};
