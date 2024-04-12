import {CaseStudyEntityEnum} from '../enum/caseStudyEnums/CaseStudyEntityEnum';
import CaseStudyImagesPath from '../preconditionsData/contentfulData/ContentfulCaseStudyImages/CaseStudyImages';
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
}
