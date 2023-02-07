Feature: JobsBlockFeaturePart1

# Added NotRun as this is not stable test. It will be fixed in separate PR (Dan and Asya)
@Regression @TSWEB146 @Cleanup @NotRun
Scenario: CheckJobDescriptionOnJobPage
	# Preconditions
	Given User creates Tags
		| Prefix    | Name               |
		| Direction | Test1Tag{SRND}     |
		| Tag       | Test2Tag{SRND}     |
		| Tag       | Hot_Test3Tag{SRND} |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag            |
		| Test1Tag{SRND} |
	When User clicks on 'Test1Career{SRND}' card title
	Then 'Test1Career{SRND}' job title is displayed on job page
	Then Tags are displayed on job page
		| Tag            |
		| Hot            |
		| Test2Tag{SRND} |
	Then 'Hot' tag is displayed in '1' position on job page
	Then 'Hot' tag has 'orange yellow' background color on job page
	Then Social media icons are displayed below job title on job page
	When User clicks on 'Facebook share' wrapped button on 'JobPage' container
	Then 'Facebook' website is opened in popup window
	When User clicks on 'Linkedin share' wrapped button on 'JobPage' container
	Then 'Linkedin' website is opened in popup window
	When User clicks on 'Twitter share' wrapped button on 'JobPage' container
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
	When User clicks on 'Apply now vacancy' button on 'JobPage' container
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