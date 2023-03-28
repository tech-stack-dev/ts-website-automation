import {contentfulUtils} from '../../utils/ContentfulUtils';
import {stringUtils} from '../../utils/StringUtils';

class ContentfulSteps {
	public async createCareerWithDefaultValue(
		careerName: string,
		careerId: string,
		careerDescriptionId: string
	) {
		await contentfulUtils.CreateAndPublishCareerDescription(
			stringUtils.AddRandom(careerDescriptionId)
		);
		await contentfulUtils.CreateAndPublishCareer(
			stringUtils.AddRandom(careerId),
			stringUtils.AddRandom(careerName),
			stringUtils.AddRandom(careerDescriptionId)
		);
	}

	public async deleteAndUnpublishCareer(
		careerId: string,
		careerDescriptionId: string
	) {
		await contentfulUtils.UnpublishCareerWithDescription(
			stringUtils.AddRandom(careerId),
			stringUtils.AddRandom(careerDescriptionId)
		);
		await contentfulUtils.DeleteCareerWithDescription(
			stringUtils.AddRandom(careerId),
			stringUtils.AddRandom(careerDescriptionId)
		);
	}
}

const contentfulSteps = new ContentfulSteps();
export {contentfulSteps};
