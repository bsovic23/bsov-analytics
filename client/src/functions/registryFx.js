// ========================================================================================================================
//  Registry Analytic Functions
// ========================================================================================================================

// ========================================================================================================================
//  mockDeleteData Analysis
// ========================================================================================================================

// Count of Unique Ids in the deleteData file

export const deleteDataUniqueId = (data) => {
    let uniqueIds = {};

    for (const obj of data) {
        let id = obj.patient_id;

        if (!uniqueIds[id]) {
            uniqueIds[id] = {
                "id": id
            }
        };

        if (uniqueIds[id]) {
            continue;
        };
    }

    let uniqueIdsLength = Object.keys(uniqueIds).length;

    return uniqueIdsLength;
};

// ========================================================================================================================
//  A_Original Analysis
// ========================================================================================================================

// Site Count for Unique Ids

export const aOriginalSiteCount = (data) => {
    let uniqueIds = {};
    let siteCount = {};

    for (const obj of data) {
        let id = obj.patient_id;
        let site = obj.site_name;

        if (!uniqueIds[id]) {
            uniqueIds[id] = {
                "id": id,
                "site": site
            }
        } else continue;
    }
};

// ========================================================================================================================
//  MockFinalData Analysis
// ========================================================================================================================







// ------------------------------------------------------------------------------------------------------------------------
// Count of each unique ID per survey
// ------------------------------------------------------------------------------------------------------------------------

export const surveyCount = (data) => {
    const surveyN = {};
    const surveyCount = {};

    for (const obj of data) {
        const id = obj.id;
        const survey = obj.survey;

        if (!surveyN[survey]) {
            surveyN[survey] = {
                completedSurveyId: [],
            };

            surveyCount[survey] = {
                surveyCount: 0
            }
        }

        if (!surveyN[survey].completedSurveyId.includes(id)) {
            surveyN[survey].completedSurveyId.push(id)
            surveyCount[survey].surveyCount ++;
        } else {
            continue;
        }
    }

    return surveyCount;
};

// ------------------------------------------------------------------------------------------------------------------------
// Potential Duplicate IDs
// ------------------------------------------------------------------------------------------------------------------------

export const potentialDupsFx = (data) => {
    const potentialErrorIds = {};

    for (const obj of data) {
        const id = obj.id;
        const question = obj.question;
        const answer = obj.answer;

        // Is the survey ID has not been looped over, create id and set it to no error and no questions yet
        if (!potentialErrorIds[id]) {
            potentialErrorIds[id] = {
                hasError: false,
                differingQuestions: []
            };
        }

        // If this ID does not have this question store yet, set the question and ID
        if (!potentialErrorIds[id][question]) {
            potentialErrorIds[id][question] = answer;
            
        // If this ID has this question, and the answers are not the same, then set it to error
        } else if (potentialErrorIds[id][question] !== answer) {
            potentialErrorIds[id].hasError = true;
            if (!potentialErrorIds[id].differingQuestions.includes(question)) {
                potentialErrorIds[id].differingQuestions.push(question);
            }
        }
    }

    const errorIdsWithQuestions = Object.keys(potentialErrorIds)
        .filter(id => potentialErrorIds[id].hasError)
        .map(id => ({
            id,
            differingQuestions: potentialErrorIds[id].differingQuestions
        }));

    return errorIdsWithQuestions;
};


// --------------------------------------------------------- Creating the master sheet for analysis -------------------------------------- //

export const studyPopulation = (data) => {
    const registryPt = {};

    for (const obj of data) {
        let id = obj.patient_id;
        let survey = obj.survey_name;
        let question = obj.question_key;
        let questionType = obj.response_type;
        let answer = obj.effective_text;
        let site = obj.site_name;
        let date = obj.created;

        if (!registryPt[id]) {
            registryPt[id] = {
                recruited: site,
            };
        }

        if (!registryPt[id][survey]) {
            registryPt[id][survey] = {};
        }

        if (!registryPt[id][survey][question]) {
            if (questionType === 'multi-select') {
                registryPt[id][survey][question] = [answer];
            } else {
                registryPt[id][survey][question] = answer;
            }
        } else if (questionType === 'multi-select') {
            registryPt[id][survey][question].push(answer);
        }
    }

    return registryPt;
};



// --------------------------------------------------------- Checking N for Registry -------------------------------------- //

export const registryIdN = (data) => {
    const uniqueId = {};
    const dupSurveysCount = {};

    for (const obj of data) {
        const id = obj.patient_id;
        const survey = obj.survey_name;
        const surveyId  = obj.patient_survey_id;
        const site = obj.site;
        
        if (!uniqueId[id]) {
            uniqueId[id] = {
                "id": id,
                "site": site,
                "surveys": {}
            };
        }

        if (!uniqueId[id].surveys[survey]) {
            uniqueId[id].surveys[survey] = [];
        }

        // Check if surveyId already exists in the array, if not, add it
        if (!uniqueId[id].surveys[survey].some(item => item.surveyId === surveyId)) {
            uniqueId[id].surveys[survey].push({ surveyId });

            // Check if this survey has been taken more than once by the same individual
            if (uniqueId[id].surveys[survey].length > 1) {
                if (!dupSurveysCount[survey]) {
                    dupSurveysCount[survey] = 1;
                } else {
                    dupSurveysCount[survey]++;
                }
            }
        }
    }

    return dupSurveysCount;
};

// ----------------------------------------

export const registryIdNTwo = (data) => {
    const surveyIds = {};

    for (const obj of data) {
        let survey_id = obj.patient_survey_id;
        let survey = obj.survey_name;

        if (!surveyIds[survey]) {
            surveyIds[survey] = {
                "completedSurveyIds": []
            }
        }

        // Check if survey_id is not already in the completedSurveyIds array
        if (surveyIds[survey]["completedSurveyIds"].indexOf(survey_id) === -1) {
            surveyIds[survey]["completedSurveyIds"].push(survey_id);
        }
    }

    const surveyLengths = {};

    // Iterate through surveyIds and calculate the length for each survey
    for (const survey in surveyIds) {
        surveyLengths[survey] = surveyIds[survey]["completedSurveyIds"].length;
    }

    return surveyLengths;
};

// ------------------ Check unique ids by site ---- 

export const registrySiteId = (data) => {
    const uniqueIds = {}; // To store unique patient IDs
    const siteCount = [];

    for (const obj of data) {
        let id = obj.patient_id;
        let site = obj.site_name;

        // Check if the patient ID is not already counted
        if (!uniqueIds[id]) {
            uniqueIds[id] = true; // Mark the patient ID as counted
            siteCount.push({ "id": id, "site": site });
        }
    }

    // Initialize site count objects
    const siteCounts = {
        "dr-bhanu-prasad": 0,
        "alport": 0,
        "empty": 0,
        "geisinger": 0
    };

    // Count occurrences of specific site IDs
    for (const obj of siteCount) {
        let site = obj.site;

        if (siteCounts.hasOwnProperty(site)) {
            siteCounts[site]++;
        }
    }

    return siteCounts;
}