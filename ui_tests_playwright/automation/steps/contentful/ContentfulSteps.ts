import {CaseStudyDto} from '../../dto/CaseStudyDto';
import {IndustryTagEnum} from '../../enum/caseStudyEnums/caseStudyTags/IndustryTagEnum';
import {ServiceTagEnum} from '../../enum/caseStudyEnums/caseStudyTags/ServiceTagEnum';
import ContentfulCaseStudyData from '../../preconditionsData/contentfulData/ContentfulCaseStudyData';
import CaseStudyImagesPath from '../../preconditionsData/contentfulData/contentfulCaseStudiesImages/CaseStudyImagesPath';
import {contentfulUtils} from '../../utils/ContentfulUtils';

class ContentfulSteps {
	public async createCareerWithDefaultValue(careerName: string, careerId: string, careerDescriptionId: string) {
		await contentfulUtils.CreateAndPublishCareerDescription(careerDescriptionId);
		await contentfulUtils.CreateAndPublishCareer(careerId, careerName, careerDescriptionId);
	}

	public async createCaseStudy(caseStudyName: string, numberOfCaseStudies = 1, caseStudyObject?: CaseStudyDto) {
		const summaryFields: {fields: {[key: string]: any}} = ContentfulCaseStudyData.getCaseStudySummaryFields();

		if (caseStudyObject?.summary.review) {
			const reviewLink = caseStudyObject.summary.review.link;
			await contentfulUtils.CreateAndPublishSummaryReview(reviewLink);
			summaryFields.fields['review'] = ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().review;
		}

		if (caseStudyObject?.summary.technologiesUsed) {
			const technologiesUsedImage = caseStudyObject.summary.technologiesUsed.image
				? caseStudyObject.summary.technologiesUsed.image.toString()
				: undefined;
			await contentfulUtils.CreateAndPublishSummaryTechnologiesUsed(technologiesUsedImage);
			summaryFields.fields['technologiesUsed'] =
				ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().technologiesUsed;
		}

		if (caseStudyObject?.summary.solution) {
			const solutionImage = caseStudyObject.summary.solution.image
				? caseStudyObject.summary.solution.image.toString()
				: undefined;
			await contentfulUtils.CreateAndPublishSummarySolution(solutionImage);
			summaryFields.fields['newSolution'] =
				ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().newSolution;
		}

		if (caseStudyObject?.summary.workflow) {
			await contentfulUtils.CreateAndPublishSummaryWorkflow();
			summaryFields.fields['newWorkflow'] =
				ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().newWorkflow;
		}

		if (caseStudyObject?.summary.aboutTheTeam) {
			summaryFields.fields['newAboutTheTeam'] =
				ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().newAboutTheTeam;
		}

		summaryFields.fields['location'] = ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().location;

		await contentfulUtils.CreateAndPublishCaseStudySummary(summaryFields);
		const caseStudyImage = caseStudyObject?.caseStudyImage
			? caseStudyObject.caseStudyImage.toString()
			: CaseStudyImagesPath.PreviewImage;

		const assetPreviewImageId = ContentfulCaseStudyData.getCaseStudyMainFields().fields.image['en-US'].sys.id;
		await contentfulUtils.CreateAndPublishCaseStudyImageAsset(caseStudyImage, assetPreviewImageId, 'Preview');

		const caseStudyTags = caseStudyObject?.tags
			? caseStudyObject.tags
			: {industryTag: [IndustryTagEnum.Manufacturing], serviceTag: [ServiceTagEnum.SoftwareTesting]};

		Object.values(caseStudyTags).forEach((tagArray) => {
			contentfulUtils.AddTagsToBody(tagArray);
		});

		for (let index = 1; index <= numberOfCaseStudies; index++) {
			await contentfulUtils.CreateAndPublishCaseStudy(caseStudyName, index);
		}
	}

	public async unpublishAndDeleteCaseStudy(numberOfCaseStudies = 1, caseStudyObject?: CaseStudyDto) {
		const caseStudyMainFields = ContentfulCaseStudyData.getCaseStudyMainFields();
		const summaryOptionalFields = ContentfulCaseStudyData.getCaseStudySummaryOptionalFields();
		const summaryId = caseStudyMainFields.fields.summary['en-US'].sys.id;
		const publishedEntityIds = [summaryId];
		const previewImageId = caseStudyMainFields.fields.image['en-US'].sys.id;
		const solution = caseStudyObject?.summary.solution;
		const publishedAssetIds = [previewImageId];

		for (let index = 1; index <= numberOfCaseStudies; index++) {
			const caseStudyId = ContentfulCaseStudyData.getCaseStudyId(index);
			await contentfulUtils.UnpublishEntry(caseStudyId);
			await contentfulUtils.DeleteEntry(caseStudyId);
		}

		if (caseStudyObject?.summary.review) {
			const reviewId = summaryOptionalFields.review['en-US'].sys.id;
			publishedEntityIds.push(reviewId);
		}

		if (caseStudyObject?.summary.technologiesUsed) {
			const technologiesUsedId = summaryOptionalFields.technologiesUsed['en-US'].sys.id;
			const technologiesUsedImageId =
				ContentfulCaseStudyData.getSummaryTechnologiesUsedFields().fields.awardsImg['en-US'].sys.id;

			publishedEntityIds.push(technologiesUsedId);
			publishedAssetIds.push(technologiesUsedImageId);
		}

		if (solution) {
			const solutionId = summaryOptionalFields.newSolution['en-US'].sys.id;
			publishedEntityIds.push(solutionId);

			if (solution.image) {
				const solutionImageId =
					ContentfulCaseStudyData.getSummarySolutionOptionalFields().imgAfterBlock['en-US'].sys.id;
				publishedAssetIds.push(solutionImageId);
			}
		}

		if (caseStudyObject?.summary.workflow) {
			const workflowId = summaryOptionalFields.newWorkflow['en-US'].sys.id;
			publishedEntityIds.push(workflowId);
		}

		for (const entityId of publishedEntityIds) {
			await contentfulUtils.UnpublishEntry(entityId);
			await contentfulUtils.DeleteEntry(entityId);
		}

		for (const assetId of publishedAssetIds) {
			await contentfulUtils.UnpublishAsset(assetId);
			await contentfulUtils.DeleteAsset(assetId);
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
