// ========================================================================================================================
//  PAM Analytic Functions
// ========================================================================================================================

// ========================================================================================================================
//  Baseline Analysis
// ========================================================================================================================

export const pamBaselineGender = (data) => {
    let genderCount = { male: 0, female: 0 };
  
    for (const obj of data) {
      const gender = obj.Gender;
  
      if (gender === 'M') {
        genderCount.male += 1;
      } else if (gender === 'F') {
        genderCount.female += 1;
      }
    }
  
    return genderCount;
  };

  export const pamBaselineSurveyCount = (data) => {
    let surveyCount = { baseline: 0, month3: 0, month6: 0, month9: 0 };

    for (const obj of data) {
      let bl = obj.baseline;
      let m3 = obj.month_3;
      let m6 = obj.month_6;
      let m9 = obj.month_9;

      surveyCount.baseline+=bl;
      surveyCount.month3+=m3;
      surveyCount.month6+=m6;
      surveyCount.month9+=m9;
    }
    
    return surveyCount;
  };

  // Scoring Individual 
