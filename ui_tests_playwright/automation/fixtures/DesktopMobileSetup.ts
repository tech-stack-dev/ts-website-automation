import { test as base } from '@playwright/test';
import { CareerSteps } from '../steps/careerPageSteps/CareerSteps';
import { desktopCareerSteps } from '../steps/careerPageSteps/DesktopCareerSteps';
import { mobileCareerSteps } from '../steps/careerPageSteps/MobileCareerSteps';
import { ContainerSteps } from '../steps/components/container/ContainerSteps';
import { desktopContainerSteps } from '../steps/components/container/DesktopContainerSteps';
import { mobileContainerSteps } from '../steps/components/container/MobileContainerSteprs';
import { driver } from '../base/driver/Driver';

export let careerSteps: CareerSteps;
export let containerSteps: ContainerSteps;

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