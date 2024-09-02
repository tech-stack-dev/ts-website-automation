import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../../providers/UrlProvider';
import {sessionValue} from '../../../../../runtimeVariables/SessionValue';
import {careerSteps, containerSteps, expect, test} from '../../../../../fixtures/DesktopMobileSetup';
import {contentfulSteps} from '../../../../../steps/contentful/ContentfulSteps';
import {driver} from '../../../../../base/driver/Driver';
import Career from '../../../../../identifiers/career/pages/Career';
import ContainerByClass from '../../../../../components/container/ContainerByClass';
import ContainersCareer from '../../../../../identifiers/career/ContainersCareer';
import randomstring from 'randomstring';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await contentfulSteps.createCareerWithDefaultValue(
		`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});

test(
	qase(
		4879,
		`Check that user sees correct results when entering vacancy in 'Search' input in 'Career' block @desktop @mobile @Regression @FilterBlock @TSWEB-145`
	),
	async () => {
		const careerName = `JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`;
		await careerSteps.verifyThatCareerWasCreated(careerName);
		const careerCard = driver.getByTestId(`${Career.CareerCardWithoutModifier}${careerName}`);
		expect(careerCard).toHaveCount(1);
	}
);

test(
	qase(
		4850,
		`Check that user sees correct results when entering part of name vacancy in 'Search' input in 'Career' block @desktop @mobile @Regression @FilterBlock @TSWEB-145`
	),
	async () => {
		const careerSessionName = sessionValue.stringValue.toLocaleUpperCase();
		const career = `${Career.CareerCardWithoutModifier}JobsBlockTest${careerSessionName}`;
		await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${careerSessionName}`, careerSessionName);
		expect(driver.getByTestId(career)).toHaveCount(1);
	}
);

test(
	qase(
		4898,
		`Check that user sees failed search result message after clearing 'Search' input in 'Career' block @desktop @mobile @Regression @FilterBlock @TSWEB-145`
	),
	async () => {
		const textData = randomstring.generate(50);
		await driver.Page.reload();
		await driver.getByTestId(Career.SarchCareerField).clear();
		await driver.getByTestId(Career.SarchCareerField).fill(textData);
		await driver.getByTestId(Career.SearchButton).click();
		const careerList = (await containerSteps.getContainer(ContainerByClass, {desktopLocator: Career.CareerList}))
			.Element;

		await expect(
			(
				await driver.component(ContainerByClass, ContainersCareer.SearchResultsTextContainer)
			).Element
		).toHaveText(`${textData},0 Jobs`);
		await expect(careerList).toHaveText(
			'Sorry, no matching jobs found :( Please refine your search criteria and try again'
		);
	}
);

test(
	qase(
		5315,
		`Check that user sees the same careers as on start page after inputting and clearing 'Search' input in 'Career' block @desktop @mobile @Regression @FilterBlock @TSWEB-145`
	),
	async () => {
		const careerListBefore = await (
			await containerSteps.getContainer(ContainerByClass, {desktopLocator: Career.CareerList})
		).all();
		const textData = randomstring.generate(50);
		await driver.Page.reload();
		await driver.getByTestId(Career.SarchCareerField).clear();
		await driver.getByTestId(Career.SarchCareerField).fill(textData);
		await driver.getByTestId(Career.SearchButton).click();
		await driver.getByTestId(Career.SarchCareerField).clear();
		const careerListAfter = await (
			await containerSteps.getContainer(ContainerByClass, {desktopLocator: Career.CareerList})
		).all();
		expect(careerListBefore).toEqual(careerListAfter);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});
