import {Locator} from 'playwright-core';
import MainSiteButtons from '../../identifiers/MainSite/MainSiteButtons';

export default class TechnologyStackData {
	static SectionTitles = [
		[
			// Back-End tab
			'.NET Stack',
			'JVM Stack',
			'Node.js stack',
			'Other',
		],
		[
			// Front-End tab
			'Languages',
			'Frameworks',
			'State\nmanagement',
			'Build tools',
			'Markup',
			'Rich content',
		],
		[
			// Mobile tab
			'React Native',
			'Cordova',
			'Flutter',
			'Android',
			'iOS',
		],
		[
			// IoT tab
			'Devices',
			'Gateways',
		],
		[
			// DevOps/Cloud tab
			'Cloud',
			'DevOps',
			'CI/CD',
			'Monitoring',
		],
		[
			// AI&ML/Data science tab
			'Computer Vision',
			'Artificial Intelligence, Deep Learning, and Machine Learning',
			'Data Visualization',
			'Data Storage & Manipulation',
			'Development Environment',
		],
	];

	public static async getTechnologyStackTabs(container: Locator) {
		const navigationTabs = [
			container.getByTestId(MainSiteButtons.Technology_FrontEnd),
			container.getByTestId(MainSiteButtons.Technology_Mobile),
			container.getByTestId(MainSiteButtons.Technology_Iot),
			container.getByTestId(MainSiteButtons.Technology_DevOpsCloud),
			container.getByTestId(MainSiteButtons.Technology_AiMlDataScience),
			container.getByTestId(MainSiteButtons.Technology_BackEnd), // To click this item last because it selected by default on page
		];

		return navigationTabs;
	}
}
