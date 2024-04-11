import {CaseStudyEntityEnum} from '../enum/caseStudyEnums/CaseStudyEntityEnum';
import CaseStudyImagesPath from '../preconditionsData/contentfulData/ContentfulCaseStudyImages/CaseStudyImages';
import {ClutchReviewLinks} from '../preconditionsData/links/ClutchReviewLinks';

export interface CaseStudyDto {
	caseStudy: CaseStudyEntityEnum.CaseStudy;
	summary: CaseStudyEntityEnum.Summary;
	review?: CaseStudyEntityEnum.Review;
	technologiesUsed?: CaseStudyEntityEnum.Technologies;
	solution?: CaseStudyEntityEnum.Solution;
	workflow?: CaseStudyEntityEnum.Workflow;
	aboutTheTeam?: CaseStudyEntityEnum.AboutTheTeam;
	caseStudyImage?: CaseStudyImagesPath; // same
	technologiesUsedImage?: CaseStudyImagesPath; // mb somehow add inside technologiesUsed ?
	solutionImage?: CaseStudyImagesPath; // same
	reviewLink?: ClutchReviewLinks; // same
}
