import type {Config} from 'jest';

const config: Config = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/*.test.unit.ts'],
	testPathIgnorePatterns: ['/node_modules/', '/\\.DS_Store', '/identifiers/[^/]*'],
};

export default config;
