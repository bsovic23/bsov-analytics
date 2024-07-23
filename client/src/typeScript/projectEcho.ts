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