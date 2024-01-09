const config = JSON.parse(open('../configs/env.local.json'));

export const URL_PROVIDER = {
    webApp: config.WebApp,
    mainSiteUrl: config.MainSiteUrl,
    qaServise: config.QaService,
    contactUs: config.ContactUs,
    blog: config.Blog,
    techStackNews: config.TechStackNews,
    qualityEngineering: config.QualityEngineering
}