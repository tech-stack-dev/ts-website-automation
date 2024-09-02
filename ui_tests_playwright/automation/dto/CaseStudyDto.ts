import {CaseStudyEntityEnum} from '../enum/caseStudyEnums/CaseStudyEntityEnum';
import {IndustryTagEnum} from '../enum/caseStudyEnums/caseStudyTags/IndustryTagEnum';
import {ServiceTagEnum} from '../enum/caseStudyEnums/caseStudyTags/ServiceTagEnum';
import CaseStudyImagesPath from '../preconditionsData/contentfulData/contentfulCaseStudiesImages/CaseStudyImagesPath';
import {ClutchReviewLinks} from '../preconditionsData/links/ClutchReviewLinks';

export interface CaseStudyDto {
	caseStudyImage?: CaseStudyImagesPath;
	summary: {
		review?: {entity: CaseStudyEntityEnum.Review; link?: ClutchReviewLinks};
		technologiesUsed?: {
			entity: CaseStudyEntityEnum.Technologies;
			image?: CaseStudyImagesPath;
		};
		solution?: {entity: CaseStudyEntityEnum.Solution; image?: CaseStudyImagesPath};
		workflow?: CaseStudyEntityEnum.Workflow;
		aboutTheTeam?: CaseStudyEntityEnum.AboutTheTeam;
	};
	tags: {industryTag: IndustryTagEnum[]; serviceTag: ServiceTagEnum[]};
}
