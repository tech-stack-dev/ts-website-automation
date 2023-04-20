import ContentfulProvider from '../providers/ContentfulProvider';
import * as contentful from 'contentful-management';
import {sessionValue} from '../runtimeVariables/SessionValue';
import {SeniorityLevelsEnum} from '../enum/tag/SeniorityLevelsEnum';
import {DirectionsEnum} from '../enum/tag/DirectionsEnum';
import {TagsEnum} from '../enum/tag/TagsEnum';

class ContentfulUtils {
	private tagJson: contentful.Link<'Tag'>[] = [];

	async GetEnvironment() {
		const client = contentful.createClient({
			accessToken: await ContentfulProvider.AccessToken(),
		});
		const space = await client.getSpace(await ContentfulProvider.SpaceId());
		const environment = await space.getEnvironment(await ContentfulProvider.Env());
		return environment;
	}

	async CreateTag(tagId: string, tagName: string, publishType: contentful.TagVisibility = 'public') {
		const environment = await this.GetEnvironment();
		await environment.createTag(tagId, tagName, publishType);
	}

	private AddDefaultTags(directionsTag: DirectionsEnum, seniorityLevelsTag: SeniorityLevelsEnum) {
		const tagList = [this.GetTagJsonBody(directionsTag), this.GetTagJsonBody(seniorityLevelsTag)];
		tagList.forEach((tag) => {
			const currentTag = this.tagJson.find((item) => item.sys.id === tag.sys.id);
			if (currentTag) return;
			this.tagJson.push(tag);
		});
	}

	AddTagsToCareerBody(tagList: DirectionsEnum[] | SeniorityLevelsEnum[] | TagsEnum[]) {
		tagList.forEach((tag) => {
			const currentTag = this.tagJson.find((item) => item.sys.id === tag);
			if (currentTag) return;
			this.tagJson.push(this.GetTagJsonBody(tag));
		});
	}

	private GetTagJsonBody(tag: DirectionsEnum | SeniorityLevelsEnum | TagsEnum) {
		const tagJsonBody = {
			sys: {
				type: 'Link',
				linkType: 'Tag',
				id: tag,
			},
		};

		return <contentful.Link<'Tag'>>tagJsonBody;
	}

	async CreateAndPublishCareerDescription(descriptionId: string) {
		const environment = await this.GetEnvironment();
		await environment.createEntryWithId('careerDescription', descriptionId, this.descriptionFields);
		const createdCareerDescriptionEntry = await environment.getEntry(descriptionId);
		await createdCareerDescriptionEntry.publish();
	}

	async CreateAndPublishCareer(
		careerId: string,
		careerNameEn: string,
		descriptionId: string,
		careerNameUa = 'Тестова Вакансія',
		directionsTag = DirectionsEnum.LongSoftwareDataManager,
		seniorityLevelsTag = SeniorityLevelsEnum.Trainee
	) {
		const environment = await this.GetEnvironment();
		this.AddDefaultTags(directionsTag, seniorityLevelsTag);
		const careerFieldsWithDescriptionAndTag = this.careerFields;
		careerFieldsWithDescriptionAndTag.fields.careerDescription['en-US'].sys.id = descriptionId;
		careerFieldsWithDescriptionAndTag.fields.name['en-US'] = careerNameEn;
		careerFieldsWithDescriptionAndTag.fields.name['uk-UA'] = careerNameUa;
		await environment.createEntryWithId('career', careerId, this.careerFields);
		const createdCareer = await environment.getEntry(careerId);
		await createdCareer.publish();
	}

	async UnpublishCareerWithDescription(careerId: string, descriptionId: string) {
		const environment = await this.GetEnvironment();
		const createdCareer = await environment.getEntry(careerId);
		createdCareer.unpublish();
		const createdDescription = await environment.getEntry(descriptionId);
		createdDescription.unpublish();
	}

	async DeleteCareerWithDescription(careerId: string, descriptionId: string) {
		const environment = await this.GetEnvironment();
		const createdCareer = await environment.getEntry(careerId);
		await createdCareer.delete();
		const createdDescription = await environment.getEntry(descriptionId);
		await createdDescription.delete();
	}

	async DeleteTag(tagId: string) {
		const environment = await this.GetEnvironment();
		const tag = await environment.getTag(tagId);
		tag.delete();
	}

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
