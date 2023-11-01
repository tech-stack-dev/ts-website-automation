import {describe, it, expect} from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

function startsWithLowerCase(str: string) {
	return /^[a-z]/.test(str);
}

function startsWithUpperCase(str: string) {
	return /^[A-Z]/.test(str);
}

function checkFoldersRecursively(root: string, excluded: string[]): string[] {
	const failedFolders: string[] = [];

	function checkRecursively(currentPath: string) {
		const folderNames = fs.readdirSync(currentPath, {withFileTypes: true});

		for (const folder of folderNames) {
			if (folder.isDirectory() && !excluded.includes(folder.name)) {
				const isLowerCase = startsWithLowerCase(folder.name);

				if (!isLowerCase) {
					failedFolders.push(path.join(currentPath, folder.name));
				}

				checkRecursively(path.join(currentPath, folder.name));
			}
		}
	}

	checkRecursively(root);
	return failedFolders;
}

function checkFilesRecursively(root: string): string[] {
	const failedFiles: string[] = [];

	function checkRecursively(currentPath: string) {
		const fileNames = fs.readdirSync(currentPath);
		for (const file of fileNames) {
			const filePath = path.join(currentPath, file);

			if (fs.statSync(filePath).isDirectory()) {
				checkRecursively(filePath);
			} else if (path.extname(filePath).toLowerCase() === '.ts') {
				const isUpperCase = startsWithUpperCase(path.basename(filePath, '.ts'));
				if (!isUpperCase) {
					failedFiles.push(filePath);
				}
			}
		}
	}

	checkRecursively(root);
	return failedFiles;
}

describe('Folder Name Case Test', () => {
	const frameworkRoot = path.join(__dirname, '../..');
	const excludedFolders = ['node_modules', 'build'];

	it('should check that all folders have names starting with lowercase', () => {
		const foldersWithIncorrectCasing = checkFoldersRecursively(frameworkRoot, excludedFolders);
		expect(foldersWithIncorrectCasing).toEqual([]);
	});

	it('should check that all .ts files have names starting with an uppercase letter', () => {
		const filesWithIncorrectCasing = checkFilesRecursively(frameworkRoot);
		expect(filesWithIncorrectCasing).toEqual([]);
	});
});
