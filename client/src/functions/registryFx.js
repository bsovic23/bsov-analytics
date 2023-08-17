// ========================================================================================================================
//  Surveys Duplicates that do not have the same answers
// ========================================================================================================================

export const potentialDupsFx = (data) => {
    const potentialErrorIds = {};

    for (const obj of data) {
        const id = obj.id;
        const question = obj.question;
        const answer = obj.answer;

        if (!potentialErrorIds[id]) {
            potentialErrorIds[id] = {
                hasError: false,
                differingQuestions: []
            };
        }

        if (!potentialErrorIds[id][question]) {
            potentialErrorIds[id][question] = answer;
        } else if (potentialErrorIds[id][question] !== answer) {
            potentialErrorIds[id]['hasError'] = true;
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