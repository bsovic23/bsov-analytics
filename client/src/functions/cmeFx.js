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