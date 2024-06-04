// Fx 1 (slide 7): Learner Course Enrollments, Learner Course Completions 
// Fx :
// Fx (slide 13): Course Enrollments, Course Completions, New Accounts
// Fx (slide 14): Enrollments by month
// Fx (slide 15): Enrollments by discipline (nursem dietician, physician... etc)
// Fx (slide 16): Top 10 Enrolled Programs (course title, enrollment amounts)
// Fx (slide 17): Top 10 Completed Programs (Course Title, amount completed)

import {
    EnrollmentReport,
    EvaluationReport,
    ModuleReport,

    UserData,

    EnrollmentAnalysis,
    MemberFormat,
    // eval,
    ModuleAnalysis,
    ProfessionStructure,
} from '../typeScript/ce';

// ---------- DATA GROUPED BY USER ------------------- 

export const userDataFx = (enrollmentData:EnrollmentReport[], evaluationData:EvaluationReport[], moduleData:ModuleReport[] ): UserData[] => {
    const userDataMap: Map<string, UserData> = new Map();

    const userInfo = (userId: string): UserData => {
        let user = userDataMap.get(userId);

        if (!user) {
            user = {
                identifier: userId,
                member: false,
                profession: '',
                city: '',
                state: '',
                country: '',
                enrolledCourses: [],
                completedCourses: [],
            };
            userDataMap.set(userId, user);
        }

        return user;
    }

    enrollmentData.forEach((item) => {

        const {firstName, lastName, email, module, complete } = item;
        const identifier = `${firstName}-${lastName}-${email}`;

        const user = userInfo(identifier);

        if (complete) {
            user.completedCourses.push(module);

        if ( module !=='') {
            user.enrolledCourses.push(module);
        } 
    }});

    return Array.from(userDataMap.values());
};

// ---------- User Data Analysis -------------------


export const enrollmentDataAnalysis = (enrollmentData: EnrollmentReport[]) => {

    let enrollmentAnalysis: EnrollmentAnalysis = {
        courseComplete: 0,
        courseEnroll: 0,
        enrollmentMonth: {},
        top10EnrolledModules: {},
        top10CompletedModules: {},
        moduleEnrollProfessions: {},
        moduleCompleteProfessions: {},
        moduleCompleteAge: {},
        moduleCompleteState: {},
        moduleCompleteCompare: {
            member: { completed: 0, enrolled: 0 },
            nonMember: { completed: 0, enrolled: 0 },
        },
    };

    for (const obj of enrollmentData) {
        const { module, profession, state, country, member, complete, age, enrollMonth } = obj;

        let ageVar = '';

        if (age) {
            if (age >= 18 && age <= 24) {
                ageVar = 'age_18_24';
            } else if (age >= 25 && age <= 34) {
                ageVar = 'age_25_34';
            } else if (age >= 35 && age <= 44) {
                ageVar = 'age_35_44';
            } else if (age >= 45 && age <= 54) {
                ageVar = 'age_45_54';
            } else if (age >= 55 && age <= 64) {
                ageVar = 'age_55_64';
            } else if (age >= 65) {
                ageVar = 'age_65';
            }
        }

        if (complete) {
            enrollmentAnalysis.courseComplete ++;
            enrollmentAnalysis.courseEnroll ++;
            enrollmentAnalysis.top10CompletedModules[module] = (enrollmentAnalysis.top10CompletedModules[module] || 0) + 1;
            enrollmentAnalysis.moduleCompleteProfessions[profession] = (enrollmentAnalysis.moduleCompleteProfessions[profession] || 0) + 1;
            enrollmentAnalysis.moduleCompleteAge[ageVar] = (enrollmentAnalysis.moduleCompleteAge[ageVar] || 0) + 1;
            
            if (country === 'United States') {
                enrollmentAnalysis.moduleCompleteState[state] = (enrollmentAnalysis.moduleCompleteState[state] || 0) + 1;
            }
        
            if (member) {
                enrollmentAnalysis.moduleCompleteCompare.member.completed ++;
            } else {
                enrollmentAnalysis.moduleCompleteCompare.nonMember.completed ++;
            }
        }

        if (!complete) {
            enrollmentAnalysis.courseEnroll ++;
        
            if (member) {
                enrollmentAnalysis.moduleCompleteCompare.member.enrolled ++;
            } else {
                enrollmentAnalysis.moduleCompleteCompare.nonMember.enrolled ++;
            }
        }

        enrollmentAnalysis.top10EnrolledModules[module] = (enrollmentAnalysis.top10EnrolledModules[module] || 0) + 1;
        enrollmentAnalysis.moduleEnrollProfessions[profession] = (enrollmentAnalysis.moduleEnrollProfessions[profession] || 0) + 1;
    

        if (enrollMonth) {
            enrollmentAnalysis.enrollmentMonth[enrollMonth] = (enrollmentAnalysis.enrollmentMonth[enrollMonth] || 0) + 1;
        }
    }
    
    const getTop10 = (obj: { [key: string]: number }) => {
        return Object.entries(obj)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {} as { [key: string]: number });
    };

    enrollmentAnalysis.top10EnrolledModules = getTop10(enrollmentAnalysis.top10EnrolledModules);
    enrollmentAnalysis.top10CompletedModules = getTop10(enrollmentAnalysis.top10CompletedModules);

    return enrollmentAnalysis;
};

// ---------- Enrollment Data Analysis ------------------- 


// ---------- Evaluation Data Analysis ------------------- 


// ---------- Module Test Data Score Analysis ------------------- 

export const moduleScoring = (data: ModuleReport[]) => {

    let moduleData: ModuleAnalysis = {
        professionScoreChange: {},
        scoreIncreased: 0,
        scoreDecreased: 0,
        score100Both: 0,
        scoreSame: 0,
    };

    // Score Change
    for (const obj of data) {
        const { moduleComplete, scorePretest, scorePosttest, profession } = obj;

        if (moduleComplete && scorePretest && scorePosttest) {
            let scoreChange = scorePosttest - scorePretest;

            if (scorePretest === 1 && scorePosttest === 1) {
                moduleData.score100Both ++;
            } else if (scoreChange < 0) {
                moduleData.scoreDecreased ++;
            } else if (scoreChange > 0) {
                moduleData.scoreIncreased ++;
            } else if (scoreChange === 0) {
                moduleData.scoreSame ++
            } else console.log(scoreChange); 
        }

        if (!moduleData.professionScoreChange[profession]) {
            moduleData.professionScoreChange[profession] = {
                scoreIncreased: 0,
                scoreDecreased: 0,
                scoreSame: 0,
                score100Both: 0
            };
        }

        if (moduleComplete && scorePretest && scorePretest) {
            let scoreChange = scorePosttest - scorePretest;

            if (scorePretest === 1 && scorePosttest === 1) {
                moduleData.professionScoreChange[profession].score100Both ++;
            } else if (scoreChange < 0) {
                moduleData.professionScoreChange[profession].scoreDecreased ++;
            } else if (scoreChange > 0) {
                moduleData.professionScoreChange[profession].scoreIncreased ++;
            } else if (scoreChange === 0) {
                moduleData.professionScoreChange[profession].scoreSame ++
            } else console.log(scoreChange); 
        }
        
    }

    return moduleData;
};