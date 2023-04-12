Feature: HomePage

Background:
	Given User is on career website
	
@Regression @NavigationHeader
Scenario: CheckLogoDisplayedOnMainPage
	Then Techstack logo is displayed on main page