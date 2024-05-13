// ----
// Data
// ----

export interface TxDataCombinedTiers {
    quadrant: string;
    regions: string;
    country: string;
    totalPopulation: number;
    whitePc: number;
    blackPc: number;
    hispanicPc: number;
    asianPc: number;
    americanIndianPc: number;
    nativeHawaiianPc: number;
    undocumented: number;
    esrdRate: number;
    esrdPrevalence: number;
    esrdIncidence: number;
    diabetesPc: number;
    hyptertensionPc: number;
    primaryCareAccess: string;
    educationPc: number;
    foodDesertsPc: number;
    medianIncome: number;
    povertyPc: number;
    healthInsuranceWithoutPc: number;
    tier: number;
};

export interface TxDataWaitList {
    center: string;
    total2023: number;
    deceased2023: number;
    deceased2023RatePc: number;
    // more
}

export interface ProfessionalSurvey {
    healthProfessional: string;
    professionalCategory: string;
    q3_a: string;
    q3_b: string;
    q3_c: string;
    q3_d: string;
    q3_e: string;
    q3_f: string;
    q3_g: string;
    q3_h: string;
    q3_i: string;
    q3_j: string;
    q3_k: string;
}

// -------
// Professional Survey 
// -------

export interface ProfessionalSurveyFinal {
    healthProfessional: string;
    professionalCategory: string;
    trustedSources: Sources[];
}

export interface Sources {
    source: string;
};


// -------
// Professional Survey Analysis
// -------

export interface ProfessionalSurveyAnalysis {
    healthProfessionalCount: Record<string, number>;
    professionalCategoryCount: Record<string, number>;
}

