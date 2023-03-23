// import { test } from '@playwright/test';
// import { driver } from '../../../base/driver/Driver';
// import { baseDriverSteps } from '../../../base/step/BaseDriverSteps';
// import UrlProvider from '../../../providers/UrlProvider';
// import Button from '../../../identifiers/Button';
// import { sessionValue } from '../../../runtimeVariables/SessionValue';
// import { slackSteps } from '../../../steps/api/SlackSteps';
// import { formSteps } from '../../../steps/ui/FormSteps';
// import UrlPath from '../../../providers/UrlPath';
// import ContactUsPreconditions from '../../../preconditionsData/uiPreconditions/ContactUsPreconditions';



// test.beforeEach(async () => {
//     await baseDriverSteps.createsNewBrowser();    
// });

// test("Check Slack notification from 'staging_techstack_hr_notify' channel from Contact Us page", async () => {
//     await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
//     await driver.getByTestId(Button.NavigationTab_ContactUs).click();
//     await formSteps.sendContactUsMessage();
//     let message = await slackSteps.getMessageWithValueFromChat(staging_techstack_hr_notify_id, `Test${sessionValue.stringValue}`);
    
//     slackSteps.checkMessageFromHrNotifyChannel(message, {
//         name: `Test${sessionValue.stringValue}`,
//         lastName: `Automation${sessionValue.stringValue}`,
//         email: `Test${sessionValue.stringValue}@test.com`,
//         tel: sessionValue.numberValue,
//         messge: `TestMessage${sessionValue.stringValue}`
//     });
// });

// test("Check Slack notification from 'staging_techstack_hr_notify' channel from Apply for a Job page", async () => {
//     await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
//     await driver.getByTestId(/CardWrapper/).click();
//     await driver.getByTestId(Button.ApplyNow).click();
//     await formSteps.sendApplyForAJob();
//     let message = await slackSteps.getMessageWithValueFromChat(staging_techstack_hr_notify_id, `Test${sessionValue.stringValue}`);
    
//     slackSteps.checkMessageFromHrNotifyChannel(message, {
//         name: `Test${sessionValue.stringValue}`,
//         lastName: `Automation${sessionValue.stringValue}`,
//         email: `Test${sessionValue.stringValue}@test.com`,
//         tel: sessionValue.numberValue,
//         messge: `TestMessage${sessionValue.stringValue}`
//     });
// });

// test("Check Slack notification from 'staging_techstack_notify' channel from 'About Us', 'How We Work' and 'Contact Us' pages", async () => {
//     const urlList: Array<string> = [
//         UrlProvider.urlBuilder(UrlPath.AboutUs),
//         UrlProvider.urlBuilder(UrlPath.HowWeWork),
//         UrlProvider.urlBuilder(UrlPath.ContactUs)
//     ];

//     for (const url of urlList) {

//         await baseDriverSteps.goToUrl(url);
//         await formSteps.sendGetInTouchMessage();
//         let message = await slackSteps.getMessageWithValueFromChat(staging_techstack_notify_id, `Test${sessionValue.stringValue}`);

//         slackSteps.checkMessageFromNotifyChannel(message, {
//             firstName: `Test${sessionValue.stringValue}`,
//             lastName: `Automation${sessionValue.stringValue}`,
//             email: `test${sessionValue.stringValue}@test.com`,
//             messge: `TestMessage${sessionValue.stringValue}`
//         });
//     }
// });

// test("Check Slack notification from 'staging_techstack_notify' channel from all 'Services' pages", async () => {
//     for (const url of ContactUsPreconditions.servicesUrlList) {

//         await baseDriverSteps.goToUrl(url);
//         await formSteps.sendGetInTouchMessage();
//         let message = await slackSteps.getMessageWithValueFromChat(staging_techstack_notify_id, `Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`);

//         slackSteps.checkMessageFromNotifyChannel(message, {
//             fullName: `Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`,
//             email: `test${sessionValue.stringValue}@test.com`,
//             messge: `TestMessage${sessionValue.stringValue}`
//         });
//     }
// });

// test.afterEach(async () => {
//     await driver.closeDrivers();
// });