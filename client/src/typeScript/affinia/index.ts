// --------------
// Raw Data
// --------------

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

export interface MedicationData {
    mrn: number;
    medDate: string;
    medName: string;
    medType: string;
};

// --------------
// Cleaned Up Data
// --------------

export interface PatientData {
    kitReturned: boolean;
    demographics: Demographics;
    healthConditions: HealthConditions;
    medications: Medication[];
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

// --------------
// Outcome Measures
// --------------

export interface OutcomeMeasures {

};

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