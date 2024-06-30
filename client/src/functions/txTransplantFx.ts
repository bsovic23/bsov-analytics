// --------------------------------------------------
// Texas Transplant Analysis
// --------------------------------------------------

import {
    TxDataCombinedTiers,
    TxDataWaitList,

    PatientEducationSurvey,
    HealthcareEducationSurvey,

    PatientEducationDataClean,
    HealthcareEducationDataClean,

    PatientEducationCounts,
    HealthcareEducationCounts,
} from '../typeScript/txTransplant';


// --------------------------------------------------
// Texas Combined Tiers Analysis
// --------------------------------------------------


// --------------------------------------------------
// Texas Waitlist Analysis
// --------------------------------------------------


// --------------------------------------------------
// Patient Education Survey
// --------------------------------------------------

// Patient Education Clean Up

export const patientSurveyCleanFx = (data: PatientEducationSurvey[]): PatientEducationDataClean[] => {

    const cleanData: PatientEducationDataClean[] = [];

    for (const survey of data) {

        const learns = [
            survey.learnKidneyTransplant,
            survey.learnStopTransplant,
            survey.learnWaitlist,
            survey.learnShareStory,
            survey.learnCost,
            survey.learnTransplantLength,
            survey.learnLife
        ].filter(learn => learn !== undefined);

        const challenges = [
            survey.challengeInformation,
            survey.challengeLanguage,
            survey.challengeRead,
            survey.challengeHelp,
            survey.challengeInternet,
            survey.challengeEducation,
            survey.challengeTransportation,
        ].filter(challenge => challenge !== undefined);

        const trustedSources = [
            survey.sourceER,
            survey.sourceFriend,
            survey.sourceGovernment,
            survey.sourceNews,
            survey.sourceCommunity,
            survey.sourceSocialMedia,
            survey.sourceReligion,
            survey.sourceMovie,
            survey.sourceWork
        ].filter(source => source !== undefined);

        const cleanedSurvey = {
            primaryConnection: survey.primaryConnection,
            primaryConnectionOtherDesc: survey.primaryConnectionOtherDesc || "",
            primaryConnectionType: survey.primaryConnectionType || "",
            scaleKidneyTransplantation: survey.scaleKidneyTransplantation,
            scaleLivingDonation: survey.scaleLivingDonation,
            learns: learns.map(learn => ({ learn })),
            learnOtherDesc: survey.learnOtherDesc || "",
            challenges: challenges.map(challenge => ({ challenge })),
            challengeOtherDesc: survey.challengeOtherDesc || "",
            enjoyLearnResponse: survey.enjoyLearnResponse || "",
            enjoyLearnOtherDesc: survey.enjoyLearnOtherDesc || "",
            sources: trustedSources.map(source => ({ source })),
            sourceOtherDesc: survey.sourceOtherDesc || "",
        };

        cleanData.push(cleanedSurvey);
    }

    return cleanData;
};


// Patient Education Analysis
export const patientSurveyAnalysis = (data: PatientEducationDataClean[]) => {

    let finalData: PatientEducationCounts = {
        completedSurveys: 0,
        primaryConnectionCount: {},
        primaryConnectionTypeCount: {},
        scaleKidneyTransplantationCount: 0,
        scaleLivingDonationCount: 0,
        learnsCount: {},
        challengesCount: {},
        enjoyLearnResponseCount: {},
        sourcesCount: {},
    }

    for (const survey of data) {

        const { primaryConnection, primaryConnectionType, scaleKidneyTransplantation, scaleLivingDonation, learns, challenges, enjoyLearnResponse, sources} = survey;

        finalData.completedSurveys +=1 ;

        // Primary Connection Count
        finalData.primaryConnectionCount[primaryConnection] = (finalData.primaryConnectionCount[primaryConnection] || 0) + 1;

        // Primary Connection Type Count
        finalData.primaryConnectionTypeCount[primaryConnectionType] = (finalData.primaryConnectionTypeCount[primaryConnectionType] || 0) + 1;

        // Scale Kidney Transplantation Total Count
        if (scaleKidneyTransplantation) {
            finalData.scaleKidneyTransplantationCount += scaleKidneyTransplantation;
        };

        // Scale Living Donation Total Count
        if (scaleLivingDonation) {
            finalData.scaleLivingDonationCount += scaleLivingDonation;
        };

        // Learns Counts
        for (const obj of learns) {
            let learn = obj.learn;

            finalData.learnsCount[learn] = (finalData.learnsCount[learn] || 0) + 1;
        };

        // Challenges Counts
        for (const obj of challenges) {
            let challenge = obj.challenge;

            finalData.challengesCount[challenge] = (finalData.challengesCount[challenge] || 0) + 1;
        };

        // Enjoy Learn Response Counts
        finalData.enjoyLearnResponseCount[enjoyLearnResponse] = (finalData.enjoyLearnResponseCount[enjoyLearnResponse] || 0) + 1;
  

        // Sources Counts
        for (const obj of sources) {
            let source = obj.source;

            finalData.sourcesCount[source] = (finalData.sourcesCount[source] || 0) + 1;
        };
        
    }

    return finalData;
};

