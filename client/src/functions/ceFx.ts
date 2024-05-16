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
    // eval,
    ModuleScoreData,
    ProfessionStructure,
} from '../typeScript/ce';

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

        const {first_name, last_name, email, module, complete } = item;
        const identifier = `${first_name}-${last_name}-${email}`;

        const user = userInfo(identifier);

        if (complete) {
            user.completedCourses.push(module);

        if ( module !=='') {
            user.enrolledCourses.push(module);
        } 
    }});

    return Array.from(userDataMap.values());
};


export const moduleScoring = (data: ModuleReport[]) => {

    let moduleData: ModuleScoreData = {
        professionScoreChange: {},
        scoreIncreased: 0,
        scoreDecreased: 0,
        score100Both: 0,
        scoreSame: 0,
    };

    // Score Change
    for (const obj of data) {
        const { complete, scorePretest, scorePosttest, profession } = obj;

        if (complete && scorePretest && scorePretest) {
            let scoreChange = scorePosttest - scorePretest;

            if (scorePretest === 100 && scorePosttest === 100) {
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
                professionType: profession,
                scoreIncreased: 0,
                scoreDecreased: 0,
                scoreSame: 0,
                score100Both: 0
            };
        }

        if (complete && scorePretest && scorePretest) {
            let scoreChange = scorePosttest - scorePretest;

            if (scorePretest === 100 && scorePosttest === 100) {
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