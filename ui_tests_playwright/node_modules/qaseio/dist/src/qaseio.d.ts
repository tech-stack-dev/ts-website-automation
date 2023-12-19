import { AttachmentsApi } from './api/attachments-api';
import { CasesApi } from './api/cases-api';
import { CustomFieldsApi } from './api/custom-fields-api';
import { DefectsApi } from './api/defects-api';
import { MilestonesApi } from './api/milestones-api';
import { PlansApi } from './api/plans-api';
import { ProjectsApi } from './api/projects-api';
import { ResultsApi } from './api/results-api';
import { RunsApi } from './api/runs-api';
import { SharedStepsApi } from './api/shared-steps-api';
import { SuitesApi } from './api/suites-api';
export interface AnalyticsHeaders {
    'X-Platform': string;
    'X-Client': string;
}
export declare class QaseApi {
    projects: ProjectsApi;
    cases: CasesApi;
    results: ResultsApi;
    runs: RunsApi;
    attachments: AttachmentsApi;
    plans: PlansApi;
    suites: SuitesApi;
    milestones: MilestonesApi;
    sharedSteps: SharedStepsApi;
    defects: DefectsApi;
    customFields: CustomFieldsApi;
    private api;
    private configuration;
    constructor(apiToken: string, basePath?: string, headers?: {
        [key: string]: string;
    }, formDataCtor?: new () => any);
}
