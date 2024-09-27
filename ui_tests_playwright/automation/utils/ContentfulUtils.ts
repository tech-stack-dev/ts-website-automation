import ContentfulProvider from '../providers/ContentfulProvider';
import * as contentful from 'contentful-management';
import {SeniorityLevelsEnum} from '../enum/tag/SeniorityLevelsEnum';
import {DirectionsEnum} from '../enum/tag/DirectionsEnum';
import {TagsEnum} from '../enum/tag/TagsEnum';
import {CaseStudyContentTypeEnum} from '../enum/caseStudyEnums/CaseStudyContentTypeEnum';
import ContentfulCaseStudyData from '../preconditionsData/contentfulData/ContentfulCaseStudyData';
import * as fs from 'fs';
import {ClutchReviewLinks} from '../preconditionsData/links/ClutchReviewLinks';
import DateTimeUtils from './DateTimeUtils';
import {IndustryTagEnum} from '../enum/caseStudyEnums/caseStudyTags/IndustryTagEnum';
import {ServiceTagEnum} from '../enum/caseStudyEnums/caseStudyTags/ServiceTagEnum';
import {CareerContentTypeEnum} from '../enum/careerEnums/CareerContentTypeEnum';
import CaseStudyImagesPath from '../preconditionsData/contentfulData/contentfulCaseStudiesImages/CaseStudyImagesPath';
import ContentfulCareerData from '../preconditionsData/contentfulData/ContentfulCareerData ';
import {HomePageTagEnum} from '../enum/caseStudyEnums/caseStudyTags/HomePageTagEnum';

class ContentfulUtils {
	public tagJson: contentful.Link<'Tag'>[] = [];

	async GetEnvironment(): Promise<contentful.Environment> {
		const client = contentful.createClient({
			accessToken: await ContentfulProvider.AccessToken(),
		});
		const space = await client.getSpace(await ContentfulProvider.SpaceId());
		const environment = await space.getEnvironment(await ContentfulProvider.Env());
		return environment;
	}

	//#region TagInteractions
	async CreateTag(tagId: string, tagName: string, publishType: contentful.TagVisibility = 'public'): Promise<void> {
		const environment = await this.GetEnvironment();
		await environment.createTag(tagId, tagName, publishType);
	}

	private AddDefaultTags(directionsTag: DirectionsEnum, seniorityLevelsTag: SeniorityLevelsEnum): void {
		const tagList = [this.GetTagJsonBody(directionsTag), this.GetTagJsonBody(seniorityLevelsTag)];
		tagList.forEach((tag) => {
			const currentTag = this.tagJson.find((item) => item.sys.id === tag.sys.id);
			if (currentTag) return;
			this.tagJson.push(tag);
		});
	}

	AddTagsToBody(
		tagList: DirectionsEnum[] | SeniorityLevelsEnum[] | TagsEnum[] | IndustryTagEnum[] | ServiceTagEnum[]
	): void {
		tagList.forEach((tag) => {
			const currentTag = this.tagJson.find((item) => item.sys.id === tag);
			if (currentTag) return;
			this.tagJson.push(this.GetTagJsonBody(tag));
		});
	}

	public GetTagJsonBody(
		tag: DirectionsEnum | SeniorityLevelsEnum | TagsEnum | IndustryTagEnum | ServiceTagEnum | HomePageTagEnum
	): contentful.Link<'Tag'> {
		const tagJsonBody = {
			sys: {
				type: 'Link',
				linkType: 'Tag',
				id: tag,
			},
		};

		return <contentful.Link<'Tag'>>tagJsonBody;
	}

	async DeleteTag(tagId: string): Promise<void> {
		const environment = await this.GetEnvironment();
		const tag = await environment.getTag(tagId);
		tag.delete();
	}
	//#endregion

	//#region CareerEntriesInteractions
	async CreateAndPublishCareerDescription(descriptionId: string, index = 1, attempts = 3): Promise<void> {
		const environment = await this.GetEnvironment();
		await environment.createEntryWithId(
			CareerContentTypeEnum.Description,
			descriptionId,
			ContentfulCareerData.getDescriptionBody(index)
		);
		await this.publishEntryWithRetry(environment, descriptionId, attempts);
	}

	async CreateAndPublishCareer(
		careerId: string,
		careerNameEn: string,
		descriptionId: string,
		attempts = 3,
		careerNameUa = 'Тестова Вакансія',
		directionsTag = DirectionsEnum.LongSoftwareDataManager,
		seniorityLevelsTag = SeniorityLevelsEnum.Trainee
	): Promise<void> {
		const environment = await this.GetEnvironment();
		this.AddDefaultTags(directionsTag, seniorityLevelsTag);
		const careerFieldsWithDescriptionAndTag = ContentfulCareerData.getCareerMainFields();
		careerFieldsWithDescriptionAndTag.fields.careerDescription['en-US'].sys.id = descriptionId;
		careerFieldsWithDescriptionAndTag.fields.name['en-US'] = careerNameEn;
		careerFieldsWithDescriptionAndTag.fields.name['uk-UA'] = careerNameUa;
		await environment.createEntryWithId(CareerContentTypeEnum.Career, careerId, careerFieldsWithDescriptionAndTag);
		await this.publishEntryWithRetry(environment, careerId, attempts);
	}

