export default class Buttons {
	static ContactUs = 'Button-ContactUs';
	static Close = 'CloseButton-Close';

	// Social links
	static LinkedIn = 'Button-LinkedIn';
	static Facebook = 'Button-Facebook';
	static Instagram = 'Button-Instagram';
	static Behance = 'Button-Behance';
	static Dribbble = 'Button-Dribbble';
	static Twitter = 'Button-Twitter';
	static GoodFirms = 'Button-GoodFirms';
	static Clutch = 'Button-Clutch';
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

	// Other
	static Logo = 'Logo-Techstack';
	static Blog = 'Button-Blog';
}
