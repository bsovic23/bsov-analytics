// ========================================================================================================================
//  Surveys Duplicates that do not have the same answers
// ========================================================================================================================

// Count of each unique ID per survey
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


// Potential Duplicate IDs

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