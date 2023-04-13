Feature: ContactUs

# Test should be moved to TypeScript solution, details in TSWEB-560
@Regression @ContactUsForm @TSWEB149 @NotRun
Scenario: CheckErrorMessagesForEmptyRequiredFieldsOnContactForm
	Given User is on career website
	When User clicks on 'Contact us' tab on 'NavigationHeader' container
	Then 'Contact us' title is displayed on Contact Us form
	When User clicks 'Submit' button on 'ContactUsPage' container
	Then Error messages are displayed under fields
		| Input     | ErrorMessage                   |
		| Full name | Please enter your name         |
		| Email     | Please enter your email        |
		| Tel       | Please enter your phone number |

@Regression @ContactUsForm @TSWEB149
Scenario: CheckErrorMessagesForRequiredFieldsWithSpacesOnContactForm
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set '     ' text to 'Full name' input on 'ContactUsPage' container
	When User set '     ' text to 'Email' input on 'ContactUsPage' container
	When User set '     ' text to 'Tel' input on 'ContactUsPage' container
	When User clicks 'Submit' button on 'ContactUsPage' container
	Then Error messages are displayed under fields
		| Input     | ErrorMessage                      |
		| Full name | Please enter your name            |
		| Email     | Please enter a valid email        |
		| Tel       | Please enter a valid phone number |

@Regression @ContactUsForm @TSWEB149
Scenario Outline: CheckErrorMessagesForRequiredFieldsWithInvalidDataOnContactForm
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set 'test' text to 'Full name' input on 'ContactUsPage' container
	When User set '<Email>' text to 'Email' input on 'ContactUsPage' container
	When User set '<Tel>' text to 'Tel' input on 'ContactUsPage' container
	When User clicks 'Submit' button on 'ContactUsPage' container
	Then Error messages are displayed under fields
		| Input | ErrorMessage        |
		| Email | <EmailErrorMessage> |
		| Tel   | <TelErrorMessage>   |

Examples:
	| Email           | Tel     | EmailErrorMessage          | TelErrorMessage                   |
	| 12345           | -12345  | Please enter a valid email | Please enter a valid phone number |
	| @test.com       | test    | Please enter a valid email | Please enter a valid phone number |
	| email@-test.com | !@#$%   | Please enter a valid email | Please enter a valid phone number |
	| !@#$%           | +12345+ | Please enter a valid email | Please enter a valid phone number |

@Regression @ContactUsForm @TSWEB149
Scenario: CheckThatContactUsFormWorksCorrectWithValidDataInRequiredFields
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set 'Full name' text to 'Full name' input on 'ContactUsPage' container
	When User set 'email@test.com' text to 'Email' input on 'ContactUsPage' container
	When User set '12345' text to 'Tel' input on 'ContactUsPage' container
	When User set 'test' text to message field on Contact Us form
	When User clicks 'Submit' button on 'ContactUsPage' container
	Then 'Thanks for your message. We will contact you shortly.' text is displayed on Contact Us modal window

@Regression @ContactUsForm @TSWEB149
Scenario Outline: CheckThatContactUsFormWorksCorrectWithValidAttachedFilesFormat
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set 'Full name' text to 'Full name' input on 'ContactUsPage' container
	When User set 'email@test.com' text to 'Email' input on 'ContactUsPage' container
	When User set '12345' text to 'Tel' input on 'ContactUsPage' container
	When User attaches '<File>' file on Contact Us form
	Then '<File>' attached file name is displayed in input
	When User clicks 'Submit' button on 'ContactUsPage' container
	Then 'Thanks for your message. We will contact you shortly.' text is displayed on Contact Us modal window

Examples:
	| File      |
	| test.pdf  |
	| test.docx |

@Regression @ContactUsForm @TSWEB149
Scenario: CheckErrorMessageForInvalidFormatAttachedFileOnContactForm
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set 'Full name' text to 'Full name' input on 'ContactUsPage' container
	When User set 'email@test.com' text to 'Email' input on 'ContactUsPage' container
	When User set '12345' text to 'Tel' input on 'ContactUsPage' container
	When User set 'test' text to message field on Contact Us form
	When User attaches 'test.jpg' file on Contact Us form
	When User clicks 'Submit' button on 'ContactUsPage' container
	Then 'You can only attach the file in *.doc, *.pdf, *.docx, *.txt, *.text, and *.log extensions' error message is displayed under attach files input