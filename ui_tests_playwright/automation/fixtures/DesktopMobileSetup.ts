import {test as base} from '@playwright/test';
import {CareerSteps} from '../steps/careerPageSteps/CareerSteps';
import {desktopCareerSteps} from '../steps/careerPageSteps/DesktopCareerSteps';
import {mobileCareerSteps} from '../steps/careerPageSteps/MobileCareerSteps';
import {ContainerSteps} from '../steps/components/container/ContainerSteps';
import {desktopContainerSteps} from '../steps/components/container/DesktopContainerSteps';
import {mobileContainerSteps} from '../steps/components/container/MobileContainerSteprs';
import {ButtonSteps} from '../steps/components/button/ButtonSteps';
import {desktopButtonSteps} from '../steps/components/button/DesktopButtonSteps';
import {mobileButtonSteps} from '../steps/components/button/MobileButtonStep';
import {HeaderMenuSteps} from '../steps/components/headerMenuSteps/HeaderMenuSteps';
import {mobileHeaderMenuSteps} from '../steps/components/headerMenuSteps/MobileHeaderMenuSteps';
import {desktopHeaderMenuSteps} from '../steps/components/headerMenuSteps/DesktopHeaderMenuSteps';

export let careerSteps: CareerSteps;
export let containerSteps: ContainerSteps;
export let buttonSteps: ButtonSteps;
export let headerMenuSteps: HeaderMenuSteps;

export const test = base.extend<{desktopMobile: void}>({
	desktopMobile: [
		async ({isMobile}, use) => {
			careerSteps = isMobile ? mobileCareerSteps : desktopCareerSteps;
			containerSteps = isMobile ? mobileContainerSteps : desktopContainerSteps;
			buttonSteps = isMobile ? mobileButtonSteps : desktopButtonSteps;
			headerMenuSteps = isMobile ? mobileHeaderMenuSteps : desktopHeaderMenuSteps;

			await use();
		},
		{scope: 'test', auto: true},
	],
});

export {expect} from '@playwright/test';
