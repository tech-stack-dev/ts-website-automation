import {sessionValue} from '../../runtimeVariables/SessionValue';
import {contentfulUtils} from '../../utils/ContentfulUtils';
import {ClutchReviewLinks} from '../links/ClutchReviewLinks';

export default class ContentfulCaseStudyData {
	// If you want to use one attached fields, but uniq CaseStudy entity better to assign index = 1 here, and where needed overload it
	static getCaseStudyMainFields(index = 1) {
		return {
			fields: {
				name: {
					'en-US': `TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}-${index}`, // Will be extended by string provided in CreateAndPublishCaseStudy()
				},
				description: {
					'en-US': `Description text that require add minimun 91 characters Automation test TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}-${index}`,
				},

				image: {
					'en-US': {
						sys: {
							type: 'Link',
							linkType: 'Asset',
							id: `imagePreviewId${sessionValue.stringValue.toLocaleUpperCase()}`,
						},
					},
				},
				slug: {
					'en-US': `automation-test-typescript-${sessionValue.stringValue}-${index}`,
				},
				metadata: {}, // ??
				summary: {
					'en-US': {
						sys: {
							type: 'Link',
							linkType: 'Entry',
							id: `summaryId${sessionValue.stringValue.toLocaleUpperCase()}`,
						},
					},
				},
			},
			metadata: {
				tags: contentfulUtils.tagJson,
			},
		};
	}

	static getCaseStudyId(index: number) {
		return `caseStudyId${sessionValue.stringValue.toLocaleUpperCase()}${index}`;
	}