	async UnpublishCareerWithDescription(careerId: string, descriptionId: string, attempts = 3): Promise<void> {
		const environment = await this.GetEnvironment();
		await this.unpublishEntryWithRetry(environment, careerId, attempts);
		await this.unpublishEntryWithRetry(environment, descriptionId, attempts);
	}

	async DeleteCareerWithDescription(careerId: string, descriptionId: string): Promise<void> {
		const environment = await this.GetEnvironment();
		const createdCareer = await environment.getEntry(careerId);
		await createdCareer.delete();
		const createdDescription = await environment.getEntry(descriptionId);
		await createdDescription.delete();
	}

	private async publishEntryWithRetry(environment: any, entryId: string, attempts: number): Promise<void> {
		await this.performEntityActionWithRetry(environment, entryId, 'Entry', 'publish', attempts);
	}

	private async unpublishEntryWithRetry(environment: any, entryId: string, attempts: number): Promise<void> {
		await this.performEntityActionWithRetry(environment, entryId, 'Entry', 'unpublish', attempts);
	}

	private async publishAssetWithRetry(environment: any, assetId: string, attempts: number): Promise<void> {
		await this.performEntityActionWithRetry(environment, assetId, 'Asset', 'publish', attempts);
	}

	private async unpublishAssetWithRetry(environment: any, assetId: string, attempts: number): Promise<void> {
		await this.performEntityActionWithRetry(environment, assetId, 'Asset', 'unpublish', attempts);
	}

	private async performEntityActionWithRetry(
		environment: any,
		entityId: string,
		entityType: 'Entry' | 'Asset',
		action: 'publish' | 'unpublish',
		attempts: number
	): Promise<void> {
		let retryCount = 0;
		let isActionSuccessful = false;
		while (!isActionSuccessful && retryCount < attempts) {
			let entity;
			if (entityType === 'Entry') {
				entity = await environment.getEntry(entityId);
			} else if (entityType === 'Asset') {
				entity = await environment.getAsset(entityId);
			}
			try {
				if (action === 'publish') {
					if (!entity.isPublished()) {
						await entity.publish();
					}
					isActionSuccessful = entity.isPublished();
				} else if (action === 'unpublish') {
					if (entity.isPublished()) {
						await entity.unpublish();
					}
					isActionSuccessful = !entity.isPublished();
				}
			} catch (error) {
				console.error(`Error ${action}ing ${entityType.toLowerCase()}:`, error);
				retryCount++;
				console.log(`Retrying ${action} (${retryCount})...`);
			}
		}

		if (!isActionSuccessful) {
			console.log(`${entityType} could not be ${action}ed after multiple retries.`);
			throw new Error(`${entityType} could not be ${action}ed.`); // Throw an error to fail the test run and stop execution
		}
	}
	//#endregion

	//#region CaseStudiesEntriesInteractions
	async CreateAndPublishCaseStudy(
		caseStudyName: string,
		index: number,
		objectRepresentation: {fields: {[key: string]: any}} = ContentfulCaseStudyData.getCaseStudyMainFields(index),
		attempts = 3
	): Promise<void> {
		const environment = await this.GetEnvironment();
		const caseStudyFields = objectRepresentation;
		caseStudyFields.fields.name[
			'en-US'
		] = `${caseStudyName} ${DateTimeUtils.currentDateTime} ${caseStudyFields.fields.name['en-US']}`;
		const caseStudyId = ContentfulCaseStudyData.getCaseStudyId(index);

		await environment.createEntryWithId(CaseStudyContentTypeEnum.CaseStudy, caseStudyId, caseStudyFields);
		await this.publishEntryWithRetry(environment, caseStudyId, attempts);
	}

	async CreateAndPublishCaseStudySummary(summaryFields: {fields: {[key: string]: any}}, attempts = 3): Promise<void> {
		const environment = await this.GetEnvironment();
		const summaryId = ContentfulCaseStudyData.getCaseStudyMainFields().fields.summary['en-US'].sys.id;

		await environment.createEntryWithId(
			CaseStudyContentTypeEnum.Summary,
			summaryId,
			summaryFields // Note: Here should be actual object representation of summary
		);
		await this.publishEntryWithRetry(environment, summaryId, attempts);
	}

