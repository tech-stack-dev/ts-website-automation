@retry(1)
Feature: JobsBlock2

@Regression @TSWEB146 @Cleanup
Scenario: CheckPaginationOnJobPage
	# Preconditions
	Given User creates and publishes '12' Careers with descriptions and tags
	# Scenario
	Given User is on the career website
	Then Career page has pagination