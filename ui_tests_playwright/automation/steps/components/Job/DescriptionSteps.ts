import {expect} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import JobDescriptionBlock from '../../../components/DescriptionBlock/JobDescriptionBlock';

class DescriptionSteps {
  public async getDescriptionBlock(identifier: string) {
    return await driver.component(JobDescriptionBlock, identifier);
  }

  public async checkDescriptionBlockHeader(identifier: string, expectedTitle: string) {
    const title = (await driver.component(JobDescriptionBlock, identifier)).title;

    await expect(title).toHaveText(expectedTitle);
  }
}

const descriptionSteps = new DescriptionSteps();

export {descriptionSteps};