import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import GetAQuote from '../../../../identifiers/mainSite/pages/getAQuote/GetAQuote';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import MainSiteImages from '../../../../identifiers/mainSite/MainSiteImages';
import Container from '../../../../identifiers/Container';
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

test('Check member names, roles, images and consultation buttons in member cards from the "Get a Quote" page @desktop @mobile @Regression @GetAQuote @TSWEB-1821', async () => {
	const consultWithUsContainer = driver.getByTestId(GetAQuote.ConsultWithUs);
	const cardElements = await consultWithUsContainer.getByTestId(Container.MemberCard).all();

	const allExperts = [
		{name: 'Max Levytskyi', role: 'Managing Partner'},
		{name: 'Anton Ivanchenko', role: 'Business Development Manager'},
		{name: 'Artem Marynych', role: 'Chief Growth Officer'},
	];

	expect(cardElements.length).toBe(allExperts.length);

	for (const expertData of allExperts) {
		const matchingCard = await baseDriverSteps.findMatchingMemberCardByName(cardElements, expertData.name);
		await baseDriverSteps.checkMemberCardCalendly(matchingCard, expertData);
	}
});

test('Check Calendly frame opens in member cards from the "Get a Quote" page @desktop @mobile @Regression @GetAQuote @TSWEB-1821', async () => {
	const consultWithUsContainer = driver.getByTestId(GetAQuote.ConsultWithUs);
	const cardElements = await consultWithUsContainer.getByTestId(Container.MemberCard).all();

	const expertNames = ['Max Levytskyi', 'Anton Ivanchenko', 'Artem Marynych'];

	for (const expertName of expertNames) {
		const matchingCard = await baseDriverSteps.findMatchingMemberCardByName(cardElements, expertName);
		await baseDriverSteps.checkAppropriateCalendlyModalOpensAndCloses(matchingCard);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
