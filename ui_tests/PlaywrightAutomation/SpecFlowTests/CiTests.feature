Feature: CiTests

This test feature was created for the CI configuration

@CiTests
Scenario: PassedTest
	Given User is on career website
	When User clicks on 'Contact us' tab on 'NavigationHeader' container
	Then 'Contact us' title is displayed on Contact Us form

@CiTests
Scenario: FailedTest
	Given User is on career website
	When User clicks on 'Contact us' tab on 'NavigationHeader' container
	Then 'Jobs' title is displayed on Contact Us form