export default class Buttons {
	static Logo = 'Logo-Techstack';
	static Blog = 'Button-Blog';
	static Close = 'Button-Close';
	static Download = 'Button-Download';
	static BurgerMenuButton = 'Button-BurgerMenu';

	// Pages list
	static OurServices = 'Services-OurServices';
	static Services = {
		PoCAndMVPDevelopment: 'Services-PoC-MVP',
		CustomDev: 'Services-CustomDev',
		AiIntegrationServices: 'Services-AiIntegration',
		DataStrategy: 'Services-DataStrategy',
		SoftwareAudit: 'Services-SoftwareAudit',
		QaAsAService: 'Services-QaAsAServ',
		ProductScaling: 'Services-ProductScaling',
		CloudMigration: 'Services-CloudMigration',
		DedicatedTeam: 'Services-DedicatedTeam',
		StaffAugmentation: 'Services-StaffAugmentation',
	};
	static ServicesBlog = {
		PoCAndMVPDevelopment: 'Services-PocMvpDevelopment',
		CustomDev: 'Services-CustomDev',
		AiIntegrationServices: 'Services-AiIntegrationServices',
		DataStrategy: 'Services-DataStrategy',
		SoftwareAudit: 'Services-SoftwareAudit',
		QaAsAService: 'Services-QaAsAServ',
		ProductScaling: 'Services-ProductScaling',
		CloudMigration: 'Services-CloudMigration',
		DedicatedTeam: 'Services-DedicatedDevelopmentTeam',
		StaffAugmentation: 'Services-ItStaffAugmentation',
	};
	static Industries = {
		Healthcare: 'Industries-Healthcare',
		TransportationAndLogistics: 'Industries-TransportationAndLogistics',
		RenewableEnergy: 'Industries-RenewableEnergy',
		Startups: 'Industries-Startups',
	};
	static Expertise = {
		CloudDev: 'Services-CloudDev',
		DevOps: 'Services-DevOps',
		InternetOfThings: 'Services-InternetOfThings',
		DigitalTransform: 'Services-DigitalTransformation',
		UiUxDesign: 'Services-UiUxDesign',
		MobileDev: 'Services-MobileDev',
		FrontEnd: 'Services-FrontEnd',
		BackEnd: 'Services-BackEnd',
		BigData: 'Services-BigData',
		AiDevelopment: 'Services-AIML',
		ComputerVision: 'Services-ComputerVision',
		OpenApi: 'Services-OpenAPI',
		DeepLearning: 'Services-DeepLearning',
	};
	static ExpertiseBlog = {
		CloudDev: 'Expertise-CloudDev',
		DevOps: 'Expertise-DevOps',
		InternetOfThings: 'Expertise-InternetOfThings',
		DigitalTransform: 'Expertise-DigitalTransformation',
		UiUxDesign: 'Expertise-UiUxDesign',
		MobileDev: 'Expertise-MobileDev',
		FrontEnd: 'Expertise-FrontEnd',
		BackEnd: 'Expertise-BackEnd',
		BigData: 'Expertise-BigData',
		AiDevelopment: 'Expertise-AIML',
		ComputerVision: 'Expertise-ComputerVisionDevelopment',
		OpenApi: 'Expertise-OpenaiApiIntegration',
		DeepLearning: 'Expertise-DeepLearning',
	};
	static Company = {
		AboutUs: 'Company-AboutUs',
		HowWeWork: 'Company-HowWeWork',
		OurClients: 'Company-Clients',
		Pricing: 'Company-Pricing',
		Career: 'Company-Career',
		CaseStudies: 'Company-CaseStudies',
		Blog: 'Company-Blog',
	};

	// Career pages list
	static Company_TechstackWorldwide = 'Company-TechstackWorldwide';
	static Company_Services = 'Company-Services';

	static Career_Jobs = 'Career-Jobs';
	static Career_AboutUs = 'Career-AboutUs';
	static Career_Reviews = 'Career-Reviews';
	static Career_ContactUs = 'Career-ContactUs';

	// Social links
	static LinkedIn = 'Button-LinkedIn';
	static Facebook = 'Button-Facebook';
	static Instagram = 'Button-Instagram';
	static Behance = 'Button-Behance';
	static Dribbble = 'Button-Dribbble';
	static Twitter = 'Button-Twitter';
	static GoodFirms = 'Button-GoodFirms';
	static Clutch = 'Button-Clutch';
	static DesignRush = 'Button-DesignRush';
	static Forbes = 'Button-Forbes';
	static Salesforce = 'Button-Salesforce';
	static Deloitte = 'Button-Deloitte';
	static McKinsey = 'Button-McKinsey';

	// Pagination
	static paginationNumberButton(pageNumber: number) {
		return `PageNumberButton-Page${pageNumber}Button`;
	}
	static paginationNavigatinArrowButton(navigation: 'Next' | 'Prev') {
		return `Pagination${navigation}Button-${navigation}Button`;
	}

	// Cookies
	static AcceptCookies = 'Button-AcceptCookie';
	static ChangeConsent = 'Button-ChangeConsent';
	static AcceptCookieSettings = 'Button-AcceptCookieSettings';
	static Decline = 'Button-Decline';

	// Form
	static Send = 'Button-SendRequest';
	static AttachFiles = 'Button-AttachFiles';
	static Cancel = 'Icon-Cancel';
}
