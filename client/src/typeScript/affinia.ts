// ====================================================
// Raw Data Imports
// ====================================================

// --------------------------------
// RAW All Pt - Pre and Post imports
// --------------------------------

// All Pt MRN in study

export interface AllMrn {
    mrn: number
}

// All Pt Meds - Pre clean/combo in SAS

export interface AllMedicationData {
    mrn: number,
    medType: string,
    medStartDate: string,
    medStopDate: string,
};

// --------------------------------
// RAW Pre Intervention 
// --------------------------------

// Pre Intervention kit return + no kit return data - Pre clean/combo in SAS

export interface PreInterventionData {
    mrn: number,
    kitReturned: boolean,
    gender: string,
    race: string,
    ethnicity: string,
    language: string,
    a1c_date_pre: string,
    a1c_result_pre: number,
    bp_date_pre: string,
    bp_result_pre: string,
    bp_systolic_pre: number,
    bp_diastolic_pre: number,
    dm_yn_pre: string,
    htn_yn_pre: string,
    htn_bp_yn_pre: string,
};

// --------------------------------
// RAW Post Intervention 
// --------------------------------

// Post Intervention all post + follow Up data Pre clean/combo in SAS

export interface PostInterventionData {
    mrn: number,
    testResult: string,
    post_a1cDate: string,
    post_a1c: number,
    post_bpDate: string,
    post_sys: number,
    post_dia: number,
    post_uacrDate: string,
    post_uacr: number,
    eGFRDate: string,
    eGFRValue: number,
}

export interface PostFollowUpInterventionData {
    mrn: number,
    visitDate: string,
    followUpCompleted: string,
    followUpTestOrdered: string,
    followUpTestComplete: string,
    followUpEGFRValue: number,
    followUpUACRValue: number,
}

// --------------------------------
// RAW Survey Monkey 
// --------------------------------

export interface SurveyMonkey {
    profession: string,
    practiceYears: string,
    awareProgram: string,
    satisfaction: string,
    programAppropriate: string,
    distributionImpact: string,
    influeceWorkflows: string,
    influeceGuideline: string,
    influencePrevalence: string,
    influenceCkdPrevention: string,
    influenceCkdCare: string,
    influenceDetection: string,
    influenceDiscussion: string,
    influenceEngagement: string,
    influenceNoImpact: string,
    agreeDiagnosis: string,
    agreeDistribution: string,
    agreeImproved: string,
    agreeEffective: string,
    agreeCommunication: string,
    agreeOvercome: string,
    agreeTime: string,
    agreeAdherence: string,
    statementOvertesting: string,
    statementDifficult: string,
    statementTime: string,
    statementQuick: string,
    statementInterpret: string,
    statementDiscuss: string,
    utilizeFuture: string,
}

// ====================================================
// Clean Data Outputs
// ====================================================

// --------------------------------
// Clean Pre Intervention 
// --------------------------------

export interface PatientData {
    kitReturned: boolean;
    demographics: Demographics;
    healthConditions: HealthConditions;
}

export interface Demographics {
    'Gender': string;
    'Race': string;
    'Ethnicity': string;
    'Language': string;
};

export interface HealthConditions {
    'A1C Date Pre': string;
    'A1C Result Pre': number | null;
    'BP Date Pre': string;
    'BP Systolic Pre': number | null;
    'BP Diastolic Pre': number | null;
    'Hypertension': string;
    'Diabetes': string;
    'Both Hypertension and Diabetes': string;
};


// ====================================================
// Table Analysis
// ====================================================

// --------------------------------
// Table - Outcome Measures
// --------------------------------

export interface OutcomeMeasures {
    resultCategory: Record<string, number>,
    ckdStage: CKDStage;
};

export interface CKDStage {
    g1: 0,
    g2: 0,
    g3a: 0,
    g3b: 0,
    g4: 0,
    g5: 0,
    g1NoUacr: 0,
    g2NoUacr: 0,
    missingEgfr: 0,
}

export interface OutcomeMeasuresFollowUp {
    followUpCompleted: number,
    followUpCompletedNo: number,
    followUpUACRCompleted: number,
    followUpUACRCompletedNo: number,
    followUpEGFRCompleted: number,
    followUpEGFRCompletedNo: number,
    followUpBothCompleted: number,
    followUpBothCompletedNo: number,
}

// --------------------------------
// Table - Secondary Outcomes
// --------------------------------

export interface SecondaryOutcomesDataPre {
    chronicDiseaseMgmtPre: {
        a1cControl: Record<string, number>,
        bpControl: Record<string, number>
    }
}

export interface SecondaryOutcomesDataPost {
    chronicDiseaseMgmtPost: {
        a1cControl: Record<string, number>,
        bpControl: Record<string, number>
    }
}

export interface MedicationAnalysis {
    preMedCount: Record<string, number>,
    postMedCount: Record<string, number>
}

// --------------------------------
// Table - Demographic Outcomes
// --------------------------------

export interface DemographicsOutcomes {
    'diabetes only': number,
    'hypertension only': number,
    'diabetes and hypertension': number,
    'neither diabetes or hypertension': number,
    gender: Record<string, number>,
    race: Record<string, number>,
    ethnicity: Record<string, number>,
    language: Record<string, number>,
};
