// ---------------------
// Data Imports 
// ---------------------

export interface MoPilotInitial {
    submissionDate: string,
    encounterType: string,
    location: string,
    identifier: string,
    initialDateEncounter: string,
    recruitmentType: string,
    age: string,
    zipcode: number,
    race: string,
    ethnicity: string,
    insurance: string,
    q1_yes: string,
    q1_no: string,
    q2_yes: string,
    q2_no: string,
    q3_yes: string,
    q3_no: string,
    q4_yes: string,
    q4_no: string,
    q5_yes: string,
    q5_no: string,
    q6_yes: string,
    q6_no: string,
    q7_yes: string,
    q7_no: string,
    q8_yes: string,
    q8_no: string,
    q9_yes: string,
    q9_no: string,
    q10_yes: string,
    q10_no: string,
    sdohComplete: string,
    primaryCare: string,
    chronicDiseases: string,
    pharmacyReferral: string,
    additionalReferralsDesc: string,
    barriersDesc: string,
    successesDesc: string,
}

export interface MoPilotFollowUp {
    submissionDate: string,
    encounterType: string,
    q1_yes: string,
    q1_no: string,
    q2_yes: string,
    q2_no: string,
    q3_yes: string,
    q3_no: string,
    q4_yes: string,
    q4_no: string,
    q5_yes: string,
    q5_no: string,
    q6_yes: string,
    q6_no: string,
    q7_yes: string,
    q7_no: string,
    q8_yes: string,
    q8_no: string,
    q9_yes: string,
    q9_no: string,
    q10_yes: string,
    q10_no: string,
    sdohCompleted: string,
    location: string,
    identifier: string,
    followUpDate: string,
    labsDrawnDate: string,
    labsLocation: string,
    egfr: number,
    uacr: number,
    labResultsOutsideRange: string,
    medsCountDosedInapp: number,
    medsCountDiscontinued: number,
    medReviewDesc: string,
    resultsCommunicatedDesc: string,
    resultedRecommendations: string,
    additionalReferralsDesc: string,
    barriersDesc: string,
    successesDesc: string,
};



// ---------------------
// Cleaned Data
// ---------------------

export interface MissingInitialEntry {
    identifier: string;
    location: string;
}

export interface SDOH {
    q1: string,
    q2: string,
    q3: string,
    q4: string,
    q5: string,
    q6: string,
    q7: string,
    q8: string,
    q9: string,
    q10: string,
}

export interface MoPilotAllData {
    [identifier:string]: {
        identifier: string,
        age: string,
        zipcode: number,
        race: string,
        ethnicity: string,
        insurance: string,
        primaryCare: string,
        chronicDiseases: string[],
        pharmacyReferral: string,
        initialSubmissionDate: string,
        followUpSubmissionDate: string,
        initialLocation: string,
        followUpLocation: string,
        initialSdohComplete: string,
        followUpSdohComplete: string,
        initialSurvey: SDOH[],
        followUpSurvey: SDOH[],
        egfr: number,
        uacr: number,
        labResultsOutsideRange: string,
        medsCountDosedInapp: number,
        medsCountDiscontinued: number,
    }
};


// ---------------------
// Analytics
// ---------------------

export interface MoPilotCountAnalytics {
    individuals: number,
    initialSdohSurveys: number,
    followUpSdohSurveys: number,
    locationCount: Record<string, number>,
    demographics: {
        ageIndividualsCount: number,
        ageTotal: number,
        race: Record<string, number>,
        ethnicity: Record<string, number>,
        insurance: Record<string, number>,
        primaryCare: Record<string, number>,
        chronicDiseases: Record<string, number>,
        pharmacyReferral: Record<string, number>,
    },
    initialSurvey: {
        q1: Record<string, number>,
        q2: Record<string, number>,
        q3: Record<string, number>,
        q4: Record<string, number>,
        q5: Record<string, number>,
        q6: Record<string, number>,
        q7: Record<string, number>,
        q8: Record<string, number>,
        q9: Record<string, number>,
        q10: Record<string, number>,
    },
    followUpSurvey: {
        q1: Record<string, number>,
        q2: Record<string, number>,
        q3: Record<string, number>,
        q4: Record<string, number>,
        q5: Record<string, number>,
        q6: Record<string, number>,
        q7: Record<string, number>,
        q8: Record<string, number>,
        q9: Record<string, number>,
        q10: Record<string, number>,
    },
    labsOutsideRangeCount: Record<string, number>,
    medsDosedInappropriateCount: number,
    egfrIndividualsCount: number,
    egfrTotal: number,
    uacrIndividualsCount: number,
    uacrTotal: number,
}


export interface MoMissingFollowUp {
    [site: string]: {
        identifier: string;
        submissionDate: string;
    }[];
}

export interface MoSiteDemographics {
    [site: string]: {
        initialCount: number,
        zips: Record<number, number>,
        race: Record<string, number>,
        ethnicity: Record<string, number>,
        insurance: Record<string, number>,
        primaryCare: Record<string, number>,
        chronicDiseases: Record<string, number>,
        pharmacyReferral: Record<string, number>,
        ageCount: number,
        ageTotal: number,
    };
}

