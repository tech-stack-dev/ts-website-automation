import { test as base } from '@playwright/test';
import { CareerSteps } from '../steps/careerPageSteps/CareerSteps';
import { desktopCareerSteps } from '../steps/careerPageSteps/DesktopCareerSteps';
import { mobileCareerSteps } from '../steps/careerPageSteps/MobileCareerSteps';
import { ContainerSteps } from '../steps/components/container/ContainerSteps';
import { desktopContainerSteps } from '../steps/components/container/DesktopContainerSteps';
import { mobileContainerSteps } from '../steps/components/container/MobileContainerSteprs';
import { ButtonSteps } from '../steps/components/button/ButtonSteps';
import { desktopButtonSteps } from '../steps/components/button/DesktopButtonSteps';
import { mobileButtonSteps } from '../steps/components/button/MobileButtonStep';
import { driver } from '../base/driver/Driver';

export let careerSteps: CareerSteps;
export let containerSteps: ContainerSteps;
export let buttonSteps: ButtonSteps;

export const test = base.extend<
    {
        autotestFixture: void;
    },
    {
        workerFixture: void;
    }
>({
    workerFixture: [
        async ({ }, use, workerInfo) => {
            careerSteps = workerInfo.project.name.includes('Mobile') ? mobileCareerSteps : desktopCareerSteps;
            containerSteps = workerInfo.project.name.includes('Mobile') ? mobileContainerSteps : desktopContainerSteps;
            buttonSteps = workerInfo.project.name.includes('Mobile') ? mobileButtonSteps : desktopButtonSteps;

            await use();

            await driver.closeDrivers();
        },
        { scope: 'worker', auto: true }
    ],

    autotestFixture: [
        async ({ }, use) => {
            await use();
        },
        { scope: 'test', auto: true }
    ]
});

export { expect } from '@playwright/test';