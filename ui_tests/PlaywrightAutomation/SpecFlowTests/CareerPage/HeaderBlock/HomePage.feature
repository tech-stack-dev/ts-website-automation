Feature: HomePage

Background:
	Given User is on career website
	
# Test should be moved to TypeScript solution, details in TSWEB-560
@Smoke @Regression @NavigationHeader @NotRun
Scenario: CheckThatUserCanSwithedLanguageInHeaderBlock
	Then 'En' button is active on 'HeaderPage' container
	When User clicks 'Ua' button on 'HeaderPage' container
	Then 'Ua' button is active on 'HeaderPage' container

@Regression @NavigationHeader
Scenario: CheckThatUserCanSwithedLanguageInNavigationBlock
	When User scrolls down to the end of the page
	Then 'En' button is active on 'NavigationHeader' container
	When User clicks 'Ua' button on 'NavigationHeader' container
	Then 'Ua' button is active on 'NavigationHeader' container

@Regression @NavigationHeader
Scenario: CheckLogoDisplayedOnMainPage
	Then Techstack logo is displayed on main page