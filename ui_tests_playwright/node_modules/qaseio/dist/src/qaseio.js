"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QaseApi = void 0;
var axios_1 = __importDefault(require("axios"));
var attachments_api_1 = require("./api/attachments-api");
var cases_api_1 = require("./api/cases-api");
var _1 = require(".");
var custom_fields_api_1 = require("./api/custom-fields-api");
var defects_api_1 = require("./api/defects-api");
var milestones_api_1 = require("./api/milestones-api");
var plans_api_1 = require("./api/plans-api");
var projects_api_1 = require("./api/projects-api");
var results_api_1 = require("./api/results-api");
var runs_api_1 = require("./api/runs-api");
var shared_steps_api_1 = require("./api/shared-steps-api");
var suites_api_1 = require("./api/suites-api");
var QaseApi = /** @class */ (function () {
    function QaseApi(apiToken, basePath, headers, formDataCtor) {
        var baseURL = basePath || 'https://api.qase.io/v1';
        var config = {
            headers: __assign({ Token: apiToken }, headers),
            baseURL: baseURL,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        };
        this.api = axios_1.default.create(config);
        this.configuration = new _1.Configuration({
            apiKey: apiToken,
            basePath: baseURL,
            formDataCtor: formDataCtor,
        });
        this.projects = new projects_api_1.ProjectsApi(this.configuration, baseURL, this.api);
        this.cases = new cases_api_1.CasesApi(this.configuration, baseURL, this.api);
        this.results = new results_api_1.ResultsApi(this.configuration, baseURL, this.api);
        this.runs = new runs_api_1.RunsApi(this.configuration, baseURL, this.api);
        this.attachments = new attachments_api_1.AttachmentsApi(this.configuration, baseURL, this.api);
        this.plans = new plans_api_1.PlansApi(this.configuration, baseURL, this.api);
        this.suites = new suites_api_1.SuitesApi(this.configuration, baseURL, this.api);
        this.milestones = new milestones_api_1.MilestonesApi(this.configuration, baseURL, this.api);
        this.sharedSteps = new shared_steps_api_1.SharedStepsApi(this.configuration, baseURL, this.api);
        this.defects = new defects_api_1.DefectsApi(this.configuration, baseURL, this.api);
        this.customFields = new custom_fields_api_1.CustomFieldsApi(this.configuration, baseURL, this.api);
    }
    return QaseApi;
}());
exports.QaseApi = QaseApi;
//# sourceMappingURL=qaseio.js.map