Feature: ContactUs

@Regression @TSWEB149
Scenario: CheckErrorMessagesForEmptyRequiredInputs
	Given User is on career website
	When User clicks on 'Contact us' tab
	Then 'Contact us' title is displayed on Contact Us form
	When User clicks on 'Submit' button on 'ContactUsPage' container
	Then Error messages are displayed under fields
		| Input     | ErrorMessage                   |
		| Full name | Please enter your name         |
		| Email     | Please enter your email        |
		| Tel       | Please enter your phone number |

@Regression @TSWEB149
Scenario: CheckRequiredInputs
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set 'Full name' text to 'Full name' input on 'ContactUsPage' container
	When User set 'Email@test.com' text to 'Email' input on 'ContactUsPage' container
	When User set '123456789' text to 'Tel' input on 'ContactUsPage' container
	When User clicks on 'Submit' button on 'ContactUsPage' container
	Then 'Thanks for your message. We will contact you shortly.' text is displayed on Contact Us form
	
@Regression @TSWEB149
Scenario: CheckAttachFileFunctionality
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set 'Full name' text to 'Full name' input on 'ContactUsPage' container
	When User set 'Email@test.com' text to 'Email' input on 'ContactUsPage' container
	When User set '123456789' text to 'Tel' input on 'ContactUsPage' container
	When User attach 'test.pdf' file
	Then 'test.pdf' attached file name is displayed in input
	When User clicks on 'Submit' button on 'ContactUsPage' container
	Then 'Thanks for your message. We will contact you shortly.' text is displayed on Contact Us form

@Regression @TSWEB149
Scenario: CheckErrorMessagesForInvalidRequiredInputs1
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set '     ' text to 'Full name' input on 'ContactUsPage' container
	When User set '@email.com' text to 'Email' input on 'ContactUsPage' container
	When User set 'test' text to 'Tel' input on 'ContactUsPage' container
	When User set 'test' text to 'Message' textarea on 'ContactUsPage' container
	When User attach 'test.pdf' file
	Then 'test.pdf' attached file name is displayed in input
	When User clicks on 'Submit' button on 'ContactUsPage' container
	Then Error messages are displayed under fields
		| Input     | ErrorMessage                      |
		| Full name | Please enter your name            |
		| Email     | Please enter a valid email        |
		| Tel       | Please enter a valid phone number |

@Regression @TSWEB149
Scenario: CheckErrorMessagesForInvalidRequiredInputs2
	Given User is on 'https://staging-career.tech-stack.io/contact-us' page
	When User set 'test' text to 'Full name' input on 'ContactUsPage' container
	When User set '123456' text to 'Email' input on 'ContactUsPage' container
	When User set '55555' text to 'Tel' input on 'ContactUsPage' container
	When User set '' text to 'Message' textarea on 'ContactUsPage' container
	When User attach 'test.docx' file
	Then 'test.docx' attached file name is displayed in input
	When User clicks on 'Submit' button on 'ContactUsPage' container
	Then Error messages are displayed under fields
		| Input | ErrorMessage               |
		| Email | Please enter a valid email |