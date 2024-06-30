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

export interface PatientEducationSurvey {
    id: number,
    primaryConnection: string,
    primaryConnectionOtherDesc: string,
    primaryConnectionType: string,
    scaleKidneyTransplantation: number,
    scaleLivingDonation: number,
    learnKidneyTransplant: string,
    learnStopTransplant: string,
    learnWaitlist: string,
    learnShareStory: string,
    learnCost: string,
    learnTransplantLength: string,
    learnLife: string,
    learnOtherDesc: string,
    challengeInformation: string,
    challengeLanguage: string,
    challengeRead: string,
    challengeHelp: string,
    challengeInternet: string,
    challengeEducation: string,
    challengeTransportation: string,
    challengeOtherDesc: string,
    enjoyLearnResponse: string,
    enjoyLearnOtherDesc: string,
    sourceER: string,
    sourceFriend: string,
    sourceGovernment: string,
    sourceNews: string,
    sourceCommunity: string,
    sourceSocialMedia: string,
    sourceReligion: string,
    sourceMovie: string,
    sourceWork: string,
    sourceOtherDesc: string,
}

export interface HealthcareEducationSurvey {
    id: number,
    healthcareProfessional: Boolean,
    professionalCategory: string,
    sourceClinic: string,
    sourceER: string,
    sourceFriend: string,
    sourceGovernment: string,
    sourceNews: string,
    sourceCommunity: string,
    sourceSocialMedia: string,
    sourceReligion: string,
    sourceMovie: string,
    sourceWork: string,
    sourceOtherDesc: string,
    barrierLanguage: string,
    barrierReading: string,
    barrierLiteracy: string,
    barrierCulture: string,
    barrierInternet: string,
    barrierTransportation: string,
    barrierOtherDesc: string,
    miscAge: string,
    miscBloodType: string,
    miscLastResort: string,
    miscDialysis: string,
    miscRisky: string,
    miscDeceased: string,
    miscCure: string,
    miscOtherDesc: string,
}

// -------
// Clean Data To Use for analysis
// -------

interface Learn {
    learn: string
}

interface Challenge {
    challenge: string
}

export interface PatientEducationDataClean {
    primaryConnection: string,
    primaryConnectionOtherDesc: string,
    primaryConnectionType: string,
    scaleKidneyTransplantation: number,
    scaleLivingDonation: number,
    learns: Learn[],
    learnOtherDesc: string,
    challenges: Challenge[],
    challengeOtherDesc: string,
    enjoyLearnResponse: string,
    enjoyLearnOtherDesc: string,
    sources: Source[],
    sourceOtherDesc: string,
}

interface Source {
    source: string
}

interface Barrier {
    barrier: string
}

interface Misc {
    misc: string
}

export interface HealthcareEducationDataClean {
    healthProfessional: Boolean,
    professionalCategory: string,
    sources: Source[];
    sourceOtherDesc: string,
    barriers: Barrier[],
    barrierOtherDesc: string,
    miscs: Misc[],
    miscOtherDesc: string,
};


// -------
// Counts
// -------
 
export interface PatientEducationCounts {
    completedSurveys: number,
    primaryConnectionCount: Record<string, number>,
    primaryConnectionTypeCount: Record<string, number>,
    scaleKidneyTransplantationCount: number,
    scaleLivingDonationCount: number,
    learnsCount: Record<string, number>,
    challengesCount: Record<string, number>,
    enjoyLearnResponseCount: Record<string, number>,
    sourcesCount: Record<string, number>
}

export interface HealthcareEducationCounts {
    completedSurveys: number,
    healthProfessionalCount: number,
    professionalCategoryCount: Record<string, number>,
    sourceCount: Record<string, number>,
    barrierCount: Record<string, number>,
    miscCount: Record<string, number>,
}

