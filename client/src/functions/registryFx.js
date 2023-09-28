// ========================================================================================================================
//  Registry Analytic Functions
// ========================================================================================================================

// ========================================================================================================================
//  Raw Data Analysis   [ALL RAW DATA]
// ========================================================================================================================

// Count of Unique Ids

export const allDataId = (data) => {
    let uniqueIds = {};
    let alport = 0;
    let empty = 0;
    let geisinger = 0;
    let prasad = 0;


    for (const obj of data) {
        let id = obj.patient_id;
        let site = obj.site_name;

        if (!uniqueIds[id]) {
            uniqueIds[id] = {
                "id": id,
                "site": site
            }
        };

        if (uniqueIds[id]) {
            continue;
        };
    }

    for (const id in uniqueIds) {
        let obj = uniqueIds[id]
        let site = obj.site

        if (site === "alport") {
            alport++;
        } else if (site === "empty") {
            empty++;
        } else if (site === "geisinger") {
            geisinger++;
        } else if (site === "dr-bhanu-prasad") {
            prasad++;
        }
    }

    let uniqueIdsLength = Object.keys(uniqueIds).length;

    return `There are ${uniqueIdsLength} unique Ids in the All Raw Data file. Site Count = Alport: ${alport}, NKF: ${empty}, Geisinger: ${geisinger}, Prasad: ${prasad}`;
};

// ========================================================================================================================
//  mockDeleteData Analysis   [work.delete]
// ========================================================================================================================

// Count of Unique Ids in the deleteData file

export const deleteDataUniqueId = (data) => {
    let uniqueIds = {};
    let alport = 0;
    let empty = 0;
    let geisinger = 0;
    let prasad = 0;


    for (const obj of data) {
        let id = obj.patient_id;
        let site = obj.site_name;

        if (!uniqueIds[id]) {
            uniqueIds[id] = {
                "id": id,
                "site": site
            }
        };

        if (uniqueIds[id]) {
            continue;
        };
    }

    for (const id in uniqueIds) {
        let obj = uniqueIds[id]
        let site = obj.site

        if (site === "alport") {
            alport++;
        } else if (site === "empty") {
            empty++;
        } else if (site === "geisinger") {
            geisinger++;
        } else if (site === "dr-bhanu-prasad") {
            prasad++;
        }
    }

    let uniqueIdsLength = Object.keys(uniqueIds).length;

    return `There are ${uniqueIdsLength} unique Ids in Delete Data (work.Delete) file. Site Count = Alport: ${alport}, NKF: ${empty}, Geisinger: ${geisinger}, Prasad: ${prasad}`;
};

// Count of Unique Ids that have just an id and no other information

export const deleteDataEmptyInfo = (data) => {
    let uniqueIds = {};
    let emptyInfoCount = 0;

    for (const obj of data) {
        let id = obj.patient_id;
        let gender = obj.gender_at_birth_name;
        let race = obj.race_name;
        let ethnicity = obj.ethnicity_name;
        let dob = obj.year_of_birth;

        if (!uniqueIds[id]) {
            uniqueIds[id] = {
                "id": id,
                "gender": gender,
                "race": race,
                "ethnicity": ethnicity,
                "dob": dob
            }
        }
    }

    for (const id in uniqueIds) {
        let obj = uniqueIds[id]
        let gender = obj.gender || "";
        let race = obj.race || "";
        let ethnicity = obj.ethnicity || "";
        let dob = obj.dob || "";
        
        if (gender === "" && race === "" && ethnicity === "" && dob === "") {
            emptyInfoCount += 1;
        } 
    }

    return `There are ${emptyInfoCount} Ids in the delete file that have no gender, race, ethnicity, AND dob`;
};

// Count of Unique Ids that just have a birth year and no other information

export const deleteDataDobOnly = (data) => {
    let uniqueIds = {};
    let emptyInfoCount = 0;

    for (const obj of data) {
        let id = obj.patient_id;
        let gender = obj.gender_at_birth_name;
        let race = obj.race_name;
        let ethnicity = obj.ethnicity_name;
        let dob = obj.year_of_birth;

        if (!uniqueIds[id]) {
            uniqueIds[id] = {
                "id": id,
                "gender": gender,
                "race": race,
                "ethnicity": ethnicity,
                "dob": dob
            }
        }
    }

    for (const id in uniqueIds) {
        let obj = uniqueIds[id]
        let gender = obj.gender || "";
        let race = obj.race || "";
        let ethnicity = obj.ethnicity || "";
        let dob = obj.dob || "";
        
        if (gender === "" && race === "" && ethnicity === "" && dob !== "") {
            emptyInfoCount += 1;
        } 
    }

    return `There are ${emptyInfoCount} Ids in the delete file that only have a DOB year but no gender, race, ethnicity, dob`;
};

// ========================================================================================================================
//  A_Original Analysis  [work.a_original]
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
//  MockFinalData Analysis  (Merged file work.z_merge i think)
// ========================================================================================================================













// ========================================================================================================================
//  DELETE / COPY / REFORMAT FUNCTIONS BELOW INTO THE CORRECT CATEGORIES ABOVE
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