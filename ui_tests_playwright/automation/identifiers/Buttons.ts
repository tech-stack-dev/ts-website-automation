export default class Buttons {
	static Logo = 'Logo-Techstack';
	static ContactUs = 'Button-ContactUs';
	static Blog = 'Button-Blog';
	static Close = 'Button-Close';

	// Pages list
	static Industries_Healthcare = 'Industries-Healthcare';
	static Industries_TransportationAndLogistics = 'Industries-TransportationAndLogistics';
	static Industries_RenewableEnergy = 'Industries-RenewableEnergy';

	static Services_OurServices = 'Services-OurServices';
	static Services_CustomDev = 'Services-CustomDev';
	static Services_DigitalTransform = 'Services-DigitalTransformation';
	static Services_CloudDev = 'Services-CloudDev';
	static Services_MobileDev = 'Services-MobileDev';
	static Services_BigData = 'Services-BigData';
	static Services_InternetOfThings = 'Services-InternetOfThings';
	static Services_DevOps = 'Services-DevOps';
	static Services_AiDevelopment = 'Services-AIML';
	static Services_UiUxDesign = 'Services-UiUxDesign';
	static Services_QaAsAServ = 'Services-QaAsAServ';
	static Services_ConsultingServ = 'Services-ConsultingServ';

	static Company_AboutUs = 'Company-AboutUs';
	static Company_HowWeWork = 'Company-HowWeWork';
	static Company_Pricing = 'Company-Pricing';
	static Company_Career = 'Company-Career';
	static Company_CaseStudies = 'Company-CaseStudies';
	static Company_Blog = 'Company-Blog';
	static Company_Whitepapers = 'Company-Whitepapers';

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
	static Send = 'SubmitButton-SharedSendMessage';
	static AttachFiles = 'Button-AttachFiles';
	static Cancel = 'Icon-Cancel';
}
