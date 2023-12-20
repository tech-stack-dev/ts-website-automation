import * as fs from 'fs';

// Чтение содержимого файла
const content = fs.readFileSync('test-output.txt', 'utf-8');

// Нахождение чисел перед "passed", "failed", "flaky" и "skipped"
const passedMatches = content.match(/(\d+) passed/);
const failedMatches = content.match(/(\d+) failed/);
const flakyMatches = content.match(/(\d+) flaky/);
const skippedMatches = content.match(/(\d+) skipped/);

// Извлечение найденных чисел
const passed = passedMatches ? Number(passedMatches[1]) : 0;
const failed = failedMatches ? Number(failedMatches[1]) : 0;
const flaky = flakyMatches ? Number(flakyMatches[1]) : 0;
const skipped = skippedMatches ? Number(skippedMatches[1]) : 0;

// Вычисление общего числа тестов
const total = passed + failed + flaky + skipped;

// Вывод результатов в формате, понятном GitHub Actions
console.log(`::set-env name=PASSED::${passed}`);
console.log(`::set-env name=FAILED::${failed}`);
console.log(`::set-env name=FLAKY::${flaky}`);
console.log(`::set-env name=SKIPPED::${skipped}`);
console.log(`::set-env name=TOTAL::${total}`);
