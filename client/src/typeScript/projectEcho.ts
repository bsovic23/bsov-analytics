// ---------------------
// Data Imports 
// ---------------------

export interface SurveyScores {
    poll: number,
    survey: string,
    email: string,
    poll1: number,
};

export interface ParticipantInformation {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    center: string,
    discipline: string,
    transplantAdmin: string
};

export interface PercInformation {
    module: number,
    profession: string,
    email: string,
    city: string,
    state: string,
    country: string,
    organization: string,
    title: string,
    age: number,
    member: boolean,
    enroll: boolean,
    complete: boolean,
}

export interface PercEvaluation {
    module: number,
    firstName: string,
    lastName: string,
    profession: string,
    patientBenefit: string,
    improveCompetenceMe: boolean,
    improvePerformanceMe: boolean,
    improvePxOutcomesMe: boolean,
    improveSkillsMe: boolean,
    improveCommunicationMe: boolean,
    improveRoleTeam: boolean,
    improveKnowledgeTeam: boolean,
    improveSkillsTeam: boolean,
    improveExpertiseTeam: boolean,
    rateObjectives: string,
    rateContent: string,
    rateAbility: string,
    rateInfoPresented: string,
    rateInfluence: string,
    rateAppropriate: string,
    rateEffective: string,
    rateEducational: string,
    rateMaterials: string,
    makeChanges: string,
    changeTreatment: boolean,
    changePxEducation: boolean,
    changeCommunication: boolean,
    changeTraining: boolean,
    changeOther: boolean,
    specOther: string,
    commitLevel: string,
    explain: string,
    teamCommunication: boolean,
    teamRole: boolean,
    teamProcesses: boolean,
    teamDecision: boolean,
    teamPxCare: boolean,
    teamNoImprovements: boolean,
    barrierEvidence: boolean,
    barrierGuidlines: boolean,
    barrierTime: boolean,
    barrierTraining: boolean,
    barrierResources: boolean,
    barrierPxResources: boolean,
    barrierOrganizational: boolean,
    barrierInsurance: boolean,
    barrierAdherence: boolean,
    barrierTreatment: boolean,
    barrierCompeting: boolean,
    barrierNone: boolean,
    barrierOther: boolean,
    barrierOtherDesc: string,
    infoDisclosure: string,
    accessContent: string,
    activityRecommend: string,
    learnBrochure: boolean,
    learnEmail: boolean,
    learnFB: boolean,
    learnGoogle: boolean,
    learnLinkedIn: boolean,
    learnTwitter: boolean,
    learnJournal: boolean,
    learnNKFWebsite: boolean,
    learnFriend: boolean,
    learnDirectMail: boolean,
    learnDontRemember: boolean,
    learnOther: boolean,
    learnOtherDesc: boolean,
    futureAKI: boolean,
    futureDialysis: boolean,
    futureAnemia: boolean,
    futureAutoImmune: boolean,
    futureCVD: boolean,
    futureCKDrisk: boolean,
    futureDiabeticKD: boolean,
    futureDepression: boolean,
    futureDrugSafety: boolean,
    futureEndOfLife: boolean,
    futureEthics: boolean,
    futureGlomerular: boolean,
    futureHDInfections: boolean,
    futureHypertension: boolean,
    futureInfection: boolean,
    futureKDOQL: boolean,
    futureKidneyTransplant: boolean,
    futureLivingDonation: boolean,
    futureMalnutrition: boolean,
    futureMineral: boolean,
    futureMotivational: boolean,
    futurePatientAd: boolean,
    futurePatientEdu: boolean,
    futurePatientSafety: boolean,
    futurePeritonitis: boolean,
    activitiesSTI: boolean,
    futureVascular: boolean,
    futureNone: boolean,
    futureOther: boolean,
    futureOtherDesc: string,
    topicsFuture: string,
};

// Cleaned Up Data

export interface Scores {
    module: number,
    pre: number,
    post: number
}

export interface CleanData {
    email: string,
    center: string,
    discipline: string,
    transplantAdmin: string,
    scores: Scores[],
}


// Analysis

export interface DemographicAnalysis {
    uniqueIndividuals: number,
    modulesCompleted: { [moduleCount: number]: number };
    transplantYesCount: number,
    discipline: { [discipline: string]: number };
    scoreAnalysis: {
        increase: number,
        decrease: number,
        same: number,
    },
}

export interface PercAnalysis {  
    profession: Record<string, number>,
    city: Record<string, number>,
    state: Record<string, number>,
    country: Record<string, number>,
    ageCount: number,
    ageTotal: number,
    member: {
        true: number,
        false: number,
    },       
    moduleEnrollCount: Record<number, number>,
    moduleCompleteCount: Record<number, number>, 
}