import {sessionValue} from '../../runtimeVariables/SessionValue';
import {contentfulUtils} from '../../utils/ContentfulUtils';

export default class ContentfulCareerData {
	static getCareerMainFields() {
		return {
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
				tags: contentfulUtils.tagJson,
			},
		};
	}
	static getDescriptionBody(index: number) {
		return {
			fields: {
				aboutTheProduct: {
					'en-US': `TypeScript test_${index}`,
					'uk-UA': `Тайпскріпт тест ${index}`,
				},
				title: {
					'en-US': `TypeScript test_${index}`,
					'uk-UA': `Тайпскріпт тест ${index}`,
				},
				ifYouThinkItsNotForYou: {
					'en-US': `TypeScript test_${index}`,
					'uk-UA': `Тайпскріпт тест ${index}`,
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
										value: `Тайпскріпт тест ${index}`,
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
										value: `Тайпскріпт тест ${index}`,
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
										value: `Тайпскріпт тест ${index}`,
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
										value: `Тайпскріпт тест ${index}`,
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
										value: `Тайпскріпт тест ${index}`,
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
										value: `Тайпскріпт тест ${index}`,
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
										value: `Тайпскріпт тест ${index}`,
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
										value: `Тайпскріпт тест ${index}`,
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
