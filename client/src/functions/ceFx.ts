// Fx 1 (slide 7): Learner Course Enrollments, Learner Course Completions 
// Fx :
// Fx (slide 13): Course Enrollments, Course Completions, New Accounts
// Fx (slide 14): Enrollments by month
// Fx (slide 15): Enrollments by discipline (nursem dietician, physician... etc)
// Fx (slide 16): Top 10 Enrolled Programs (course title, enrollment amounts)
// Fx (slide 17): Top 10 Completed Programs (Course Title, amount completed)

import {
    CompletionReport,
    EnrollmentReport,
    EvaluationReport,
    ModuleReport,

    UserData,
} from '../typeScript/ce';

export const userDataFx = (
    completionData:CompletionReport[], 
    enrollmentData:EnrollmentReport[],
    evaluationData:EvaluationReport[],
    moduleData:ModuleReport[],
) => {
    let allData: Record<number, any> = {};

    completionData.forEach((item) => {
        if (!allData[item.id]) {
            allData[item.id];
        }
    })
};