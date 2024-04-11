import ContentfulProvider from '../providers/ContentfulProvider';
import * as contentful from 'contentful-management';
import {sessionValue} from '../runtimeVariables/SessionValue';
import {SeniorityLevelsEnum} from '../enum/tag/SeniorityLevelsEnum';
import {DirectionsEnum} from '../enum/tag/DirectionsEnum';
import {TagsEnum} from '../enum/tag/TagsEnum';
import {CaseStudyContentTypeEnum} from '../enum/caseStudyEnums/CaseStudyContentTypeEnum';
import ContentfulCaseStudyData from '../preconditionsData/contentfulData/ContentfulCaseStudyData';
import * as fs from 'fs';
import CaseStudyImagesPath from '../preconditionsData/contentfulData/ContentfulCaseStudyImages/CaseStudyImages';
import {ClutchReviewLinks} from '../preconditionsData/links/ClutchReviewLinks';

class ContentfulUtils {
	private tagJson: contentful.Link<'Tag'>[] = [];

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

	AddTagsToCareerBody(tagList: DirectionsEnum[] | SeniorityLevelsEnum[] | TagsEnum[]): void {
		tagList.forEach((tag) => {
			const currentTag = this.tagJson.find((item) => item.sys.id === tag);
			if (currentTag) return;
			this.tagJson.push(this.GetTagJsonBody(tag));
		});
	}

	private GetTagJsonBody(tag: DirectionsEnum | SeniorityLevelsEnum | TagsEnum): contentful.Link<'Tag'> {
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
		await environment.createEntryWithId('careerDescription', descriptionId, this.getDescriptionBody(index));
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
		const careerFieldsWithDescriptionAndTag = this.careerFields;
		careerFieldsWithDescriptionAndTag.fields.careerDescription['en-US'].sys.id = descriptionId;
		careerFieldsWithDescriptionAndTag.fields.name['en-US'] = careerNameEn;
		careerFieldsWithDescriptionAndTag.fields.name['uk-UA'] = careerNameUa;
		await environment.createEntryWithId('career', careerId, this.careerFields);
		await this.publishEntryWithRetry(environment, careerId, attempts);
	}

	async UnpublishCareerWithDescription(careerId: string, descriptionId: string, attempts = 3): Promise<void> {
		const environment = await this.GetEnvironment();
		await environment.getEntry(careerId); // Not needed
		await this.unpublishEntryWithRetry(environment, careerId, attempts);
		await environment.getEntry(descriptionId); // Not needed
		await this.unpublishEntryWithRetry(environment, descriptionId, attempts); // Check additionally for retries
	}

	async DeleteCareerWithDescription(careerId: string, descriptionId: string): Promise<void> {
		const environment = await this.GetEnvironment();
		const createdCareer = await environment.getEntry(careerId);
		await createdCareer.delete();
		const createdDescription = await environment.getEntry(descriptionId);
		await createdDescription.delete();
	}

	private async publishEntryWithRetry(environment: any, entryId: string, attempts: number): Promise<void> {
		await this.performEntryActionWithRetry(environment, entryId, 'publish', attempts);
	}

	private async unpublishEntryWithRetry(environment: any, entryId: string, attempts: number): Promise<void> {
		await this.performEntryActionWithRetry(environment, entryId, 'unpublish', attempts);
	}

	// check for adding/improving method for performAssetActionWithRetry()
	private async performEntryActionWithRetry(
		environment: any,
		entryId: string,
		action: 'publish' | 'unpublish',
		attempts: number
	): Promise<void> {
		let retryCount = 0;
		let isActionSuccessful = false;
		while (!isActionSuccessful && retryCount < attempts) {
			const entry = await environment.getEntry(entryId);
			try {
				if (action === 'publish') {
					if (!entry.isPublished()) {
						await entry.publish();
					}
					isActionSuccessful = entry.isPublished();
				} else if (action === 'unpublish') {
					if (entry.isPublished()) {
						await entry.unpublish();
					}
					isActionSuccessful = !entry.isPublished();
				}
			} catch (error) {
				console.error(`Error ${action}ing entry:`, error);
				retryCount++;
				console.log(`Retrying ${action} (${retryCount})...`);
			}
		}

		if (!isActionSuccessful) {
			console.log(`Entry could not be ${action}ed after multiple retries.`);
			throw new Error(`Entry could not be ${action}ed.`); // Throw an error to fail the test run and stop execution
		}
	}
	//#endregion