// --------------------------------------------------
// Healthcare Professionals Education Survey
// --------------------------------------------------

// Healthcare Professionals Education Clean Up

export const healthcareProfessionalSurveyCleanFx = (data: HealthcareEducationSurvey[]): HealthcareEducationDataClean[] => {
    
    if (!Array.isArray(data)) {
        throw new Error("Input data is not an array");
    }

    const cleanedData: HealthcareEducationDataClean[] = [];

    for (const survey of data) {
        const trustedSources = [
            survey.sourceClinic,
            survey.sourceER,
            survey.sourceFriend,
            survey.sourceGovernment,
            survey.sourceNews,
            survey.sourceCommunity,
            survey.sourceSocialMedia,
            survey.sourceReligion,
            survey.sourceMovie,
            survey.sourceWork
        ].filter(source => source !== undefined);

        const barriers = [
            survey.barrierLanguage,
            survey.barrierReading,
            survey.barrierLiteracy,
            survey.barrierCulture,
            survey.barrierInternet,
            survey.barrierTransportation
        ].filter(barrier => barrier !== undefined);

        const misc = [
            survey.miscAge,
            survey.miscBloodType,
            survey.miscLastResort,
            survey.miscDialysis,
            survey.miscRisky,
            survey.miscDeceased,
            survey.miscCure
        ].filter(misc => misc !== undefined);

        const cleanedSurvey: HealthcareEducationDataClean = {
            healthProfessional: survey.healthcareProfessional,
            professionalCategory: survey.professionalCategory || "",
            sources: trustedSources.map(source => ({ source })),
            sourceOtherDesc: survey.sourceOtherDesc || "",
            barriers: barriers.map(barrier => ({ barrier })),
            barrierOtherDesc: survey.barrierOtherDesc || "",
            miscs: misc.map(misc => ({ misc })),
            miscOtherDesc: survey.miscOtherDesc || ""
        };

        cleanedData.push(cleanedSurvey);
    }

    return cleanedData;
};


// Healthcare Professionals Education Analysis

export const healthcareProfessionalSurveyAnalysis = (data: HealthcareEducationDataClean[]) => {
    let finalData: HealthcareEducationCounts = {
        completedSurveys: 0,
        healthProfessionalCount: 0,
        professionalCategoryCount: {},
        sourceCount: {},
        barrierCount: {},
        miscCount: {},
    };

    for (const obj of data) {
        const { healthProfessional, professionalCategory, sources, barriers, miscs } = obj;

        // Completed Surveys Count
        finalData.completedSurveys += 1;

        // Health Professional Count
        if (healthProfessional) {
            finalData.healthProfessionalCount += 1;
        }

        // Health Professional Category Count
        finalData.professionalCategoryCount[professionalCategory] = (finalData.professionalCategoryCount[professionalCategory] || 0) + 1;
    
        // Source Count
        for (const obj of sources) {
            finalData.sourceCount[obj.source] = (finalData.sourceCount[obj.source] || 0) + 1;
        }

        
        // Barrier Count
        for (const obj of barriers) {
            finalData.barrierCount[obj.barrier] = (finalData.barrierCount[obj.barrier] || 0) + 1;
        }

        // Misc Count
        for (const obj of miscs) {
            finalData.miscCount[obj.misc] = (finalData.miscCount[obj.misc] || 0) + 1;
        }
    }

    return finalData;
};