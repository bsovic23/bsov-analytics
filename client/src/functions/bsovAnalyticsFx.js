// BSOV ANALYTICS FUNCTIONS

/*
Function Outline

1. Determine question type (count, perentage, etc etc )
2. Determine variables (1,2,3 variables and which variables)
3. Execute Function (use result from one and two to execute function)

IF, unable to determine what varibvles to use, pop up to allow to select based
on which variable is not detected

*/

// import {} from '../phrases';

export const processQuestion = (question, data) => {

    const words = question // need to break into words
    const questionType = determineQuestion(words);
    const variables = determineVariables(words);

    if (!questionType || !variables) {
        return 'Unable to process question'
    }

    return executeRequest(questionType, variables, data);
};


const words = (words) => {

};

const questionType = (words) => {

}