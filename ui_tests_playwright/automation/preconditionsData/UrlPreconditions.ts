import {CompanyEnum} from '../enum/CompanyEnum';
import {IndustriesEnum} from '../enum/IndustriesEnum';
import {ServicesEnum} from '../enum/ServicesEnum';
import UrlPath from '../providers/UrlPath';
import UrlProvider from '../providers/UrlProvider';

export const industryUrl: Record<IndustriesEnum, string> = {
	[IndustriesEnum.Healthcare]: UrlProvider.urlBuilder(UrlPath.Healthcare),
	[IndustriesEnum.TransportAndLogist]: UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
	[IndustriesEnum.RenewableEnergy]: UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
};

export const serviceUrl: Record<ServicesEnum, string> = {
	[ServicesEnum.OurServices]: UrlProvider.urlBuilder(UrlPath.OurServices),
	[ServicesEnum.CustomDev]: UrlProvider.urlBuilder(UrlPath.CustomDev),
	[ServicesEnum.DigitalTransform]: UrlProvider.urlBuilder(UrlPath.DigitalTransform),
	[ServicesEnum.CloudDev]: UrlProvider.urlBuilder(UrlPath.CloudDevelopment),
	[ServicesEnum.MobileDev]: UrlProvider.urlBuilder(UrlPath.MobileDev),
	[ServicesEnum.BigData]: UrlProvider.urlBuilder(UrlPath.BigData),
	[ServicesEnum.InternetOfThings]: UrlProvider.urlBuilder(UrlPath.InternetOfThings),
	// [ServicesEnum.DevOpsAsAServ]: UrlProvider.urlBuilder(UrlPath.DevOpsServ), // Uncomment in scope of TSWEB-1134
	[ServicesEnum.AiDevelopment]: UrlProvider.urlBuilder(UrlPath.AiDevelopment),
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
