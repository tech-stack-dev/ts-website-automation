Feature: ContactUs

@Regression @TSWEB149
Scenario: CheckErrorMessagesForEmptyRequiredFieldsOnContactForm
	Given User is on career website
	When User clicks on 'Contact_us' tab on 'NavigationHeader' container
	Then 'Contact us' title is displayed on Contact Us form
	When User clicks on 'Submit' button on 'ContactUsPage' container
	Then Error messages are displayed under fields
		| Input    | ErrorMessage                   |
		| fullName | Please enter your name         |
		| email    | Please enter your email        |
		| tel      | Please enter your phone number |

@Regression @TSWEB149
Scenario: CheckErrorMessagesForRequiredFieldsWithSpacesOnContactForm
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set '     ' text to 'fullName' input on 'ContactUsPage' container
	When User set '     ' text to 'email' input on 'ContactUsPage' container
	When User set '     ' text to 'tel' input on 'ContactUsPage' container
	When User clicks on 'Submit' button on 'ContactUsPage' container
	Then Error messages are displayed under fields
		| Input    | ErrorMessage                      |
		| fullName | Please enter your name            |
		| email    | Please enter a valid email        |
		| tel      | Please enter a valid phone number |

@Regression @TSWEB149
Scenario Outline: CheckErrorMessagesForRequiredFieldsWithInvalidDataOnContactForm
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set 'test' text to 'fullName' input on 'ContactUsPage' container
	When User set '<Email>' text to 'email' input on 'ContactUsPage' container
	When User set '<Tel>' text to 'tel' input on 'ContactUsPage' container
	When User clicks on 'Submit' button on 'ContactUsPage' container
	Then Error messages are displayed under fields
		| Input | ErrorMessage        |
		| email | <EmailErrorMessage> |
		| tel   | <TelErrorMessage>   |

Examples:
	| Email           | Tel     | EmailErrorMessage          | TelErrorMessage                   |
	| 12345           | -12345  | Please enter a valid email | Please enter a valid phone number |
	| @test.com       | test    | Please enter a valid email | Please enter a valid phone number |
	# This variant shouldn't work while task TSWEB-279
	| email@-test.com | !@#$%   | Please enter a valid email | Please enter a valid phone number |
	| !@#$%           | +12345+ | Please enter a valid email | Please enter a valid phone number |

@Regression @TSWEB149
Scenario: CheckThatContactUsFormWorksCorrectWithValidDataInRequiredFields
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set 'Full name' text to 'fullName' input on 'ContactUsPage' container
	When User set 'email@test.com' text to 'email' input on 'ContactUsPage' container
	When User set '12345' text to 'tel' input on 'ContactUsPage' container
	When User set 'test' text to message field on Contact Us form
	When User clicks on 'Submit' button on 'ContactUsPage' container
	Then 'Thanks for your message. We will contact you shortly.' text is displayed on Contact Us modal window

@Regression @TSWEB149
Scenario Outline: CheckThatContactUsFormWorksCorrectWithValidAttachedFilesFormat
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set 'Full name' text to 'fullName' input on 'ContactUsPage' container
	When User set 'email@test.com' text to 'email' input on 'ContactUsPage' container
	When User set '12345' text to 'tel' input on 'ContactUsPage' container
	When User attaches '<File>' file on Contact Us form
	Then '<File>' attached file name is displayed in input
	When User clicks on 'Submit' button on 'ContactUsPage' container
	Then 'Thanks for your message. We will contact you shortly.' text is displayed on Contact Us modal window

Examples:
	| File      |
	| test.pdf  |
	| test.docx |

@Regression @TSWEB149
Scenario: CheckErrorMessageForInvalidFormatAttachedFileOnContactForm
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set 'Full name' text to 'fullName' input on 'ContactUsPage' container
	When User set 'email@test.com' text to 'email' input on 'ContactUsPage' container
	When User set '12345' text to 'tel' input on 'ContactUsPage' container
	When User set 'test' text to message field on Contact Us form
	When User attaches 'test.mp4' file on Contact Us form
	When User clicks on 'Submit' button on 'ContactUsPage' container
	Then 'You can only attach the file in *.doc, *.pdf, *.docx, *.txt, *.text and *.log extensions' error message is displayed under attach files input