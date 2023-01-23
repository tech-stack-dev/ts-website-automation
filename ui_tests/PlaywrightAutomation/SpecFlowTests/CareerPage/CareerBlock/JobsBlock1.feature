Feature: JobsBlock1

@Regression @TSWEB146 @Cleanup
Scenario: CheckJobDescriptionOnJobPage
	# Preconditions
	Given User creates Tags
		| Prefix    | Name             |
		| Direction | Test1TagSRND     |
		| Tag       | Test2TagSRND     |
		| Tag       | Hot_Test3TagSRND |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag          |
		| Test1TagSRND |
	When User clicks on 'Test1CareerSRND' card title
	Then 'Test1CareerSRND' job title is displayed on job page
	Then Tags are displayed on job page
		| Tag          |
		| Hot          |
		| Test2TagSRND |
	Then 'Hot' tag is displayed in '1' position on job page
	Then 'Hot' tag has 'orange yellow' background color on job page
	Then Social media icons are displayed below job title on job page
	When User clicks on 'FacebookShare' wrapped button on 'JobPage' container
	Then 'Facebook' website is opened in popup window
	When User clicks on 'LinkedinShare' wrapped button on 'JobPage' container
	Then 'Linkedin' website is opened in popup window
	When User clicks on 'TwitterShare' wrapped button on 'JobPage' container
	Then 'Twitter' website is opened in popup window
	Then Following block titles are displayed on job page
		| Title              |
		| About the product: |
		| About the role:    |
		| You will:          |
		| You:               |
		| We will:           |
		| We:                |
	Then 'Would you like to be a part of our team?' text is displayed on Apply Container on job page
	When User clicks on 'ApplyNowVacancy' button on 'JobPage' container
	Then 'Apply for a Job' title is displayed on Apply For A Job page

@Regression @TSWEB146 @Cleanup
Scenario: CheckPaginationOnCareerPage
	# Preconditions
	Given User creates '12' Tags
	Given User creates '12' Career Descriptions
	Given User creates '12' Careers
	# Scenario
	Given User is on career website
	When User waits careers with mocked data
	Then Pagination is displayed on Career page
	Then Pagination navigation button with 'right' direction is displayed
	When User clicks on 'right' direction button in pagination panel
	Then '02' pagination button has 'orange yellow' background color in pagination panel
	Then Pagination navigation button with 'left' direction is displayed