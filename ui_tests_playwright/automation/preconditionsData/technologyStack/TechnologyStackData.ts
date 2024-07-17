import {Locator} from 'playwright-core';
import MainSiteButtons from '../../identifiers/mainSite/MainSiteButtons';

export default class TechnologyStackData {
	static BackEndTab = [
		'Programming\nLanguages',
		'Server-Side\nTechnologies',
		'Database\nTechnologies',
		'Messaging',
		'API',
		'Caching',
		'Unit testing',
		'SDLC enabling\ntechnologies',
		'Servers',
		'Scripting\nand Miscellaneous',
	];
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
	static MobileTab = ['Android', 'iOS', 'React Native', 'API', 'Flutter', 'Ionic'];
	static CloudAndDevOpsTab = [
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
		'Computer vision',
		'Deep Learning\nand Machine\nLearning',
		'Data Ingestion\nand\nManipulation',
		'Application',
		'Data storage\nand\nmanipulation',
		'DevOps',
		'QA',
		'Data\nVisualization',
	];
	static EmbededDevelopmentTab = [
		'Gateway',
		'Microcontrollers',
		'Single-board\nComputers',
		'Hardware Protocols\n(Interfaces)',
		'Wireless Network',
		'Network Protocols',
		'PCB Design\nSoftware & Tools',
		'CAD Software',
		'Software for IoT\nand Embedded\ndevelopment',
	];
	static QalityAssuranceTab = [
		'Languages',
		'Frameworks',
		'DB',
		'CI/CD',
		'Report tools',
		'Performance Tools',
		'Test Management\nSystems',
		'Cloud-Based\nTesting Services',
		'Key Management\nServices',
		'Documentation\nManagement Systems',
		'API Testing Tools',
		'Mocking',
		'Virtualization',
		'VCS',
	];

	public static async getAllTechnologyStackTabsData() {
		return [
			this.BackEndTab,
			this.FrontEndTab,
			this.MobileTab,
			this.CloudAndDevOpsTab,
			this.AiMLDataScieceTab,
			this.EmbededDevelopmentTab,
			this.QalityAssuranceTab,
		];
	}

	public static async getTechnologyStackTabs(container: Locator) {
		const navigationTabs = [
			container.getByTestId(MainSiteButtons.Technology_BackEnd),
			container.getByTestId(MainSiteButtons.Technology_FrontEnd),
			container.getByTestId(MainSiteButtons.Technology_Mobile),
			container.getByTestId(MainSiteButtons.Technology_DevOpsCloud),
			container.getByTestId(MainSiteButtons.Technology_AiMlDataScience),
			container.getByTestId(MainSiteButtons.Technology_EmbededDevelopment),
			container.getByTestId(MainSiteButtons.Technology_QualityAssurance),
		];

		return navigationTabs;
	}
}
