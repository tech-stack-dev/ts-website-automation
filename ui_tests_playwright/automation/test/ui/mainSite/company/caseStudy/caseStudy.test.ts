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
		// Create an interface for images
		caseStudyDtoVariable.value = {
			caseStudy: CaseStudyEntityEnum.CaseStudy,
			summary: CaseStudyEntityEnum.Summary,
			review: CaseStudyEntityEnum.Review,
			technologiesUsed: CaseStudyEntityEnum.Technologies,
			solution: CaseStudyEntityEnum.Solution,
			workflow: CaseStudyEntityEnum.Workflow,
			aboutTheTeam: CaseStudyEntityEnum.AboutTheTeam,
			reviewLink: ClutchReviewLinks.DerickDaily,
			caseStudyImage: CaseStudyImagesPath.PreviewImageGray,
			solutionImage: CaseStudyImagesPath.SolutionImage,
			technologiesUsedImage: CaseStudyImagesPath.TechnologiesUsedImage,
		};
		const caseStudyDto = caseStudyDtoVariable.value;

		// await contentfulSteps.createCaseStudyEntity('Case Studi', 1, caseStudyDto);
		await contentfulSteps.createCaseStudyEntity('Several Case Studies with DRT', 3, caseStudyDto);

		// await contentfulUtils.UnpublishCaseStudySolution(1);
	}
);

test('Create Case study', async () => {
	// await contentfulSteps.createCaseStudyEntity('One default Case Study');
	await contentfulSteps.createCaseStudyEntity('Several default Case Studies', 2);
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