	async CreateAndPublishSummaryReview(
		reviewLink = ClutchReviewLinks.AnonymousMedicalDevice,
		attempts = 3
	): Promise<void> {
		const environment = await this.GetEnvironment();
		const reviewId = ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().review['en-US'].sys.id;
		const reviewFields = ContentfulCaseStudyData.getSummaryReviewFields();

		reviewFields.fields.link['en-US'] = reviewLink;
		await environment.createEntryWithId(CaseStudyContentTypeEnum.SummaryReview, reviewId, reviewFields);
		await this.publishEntryWithRetry(environment, reviewId, attempts);
	}

	async CreateAndPublishSummaryTechnologiesUsed(
		imagePath = CaseStudyImagesPath.TechnologiesUsedImage,
		attempts = 3
	): Promise<void> {
		const environment = await this.GetEnvironment();
		const technologiesUsedId =
			ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().technologiesUsed['en-US'].sys.id;
		const assetTechnologiesUsedImageId =
			ContentfulCaseStudyData.getSummaryTechnologiesUsedFields().fields.awardsImg['en-US'].sys.id;

		await this.CreateAndPublishCaseStudyImageAsset(imagePath, assetTechnologiesUsedImageId, 'TechnologiesUsed');

		await environment.createEntryWithId(
			CaseStudyContentTypeEnum.SummaryTechnologies,
			technologiesUsedId,
			ContentfulCaseStudyData.getSummaryTechnologiesUsedFields()
		);
		await this.publishEntryWithRetry(environment, technologiesUsedId, attempts);
	}

	async CreateAndPublishSummarySolution(imagePath?: string, attempts = 3): Promise<void> {
		const environment = await this.GetEnvironment();
		const solutionId = ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().newSolution['en-US'].sys.id;
		const summarySolutionFields: {fields: {[key: string]: any}} =
			ContentfulCaseStudyData.getSummarySolutionFields();
		const summarySolutionOptionalFields = ContentfulCaseStudyData.getSummarySolutionOptionalFields();

		if (imagePath) {
			summarySolutionFields.fields['imgAfterBlock'] = summarySolutionOptionalFields.imgAfterBlock;
			const assetSolutionImageId = summarySolutionOptionalFields.imgAfterBlock['en-US'].sys.id;

			await this.CreateAndPublishCaseStudyImageAsset(imagePath, assetSolutionImageId, 'Solution');
		}

		await environment.createEntryWithId(
			CaseStudyContentTypeEnum.SummarySolution,
			solutionId,
			summarySolutionFields
		);

		await this.publishEntryWithRetry(environment, solutionId, attempts);
	}

	async CreateAndPublishSummaryWorkflow(attempts = 3): Promise<void> {
		const environment = await this.GetEnvironment();
		const workflowId = ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().newWorkflow['en-US'].sys.id;

		await environment.createEntryWithId(
			CaseStudyContentTypeEnum.SummaryWorkflow,
			workflowId,
			ContentfulCaseStudyData.getSummaryWorkflowFields()
		);
		await this.publishEntryWithRetry(environment, workflowId, attempts);
	}

	async UnpublishEntry(entryId: string, attempts = 3): Promise<void> {
		const environment = await this.GetEnvironment();
		await this.unpublishEntryWithRetry(environment, entryId, attempts);
	}

	async UnpublishAsset(assetId: string, attempts = 3): Promise<void> {
		const environment = await this.GetEnvironment();
		await this.unpublishAssetWithRetry(environment, assetId, attempts);
	}

	async DeleteEntry(entryId: string): Promise<void> {
		const environment = await this.GetEnvironment();
		const createdEntity = await environment.getEntry(entryId);
		await createdEntity.delete();
	}

	async DeleteAsset(assetId: string): Promise<void> {
		const environment = await this.GetEnvironment();
		const createdEntity = await environment.getAsset(assetId);
		await createdEntity.delete();
	}
	//#endregion

	//#region CaseStudiesAssetsInteractions
	async UploadAssetToContentful(imagePath: string) {
		const environment = await this.GetEnvironment();
		const uploadedAsset = (await environment.createUpload({file: fs.createReadStream(imagePath)})).sys.id;
		return uploadedAsset;
	}

	async CreateAndPublishCaseStudyImageAsset(
		imagePath: string,
		assetImageId: string,
		uniqIdentificationName: string
	): Promise<void> {
		const environment = await this.GetEnvironment();
		const caseStudyPreviewImageAssetFields = await ContentfulCaseStudyData.getCaseStudyImageAssetFields(
			imagePath,
			uniqIdentificationName
		);
		const asset = await environment.createAssetWithId(assetImageId, caseStudyPreviewImageAssetFields);
		const processedAsset = await asset.processForAllLocales();

		await processedAsset.publish();
	}
	//#endregion
}

const contentfulUtils = new ContentfulUtils();
export {contentfulUtils};
