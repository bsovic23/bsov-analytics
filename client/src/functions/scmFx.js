// ========================================================================================================================
//  SCM
// ========================================================================================================================

// Cleaning Data Object

export const scmCleanup = (data) => {

    // Multi-select choices
    const q_N = ['Program Content', 'Earn CME/CEUs', 'Networking Opportunities', 'Present a Poster', 'Attended as Faculty', 'Exhibits', 'N_Other'];
    const q_AD = ['Competence', 'Performance', 'Patient Outcomes'];
    const q_AP = ['Lack of evidence-based guidelines', 'Lack of applicability of guidelines to my current practice/patients', 'Lack of time', 'Organizational/Institutional', 'Insurance/Financial', 'Patient adherence/compliance', 'Treatment related adverse events', 'AP_Other'];
  
    function processSurveyData(data) {
      return data.map(obj => {
        const updatedObj = { ...obj, final_N: [], final_AD: [], final_AP: [] };
  
        for (const key in updatedObj) {
          if (q_N.includes(updatedObj[key])) {
            updatedObj.final_N.push(updatedObj[key]);
            delete updatedObj[key];
          } else if (q_AD.includes(updatedObj[key])) {
            updatedObj.final_AD.push(updatedObj[key]);
            delete updatedObj[key];
          } else if (q_AP.includes(updatedObj[key])) {
            updatedObj.final_AP.push(updatedObj[key]);
            delete updatedObj[key];
          }
        }
  
        return updatedObj;
      });
    }
  
    const updatedSurveyData = processSurveyData(data);
    return updatedSurveyData;
  };


// SCM Stats

export const scmStats = (data) => {
    const counts = data.reduce((accumulator, obj) => {
       
        // AG planChange_yn
        const planChange = obj.planChange_yn;
        accumulator.planChange[planChange] = (accumulator.planChange[planChange] || 0) + 1;

        // AK commit level
        const commitLevel = obj.commitLevel;
        accumulator.commitLevel[commitLevel] = (accumulator.commitLevel[commitLevel] || 0) + 1;

        // N final_N
        obj.final_N.forEach(answer => {
            accumulator.final_N[answer] = (accumulator.final_N[answer] || 0) + 1;
        });

        // AD final_AD
        obj.final_AD.forEach(answer => {
            accumulator.final_AD[answer] = (accumulator.final_AD[answer] || 0) + 1;
        });

        // AP final_AP
        obj.final_AP.forEach(answer => {
            accumulator.final_AP[answer] = (accumulator.final_AP[answer] || 0 ) + 1;
        });


        return accumulator;
    },{
        planChange: {},
        commitLevel: {},
        final_N: {},
        final_AD: {},
        final_AP: {}
    });

    return counts;
};

// roleChange_Other Count

export const scmRoleWordCount = (data) => {
    const allResponses = data.map(obj => obj.suggestions_open).join(" ");

    // Tokenize the text into words and count their occurrences
    const words = allResponses.toLowerCase().split(/\s+/);
    const wordCounts = words.reduce((accumulator, word) => {
    accumulator[word] = (accumulator[word] || 0) + 1;
    return accumulator;
    }, {});

    // Convert the word counts object into an array of [word, count] pairs
    const wordCountPairs = Object.entries(wordCounts);

    // Sort the word count pairs in descending order based on the count
    const sortedWordCountPairs = wordCountPairs.sort((a, b) => b[1] - a[1]);

    return sortedWordCountPairs;
}