	static getCaseStudySummaryFields() {
		return {
			fields: {
				name: {
					'en-US': `Summary title TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`, // need to think
				},
				aboutTheProduct: {
					'en-US': {
						content: [
							{
								content: [
									{
										data: {},
										marks: [],
										nodeType: 'text',
										value: `About The Product text Automation test TypeScript that requires minimum 160 symbols. About The Product text Automation test that requires mini TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
									},
								],
								data: {},
								nodeType: 'paragraph',
							},
						],
						data: {},
						nodeType: 'document',
					},
				},
				challenge: {
					'en-US': {
						content: [
							// Need to try to add paragraphts as another content object
							{
								content: [
									{
										data: {},
										marks: [], // Need to try to add bold text
										nodeType: 'text',
										value: `Challange text Automation test TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
									},
								],
								data: {},
								nodeType: 'paragraph',
							},
						],
						data: {},
						nodeType: 'document',
					},
				},
				impact: {
					'en-US': {
						content: [
							{
								content: [
									{
										data: {},
										marks: [],
										nodeType: 'text',
										value: `Impact text Automation test TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
									},
								],
								data: {},
								nodeType: 'paragraph',
							},
						],
						data: {},
						nodeType: 'document',
					},
				},
			},
		};
	}

	// Optional fields from Summary object
	static getCaseStudySummaryOptionalFields() {
		return {
			review: {
				'en-US': {
					sys: {
						type: 'Link',
						linkType: 'Entry',
						id: `reviewId${sessionValue.stringValue.toLocaleUpperCase()}`,
					},
				},
			},
			technologiesUsed: {
				'en-US': {
					sys: {
						type: 'Link',
						linkType: 'Entry',
						id: `technologiesUsedId${sessionValue.stringValue.toLocaleUpperCase()}`,
					},
				},
			},
			location: {
				'en-US': `Secret location TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
			},
			newSolution: {
				'en-US': {
					sys: {
						type: 'Link',
						linkType: 'Entry',
						id: `solutionId${sessionValue.stringValue.toLocaleUpperCase()}`,
					},
				},
			},
			newWorkflow: {
				'en-US': {
					sys: {
						type: 'Link',
						linkType: 'Entry',
						id: `workflowId${sessionValue.stringValue.toLocaleUpperCase()}`,
					},
				},
			},
			newAboutTheTeam: {
				'en-US': [
					{
						type: 1,
						content: `About the team text Automation test TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
					},
					{
						type: 3,
						title: 'First team list',
						content: [
							{
								value: 'UI/UX Designer',
								number: '2',
							},
							{
								value: 'Project Manager',
								number: '1',
							},
							{
								value: 'Software Engineer',
								number: '140',
							},
						],
					},
					{
						type: 3,
						title: 'Second team list',
						content: [
							{
								value: 'QA',
								number: '20',
							},
							{
								value: 'Project Manager',
								number: '9',
							},
							{
								value: 'Software Engineer',
								number: '0',
							},
							{
								value: 'Front End Engineer',
								number: '15',
							},
						],
					},
				],
			},
		};
	}

	static getSummaryReviewFields() {
		return {
			fields: {
				name: {
					'en-US': `Review title TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
				},
				text: {
					'en-US': {
						content: [
							{
								content: [
									{
										data: {},
										marks: [],
										nodeType: 'text',
										value: `Review text field text Automation test TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
									},
								],
								data: {},
								nodeType: 'paragraph',
							},
						],
						data: {},
						nodeType: 'document',
					},
				},
				author: {
					'en-US': `Name Surname-${sessionValue.stringValue.toLocaleUpperCase()}`,
				},
				position: {
					'en-US': `Position-${sessionValue.stringValue.toLocaleUpperCase()}`,
				},
				resource: {
					'en-US': `Company-${sessionValue.stringValue.toLocaleUpperCase()}`,
				},
				link: {
					'en-US': `${ClutchReviewLinks.DarrenCody}`, // Need to think how to set dynamically
				},
			},
		};
	}

	static getSummaryTechnologiesUsedFields() {
		return {
			fields: {
				name: {
					'en-US': `Technologies title TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
				},
				description: {
					'en-US': {
						content: [
							{
								content: [
									{
										data: {},
										marks: [],
										nodeType: 'text',
										value: `Technologies Description text Automation test. As we understood, minimum 160 charackters should be added here. We have no choice as add them t TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
									},
								],
								data: {},
								nodeType: 'paragraph',
							},
						],
						data: {},
						nodeType: 'document',
					},
				},
				awardsImg: {
					'en-US': {
						sys: {
							type: 'Link',
							linkType: 'Asset',
							id: `imageTechnologiesUsedId${sessionValue.stringValue.toLocaleUpperCase()}`,
						},
					},
				},
			},
		};
	}

	static getSummarySolutionFields() {
		return {
			fields: {
				name: {
					'en-US': `Solution title TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
				},
				content: {
					'en-US': {
						content: [
							{
								content: [
									{
										data: {},
										marks: [],
										nodeType: 'text',
										value: `Solution text Automation test TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
									},
								],
								data: {},
								nodeType: 'paragraph',
							},
						],
						data: {},
						nodeType: 'document',
					},
				},
			},
		};
	}

	static getSummarySolutionOptionalFields() {
		return {
			imgAfterBlock: {
				'en-US': {
					sys: {
						type: 'Link',
						linkType: 'Asset',
						id: `imageSolutionId${sessionValue.stringValue.toLocaleUpperCase()}`,
					},
				},
			},
		};
	}

	static getSummaryWorkflowFields() {
		return {
			fields: {
				name: {
					'en-US': `Workflow title TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
				},
				description: {
					'en-US': {
						content: [
							{
								content: [
									{
										data: {},
										marks: [],
										nodeType: 'text',
										value: `Workflow Description text Automation test. As we understood, minimum 160 charackters should be added here. Soooo, we have no choice as do this TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
									},
								],
								data: {},
								nodeType: 'paragraph',
							},
						],
						data: {},
						nodeType: 'document',
					},
				},
				mainContent: {
					'en-US': [
						{
							title: 'First section title',
							content: [
								{
									type: 1,
									value: `First section text Automation test TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
								},
								{
									type: 3,
									value: ['first item in list', 'second item in list', 'third item in list'],
								},
							],
						},
						{
							title: 'Second section title',
							content: [
								{
									type: 1,
									value: `Second section text Automation test TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
								},
								{
									type: 4,
									value: ['first item in list', 'second item in list', 'third item in list'],
								},
							],
						},
						{
							title: 'Third section title',
							content: [
								{
									type: 1,
									value: `Third section text Automation test TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
								},
								{
									type: 4,
									value: ['first item in list', 'second item in list', 'third item in list'],
								},
							],
						},
					],
				},
			},
		};
	}

	static async getCaseStudyImageAssetFields(imagePath: string, uniqIdentificationName: string) {
		return {
			fields: {
				title: {
					'en-US': `${uniqIdentificationName} Image TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
				},
				description: {
					'en-US': `${uniqIdentificationName} Image description for autotests TypeScript-${sessionValue.stringValue.toLocaleUpperCase()}`,
				},
				file: {
					'en-US': {
						contentType: 'image/jpg',
						fileName: `caseStudy${uniqIdentificationName}Image.jpg`,
						uploadFrom: {
							sys: {
								type: 'Link',
								linkType: 'Upload',
								id: await contentfulUtils.UploadAssetToContentful(imagePath),
							},
						},
					},
				},
			},
		};
	}
}
