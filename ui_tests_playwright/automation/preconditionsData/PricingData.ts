import {Locator} from 'playwright-core';
import MainSiteButtons from '../identifiers/mainSite/MainSiteButtons';

export default class PricingData {
	static CustomOfferFullCycleSoftwareDevvelopment = [
		'First consultation',
		'Needs analysis and planning',
		'Customized offer',
		'Engagement phase',
	];
	static CustomOfferExtendedTeam = ['First consultation', 'Pre-engagement stage', 'Engagement phase'];
	static CostFullCycleSoftwareDevelopment = [
		'Scope and complexity',
		'Specific product requirements',
		'Technology stack',
		'Timeframe',
	];
	static CostExtendedTeam = ['Skill set', 'Seniority level', 'Technology stack'];

	public static async getAllCustomOfferTabsData() {
		return [this.CustomOfferFullCycleSoftwareDevvelopment, this.CustomOfferExtendedTeam];
	}
	public static async getAllCostTabsData() {
		return [this.CostFullCycleSoftwareDevelopment, this.CostExtendedTeam];
	}

	public static async getPricingTabs(container: Locator) {
		const navigationTabs = [
			container.getByTestId(MainSiteButtons.Pricing_ExtendedTeam),
			container.getByTestId(MainSiteButtons.Pricing_FullCycle), // To click this item last because it selected by default on page
		];

		return navigationTabs;
	}
}
