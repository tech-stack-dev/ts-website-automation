import * as path from 'path';
import {describe, beforeAll, it, expect} from '@jest/globals';
import {fileSystemUtils} from '../../utils/FileSystemUtils';

describe('Locators test', () => {
	const locatorFolderPath = path.join(__dirname, '..', '..', 'identifiers');
	const testFolderPath = path.join(__dirname, '..', '..', 'test');
	const stepFolderPath = path.join(__dirname, '..', '..', 'steps');
	let locatorsFilesData: string[];

	beforeAll(() => {
		locatorsFilesData = fileSystemUtils.readFilesRecursively(locatorFolderPath);
	});

	it('should check that locators values are unique across all locator class files', () => {
		const locatorsValues = fileSystemUtils.extractLocatorValues(locatorsFilesData);
		const locatorValueCount = new Map<string, number>();

		for (const value of locatorsValues) {
			locatorValueCount.set(value, (locatorValueCount.get(value) || 0) + 1);
		}

		const duplicateLocatorValues = Array.from(locatorValueCount.entries())
			.filter(([, count]) => count > 1)
			.map(([value]) => value);

		expect(duplicateLocatorValues).toEqual([]);
	});

	it('should check that locators are used in tests or steps', () => {
		const locatorUsageNames = locatorsFilesData
			.filter((string) => string.includes('Locator.'))
			.map((string) => string.match(/Locator\.(\w+)/)?.[1]);

		const testsFilesData = fileSystemUtils.readFilesRecursively(testFolderPath);
		const stepsFilesData = fileSystemUtils.readFilesRecursively(stepFolderPath);
		const combinedArray = testsFilesData.concat(stepsFilesData);

		for (const locatorUsageName of locatorUsageNames) {
			const found = combinedArray.some((testStringValue) => testStringValue.includes(locatorUsageName!));
			expect(found).toBeTruthy();
		}
	});
});
