import UrlPath from "../providers/UrlPath";
import UrlProvider from "../providers/UrlProvider";

export interface ExpertDto {
	name: string;
	role: string;
	pages: string[];
}

export const allExpertsList: ExpertDto[] = [
	{
		name: 'Max Levytsky',
		role: 'Managing Partner',
		pages: [
			UrlProvider.webSiteUrl(),
			UrlProvider.urlBuilder(UrlPath.DevOpsServ),
			UrlProvider.urlBuilder(UrlPath.InternetOfThings),
			UrlProvider.urlBuilder(UrlPath.AiDevelopment),
			UrlProvider.urlBuilder(UrlPath.AboutUs),
		],
	},
	{
		name: 'Anzhelika Grebennikova',
		role: 'Global Partnership Manager',
		pages: [
			UrlProvider.urlBuilder(UrlPath.Healthcare),
			UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
			UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
		],
	},
	{
		name: 'Anton Ivanchenko',
		role: 'Business Development Manager',
		pages: [
			UrlProvider.urlBuilder(UrlPath.UiUxDesign),
			UrlProvider.urlBuilder(UrlPath.MobileDev),
			UrlProvider.urlBuilder(UrlPath.BigData),
			UrlProvider.urlBuilder(UrlPath.HowWeWork),
			UrlProvider.urlBuilder(UrlPath.Pricing),
			UrlProvider.urlBuilder(UrlPath.ConsultingServ),
		],
	},
	{
		name: 'Artem Marynych',
		role: 'Chief Growth Officer',
		pages: [
			UrlProvider.urlBuilder(UrlPath.CloudDevelopment),
			UrlProvider.urlBuilder(UrlPath.DigitalTransform),
			UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment),
			UrlProvider.urlBuilder(UrlPath.BackEndDevelopment),
			UrlProvider.urlBuilder(UrlPath.QaAsAServ),
			UrlProvider.urlBuilder(UrlPath.CustomDev),
		],
	},
];