import {expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import ContainerByClass from '../../../../components/container/ContainerByClass';
import Containers from '../../../../identifiers/Containers';
import UrlProvider from '../../../../providers/UrlProvider';
import {sessionValue} from '../../../../runtimeVariables/SessionValue';
import {careerSteps} from '../../../../steps/careerPageSteps/CareerSteps';
import {containerSteps} from '../../../../steps/components/container/ContainerSteps';
import {contentfulSteps} from '../../../../steps/contentful/ContentfulSteps';
import {contentfulUtils} from '../../../../utils/ContentfulUtils';
import {ColorsEnum} from '../../../../enum/ColorsEnum';
import {TagsEnum} from '../../../../enum/tag/TagsEnum';
import Tag from '../../../../identifiers/Tag';
import {SeniorityLevelsEnum} from '../../../../enum/tag/SeniorityLevelsEnum';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test(` @Regression @FilterBlock @TSWEB-145`, async () => {
		console.log("aaaaaa");
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
