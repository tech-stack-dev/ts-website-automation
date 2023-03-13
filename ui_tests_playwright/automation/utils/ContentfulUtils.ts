import ContentfulProvider from '../providers/ContentfulProvider';

class ContentfulUtils {
	contentful = require('contentful-management');

	async GetEnvironment() {
		const client = this.contentful.createClient({
			accessToken: ContentfulProvider.AccessToken,
		});
		const space = await client.getSpace(ContentfulProvider.SpaceId);
		const environment = await space.getEnvironment(ContentfulProvider.Env);
		return environment;
	}

	async CreateTag(tagId: string, tagName: string, publishType = 'public') {
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
		descriptionId: string,
		tagId = 'direction_longSoftwareDataManager'
	) {
		const environment = await this.GetEnvironment();
		const careerFieldsWithDescriptionAndTag = this.careerFields;
		careerFieldsWithDescriptionAndTag.fields.careerDescription[
			'en-US'
		].sys.id = descriptionId;
		careerFieldsWithDescriptionAndTag.metadata.tags[0].sys.id = tagId;
		await environment.createEntryWithId(
			'career',
			careerId,
			this.careerFields
		);
		const createdCareer = await environment.getEntry(careerId);
		await createdCareer.publish();
	}

	async UnpublishCareer(careerId: string) {
		const environment = await this.GetEnvironment();
		const createdCareer = await environment.getEntry(careerId);
		createdCareer.unpublish();
	}

	async DeleteCareer(careerId: string) {
		const environment = await this.GetEnvironment();
		const createdCareer = await environment.getEntry(careerId);
		createdCareer.delete();
	}

	async DeleteTag(tagId: string) {
		const environment = await this.GetEnvironment();
		const tag = await environment.getTag(tagId);
		tag.delete();
	}

	careerFields = {
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
			],
		},
	};

	descriptionFields = {
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
