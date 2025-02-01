//


import { CasehippoData } from '../typeScript/caseHippoAnalysis';


// Functions

export const caseHippoEnrollmentFx = (data: CasehippoData[]) => {

    let enrollmentsCount = {
        enrolled: 0
    };

    for (const obj of data) {
        const { enrolled } = obj;

        if (enrolled) {
            enrollmentsCount.enrolled += 1;
        }
    }

    return enrollmentsCount;
}

export const caseHippoCompleteFx = (data: CasehippoData[]) => {

    let completeCount = {
        complete: 0
    };

    for (const obj of data) {
        const { complete } = obj;

        if (complete) {
            completeCount.complete += 1;
        }
    }

    return completeCount;
}

export const caseHippoModuleCompleteFx = (data: CasehippoData[]) => {
    let moduleCount: { [key: string]: number } = {};

    for (const obj of data) {
        const { moduleName, complete } = obj;

        if (complete) {
            moduleCount[moduleName] = (moduleCount[moduleName] || 0) + 1;
        }
    }

    return moduleCount;
};


export const caseHippoModuleEnrollFx = (data: CasehippoData[]) => {
    let moduleCount: { [key: string]: number } = {};

    for (const obj of data) {
        const { moduleName, enrolled } = obj;

        if (enrolled) {
            moduleCount[moduleName] = (moduleCount[moduleName] || 0) + 1;
        }
    }

    return moduleCount;
};

export const caseHippoCompleteProfessionFx = (data: CasehippoData[]) => {

    let professionEnroll: { [key: string]: number } = {}

    for (const obj of data) {
        const { profession, complete } = obj;

        if (complete) {
            professionEnroll[profession] = (professionEnroll[profession] || 0) + 1;
        }
    }

    return professionEnroll;
};