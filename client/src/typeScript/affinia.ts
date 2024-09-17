// --------------
// Raw Data
// --------------

// RAW PRE + POST ALL MRN 

export interface Mrn {
    mrn: number
}

// RAW PRE + POST ALL MEDICATION DATA

export interface MedicationData {
    mrn: number;
    medType: string;
    medName: string;
};

// RAW PRE INTERVENTION

export interface AllPtData {
    mrn: number,
    gender: string,
    race: string,
    ethnicity: string,
    language: string,
    a1c_date_pre: string,
    a1c_result_pre: number,
    bp_date_pre: string,
    bp_result_pre: number,
    bp_systolic_pre: number,
    bp_diastolic_pre: number,
    dm_yn_pre: string,
    htn_yn_pre: string,
    htn_bp_yn_pre: string,
};

export interface KitPtData {
    mrn: number;
    kit_return: boolean;
    gender: string;
    race: string;
    ethnicity: string;
    language: string;
    a1c_date_pre: string;
    a1c_result_pre: number;
    bp_date_pre: string;
    bp_result_pre: number;
    bp_systolic_pre: number;
    bp_diastolic_pre: number;
    dm_yn_pre: string;
    htn_yn_pre: string;
    htn_bp_yn_pre: string;
};


// RAW POST INTERVENTION

export interface PostInterventionResults {
    mrn: number,
    result: string,
    testDate: string,
}

export interface PostInterventionBP {
    mrn: number,
    post_sys: number,
    post_dia: number,
    post_a1c: number,
}

export interface PostInterventionEgfr {
    mrn: number,
    post_egfrDate: string,
    post_egfrValue: number,
}

export interface PostInterventionUacr {
    mrn: number,
    post_uacrDate: string,
    post_uacrValue: number
}

export interface PostInterventionInsurance {
    mrn: number,
    insuranceClass: string,
}

// RAW POST ABRONAL INTERVENTION

export interface PostInterventionAbnVisit {
    mrn: number,
    followUpCompleted: string,
}

export interface PostInterventionAbnEGFR {
    mrn: number,
    followUpEGFRDate: string,
    followUpEGFRValue: number,
}

export interface PostInterventionAbnUACR {
    mrn: number,
    followUpUACRDate: string,
    followUpUACRValue: number,
}

// --------------
// Cleaned Up Data
// --------------

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
    'A1C Date Pre': Date;
    'A1C Result Pre': number;
    'BP Date Pre': Date;
    'BP Result Pre': number;
    'BP Systolic Pre': number;
    'BP Diastolic Pre': number;
    'Hypertension': string;
    'Diabetes': string;
    'Both Hypertension and Diabetes': string;
}

export interface Medication {
    'Start Date': string;
    'Med Name': string;
    'Med Type': string;
}

export interface MedicationReview {
    'medAnalysis': Record<string, number>;
}


export interface PostPatientData {

};

// --------------
// Outcome Measures
// --------------

export interface OutcomeMeasures {
    resultCategory: Record<string, number>,
    followUpCompleted: number,
    followUpCompletedNo: number,
    followUpUACRCompleted: number,
    followUpUACRCompletedNo: number,
    followUpEGFRCompleted: number,
    followUpEGFRCompletedNo: number,
    followUpBothCompleted: number,
    followUpBothCompletedNo: number,
    ckdStage: CKDStage;
};

export interface CKDStage {
    g1: 0,
    g2: 0,
    g3a: 0,
    g3b: 0,
    g4: 0,
    g5: 0,
    missing: 0,
    incomplete: 0,
}

// --------------
// Secondary Outcomes
// --------------

export interface SecondaryOutcomesData {
    medCategoryCount: Record<string, number>;
    chronicDiseaseMgmt: {
        a1cControl: Record<string, number>;
        bpControl: Record<string, number>
    }
}

// --------------
// Demographic Outcomes
// --------------

export interface DemographicsOutcomes {
    'diabetes only': number;
    'hypertension only': number;
    'diabetes and hypertension': number;
    'neither diabetes or hypertension': number;
    gender: Record<string, number>;
    race: Record<string, number>;
    ethnicity: Record<string, number>;
    language: Record<string, number>;
};
