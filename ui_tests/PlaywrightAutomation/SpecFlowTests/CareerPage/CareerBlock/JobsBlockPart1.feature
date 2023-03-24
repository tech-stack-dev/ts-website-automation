Feature: JobsBlockPart1

# Test should be moved to TypeScript solution, details in TSWEB-560
@Regression @JobsBlock @TSWEB146 @NotRun
Scenario: CheckNavigationHeaderInCareerPage
	Given User is on career website
	Then Techstack logo is displayed on main page
	Then Jobs block on Career page has tabs
		| Tab        |
		| Jobs       |
		| About us   |
		| Reviews    |
		| Contact us |
	Then 'En' button is active on 'HeaderPage' container
	When User clicks 'Ua' button on 'HeaderPage' container
	Then 'Ua' button is active on 'HeaderPage' container
	
# Test should be moved to TypeScript solution, details in TSWEB-560 (Done)
@Regression @JobsBlock @TSWEB146 @Cleanup @NotRun
Scenario: CheckBreadcrumbsHeaderInJobsBlock
	# Preconditions
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag            |
		| Test1Tag{SRND} |
	When User clicks on 'Test1Career{SRND}' card title
	Then Breadcrumbs has 'Jobs / Test1Career{SRND}' text
	Then 'Apply Now' button is displayed on 'BreadcrumbsHeader' container

# Test should be moved to TypeScript solution, details in TSWEB-560
@Regression @JobsBlock @TSWEB146 @Cleanup @NotRun
Scenario: CheckNavigationHeaderOnJobPage
	# Preconditions
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag            |
		| Test1Tag{SRND} |
	When User clicks on 'Test1Career{SRND}' card title
	Then Techstack logo is displayed on job page
	Then Jobs block on 'NavigationHeader' container on job page has tabs
		| Tab        |
		| Jobs       |
		| About us   |
		| Reviews    |
		| Contact us |
	Then 'En' button is active on 'NavigationHeader' container
	When User clicks 'Ua' button on 'NavigationHeader' container
	Then 'Ua' button is active on 'NavigationHeader' container

# Test should be moved to TypeScript solution, details in TSWEB-560 (Done)
@Regression @JobsBlock @TSWEB146 @Cleanup @NotRun
Scenario: CheckLocalizationOnJobPage
	# Preconditions
	Given User creates Tags
		| Prefix    | Name                      |
		| Direction | Test1Tag{SRND}            |
		| Tag       | Test2Tag{SRND}_Test{SRND} |
		| Tag       | Hot_ГарячіBакансії        |
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
	When User clicks 'Ua' button on 'NavigationHeader' container
	Then 'Ua' button is active on 'NavigationHeader' container
	Then 'NameUa_1_{SRND}' job title is displayed on job page
	Then Jobs block on 'NavigationHeader' container on job page has tabs
		| Tab               |
		| Вакансії          |
		| Про компанію      |
		| Відгуки           |
		| Зв’язатись з нами |
	Then Breadcrumbs has 'Вакансії / NameUa_1_{SRND}' text
	Then 'Apply Now' button with 'Відгукнутися' text is displayed on 'BreadcrumbsHeader' container
	Then Tags are displayed on job page
		| Tag            |
		| ГарячіBакансії |
		| Test{SRND}     |
	Then 'Поділитися:' text is displayed with social media icons on job page
	Then Following block titles are displayed on job page
		| Title        |
		| Про продукт: |
		| Про роль:    |
		| Ти будеш:    |
		| Ти маєш:     |
		| Ми будемо:   |
		| Ми маємо:    |
	Then 'Хочеш стати частиною нашої команди?' text is displayed on Apply Container on job page
	Then 'Apply now vacancy' button with 'Подавай заявку!' text is displayed on 'JobPage' container