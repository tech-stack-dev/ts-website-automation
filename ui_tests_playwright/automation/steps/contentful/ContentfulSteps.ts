import {CaseStudyDto} from '../../dto/CaseStudyDto';
import ContentfulCaseStudyData from '../../preconditionsData/contentfulData/ContentfulCaseStudyData';
import CaseStudyImagesPath from '../../preconditionsData/contentfulData/ContentfulCaseStudyImages/CaseStudyImages';
import {contentfulUtils} from '../../utils/ContentfulUtils';

class ContentfulSteps {
	public async createCareerWithDefaultValue(careerName: string, careerId: string, careerDescriptionId: string) {
		await contentfulUtils.CreateAndPublishCareerDescription(careerDescriptionId);
		await contentfulUtils.CreateAndPublishCareer(careerId, careerName, careerDescriptionId);
	}

	// use loop
	public async createCaseStudyEntity(
		caseStudyName: string, // Nai bude
		numberOfCaseStudies = 1,
		caseStudyObject?: CaseStudyDto
	) {
		const summaryFields: {fields: {[key: string]: any}} = ContentfulCaseStudyData.getCaseStudySummaryFields();

		if (caseStudyObject?.review) {
			const reviewLink = caseStudyObject.reviewLink; // || undefined !!!!
			await contentfulUtils.CreateAndPublishSummaryReview(reviewLink);
			summaryFields.fields['review'] = ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().review;
		}

		if (caseStudyObject?.technologiesUsed) {
			const technologiesUsedImage = caseStudyObject.technologiesUsedImage
				? caseStudyObject.technologiesUsedImage.toString()
				: undefined;
			await contentfulUtils.CreateAndPublishSummaryTechnologiesUsed(technologiesUsedImage);
			summaryFields.fields['technologiesUsed'] =
				ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().technologiesUsed;
		}

		if (caseStudyObject?.solution) {
			const solutionImage = caseStudyObject.solutionImage ? caseStudyObject.solutionImage.toString() : undefined;
			await contentfulUtils.CreateAndPublishSummarySolution(solutionImage);
			summaryFields.fields['newSolution'] =
				ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().newSolution;
		}

		if (caseStudyObject?.workflow) {
			await contentfulUtils.CreateAndPublishSummaryWorkflow();
			summaryFields.fields['newWorkflow'] =
				ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().newWorkflow;
		}

		if (caseStudyObject?.aboutTheTeam) {
			summaryFields.fields['newAboutTheTeam'] =
				ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().newAboutTheTeam;
		}

		summaryFields.fields['location'] = ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().location;

		// Here is the problem of dynamically adding optional fields and updating object representation of this entity. That`s why here summaryFields also in props
		await contentfulUtils.CreateAndPublishCaseStudySummary(summaryFields);
		// Or maybe here re-asign the image path in ??? data object?
		const caseStudyImage = caseStudyObject?.caseStudyImage
			? caseStudyObject.caseStudyImage.toString()
			: CaseStudyImagesPath.PreviewImage;

		const assetPreviewImageId = ContentfulCaseStudyData.getCaseStudyMainFields().fields.image['en-US'].sys.id;
		await contentfulUtils.CreateAndPublishCaseStudyImageAsset(caseStudyImage, assetPreviewImageId, 'Preview');

		for (let index = 1; index <= numberOfCaseStudies; index++) {
			await contentfulUtils.CreateAndPublishCaseStudy(caseStudyName, index);
		}
	}

	public async createManyCareersWithDefaultValue(
		careerName: string,
		careerId: string,
		careerDescriptionId: string,
		countOfCareers: number
	) {
		const indexes = Array.from({length: countOfCareers}, (_, index) => index + 1);
		for (const index of indexes) {
			await contentfulUtils.CreateAndPublishCareerDescription(`${careerDescriptionId}${index}`, index);
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

	public async deleteAndUnpublishManyCareersCareer(
		careerId: string,
		careerDescriptionId: string,
		countOfCareers: number
	) {
		const indexes = Array.from({length: countOfCareers}, (_, index) => index + 1);
		for (const index of indexes) {
			await contentfulUtils.UnpublishCareerWithDescription(
				`${careerId}${index}`,
				`${careerDescriptionId}${index}`
			);
			await contentfulUtils.DeleteCareerWithDescription(`${careerId}${index}`, `${careerDescriptionId}${index}`);
		}
	}
}

const contentfulSteps = new ContentfulSteps();
export {contentfulSteps};
