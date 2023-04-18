// global-setup.ts/js
import { FullConfig, test } from '@playwright/test';
import { jiraApiSteps } from './automation/steps/api/jira/JiraApiSteps';
import { value } from './automation/runtimeVariables/JiraTags';


async function globalSetup(config: FullConfig) {
  //get list of tests
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	// const exec = require('child_process').exec;

  // exec('npx playwright test --list', //> ALL_TESTS.txt',
  //   function (error: string | null, stdout: string, stderr: string) {
  //       console.log('stdout: ' + stdout);
  //       console.log('stderr: ' + stderr);
  //       if (error !== null) {
  //            console.log('exec error: ' + error);
  //       }
  //   });

  const testList = ['Check that user can switch language in navigation header @Regression @NavigationHeader @TSWEB-560',
                    'Check that user can switch language in navigation header @Regression @NavigationHeader @TSWEB-560 @TSWEB-76 @TSWEB-560',
                    'Check that user can switch language in navigation header in career page @Regression @JobsBlock @TSWEB-146',
                    'Check th at user can switch language in navigation header in job page @Regression @JobsBlock @TSWEB-146 @TSWEB-574'
]
  const skipTagList:Set<string>=new Set();
  for (const testName of testList) {
    const a = await jiraApiSteps.getTicketsAttachedToTest(testName);///remove
    const openedTickets = (await jiraApiSteps.getTicketsAttachedToTest(testName)).filter(t=>jiraApiSteps.isIssueOpened(t));
    openedTickets.forEach(x=>value.value.add(x));
    //
    openedTickets.forEach(x=>skipTagList.add(x));
  }
}

export default globalSetup;