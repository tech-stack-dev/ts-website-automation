const config = JSON.parse(open('../configs/env.local.json'));

export const BASE_URL_PROVIDER = {
    careerUrl: () => {
        if (config.Env === 'prod') {
            return config.CareerProd;
        } else {
            return config.CareerStg;
        }
    },
    mainSiteUrl: () => {
        if (config.Env === 'prod') {
            return config.MainSiteProd;
        } else {
            return config.MainSiteStg;
        }
    }
}

export const URL_PROVIDER = {
    qaServise: `${BASE_URL_PROVIDER.mainSiteUrl()}/services/qa-as-a-service`,
    contactUs: `${BASE_URL_PROVIDER.mainSiteUrl()}/contact-us`,
    blog: `${BASE_URL_PROVIDER.mainSiteUrl()}/blog/`,
    techStackNews: `${BASE_URL_PROVIDER.mainSiteUrl()}/blog/tag/techstack-news/`,
    qualityEngineering: `${BASE_URL_PROVIDER.mainSiteUrl()}/blog/tag/quality-engineering/`,
}