// ========================================================================================================================
//  PAM Analytic Functions
// ========================================================================================================================

// ========================================================================================================================
//  Baseline Analysis
// ========================================================================================================================

export const pamBaseline = (data) => {
    let genderCount = { male: 0, female: 0 };
  
    for (const obj of data) {
      const gender = obj.gender;
  
      if (gender === 'M') {
        genderCount.male += 1;
      } else if (gender === 'F') {
        genderCount.female += 1;
      }
    }
  
    return genderCount;
  };