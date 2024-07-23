// -------------------------------------------
// Project Echo Analysis
// -------------------------------------------

import { SurveyScores, ParticipantInformation, CleanData, Scores, DemographicAnalysis } from "../typeScript/projectEcho";

// Clean Participant Infromation

export const dupsClean = (data: ParticipantInformation[]): number[] => {
    const emailCount: { [email: string]: number[] } = {};
    const duplicateIds: number[] = []; 

    // Count occurrences of each email
    data.forEach((item) => {
        const { id, email } = item;
        if (emailCount[email]) {
            emailCount[email].push(id);
        } else {
            emailCount[email] = [id];
        }
    });

    // Find IDs of duplicates
    for (const email in emailCount) {
        if (emailCount[email].length > 1) {
            duplicateIds.push(...emailCount[email].slice(1)); // Push all except the first occurrence
        }
    }
    duplicateIds.sort((a, b) => a - b);

    return duplicateIds;
};


// Counts of Participant Information

export const cleanDataFx = (
    surveyScores: SurveyScores[],
    participantInformation: ParticipantInformation[]
): CleanData[] => {
    const emailToParticipant: { [email: string]: ParticipantInformation } = {};
    const emailToScores: { [email: string]: { [module: number]: Scores } } = {};

    // Create a map for quick lookup of participant information by email
    participantInformation.forEach((participant) => {
        emailToParticipant[participant.email] = participant;
    });

    // Aggregate survey scores by email and module
    surveyScores.forEach((survey) => {
        const { email, poll: module, survey: surveyType, poll1 } = survey;

        if (!emailToScores[email]) {
            emailToScores[email] = {};
        }

        if (!emailToScores[email][module]) {
            emailToScores[email][module] = { module, pre: 0, post: 0 };
        }

        if (surveyType === 'pre') {
            emailToScores[email][module].pre = poll1;
        } else if (surveyType === 'post') {
            emailToScores[email][module].post = poll1;
        }
    });

    // Combine participant information with their corresponding survey scores
    const cleanData: CleanData[] = [];
    for (const email in emailToScores) {
        const participant = emailToParticipant[email];
        if (participant) {
            const scoresArray = Object.values(emailToScores[email]);
            cleanData.push({
                email: email,
                center: participant.center,
                discipline: participant.discipline,
                transplantAdmin: participant.transplantAdmin,
                scores: scoresArray
            });
        }
    }

    return cleanData;
};



// Counts of Participant Information

export const analysisOne = (data: CleanData[]): DemographicAnalysis => {
    let results: DemographicAnalysis = {
        uniqueIndividuals: 0,
        modulesCompleted: {},
        transplantYesCount: 0,
        discipline: {},
        scoreAnalysis: {
            increase: 0,
            decrease: 0,
            same: 0,
        },
    };

    for (const obj of data) {
        const { discipline, transplantAdmin, scores } = obj;

        // Unique Individuals
        results.uniqueIndividuals += 1;

        // Modules Completed
        const modulesCount = scores.length;
        results.modulesCompleted[modulesCount] = (results.modulesCompleted[modulesCount] || 0) + 1;

        // Transplant Admin Count
        if (transplantAdmin === 'Yes') {
            results.transplantYesCount += 1;
        }

        // Discipline Count
        results.discipline[discipline] = (results.discipline[discipline] || 0) + 1;

        // Score Analyzer
        scores.forEach(score => {
            if (score.pre !== undefined && score.post !== undefined) {
                if (score.post > score.pre) {
                    results.scoreAnalysis.increase += 1;
                } else if (score.post < score.pre) {
                    results.scoreAnalysis.decrease += 1;
                } else {
                    results.scoreAnalysis.same += 1;
                }
            }
        });
    }

    return results;
};