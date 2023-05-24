import ContentfulProvider from '../providers/ContentfulProvider';
import * as contentful from 'contentful-management';
import {sessionValue} from '../runtimeVariables/SessionValue';
import {SeniorityLevelsEnum} from '../enum/tag/SeniorityLevelsEnum';
import {DirectionsEnum} from '../enum/tag/DirectionsEnum';
import {TagsEnum} from '../enum/tag/TagsEnum';

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

	//#region EntriesInteractions
	async CreateAndPublishCareerDescription(descriptionId: string, attempts = 3): Promise<void> {
		const environment = await this.GetEnvironment();
		await environment.createEntryWithId('careerDescription', descriptionId, this.descriptionFields);
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
		await environment.getEntry(careerId);
		await this.unpublishEntryWithRetry(environment, careerId, attempts);
		await environment.getEntry(descriptionId);
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
		await this.performEntryActionWithRetry(environment, entryId, 'publish', attempts);
	}

	private async unpublishEntryWithRetry(environment: any, entryId: string, attempts: number): Promise<void> {
		await this.performEntryActionWithRetry(environment, entryId, 'unpublish', attempts);
	}

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

	descriptionFields: contentful.CreateEntryProps<contentful.KeyValueMap> = {
		fields: {
			aboutTheProject: {
				'en-US': 'TypeScript test',
				'uk-UA': 'Тайпскріпт тест',
			},
			aboutTheRole: {
				'en-US': 'TypeScript test',
				'uk-UA': 'Тайпскріпт тест',
			},
			title: {
				'en-US': 'TypeScript test',
				'uk-UA': 'Тайпскріпт тест',
			},
			youWill: {
				'en-US': {
					data: {},
					content: [
						{
							data: {},
							content: [
								{
									data: {},
									marks: [],
									value: 'TypeScript test',
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
			youAre: {
				'en-US': {
					data: {},
					content: [
						{
							data: {},
							content: [
								{
									data: {},
									marks: [],
									value: 'TypeScript test',
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
			weWill: {
				'en-US': {
					data: {},
					content: [
						{
							data: {},
							content: [
								{
									data: {},
									marks: [],
									value: 'TypeScript test',
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
			weAre: {
				'en-US': {
					data: {},
					content: [
						{
							data: {},
							content: [
								{
									data: {},
									marks: [],
									value: 'TypeScript test',
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
				'en-US': ['TypeScript test', 'Create this via ts is challenge for me'],
			},
			slug: {
				'en-US': `TypeScript_test${sessionValue.stringValue}-v1`,
			},
		},
	};
}

const contentfulUtils = new ContentfulUtils();
export {contentfulUtils};
