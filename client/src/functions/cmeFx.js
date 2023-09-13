// ========================================================================================================================
// Top 10 Course Completion
// ========================================================================================================================

export const topCoursesCompleteFx = (data) => {
    const count = {};

    // Count of all completed courses
    for (const obj of data) {
        const courseTitle = obj.course;
        const courseComplete = obj.complete;

        if (courseComplete === true) {
            count[courseTitle] = (count[courseTitle] || 0) +1;
        };
    };

    // Sort the top 10
    const unsortedCount = Object.entries(count);
    const sortedCount = unsortedCount.sort((a,b) => b[1] - a[1]);
    const topComplete = sortedCount.slice(0, 10).map(([title, count]) => ({ title, count }));

    return topComplete;
};

// ========================================================================================================================
// Top 10 Course Enrollment
// ========================================================================================================================

export const topCoursesEnrollFx = (data) => {
    const count = {};

    // Count of all course enrollment
    for (const obj of data) {
        const courseTitle = obj.course;

        count[courseTitle] = (count[courseTitle] || 0) +1;
    };

    // Sort the top 10
    const unsortedCount = Object.entries(count);
    const sortedCount = unsortedCount.sort((a,b) => b[1] - a[1]);
    const topEnroll = sortedCount.slice(0, 10).map(([title, count]) => ({ title, count }));

    return topEnroll;
};

// ========================================================================================================================
// Total Enrollments Based on Discipline
// ========================================================================================================================

export const enrollmentProfessionFx = (data) => {
    const count = {};

    for (const obj of data) {
        let profession = obj.profession;

        count[profession] = (count[profession] || 0) + 1;
    };

    return count;
};

// ========================================================================================================================
// Information presented will improve ability to effectively treat and manage patients
// ========================================================================================================================

export const treatPtFx = (data) => {
    const count = {};

    for (const obj of data) {
        let profession = obj.profession;
        let rate = obj.rate;

        if (rate === '') {
            continue; // Skip this iteration and move to the next object
        }

        if (!count[profession]) {
            count[profession] = {
                'Strongly Agree': 0,
                'Agree': 0,
                'Neutral': 0,
                'Disagree': 0,
                'Strongly Disagree': 0
            };
        }

        count[profession][rate] = (count[profession][rate] || 0) + 1;
    }

    return count;
};


// ========================================================================================================================
// Pre Post Score Change
// ========================================================================================================================

export const scoreChange = (data) => {
    let scores = [];
  
    let scoreCategory = {
      "incScore": 0,
      "decScore": 0,
      "sameScore": 0,
      "score100": 0,
    };
  
    for (const obj of data) {
      let preScore = obj.module_pretest;
      let postScore = obj.module_posttest;
      let scoreChange = postScore - preScore;
  
      scores.push({
        "scorePre": preScore,
        "scorePost": postScore,
        "scoreChange": scoreChange,
      });
    }
  
    for (const obj of scores) {
      let scoreChange = obj.scoreChange;
      let preScore = obj.scorePre;
  
      if (scoreChange === 0 && preScore === 1) {
        scoreCategory["score100"] += 1;
      } else if (scoreChange === 0) {
        scoreCategory["sameScore"] += 1;
      } else if (scoreChange > 0) {
        scoreCategory["incScore"] += 1;
      } else if (scoreChange < 0) {
        scoreCategory["decScore"] += 1;
      } else {
        console.log(obj);
      }
    }
  
    return scoreCategory;
  }