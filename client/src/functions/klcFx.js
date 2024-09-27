// ========================================================================================================================
//  KLC Pre/Post Survey Review
// ========================================================================================================================

// ========================================================================================================================
//  Score Avg, Change, Total Missed Questions, Most Missed Questions For Each Module
// ========================================================================================================================

export const klcMissedQuestions = (moduleId, surveyData, answersData) => {
    const filteredSurveyData = surveyData.filter(item => item.moduleId === moduleId && item["Course Completed"] === true);
    const filteredAnswersData = answersData.filter(item => item.Id === moduleId);
  
    // Missed Question Analysis
    const missedQuestionCounts = {};
  
    filteredSurveyData.forEach(surveyItem => {
      for (const question in surveyItem) {
        if (question !== 'moduleId' || question !== 'Course Complete' || question !== 'Score_Pretest' || question !== 'Score') {
          const userAnswer = surveyItem[question];
          
          filteredAnswersData.forEach(answerItem => {
            const correctAnswer = answerItem[question];
  
            if (userAnswer !== correctAnswer) {

              if (!missedQuestionCounts[question]) {
                missedQuestionCounts[question] = 1;
              } else {
                missedQuestionCounts[question]++;
              }
            }
          });
        }
      }
    });

    const moduleChosen = moduleId;
    const totalMissedQuestionsCount = Object.values(missedQuestionCounts).reduce((total, count) => total + count, 0);
    const sortedMissedQuestions = Object.entries(missedQuestionCounts).sort((a, b) => b[1] - a[1]);

    // Score Analysis
    const scoreAnalysis = { n: 0, preScore: 0, postScore: 0, preAvg: 0, postAvg: 0, scoreInc: 0, scoreDec: 0, scoreSame: 0, scoreBoth100: 0 };
    
    for (const obj of filteredSurveyData) {
      let preScoreId = obj["Score_Pretest"];
      let postScoreId = obj["Score"];
      let scoreChangeId = postScoreId - preScoreId;

      scoreAnalysis.preScore += preScoreId;
      scoreAnalysis.postScore += postScoreId;
      scoreAnalysis.n ++;
      
      if (scoreChangeId > 0) {
        scoreAnalysis.scoreInc ++;
      } else if (scoreChangeId < 0) {
        scoreAnalysis.scoreDec ++;
      } else if (scoreChangeId === 0 && preScoreId !== 1) {
        scoreAnalysis.scoreSame ++;
      } else scoreAnalysis.scoreBoth100 ++;
    }

    scoreAnalysis.preAvg = scoreAnalysis.preScore / scoreAnalysis.n;
    scoreAnalysis.postAvg = scoreAnalysis.postScore / scoreAnalysis.n;
    
    return { moduleChosen, scoreAnalysis, totalMissedQuestionsCount, sortedMissedQuestions };
  };