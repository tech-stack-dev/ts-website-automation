import {describe, expect, it} from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

// Function to check if a string starts with a lowercase letter
function startsWithLowerCase(str: string) {
	return /^[a-z]/.test(str);
}

function startsWithUpperCase(str: string) {
	return /^[A-Z]/.test(str);
}

// Recursive function to check all subfolders
function checkFoldersRecursively(root: string, excluded: string[], failedFolders: string[]) {
	const folderNames = fs.readdirSync(root, {withFileTypes: true});

	for (const folder of folderNames) {
		if (folder.isDirectory() && !excluded.includes(folder.name)) {
			const isLowerCase = startsWithLowerCase(folder.name);

			if (!isLowerCase) {
				failedFolders.push(path.join(root, folder.name));
			}

			const subFolderPath = path.join(root, folder.name);
			checkFoldersRecursively(subFolderPath, excluded, failedFolders);
		}
	}
}

function checkFilesRecursively(root: string, failedFiles: string[]) {
	const fileNames = fs.readdirSync(root);

	for (const file of fileNames) {
		const filePath = path.join(root, file);
		if (fs.statSync(filePath).isDirectory()) {
			// If it's a directory, recursively check its files
			checkFilesRecursively(filePath, failedFiles);
		} else {
			// Check if the file has a .ts extension
			const extension = path.extname(filePath).toLowerCase();
			if (extension === '.ts') {
				const isUpperCase = startsWithUpperCase(path.basename(filePath, extension));
				if (!isUpperCase) {
					failedFiles.push(filePath);
				}
			}
		}
	}
}

describe('Folder Name Case Test', () => {
	const frameworkRoot = path.join(__dirname, '../..'); // Adjust the path as needed
	const excludedFolders = ['node_modules', 'build']; // Add any folders to exclude here

	it('should check that all folders have names starting with lowercase', () => {
		const failedFolders: string[] = [];
		checkFoldersRecursively(frameworkRoot, excludedFolders, failedFolders);

		if (failedFolders.length > 0) {
			const errorMessages = failedFolders.map(
				(folder) => `Folder "${folder}" should start with a lowercase letter.`
			);

			const errorMessage = errorMessages.join('\n');
			if (failedFolders.length !== 0) {
				console.log(errorMessage);
			}
			expect(failedFolders.length).toBe(0);
		}
	});

	it('should check that all .ts files have names starting with an uppercase letter', () => {
		const failedFiles: string[] = [];
		checkFilesRecursively(frameworkRoot, failedFiles);

		if (failedFiles.length > 0) {
			const errorMessages = failedFiles.map(
				(file) => `TypeScript file "${file}" should start with an uppercase letter.`
			);

			const errorMessage = errorMessages.join('\n');
			if (failedFiles.length !== 0) {
				console.log(errorMessage);
			}
			expect(failedFiles.length).toBe(0);
		}
	});
});
