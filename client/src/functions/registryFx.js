// ========================================================================================================================
//  Surveys Duplicates that do not have the same answers
// ========================================================================================================================

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