import ContentfulProvider from '../providers/ContentfulProvider';
import * as contentful from 'contentful-management';

class ContentfulUtils {
	async GetEnvironment() {
		const client = contentful.createClient({
			accessToken: ContentfulProvider.AccessToken(),
		});
		const space = await client.getSpace(ContentfulProvider.SpaceId());
		const environment = await space.getEnvironment(
			ContentfulProvider.Env()
		);
		return environment;
	}

	async CreateTag(
		tagId: string,
		tagName: string,
		publishType: contentful.TagVisibility = 'public'
	) {
		const environment = await this.GetEnvironment();
		await environment.createTag(tagId, tagName, publishType);
	}

	async CreateAndPublishCareerDescription(descriptionId: string) {
		const environment = await this.GetEnvironment();
		await environment.createEntryWithId(
			'careerDescription',
			descriptionId,
			this.descriptionFields
		);
		const createdCareerDescriptionEntry = await environment.getEntry(
			descriptionId
		);
		await createdCareerDescriptionEntry.publish();
	}

	async CreateAndPublishCareer(
		careerId: string,
		careerNameEn: string,
		descriptionId: string,
		careerNameUa = 'Тестова Вакансія',
		tagId1 = 'direction_longSoftwareDataManager',
		tagId2 = 'seniority_trainee'
	) {
		const environment = await this.GetEnvironment();
		const careerFieldsWithDescriptionAndTag = this.careerFields;
		careerFieldsWithDescriptionAndTag.fields.careerDescription[
			'en-US'
		].sys.id = descriptionId;
		careerFieldsWithDescriptionAndTag.fields.name['en-US'] = careerNameEn;
		careerFieldsWithDescriptionAndTag.fields.name['uk-UA'] = careerNameUa;
		careerFieldsWithDescriptionAndTag.metadata!.tags[0].sys.id = tagId1;
		careerFieldsWithDescriptionAndTag.metadata!.tags[1].sys.id = tagId2;
		await environment.createEntryWithId(
			'career',
			careerId,
			this.careerFields
		);
		const createdCareer = await environment.getEntry(careerId);
		await createdCareer.publish();
	}

	async UnpublishCareerWithDescription(
		careerId: string,
		descriptionId: string
	) {
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
			tags: [
				{
					sys: {
						type: 'Link',
						linkType: 'Tag',
						id: 'direction_longSoftwareDataManager',
					},
				},
				{
					sys: {
						type: 'Link',
						linkType: 'Tag',
						id: 'seniority_junior',
					},
				},
			],
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
				'en-US': [
					'TypeScript test',
					'Create this via ts is challenge for me',
				],
			},
			slug: {
				'en-US': 'TypeScript_test-v1',
			},
		},
	};
}

const contentfulUtils = new ContentfulUtils();
export {contentfulUtils};
