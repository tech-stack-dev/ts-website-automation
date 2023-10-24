import * as fs from 'fs';
import * as path from 'path';

class FileSystemUtils {
	// Function to read files recursively in a directory
	readFilesRecursively(directoryPath: string, filter?: (filePath: string) => boolean): string[] {
		try {
			const strings: string[] = [];
			const files = fs.readdirSync(directoryPath);

			for (const file of files) {
				const filePath = path.join(directoryPath, file);
				const stats = fs.statSync(filePath);

				if (stats.isDirectory()) {
					// Recursively read files in subdirectories
					strings.push(...this.readFilesRecursively(filePath, filter));
				} else if (stats.isFile() && (!filter || filter(filePath))) {
					const fileContents = fs.readFileSync(filePath, 'utf-8');
					strings.push(fileContents);
				}
			}

			return strings;
		} catch (error) {
			console.error(`Error reading directory ${directoryPath}: ${error.message}`);
			return [];
		}
	}

	// Function to find TypeScript files recursively in a directory
	findTypeScriptFiles(directory: string): string[] {
		try {
			const fileNames: string[] = [];
			const files = fs.readdirSync(directory);

			for (const file of files) {
				const filePath = path.join(directory, file);
				const stats = fs.statSync(filePath);

				if (stats.isDirectory()) {
					// Recursively find TypeScript files in subdirectories
					fileNames.push(...this.findTypeScriptFiles(filePath));
				} else if (stats.isFile() && filePath.endsWith('.ts')) {
					fileNames.push(filePath); // Add the file name to the array
				}
			}

			return fileNames;
		} catch (error) {
			console.error(`Error reading directory ${directory}: ${error.message}`);
			return [];
		}
	}

	// Function to extract locator values from strings
	extractLocatorValues(strings: string[]): string[] {
		const allValuesInDoubleQuotes: string[] = [];
		const regex = /(\w+)\s*=\s*'([^']+)';/g;

		for (const string of strings) {
			let match: RegExpExecArray | null;

			while ((match = regex.exec(string)) !== null) {
				allValuesInDoubleQuotes.push(match[2]);
			}
		}

		return allValuesInDoubleQuotes;
	}
}

const fileSystemUtils = new FileSystemUtils();
export {fileSystemUtils};
