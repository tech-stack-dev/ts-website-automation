import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import GetAQuote from '../../../../identifiers/mainSite/pages/getAQuote/GetAQuote';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import MainSiteImages from '../../../../identifiers/mainSite/MainSiteImages';
import {containerSteps, test, expect} from '../../../../fixtures/DesktopMobileSetup';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.GetAQuote));
});

test('Check the container title and number from the "Get a Quote" page @desktop @mobile @Regression @GetAQuote @TSWEB-1766', async () => {
	const containers = [
		driver.getByTestId(GetAQuote.ConsultWithUs),
		driver.getByTestId(GetAQuote.OurProposal),
		driver.getByTestId(GetAQuote.TrustedBy),
	];

	const expectedData = [
		['Consult with us', '01'],
		["What You'll Get with Our Proposal:", '02'],
		['Trusted By', '03'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test('Check partner logos in "Trusted By" container from the "Get a Quote" page @desktop @mobile @Regression @GetAQuote @TSWEB-1766', async () => {
	const trustedByContainer = driver.getByTestId(GetAQuote.TrustedBy);
	await trustedByContainer.scrollIntoViewIfNeeded();
	const partnerLogos = [
		MainSiteImages.Corel,
		MainSiteImages.SkillLabLogo,
		MainSiteImages.VivaQuantLogo,
		MainSiteImages.ExaumLogo,
	];

	partnerLogos.forEach(async (logo) => {
		await expect(trustedByContainer.getByTestId(logo)).toBeVisible();
	});

	const lastLogo = await containerSteps.getDynamicLocator({
		desktopLocator: MainSiteImages.RuckifyLogo,
		mobileLocator: partnerLogos[partnerLogos.length - 1],
	});

	await expect(lastLogo).toBeVisible();
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
