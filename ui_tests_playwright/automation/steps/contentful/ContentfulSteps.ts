import { contentfulUtils } from '../../utils/ContentfulUtils';

class ContentfulSteps {
	public async createCareerWithDefaultValue(
		careerName: string,
		careerId: string,
		careerDescriptionId: string
	) {
		await contentfulUtils.CreateAndPublishCareerDescription(careerDescriptionId
		);
		await contentfulUtils.CreateAndPublishCareer(careerId, careerName, careerDescriptionId
		);
	}

	public async deleteAndUnpublishCareer(
		careerId: string,
		careerDescriptionId: string
	) {
		await contentfulUtils.UnpublishCareerWithDescription(careerId,careerDescriptionId
		);
		await contentfulUtils.DeleteCareerWithDescription(careerId,careerDescriptionId
		);
	}
}

const contentfulSteps = new ContentfulSteps();
export { contentfulSteps };
