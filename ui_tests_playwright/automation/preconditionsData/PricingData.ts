import {Locator} from 'playwright-core';
import MainSiteButtons from '../identifiers/mainSite/MainSiteButtons';

export default class PricingData {
	static CustomOfferFullCycleSoftwareDevelopment = [
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
		return [this.CustomOfferFullCycleSoftwareDevelopment, this.CustomOfferExtendedTeam];
	}
	public static async getAllCostTabsData() {
		return [this.CostFullCycleSoftwareDevelopment, this.CostExtendedTeam];
	}

	public static async getPricingTabs(container: Locator) {
		const navigationTabs = [
			container.getByTestId(MainSiteButtons.Pricing_FullCycle),
			container.getByTestId(MainSiteButtons.Pricing_ExtendedTeam),
		];

		return navigationTabs;
	}
}
