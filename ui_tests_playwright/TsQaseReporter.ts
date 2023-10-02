import PlaywrightReporter from 'playwright-qase-reporter';
import { TestCase, TestResult } from '@playwright/test/reporter';

class TsQaseReporter extends PlaywrightReporter {
  _getCaseId(test: TestCase) {
    const match = test.title.match(/\(Qase ID: (\d+(?:, \d+)*)\)$/);
    return match ? parseInt(match[1]) : null;
  }

  async onTestEnd(test: TestCase, result: TestResult): Promise<void> {
    try {
      const caseId = this._getCaseId(test);
      if (caseId != null) {
        await super.onTestEnd(test, result);
      }
    } catch (error) {
      console.error('Error reporting test result to Qase:', error);
    }
  }
};

export default TsQaseReporter;
