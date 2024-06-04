// ========================================================================================================================
//  PAM Analytic Functions
// ========================================================================================================================

import {
  PamMockData,
  PamResults
} from '../typeScript/pam';

export const pamCounts = (data: PamMockData[]) => {
    let genderCount = { m: 0, f: 0, u: 0, missing: 0 };
    let surveyCount = { bl: 0, m3: 0, m6: 0, m9: 0, m12: 0};
    let followUpCount = { none: 0, one: 0, two: 0, three: 0, four: 0, five: 0};
    let baselineLevel = { one: 0, two: 0, three: 0, four: 0, missing: 0 };
  
    for (const obj of data) {

      // Gender Count
      const gender = obj.gender;
  
      if (gender === 'M') {
        genderCount.m += 1;
      } else if (gender === 'F') {
        genderCount.f += 1;
      } else if (gender === 'U') {
        genderCount.u += 1;
      } else {
        genderCount.missing += 1;
      }

      // Survey Completion

      if (obj.raw_bl) {
        surveyCount.bl += 1;
      }
      if (obj.raw_m3) {
        surveyCount.m3 += 1;
      }
      if (obj.raw_m6) {
        surveyCount.m6 += 1;
      }
      if (obj.raw_m9) {
        surveyCount.m9 += 1;
      }
      if (obj.raw_m12) {
        surveyCount.m12 += 1;
      }

      // Follow Up Count

      let count = 0;

      if (obj.raw_bl) count++;
      if (obj.raw_m3) count++;
      if (obj.raw_m6) count++;
      if (obj.raw_m9) count++;
      if (obj.raw_m12) count++;

      if (count === 0) {
          followUpCount.none++;
      } else if (count === 1) {
          followUpCount.one++;
      } else if (count === 2) {
          followUpCount.two++;
      } else if (count === 3) {
          followUpCount.three++;
      } else if (count === 4) {
          followUpCount.four++;
      } else if (count === 5) {
          followUpCount.five++;
      };

      // Baseline Level
      if (obj.level_bl === 1) {
        baselineLevel.one ++;
      } else if (obj.level_bl === 2) {
        baselineLevel.two ++;
      } else if (obj.level_bl === 3) {
        baselineLevel.three ++;
      } else if (obj.level_bl === 4) {
        baselineLevel.four ++;
      } else {
        baselineLevel.missing ++;
      }
    }
  
    return { 
      "gender count": genderCount, 
      "survey count": surveyCount,
      "total surveys": followUpCount,
      "baseline level": baselineLevel,
    };
  };

  // PAM Scoring Level Analysis

  export const analyzeLevelChanges = (data: PamMockData[]) => {
    let changeCount = { increase: 0, decrease: 0, same: 0 };

    for (const obj of data) {
        let lastScore = null;
        const baseline = obj.level_bl;

        if (baseline !== undefined && baseline !== null) {
            if (obj.level_m12 !== undefined && obj.level_m12 !== null) {
                lastScore = obj.level_m12;
            } else if (obj.level_m9 !== undefined && obj.level_m9 !== null) {
                lastScore = obj.level_m9;
            } else if (obj.level_m6 !== undefined && obj.level_m6 !== null) {
                lastScore = obj.level_m6;
            } else if (obj.level_m3 !== undefined && obj.level_m3 !== null) {
                lastScore = obj.level_m3;
            }

            // Calculate changes only if there's a baseline and at least one follow-up survey filled
            if (lastScore !== null) {
                const diff = lastScore - baseline;
                if (diff > 0) {
                    changeCount.increase++;
                } else if (diff < 0) {
                    changeCount.decrease++;
                } else {
                    changeCount.same++;
                }
            }
        }
    }

    return changeCount;
};


export const analyzeBaselineActivationChanges = (data: PamMockData[]) => {
  // Initialize the counters and sum variables
  let changeCount = { increase: 0, decrease: 0, same: 0 };
  let diffSum = 0;
  let count = 0;

  // Object to hold the results
  let information = {
    changeCount,
    diffSum,
    count,
  }

  // Loop through each object in the data array
  for (const obj of data) {
    let lastScore = null;
    const baseline = obj.activation_bl;
  
    // Check if the baseline is defined and not null
    if (baseline !== undefined && baseline !== null) {
      // Check for the most recent non-null follow-up score
      if (obj.activation_m12 !== undefined && obj.activation_m12 !== null) {
        lastScore = obj.activation_m12;
      } else if (obj.activation_m9 !== undefined && obj.activation_m9 !== null) {
        lastScore = obj.activation_m9;
      } else if (obj.activation_m6 !== undefined && obj.activation_m6 !== null) {
        lastScore = obj.activation_m6;
      } else if (obj.activation_m3 !== undefined && obj.activation_m3 !== null) {
        lastScore = obj.activation_m3;
      }

      // Calculate changes only if there's a baseline and at least one follow-up survey filled
      if (lastScore !== null && baseline !==null) {
        const diff = lastScore - baseline;
        count++;
        diffSum += diff;

        // Update the change count based on the difference
        if (diff > 0) {
          changeCount.increase++;
        } else if (diff < 0) {
          changeCount.decrease++;
        } else {
          changeCount.same++;
        }
      }
    }
  }

  information.diffSum = diffSum;
  information.count = count;

  // Return the result object
  return information;
};