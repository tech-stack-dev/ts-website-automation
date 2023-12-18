import {chromium} from 'playwright';

async function run() {
	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto('https://tech-stack-dev.github.io/ts-website-automation/index.html');

	// Extract values from fields using XPath
	const passed = await page.$eval(
		'//a[contains(text(),"Passed")]/span',
		(element: HTMLElement) => element.textContent
	);
	const failed = await page.$eval(
		'//a[contains(text(),"Failed")]/span',
		(element: HTMLElement) => element.textContent
	);
	const skipped = await page.$eval(
		'//a[contains(text(),"Skipped")]/span',
		(element: HTMLElement) => element.textContent
	);
	const total = await page.$eval('//a[contains(text(),"All")]/span', (element: HTMLElement) => element.textContent);

	console.log(`::set-output name=passed::${passed}`);
	console.log(`::set-output name=failed::${failed}`);
	console.log(`::set-output name=skipped::${skipped}`);
	console.log(`::set-output name=total::${total}`);

	await browser.close();
}

run().catch((error) => {
	console.error('An error occurred:', error);
	process.exit(1);
});
