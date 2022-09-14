@retry(1)
Feature: JobsBlock1

@Regression @TSWEB146 @Cleanup
Scenario: CheckJobDescriptionOnJobPage
	# Preconditions
	Given User creates tag
		| Prefix    | Name                                |
		| Direction | TSWEB146TestingDirection4_Тестовий4 |
		| Tag       | Test146Tag_Тестовий146Тег           |
		| Tag       | Hot_ГарячіВакансії                  |
	Given User creates and publish new Career Description
		| Field             | Value                       |
		| AboutTheProjectUs | AboutTheProjectUs4          |
		| AboutTheProjectUa | AboutTheProjectUa4          |
		| AboutTheRoleUs    | AboutTheRoleUs4             |
		| AboutTheRoleUa    | AboutTheRoleUa4             |
		| TitleUs           | TSWEB146TitleUs4            |
		| TitleUa           | TSWEB146TitleUa4            |
		| YouWillUs         | YouWillUs4                  |
		| YouWillUa         | YouWillUa4                  |
		| YouAreUs          | YouAreUs4                   |
		| YouAreUa          | YouAreUa4                   |
		| WeWillUs          | WeWillUs4                   |
		| WeWillUa          | WeWillUa4                   |
		| WeAreUs           | WeAreUs4                    |
		| WeAreUa           | WeAreUa4                    |
		| TechnologyStack   | TechnologyStackUs4          |
		| SlugUs            | TestSlugUsDirectionOnlyOne4 |
	Given User creates new Career with 'TSWEB146TitleUs4' career description and 'TSWEB146TestingDirection4_Тестовий4,Test146Tag_Тестовий146Тег,Hot_ГарячіВакансії' tag
		| NameUs          | NameUa          | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| Tsweb146Testus4 | TSWEB146TestUa4 | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                       |
		| TSWEB146TestingDirection4 |
	When User clicks on 'Tsweb146Testus4' card title
	Then 'Tsweb146Testus4' job title is displayed on job page
	Then 'Hot' tag is displayed in the '1' position on job page
	Then 'Hot' tag has 'orange yellow' background color on job page
	Then Social media icons are displayed below job title on job page
	Then 'facebook' social media icon is clickable on 'JobPage' container on job page
	Then 'linkedin' social media icon is clickable on 'JobPage' container on job page
	Then 'twitter' social media icon is clickable on 'JobPage' container on job page
	Then Job has description titles on job page
		| Title              |
		| About the product: |
		| About the role:    |
		| You will:          |
		| You:               |
		| We will:           |
		| We:                |
	Then 'Would you like to be a part of our team?' text is displayed on job page