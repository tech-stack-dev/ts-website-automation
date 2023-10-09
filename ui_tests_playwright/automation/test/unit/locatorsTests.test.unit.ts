import * as fs from 'fs';
import * as path from 'path';

// Helper function to recursively read files in a directory and its subdirectories
function readFilesRecursively(directoryPath: string): string[] {
  try {
    const strings: string[] = [];
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        strings.push(fileContents);
      } else if (stats.isDirectory()) {
        // Recursively read files in subdirectory
        strings.push(...readFilesRecursively(filePath));
      }
    }

    return strings;
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}: ${error.message}`);
    return [];
  }
}

// Helper function to extract locator values from text
function extractLocatorValues(strings: string[]): string[] {
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

// Helper function to extract locator names from text
// function extractLocatorNames(strings: string[]): string[] {
//   const regex = /static\s+([\w$]+)\s*[:=]/g;
//   const allLocatorNames: string[] = [];

//   for (const string of strings) {
//     const matches = string.match(regex);

//     if (matches) {
//       for (const match of matches) {
//         const nameMatch = match.match(/static\s+([\w$]+)\s*[:=]/);
//         if (nameMatch) {
//           allLocatorNames.push(nameMatch[1]);
//         }
//       }
//     }
//   }

  return allLocatorNames;
}

describe('Locator test', () => {
  // Locator folder path
  const locatorFolderPath = path.join(__dirname, '..', '..', 'identifiers');
  // Test folder path
  const testFolderPath = path.join(__dirname, '..', '..', 'test');
  // Steps folder path
  const stepFolderPath = path.join(__dirname, '..', '..', 'steps');

  // Get all strings from all files with locators
  const locatorsFilesData = readFilesRecursively(locatorFolderPath);

  it('should check that locators values are unique across all locator class files', () => {
    // Get array of locator values
    const locatorsValues = extractLocatorValues(locatorsFilesData);
  
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
  

  /*
  it('should check that locator names are unique across all locator class files', () => {
    // Get array of locator names
    const locatorsNames = extractLocatorNames(locatorsFilesData);
  
    // Create a Map to count the occurrences of each locator name
    const locatorNameCount = new Map<string, number>();
    for (const name of locatorsNames) {
      locatorNameCount.set(name, (locatorNameCount.get(name) || 0) + 1);
    }
  
    // Filter out the names that occur more than once (i.e., not unique)
    const duplicateLocatorNames = Array.from(locatorNameCount.entries())
      .filter(([, count]) => count > 1)
      .map(([name]) => name);
  
    // If there are duplicate locator names, fail the test and report them
    if (duplicateLocatorNames.length > 0) {
        throw new Error(`The following locator names are not unique: ${duplicateLocatorNames.join(', ')}`);
    }
  });
  */
  

  it('should check that locators are used in tests or steps', () => {
    // Get array of locator class plus locator name in format LocatorClass.LocatorName
    const locatorUsageNames = readFilesRecursively(locatorFolderPath)
      .filter((string) => string.includes('Locator.')) // Filter only strings that include 'Locator.'
      .map((string) => string.match(/Locator\.(\w+)/)?.[1]); // Extract the locator name

    // Get all data from test folder
    const testsFilesData = readFilesRecursively(testFolderPath);
    // Get all data from steps folder
    const stepsFilesData = readFilesRecursively(stepFolderPath);
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
