// -------------------------------------------
// Project Echo Analysis
// -------------------------------------------

import { 
    SurveyScores, 
    ParticipantInformation,
    PercInformation,
    PercEvaluation,
    CleanData, 
    Scores, 
    DemographicAnalysis,
    PercAnalysis, 
} from "../typeScript/projectEcho";

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



// ----- Counts of Participant Information -----

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

// ----- PERC Project ECHO Analysis -----

export const percAnalysisFx = (data: PercInformation[]): PercAnalysis => {
    let finalData: PercAnalysis = {
        profession: {},
        city: {},
        state: {},
        country: {},
        ageCount: 0,
        ageTotal: 0,
        member: { true: 0, false: 0 },
        moduleEnrollCount: {},
        moduleCompleteCount: {}
    };
    
    for (const obj of data) {
        const { module, profession, city, state, country, age, member, enroll, complete } = obj;

        // Profession
        if (profession) {
            finalData.profession[profession] = (finalData.profession[profession] || 0) + 1;
        }

        // City
        if (city) {
            finalData.city[city] = (finalData.city[city] || 0) + 1;
        }

        // State
        if (state) {
            finalData.state[state] = (finalData.state[state] || 0) + 1;
        }

        // Country
        if (country) {
            finalData.country[country] = (finalData.country[country] || 0) + 1;
        }

        // Age
        if (age) {
            finalData.ageCount += 1;
            finalData.ageTotal += age;
        }

        // Member
        if (member) {
            finalData.member.true += 1;
        } else {
            finalData.member.false += 1;
        }

        // Module Enrollment
        if (enroll) {
            finalData.moduleEnrollCount[module] = (finalData.moduleEnrollCount[module] || 0) + 1;
        }

        // Module Complete Count
        if (complete) {
            finalData.moduleCompleteCount[module] = (finalData.moduleCompleteCount[module] || 0) + 1;
        }
    }

    return finalData;
};


// ----- PERC Project ECHO Evaluation Analysis -----


export const analyzeVariables = (
    data: PercEvaluation[], 
    variables: Array<keyof PercEvaluation>
) => {
    const finalData: Record<string, Record<string, number>> = {};

    for (const variable of variables) {
        finalData[variable as string] = {};
    }

    for (const entry of data) {
        for (const variable of variables) {
            // Check if the variable exists in the entry
            if (variable in entry) {
                let value = entry[variable];
                
                // Convert boolean values to strings
                if (typeof value === 'boolean') {
                    value = value.toString();
                }

                if (typeof value === 'string') {
                    finalData[variable as string][value] = (finalData[variable as string][value] || 0) + 1;
                }
            }
        }
    }

    return finalData;
}


export const analyzeEvalData = (data: PercEvaluation[]) => {
    let finalData = {
        improveCompetenceMe: 0,
    };

    // improveCompetence
    for (const obj of data) {

        const { improveCompetenceMe } = obj;

        if (improveCompetenceMe) {
            finalData.improveCompetenceMe ++;
        }
    }

    return finalData;
}