import * as path from 'path';
import {describe, expect, it} from '@jest/globals';
import {fileSystemUtils} from '../../utils/FileSystemUtils';

describe('Locators test', () => {
	// Locator folder path
	const locatorFolderPath = path.join(__dirname, '..', '..', 'identifiers');
	// Test folder path
	const testFolderPath = path.join(__dirname, '..', '..', 'test');
	// Steps folder path
	const stepFolderPath = path.join(__dirname, '..', '..', 'steps');

	// Get all strings from all files with locators
	const locatorsFilesData = fileSystemUtils.readFilesRecursively(locatorFolderPath);

	it('should check that locators values are unique across all locator class files', () => {
		// Get array of locator values
		const locatorsValues = fileSystemUtils.extractLocatorValues(locatorsFilesData);

		// Create a Map to count the occurrences of each locator value
		const locatorValueCount = new Map<string, number>();
		for (const value of locatorsValues) {
			locatorValueCount.set(value, (locatorValueCount.get(value) || 0) + 1);
		}

		// Find values that occur more than once (i.e., not unique)
		const duplicateLocatorValues = Array.from(locatorValueCount.entries())
			.filter(([, count]) => count > 1)
			.map(([value]) => value);

		// If there are duplicate locator values, log them and fail the test
		if (duplicateLocatorValues.length > 0) {
			throw Error(`Duplicate locator values: ${duplicateLocatorValues.join(', ')}`);
		}
	});

	it('should check that locators are used in tests or steps', () => {
		// Get array of locator class plus locator name in format LocatorClass.LocatorName
		const locatorUsageNames = fileSystemUtils
			.readFilesRecursively(locatorFolderPath)
			.filter((string) => string.includes('Locator.')) // Filter only strings that include 'Locator.'
			.map((string) => string.match(/Locator\.(\w+)/)?.[1]); // Extract the locator name

		// Get all data from test folder
		const testsFilesData = fileSystemUtils.readFilesRecursively(testFolderPath);
		// Get all data from steps folder
		const stepsFilesData = fileSystemUtils.readFilesRecursively(stepFolderPath);
		// Combine test folder data and steps folder data
		const combinedArray = testsFilesData.concat(stepsFilesData);

		for (const locatorUsageName of locatorUsageNames) {
			let found = false;

			for (const testStringValue of combinedArray) {
				if (testStringValue.includes(locatorUsageName!)) {
					found = true;
					break; // No need to continue searching in other strings
				}
			}

			expect(found).toBeTruthy();
		}
	});
});