	//#region CaseStudiesEntriesInteractions
	async CreateAndPublishCaseStudy(caseStudyName: string, index: number, attempts = 3): Promise<void> {
		const environment = await this.GetEnvironment();
		const caseStudyFields = ContentfulCaseStudyData.getCaseStudyMainFields(index);
		caseStudyFields.fields.name['en-US'] = `${caseStudyName} ${caseStudyFields.fields.name['en-US']}`;
		const caseStudyId = ContentfulCaseStudyData.getCaseStudyId(index);

		await environment.createEntryWithId(CaseStudyContentTypeEnum.CaseStudy, caseStudyId, caseStudyFields);
		await this.publishEntryWithRetry(environment, caseStudyId, attempts);
	}

	// !!!! maybe better to assign index upper ??
	async CreateAndPublishCaseStudySummary(
		summaryFields: {fields: {[key: string]: any}}, // Pay attention to thi type and mandatory setting props!!!
		attempts = 3
	): Promise<void> {
		const environment = await this.GetEnvironment();
		const summaryId = ContentfulCaseStudyData.getCaseStudyMainFields().fields.summary['en-US'].sys.id;

		await environment.createEntryWithId(
			CaseStudyContentTypeEnum.Summary,
			summaryId,
			summaryFields // Here should be actual obj representation of summary!!
		);
		await this.publishEntryWithRetry(environment, summaryId, attempts);
	}

	// mb compose these similar methods to one?? But FIRSTLY need to fully add all images etc!!!
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

	// !!!!
	async UnpublishCaseStudySolution(index: number, attempts = 3): Promise<void> {
		const environment = await this.GetEnvironment();
		const solutionId = ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().newSolution['en-US'].sys.id;
		await this.unpublishEntryWithRetry(environment, solutionId, attempts);
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

	//Remove after
	async getCaseStudyEntity(id: string) {
		const environment = await this.GetEnvironment();
		const entityData = await environment.getEntry(id);
		console.log(entityData);
	}
	//Remove after
	async getCaseStudyAsset(id: string) {
		const environment = await this.GetEnvironment();
		const entityData = await environment.getAsset(id);
		console.log(entityData);
	}
	//#endregion

	//#region CaseStudiesAssetsInteractions

	// !!!
	// Better to create Enum or object for images, not string
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

	// move to separate class?
	careerFields: contentful.CreateEntryProps<contentful.KeyValueMap> = {
		fields: {
			name: {
				'en-US': 'TypeScript test career',
				'uk-UA': 'Тайпскріпт тест',
			},
			careerDescription: {
				'en-US': {
					sys: {
						type: 'Link',
						linkType: 'Entry',
						id: 'typeScriptTestDescriptionId',
					},
				},
			},
			description: {
				'en-US': 'TypeScript test career',
				'uk-UA': 'Тайпскріпт тест',
			},
		},
		metadata: {
			tags: this.tagJson,
		},
	};

	private getDescriptionBody(index: number) {
		return {
			fields: {
				aboutTheProduct: {
					'en-US': `TypeScript test_${index}`,
					'uk-UA': 'Тайпскріпт тест',
				},
				title: {
					'en-US': `TypeScript test_${index}`,
					'uk-UA': 'Тайпскріпт тест',
				},
				ifYouThinkItsNotForYou: {
					'en-US': `TypeScript test_${index}`,
					'uk-UA': 'Тайпскріпт тест',
				},
				yourTeam: {
					'en-US': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: `TypeScript test_${index}`,
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
					'uk-UA': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: 'Тайпскріпт тест',
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
				},
				culture: {
					'en-US': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: `TypeScript test_${index}`,
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
					'uk-UA': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: `Тайпскріпт тест_${index}`,
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
				},
				yourResponsibilities: {
					'en-US': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: `TypeScript test_${index}`,
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
					'uk-UA': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: 'Тайпскріпт тест',
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
				},
				itsAboutYou: {
					'en-US': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: `TypeScript test_${index}`,
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
					'uk-UA': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: 'Тайпскріпт тест',
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
				},
				whatWeHaveForYou: {
					'en-US': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: `TypeScript test_${index}`,
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
					'uk-UA': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: 'Тайпскріпт тест',
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
				},
				howToJoin: {
					'en-US': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: `TypeScript test_${index}`,
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
					'uk-UA': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: 'Тайпскріпт тест',
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
				},
				aboutUs: {
					'en-US': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: `TypeScript test_${index}`,
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
					'uk-UA': {
						data: {},
						content: [
							{
								data: {},
								content: [
									{
										data: {},
										marks: [],
										value: 'Тайпскріпт тест',
										nodeType: 'text',
									},
								],
								nodeType: 'paragraph',
							},
						],
						nodeType: 'document',
					},
				},
				technologyStack: {
					'en-US': [`TypeScript test_${index}`, 'TS'],
				},
				slug: {
					'en-US': `TypeScript_test_${index}_${sessionValue.stringValue}-v1`,
				},
			},
		};
	}
}

const contentfulUtils = new ContentfulUtils();
export {contentfulUtils};
