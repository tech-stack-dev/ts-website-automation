import {CompanyEnum} from '../enum/CompanyEnum';
import {IndustriesEnum} from '../enum/IndustriesEnum';
import {ServicesEnum} from '../enum/ServicesEnum';
import UrlPath from '../providers/UrlPath';
import UrlProvider from '../providers/UrlProvider';

export const industriesUrl: Record<IndustriesEnum, string> = {
	[IndustriesEnum.Healthcare]: UrlProvider.urlBuilder(UrlPath.Healthcare),
	[IndustriesEnum.TransportAndLogist]: UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
	[IndustriesEnum.RenewableEnergy]: UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
};

export const serviceUrl: Record<ServicesEnum, string> = {
	[ServicesEnum.OurServices]: UrlProvider.urlBuilder(UrlPath.OurServices),
	[ServicesEnum.CustomDev]: UrlProvider.urlBuilder(UrlPath.CustomDev),
	[ServicesEnum.CloudAndDev]: UrlProvider.urlBuilder(UrlPath.CloudAndDev),
	[ServicesEnum.BigData]: UrlProvider.urlBuilder(UrlPath.BigData),
	[ServicesEnum.AiMl]: UrlProvider.urlBuilder(UrlPath.AiMl),
	[ServicesEnum.InternetOfThings]: UrlProvider.urlBuilder(UrlPath.InternetOfThings),
	[ServicesEnum.MobileDev]: UrlProvider.urlBuilder(UrlPath.MobileDev),
	[ServicesEnum.UiUxDesign]: UrlProvider.urlBuilder(UrlPath.UiUxDesign),
	[ServicesEnum.QaAsAServ]: UrlProvider.urlBuilder(UrlPath.QaAsAServ),
	[ServicesEnum.ConsultingServ]: UrlProvider.urlBuilder(UrlPath.ConsultingServ),
};

export const companyUrl: Record<CompanyEnum, string> = {
	[CompanyEnum.AboutUs]: UrlProvider.urlBuilder(UrlPath.AboutUs),
	[CompanyEnum.HowWeWork]: UrlProvider.urlBuilder(UrlPath.HowWeWork),
	[CompanyEnum.Career]: UrlProvider.careerUrl(),
	[CompanyEnum.CaseStudies]: UrlProvider.urlBuilder(UrlPath.CaseStudies),
	[CompanyEnum.Blog]: UrlProvider.urlBuilder(UrlPath.Blog),
};
