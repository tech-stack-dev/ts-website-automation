import {test} from '@playwright/test';
import {ContentfulSecretEnum} from '../../../../../enum/contentfulEnums/ContentfulSecretEnum';
import ContentfulProvider from '../../../../../providers/ContentfulProvider';
import {contentfulSteps} from '../../../../../steps/contentful/ContentfulSteps';
import {CaseStudyEntityEnum} from '../../../../../enum/caseStudyEnums/CaseStudyEntityEnum';
import {caseStudyDtoVariable} from '../../../../../runtimeVariables/dto/CaseStudyDtoVariable';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import {IndustryTagEnum} from '../../../../../enum/caseStudyEnums/caseStudyTags/IndustryTagEnum';
import {ServiceTagEnum} from '../../../../../enum/caseStudyEnums/caseStudyTags/ServiceTagEnum';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import {CaseStudyDto} from '../../../../../dto/CaseStudyDto';
import CaseStudyImagesPath from '../../../../../preconditionsData/contentfulData/contentfulCaseStudiesImages/CaseStudyImagesPath';

let numberOfCaseStudies: number;
let caseStudyDto: CaseStudyDto;

// Note1: At this moment there is an issue with cache on Case Studies, so created entity will appear and be accessible on website only after cache invalidation (now it is 5 min). Task for automatically cache invalidation created for devs and DevOps and after its completion will be possible to add checking of Case Study creation and all necessary UI tests.
// Note2: logic of adding tags can be improved with creating and deleting tags if needed.

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CaseStudies));
	ContentfulProvider.contentfulData = ContentfulProvider.getContentfulSecret(ContentfulSecretEnum.CaseStudySecret);
});

test('Create one default Case study entity @desktop @mobile @CaseStudy', async () => {
	await contentfulSteps.createCaseStudy('One default Case Study');

	// TBD: Need to add checking of case Study creation
	// TBD: Need to create all necessary tests for case studies coverage in separate tasks

	await contentfulSteps.unpublishAndDeleteCaseStudy(numberOfCaseStudies);
});

test('Create several default Case study entitities @desktop @mobile @CaseStudy', async () => {
	numberOfCaseStudies = 3;

	await contentfulSteps.createCaseStudy('Several default Case Studies', numberOfCaseStudies);

	// TBD: Need to add checking of case Study creation
	// TBD: Need to create all necessary tests for case studies coverage in separate tasks

	await contentfulSteps.unpublishAndDeleteCaseStudy(numberOfCaseStudies);
});

test('Create one Case study entity using object @desktop @mobile @CaseStudy', async () => {
	caseStudyDtoVariable.value = {
		summary: {
			review: {entity: CaseStudyEntityEnum.Review, link: ClutchReviewLinks.HenriYoki},
			technologiesUsed: {
				entity: CaseStudyEntityEnum.Technologies,
				image: CaseStudyImagesPath.TechnologiesUsedImage,
			},
			solution: {entity: CaseStudyEntityEnum.Solution, image: CaseStudyImagesPath.SolutionImage},
			aboutTheTeam: CaseStudyEntityEnum.AboutTheTeam,
		},
		tags: {
			industryTag: [IndustryTagEnum.Fundraising],
			serviceTag: [ServiceTagEnum.CloudDevOps, ServiceTagEnum.BigDataAnalytics],
		},
	};

	caseStudyDto = caseStudyDtoVariable.value;
	numberOfCaseStudies = 1;

	await contentfulSteps.createCaseStudy('One Case Study using object', numberOfCaseStudies, caseStudyDto);

	// TBD: Need to add checking of case Study creation
	// TBD: Need to create all necessary tests for case studies coverage in separate tasks

	await contentfulSteps.unpublishAndDeleteCaseStudy(numberOfCaseStudies, caseStudyDto);
});

test('Create several Case study entities using object @desktop @mobile @CaseStudy', async () => {
	caseStudyDtoVariable.value = {
		caseStudyImage: CaseStudyImagesPath.PreviewImageGray,
		summary: {
			review: {entity: CaseStudyEntityEnum.Review, link: ClutchReviewLinks.AnonymousPeerToPeer},
			technologiesUsed: {
				entity: CaseStudyEntityEnum.Technologies,
				image: CaseStudyImagesPath.TechnologiesUsedImage,
			},
			solution: {entity: CaseStudyEntityEnum.Solution, image: CaseStudyImagesPath.SolutionImage},
			workflow: CaseStudyEntityEnum.Workflow,
			aboutTheTeam: CaseStudyEntityEnum.AboutTheTeam,
		},
		tags: {
			industryTag: [IndustryTagEnum.BusinessAutomation, IndustryTagEnum.LeisureEntertainment],
			serviceTag: [ServiceTagEnum.SoftwareTesting, ServiceTagEnum.DevConsulting, ServiceTagEnum.QaAsAService],
		},
	};

	caseStudyDto = caseStudyDtoVariable.value;
	numberOfCaseStudies = 2;

	await contentfulSteps.createCaseStudy('Several Case studies using object', numberOfCaseStudies, caseStudyDto);

	// TBD: Need to add checking of case Study creation
	// TBD: Need to create all necessary tests for case studies coverage in separate tasks

	await contentfulSteps.unpublishAndDeleteCaseStudy(numberOfCaseStudies, caseStudyDto);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
