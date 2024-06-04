// --------------------------------------------------
// Texas Transplant Analysis
// --------------------------------------------------

import {
    TxDataCombinedTiers,
    TxDataWaitList,
    ProfessionalSurvey,

    ProfessionalSurveyFinal,
    Sources,

    ProfessionalSurveyAnalysis,
} from '../typeScript/txTransplant';


// --------------------------------------------------
// Professional Survey Analysis
// --------------------------------------------------

// Survey Clean Up

export const professionalSurveyCleanFx = (data: ProfessionalSurvey[]): ProfessionalSurveyFinal[] => {
    const cleanedData: ProfessionalSurveyFinal[] = [];

    for (const survey of data) {
        const trustedSources = [];

        trustedSources.push(
            survey.q3_a,
            survey.q3_b
        )
        
        const cleanedSurvey = {
            healthProfessional: survey.healthProfessional,
            professionalCategory: survey.professionalCategory,
            trustedSources: trustedSources.map(source => ({ source }))
        }
       
        cleanedData.push(cleanedSurvey);
    };

    return cleanedData;
};


// Survey Analysis

export const professionalSurveyAnalysis = (data: ProfessionalSurveyFinal[]): ProfessionalSurveyAnalysis => {
    const analysisResults: ProfessionalSurveyAnalysis = {
        healthProfessionalCount: {},
        professionalCategoryCount: {}
    };

    for (const obj of data) {
        const healthProfesional = obj.healthProfessional;
        const professionalCategory = obj.professionalCategory;

        analysisResults.healthProfessionalCount[healthProfesional] = (analysisResults.healthProfessionalCount[healthProfesional] || 0) + 1;
        
        analysisResults.professionalCategoryCount[professionalCategory] = (analysisResults.professionalCategoryCount[professionalCategory] || 0) + 1;
    }

    return analysisResults;
};

