// ========================================================================================================================
//  KLC Pre/Post Survey Review
// ========================================================================================================================

export const klcModulesFx = (data) => {
    const moduleCount = {};

    for (const obj of data) {

        const module = obj.module;

        if (!moduleCount[module]) {
            moduleCount[module] = {
                count: 0
            };
        }

        moduleCount[module].count ++;
    }

    return moduleCount;
};

// Determines the Number of individuals who increased, stayed the same (if score not already 100), and decreased for each course, as well as avg scores

export const klcModuleScores = (data) => {
    const klcAvgScores = {};

    data.forEach(obj => {
        const pretest = obj.pretest;
        const posttest = obj.posttest;
        const course = obj.course_id;
        const scoreChange = posttest - pretest;
    
        if (!klcAvgScores[course]) {
            klcAvgScores[course] = { n: 0, preScoreTotal: 0, postScoreTotal: 0, increase: 0, same: 0, decrease: 0, scored100: 0 };
        }
    
        if (scoreChange > 0) {
            klcAvgScores[course].increase++;
        } else if (scoreChange === 0 && (posttest !== 1 && pretest !== 1)) {
            klcAvgScores[course].same++;
        } else if (scoreChange < 0) { 
            klcAvgScores[course].decrease++;
        } else {
            klcAvgScores[course].scored100++;
        }
    
        klcAvgScores[course].preScoreTotal += pretest;
        klcAvgScores[course].postScoreTotal += posttest;
        klcAvgScores[course].n++;
    });

    for (const course in klcAvgScores) {
        if (klcAvgScores.hasOwnProperty(course)) {
            const total = klcAvgScores[course].n;
            klcAvgScores[course].preScoreAvg = klcAvgScores[course].preScoreTotal / total;
            klcAvgScores[course].postScoreAvg = klcAvgScores[course].postScoreTotal / total;
        }
    }

    return klcAvgScores;
};
