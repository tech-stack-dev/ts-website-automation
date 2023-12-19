import {Locator} from 'playwright-core';
import MainSiteButtons from '../../identifiers/mainSite/MainSiteButtons';

export default class TechnologyStackData {
	static BackEndTab = ['.NET Stack', 'JVM Stack', 'Node.js Stack', 'Other'];
	static FrontEndTab = [
		'Language',
		'State Management',
		'Design',
		'Web Optimization & Analytics',
		'Frameworks',
		'Build Tools',
		'Rich Content',
		'Content Management',
	];
	static MobileTab = ['React Native', 'Cordova', 'Flutter', 'Android', 'iOS'];
	static IoTTab = ['Devices', 'Gateways'];
	static DevOpsAndCloudTab = [
		'Cloud Platforms',
		'Operating System\nManagement\nand Configuration',
		'Platform-as-a-Service\n(PaaS)',
		'CI/CD and Automation',
		'Infrastructure as Code\n(IaC)',
		'Monitoring',
		'Resources Orchestration\nand Management',
		'Security',
		'Specialized Services for AI,\nMachine Learning,\nData Streaming, etc.',
		'Programming Languages',
		'Collaboration\nand Source Control',
	];
	static AiMLDataScieceTab = [
		'Computer Vision',
		'Artificial Intelligence, Deep Learning, and Machine Learning',
		'Data Visualization',
		'Data Storage & Manipulation',
		'Development Environment',
	];

	public static async getAllTechnologyStackTabsData() {
		return [
			this.BackEndTab,
			this.FrontEndTab,
			this.MobileTab,
			this.IoTTab,
			this.DevOpsAndCloudTab,
			this.AiMLDataScieceTab,
		];
	}

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
