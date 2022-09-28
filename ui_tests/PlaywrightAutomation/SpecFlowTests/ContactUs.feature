Feature: ContactUs

@Regression @TSWEB149
Scenario: CheckErrorMessagesForInputs
	Given User is on career website
	When User clicks on 'Contact us' tab
	Then 'Contact us' title is displayed on Contact Us form
	When User clicks on 'Submit' button on 'ContactUsPage' container
	Then Error messages are displayed under fields
		| Input     | ErrorMessage                   |
		| Full name | Please enter your name         |
		| Email     | Please enter your email        |
		| Tel       | Please enter your phone number |