import {test} from '@playwright/test';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {ContentfulSecretEnum} from '../../../../../enum/contentfulEnums/ContentfulSecretEnum';
import ContentfulProvider from '../../../../../providers/ContentfulProvider';
import {contentfulSteps} from '../../../../../steps/contentful/ContentfulSteps';
import {contentfulUtils} from '../../../../../utils/ContentfulUtils';
import {CaseStudyEntityEnum} from '../../../../../enum/caseStudyEnums/CaseStudyEntityEnum';
import ContentfulCaseStudyData from '../../../../../preconditionsData/contentfulData/ContentfulCaseStudyData';
import {caseStudyDtoVariable} from '../../../../../runtimeVariables/dto/CaseStudyDtoVariable';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import CaseStudyImagesPath from '../../../../../preconditionsData/contentfulData/ContentfulCaseStudyImages/CaseStudyImages';

test.beforeEach(async () => {
	// await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CaseStudies));
	ContentfulProvider.contentfulData = ContentfulProvider.getContentfulSecret(ContentfulSecretEnum.CaseStudySecret);
});

test(
	// Add Qase id!!!!
	qase(1000, 'Create Case study using object'),
	async () => {
		// Full object
		caseStudyDtoVariable.value = {
			caseStudyImage: CaseStudyImagesPath.PreviewImageGray,
			summary: {
				review: {entity: CaseStudyEntityEnum.Review, link: ClutchReviewLinks.AnonymousMedicalDevice},
				technologiesUsed: {
					entity: CaseStudyEntityEnum.Technologies,
					image: CaseStudyImagesPath.TechnologiesUsedImage,
				},
				solution: {entity: CaseStudyEntityEnum.Solution, image: CaseStudyImagesPath.SolutionImage},
				workflow: CaseStudyEntityEnum.Workflow,
				aboutTheTeam: CaseStudyEntityEnum.AboutTheTeam,
			},
		};
		// caseStudyDtoVariable.value = {
		// 	summary: {
		// 		review: {entity: CaseStudyEntityEnum.Review},
		// 		technologiesUsed: {
		// 			entity: CaseStudyEntityEnum.Technologies,
		// 		},
		// 		solution: {entity: CaseStudyEntityEnum.Solution},
		// 		workflow: CaseStudyEntityEnum.Workflow,
		// 	},
		// };
		const caseStudyDto = caseStudyDtoVariable.value;
		const numberOfCaseStudies = 2;

		await contentfulSteps.createCaseStudy('Several Case Staaadies', numberOfCaseStudies, caseStudyDto);
		await contentfulSteps.unpublishAndDeleteCaseStudy(numberOfCaseStudies, caseStudyDto);

		// await contentfulSteps.createCaseStudyEntity('Several Case Studies with DRT', 3, caseStudyDto);

		// await contentfulUtils.UnpublishCaseStudySolution(1);
	}
);

test('Create Case study', async () => {
	const numberOfCaseStudies = 2;
	await contentfulSteps.createCaseStudy('One default Case Study', numberOfCaseStudies);
	// await contentfulSteps.createCaseStudy('Several default Case Studies', 2);
	await contentfulSteps.unpublishAndDeleteCaseStudy(numberOfCaseStudies);
});

test(
	// Add Qase id!!!!
	qase(1000, 'Create asset'),
	async () => {
		// await contentfulUtils.CreateAndPublishCaseStudyPreviewImageAsset(1, );
	}
);

test(
	// Add Qase id!!!!
	qase(1000, 'test modifying JSON'),
	async () => {
		const summaryFields: {fields: {[key: string]: any}} = ContentfulCaseStudyData.getCaseStudySummaryFields();
		summaryFields.fields['review'] = ContentfulCaseStudyData.getCaseStudySummaryOptionalFields().technologiesUsed;
		console.log(summaryFields);
	}
);

test(
	// Add Qase id!!!!
	qase(1000, 'Get entity'),
	async () => {
		await contentfulUtils.getCaseStudyEntity(CaseStudyEntityEnum.Summary);
	}
);

test(
	// Add Qase id!!!!
	qase(1000, 'Get asset'),
	async () => {
		await contentfulUtils.getCaseStudyAsset(CaseStudyEntityEnum.ImagePreview);
	}
);

test.afterEach(async () => {
	// await driver.closeDrivers();
	// await contentfulSteps.deleteAndUnpublishCareer(
	// 	`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
	// 	`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	// );
});
