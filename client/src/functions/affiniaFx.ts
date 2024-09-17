import {

    // Pre + Post ALL Study MRN
    Mrn,

    // Includes Pre and Post Med Data
    MedicationData,

    // Raw Data Interface - Pre Intervention
    AllPtData, 
    KitPtData, 

    // Raw Data Interface - Post Intervention
    PostInterventionResults,
    PostInterventionBP,
    PostInterventionEgfr,
    PostInterventionUacr,
    PostInterventionInsurance,

    // Raw Data Interface - Post Abnormal Intervention
    PostInterventionAbnVisit,
    PostInterventionAbnEGFR,
    PostInterventionAbnUACR,

    // Clean Data Interface
    PatientData,
    Demographics,
    HealthConditions,
    Medication,
    MedicationReview,

    // Outcome Measures
    OutcomeMeasures,
    CKDStage,

    // Secondary Outcomes Interface
    SecondaryOutcomesData,

    // Demographics Outcomes Interface
    DemographicsOutcomes,
} from "../typeScript/affinia";

// =======================================================================
// CLEAN UP DATASET AFFINIA FX
// =======================================================================

// ------------------------
// Pre Intervention Data CleanUp
// ------------------------

export const mergeData = (allPtData:AllPtData[], kitPtData:KitPtData[]) => {
    let finalData: Record<number, any> = {};

    // Set() is javascript collection of unique values, so ensures only one unique MRN passed through
    let uniqueIds = new Set<number>();
    allPtData.forEach((item) => uniqueIds.add(item.mrn));
    kitPtData.forEach((item) => uniqueIds.add(item.mrn));

    // DATA SET 1
    // All Pt Data - all cohort demographics (even if didnt return kit)
    allPtData.forEach((item) => {
        let identifier = item.mrn;

        finalData[identifier]['demographics'] = {
            // Demographics
            'Gender': item.gender || 'Missing',
            'Race': item.race || 'Missing',
            "Ethnicity": item.ethnicity || 'Missing',
            "Language": item.language || 'Missing',
        };

        finalData[identifier]['healthConditions'] = {

            'A1C Date Pre': item.a1c_date_pre ? new Date(item.a1c_date_pre).toLocaleDateString('en-US') : 'Missing',
            'A1C Result Pre': item.a1c_result_pre || 'Missing',

            // Blood Pressure
            'BP Date Pre': item.bp_date_pre ? new Date(item.bp_date_pre).toLocaleDateString('en-US') : 'Missing',
            'BP Result Pre': item.bp_result_pre || 'Missing',
            'BP Systolic Pre': item.bp_systolic_pre || 'Missing',
            'BP Diastolic Pre': item.bp_diastolic_pre || "Missing",

            // Hypertension
            'Hypertension': item.htn_yn_pre || 'Missing',
            
            // Diabetes
            'Diabetes': item.dm_yn_pre || 'Missing',
            
            // Diabetes + Hypertension
            'Both Hypertension and Diabetes': item.htn_bp_yn_pre
        };
    });

    // DATA SET 2
    // Kit Returned Population - information for those who returned kit
    kitPtData.forEach((item) => {
        let identifier = item.mrn;
        let kit_return = item.kit_return;

        if (kit_return) {
            finalData[identifier].kitReturned = true;
        }
    });

    return finalData; 
};


// ------------------------
// Post Intervention Data CleanUp
// ------------------------

export const mergePostData = (
    results: PostInterventionResults[],
    bloodPressure: PostInterventionBP[],
    egfr: PostInterventionEgfr[],
    uacr: PostInterventionUacr[],
    insurance: PostInterventionInsurance[],
) => {
    let finalData: Record<number, any> = {};

    let uniqueIds = new Set<number>();
    results.forEach((item) => uniqueIds.add(item.mrn));
    bloodPressure.forEach((item) => uniqueIds.add(item.mrn));
    egfr.forEach((item) => uniqueIds.add(item.mrn));
    uacr.forEach((item) => uniqueIds.add(item.mrn));
    insurance.forEach((item) => uniqueIds.add(item.mrn));

    // Set default data + kit return = false
    uniqueIds.forEach((identifier) => {
        finalData[identifier] = {
            testResult: '',
            uacrData: '',
            uacrResult: '',
            egfrDate: '',
            egfrResult: '',
            a1cResult: '',
            bpSysResult: '',
            bpDiaResult: '',
            insurance: '',
        }
    });

    // FILLING IN DATA

    for (const obj of results) {
        finalData[obj.mrn].testResult = obj.result;
    };

    for (const obj of bloodPressure) {
        const { mrn, post_sys, post_dia, post_a1c } = obj;

        finalData[mrn].bpSysResult = post_sys;
        finalData[mrn].bpDiaResult = post_dia;
        finalData[mrn].a1cResult = post_a1c;
    };

    for (const obj of egfr) {
        const { mrn, post_egfrDate, post_egfrValue } = obj;
    
        const existingDate = finalData[mrn].egfrDate ? new Date(finalData[mrn].egfrDate) : null;
        const currentDate = new Date(post_egfrDate);
    
        if (!existingDate || currentDate > existingDate) {
            finalData[mrn].egfrDate = post_egfrDate;
            finalData[mrn].egfrResult = post_egfrValue;
        }
    }

    for (const obj of uacr) {
        const { mrn, post_uacrDate, post_uacrValue } = obj;
    
        const existingDate = finalData[mrn].uacrDate ? new Date(finalData[mrn].uacrDate) : null;
        const currentDate = new Date(post_uacrDate);
    
        if (!existingDate || currentDate > existingDate) {
            finalData[mrn].uacrDate = post_uacrDate;
            finalData[mrn].uacrResult = post_uacrValue;
        }
    }

    for (const obj of insurance) {
        finalData[obj.mrn].insurance = obj.insuranceClass;
    };


    return finalData;
};


//  ANDREW CLEAN UP ANALYSIS

export const andrewMeds = (data: MedicationData[]) => {
    let medCount: MedicationReview = {
        medAnalysis: {}
    };

    for (const obj of data) {
        const { medName, medType } = obj;

        let uniqueMedIdentifier = `${medName}-${medType}`;

        medCount.medAnalysis[uniqueMedIdentifier] = (medCount.medAnalysis[uniqueMedIdentifier] || 0) + 1;
    }

    return medCount;
}


// =======================================================================
// Affinia Analysis Functions
// =======================================================================
/*
Table of contents:

Function pre2: Medications sorted correctly analysis for ANDREW

Function 1: Outcome Measures - Post Intervention Measure
Function 2: Medication analysis
Function 3: Demographic Data Points analysis
*/

export const functionOne = (data: Record<number, any>): OutcomeMeasures => {
    let postData: OutcomeMeasures = {
        resultCategory: {},
        followUpCompleted: 0,
        followUpCompletedNo: 0,
        followUpUACRCompleted: 0,
        followUpUACRCompletedNo: 0,
        followUpEGFRCompleted: 0,
        followUpEGFRCompletedNo: 0,
        followUpBothCompleted: 0,
        followUpBothCompletedNo: 0,
        ckdStage: {
            g1: 0,
            g2: 0,
            g3a: 0,
            g3b: 0,
            g4: 0,
            g5: 0,
            missing: 0,
            incomplete: 0,
        },
    };

    for (const mrn in data) {
        const obj = data[mrn];

         // Update CKD stages based on eGFR results
         if (obj.egfrResult) {
            const egfrValue = obj.egfrResult;
            const uacrValue = obj.uacrResult;

            if (egfrValue >= 90 && uacrValue >30) postData.ckdStage.g1 += 1;
            else if (egfrValue >= 60 && uacrValue > 30) postData.ckdStage.g2 += 1;
            else if (egfrValue >= 45 && egfrValue < 60) postData.ckdStage.g3a += 1;
            else if (egfrValue >= 30 && egfrValue < 44) postData.ckdStage.g3b += 1;
            else if (egfrValue >= 15 && egfrValue < 30) postData.ckdStage.g4 += 1;
            else if (egfrValue < 15) postData.ckdStage.g5 += 1;
            } else {
                postData.ckdStage.missing += 1;
            }

        // Only process records with a testResult
        if (obj.testResult) {
            // Check for completed follow-ups based on availability of eGFR and UACR data
            const egfrCompleted = obj.egfrResult !== '';
            const uacrCompleted = obj.uacrResult !== '';

            if (egfrCompleted) {
                postData.followUpEGFRCompleted += 1;
            } else {
                postData.followUpEGFRCompletedNo += 1;
            }

            if (uacrCompleted) {
                postData.followUpUACRCompleted += 1;
            } else {
                postData.followUpUACRCompletedNo += 1;
            }

            // Check if both UACR and eGFR are completed
            if (egfrCompleted && uacrCompleted) {
                postData.followUpBothCompleted += 1;
            } else {
                postData.followUpBothCompletedNo += 1;
            }

            // Populate resultCategory
            const result = obj.testResult;
            if (result) {
                postData.resultCategory[result] = (postData.resultCategory[result] || 0) + 1;
            }
        } else {
            // Increment followUpCompletedNo if there is no testResult
            postData.followUpCompletedNo += 1;
        }
    }

    // Update total counts for follow-up completion
    postData.followUpCompleted = postData.followUpEGFRCompleted + postData.followUpUACRCompleted - postData.followUpBothCompleted;
    postData.followUpBothCompletedNo = postData.followUpEGFRCompletedNo + postData.followUpUACRCompletedNo - postData.followUpBothCompleted;

    return postData;
};



export const functionTwoPre = (data: PatientData[]): SecondaryOutcomesData => {

    let secondaryOutcomesData: SecondaryOutcomesData = {
        medCategoryCount: {},
        chronicDiseaseMgmt: {
            a1cControl: {
                '>9%': 0,
                '7-9%': 0,
                '<7%': 0,
                'Not Found': 0,
            },
            bpControl: {
                '>140/90': 0,
                '140/90-130/80': 0,
                '<130/80': 0,
                'None of the above': 0
            }
        }
    };

    const BP_SYS_HIGH = 140;
    const BP_DIA_HIGH = 90;

    const BP_SYS_NORMAL = 130;
    const BP_DIA_NORMAL = 80;

    const { chronicDiseaseMgmt } = secondaryOutcomesData;

    for (const key in data) {
        let obj = data[key];

        const health = obj.healthConditions;

        // Chronic Disease Management - A1C
        if (health['A1C Result Pre'] > 9) {
            chronicDiseaseMgmt.a1cControl['>9%'] ++;
        } else if (health['A1C Result Pre'] >= 7) {
            chronicDiseaseMgmt.a1cControl['7-9%'] ++;
        } else if (health['A1C Result Pre'] < 7) {
            chronicDiseaseMgmt.a1cControl['<7%'] ++;
        } else {
            chronicDiseaseMgmt.a1cControl['Not Found'] ++;
        }

        // Chronic Disease Management - Bloop Pressure
        if (health['BP Systolic Pre'] > BP_SYS_HIGH && health['BP Diastolic Pre'] > BP_DIA_HIGH) {
            chronicDiseaseMgmt.bpControl['>140/90'] ++;
        } else if ((health['BP Systolic Pre'] <= BP_SYS_HIGH && health['BP Systolic Pre'] > BP_SYS_NORMAL) && 
                    (health['BP Diastolic Pre'] <= BP_DIA_HIGH && health['BP Diastolic Pre'] > BP_DIA_NORMAL)) {
                    chronicDiseaseMgmt.bpControl['140/90-130/80'] ++;          
        } else if (health['BP Systolic Pre'] <= BP_SYS_NORMAL && health['BP Diastolic Pre'] <= BP_DIA_NORMAL) {
            chronicDiseaseMgmt.bpControl['<130/80'] ++;
        } else if (health['BP Systolic Pre'] > BP_SYS_HIGH) {
            chronicDiseaseMgmt.bpControl['>140/90'] ++;
        } else if (health['BP Systolic Pre'] > BP_SYS_NORMAL) {
            chronicDiseaseMgmt.bpControl['140/90-130/80'] ++;
        } else if (health['BP Systolic Pre'] < BP_SYS_NORMAL) {
            chronicDiseaseMgmt.bpControl['<130/80'] ++;
        } else {
            console.log(health['BP Systolic Pre'], health['BP Diastolic Pre']);
            chronicDiseaseMgmt.bpControl['None of the above'] ++;
        }
    };

    return secondaryOutcomesData;
};


export const functionTwoPost = (data: Record<number, any>): SecondaryOutcomesData => {

    let secondaryOutcomesData: SecondaryOutcomesData = {
        medCategoryCount: {},
        chronicDiseaseMgmt: {
            a1cControl: {
                '>9%': 0,
                '7-9%': 0,
                '<7%': 0,
                'Not Found': 0,
            },
            bpControl: {
                '>140/90': 0,
                '140/90-130/80': 0,
                '<130/80': 0,
                'None of the above': 0
            }
        }
    };

    const BP_SYS_HIGH = 140;
    const BP_DIA_HIGH = 90;

    const BP_SYS_NORMAL = 130;
    const BP_DIA_NORMAL = 80;

    const { chronicDiseaseMgmt } = secondaryOutcomesData;

    for (const mrn in data) {
        let obj = data[mrn];

        const a1cResult = obj.a1cResult;
        const bpSysResult = obj.bpSysResult;
        const bpDiaResult = obj.bpDiaResult;

        // Chronic Disease Management - A1C
        if (a1cResult > 9) {
            chronicDiseaseMgmt.a1cControl['>9%']++;
        } else if (a1cResult >= 7) {
            chronicDiseaseMgmt.a1cControl['7-9%']++;
        } else if (a1cResult < 7) {
            chronicDiseaseMgmt.a1cControl['<7%']++;
        } else {
            chronicDiseaseMgmt.a1cControl['Not Found']++;
        }

        // Chronic Disease Management - Blood Pressure
        if (bpSysResult === BP_SYS_NORMAL && bpDiaResult > BP_DIA_NORMAL && bpDiaResult <= BP_DIA_HIGH) {
            // Systolic is exactly 130, and diastolic is between 80 and 90
            chronicDiseaseMgmt.bpControl['140/90-130/80']++;
        } else if (bpSysResult > BP_SYS_HIGH && bpDiaResult > BP_DIA_HIGH) {
            // Both systolic and diastolic are higher than the high thresholds
            chronicDiseaseMgmt.bpControl['>140/90']++;
        } else if ((bpSysResult <= BP_SYS_HIGH && bpSysResult > BP_SYS_NORMAL) &&
                   (bpDiaResult <= BP_DIA_HIGH && bpDiaResult > BP_DIA_NORMAL)) {
            // Both systolic and diastolic fall between high and normal ranges
            chronicDiseaseMgmt.bpControl['140/90-130/80']++;
        } else if (bpSysResult <= BP_SYS_NORMAL && bpDiaResult <= BP_DIA_NORMAL) {
            // Both systolic and diastolic are at or below normal
            chronicDiseaseMgmt.bpControl['<130/80']++;
        } else if (bpSysResult > BP_SYS_HIGH) {
            // Only systolic is above the high threshold
            chronicDiseaseMgmt.bpControl['>140/90']++;
        } else if (bpSysResult >= BP_SYS_NORMAL) {
            // Only systolic is between the normal and high thresholds
            chronicDiseaseMgmt.bpControl['140/90-130/80']++;
        } else if (bpSysResult < BP_SYS_NORMAL && bpDiaResult <= BP_DIA_HIGH && bpDiaResult > BP_DIA_NORMAL) {
            // Special case: systolic is below normal, but diastolic is between normal and high
            chronicDiseaseMgmt.bpControl['140/90-130/80']++;
        } else {
            chronicDiseaseMgmt.bpControl['None of the above']++;
        }
    }

    return secondaryOutcomesData;
};


export const functionThree = (data: PatientData[]): DemographicsOutcomes => {

    let demographics: DemographicsOutcomes = {
        "diabetes only": 0,
        "hypertension only": 0,
        "diabetes and hypertension": 0,
        "neither diabetes or hypertension": 0,
        gender: {},
        race: {},
        ethnicity: {},
        language: {},
    }

    for (const key in data) {
        const obj = data[key];

        // Health
        const healthConditions = obj.healthConditions;

        if (healthConditions['Both Hypertension and Diabetes'] === 'Yes') {
            demographics['diabetes and hypertension'] ++;
        } else if (healthConditions.Hypertension === 'Yes') {
            demographics['hypertension only'] ++;
        } else if (healthConditions.Diabetes === 'Yes') {
            demographics['diabetes only'] ++;
        } else if (healthConditions.Diabetes === 'No' && 
                    healthConditions.Hypertension === 'No' &&
                    healthConditions['Both Hypertension and Diabetes'] === 'No'
                ) {
            demographics['neither diabetes or hypertension'] ++;
        } else {
            console.log('Error health conditions');
        }

        // Demographics - gender, race, eth, language
        const demo = obj.demographics;

        // Gender
        demographics.gender[demo.Gender] = (demographics.gender[demo.Gender] || 0) + 1;

        // Race
        demographics.race[demo.Race] = (demographics.race[demo.Race] || 0) + 1;

        // Ethnicity
        demographics.ethnicity[demo.Ethnicity] = (demographics.ethnicity[demo.Ethnicity] || 0) + 1;

        // Language
        demographics.language[demo.Language] = (demographics.language[demo.Language] || 0) + 1;
    };

    return demographics
};





// =======================================================================
// Double Check Functions
// =======================================================================

export const functionLabs = (data: PostInterventionBP[]) => {
    let secondaryOutcomesData: SecondaryOutcomesData = {
        medCategoryCount: {},
        chronicDiseaseMgmt: {
            a1cControl: {
                '>9%': 0,
                '7-9%': 0,
                '<7%': 0,
                'Not Found': 0,
            },
            bpControl: {
                '>140/90': 0,
                '140/90-130/80': 0,
                '<130/80': 0,
                'None of the above': 0
            }
        }
    };

    const BP_SYS_HIGH = 140;
    const BP_DIA_HIGH = 90;

    const BP_SYS_NORMAL = 130;
    const BP_DIA_NORMAL = 80;

    const { chronicDiseaseMgmt } = secondaryOutcomesData;

    data.forEach(obj => {
        const a1cResult = obj.post_a1c;
        const bpSysResult = obj.post_sys;
        const bpDiaResult = obj.post_dia;

        // Chronic Disease Management - A1C
        if (a1cResult > 9) {
            chronicDiseaseMgmt.a1cControl['>9%']++;
        } else if (a1cResult >= 7) {
            chronicDiseaseMgmt.a1cControl['7-9%']++;
        } else if (a1cResult < 7) {
            chronicDiseaseMgmt.a1cControl['<7%']++;
        } else {
            chronicDiseaseMgmt.a1cControl['Not Found']++;
        }

        // Chronic Disease Management - Blood Pressure
        if (bpSysResult > BP_SYS_HIGH || bpDiaResult > BP_DIA_HIGH) {
            // Any value above the high threshold
            chronicDiseaseMgmt.bpControl['>140/90']++;
        } else if (bpSysResult === BP_SYS_NORMAL && bpDiaResult > BP_DIA_NORMAL && bpDiaResult <= BP_DIA_HIGH) {
            // Systolic is exactly 130, and diastolic is between 80 and 90
            chronicDiseaseMgmt.bpControl['140/90-130/80']++;
        } else if (bpSysResult <= BP_SYS_HIGH && bpSysResult > BP_SYS_NORMAL && 
                   bpDiaResult <= BP_DIA_HIGH && bpDiaResult > BP_DIA_NORMAL) {
            // Both systolic and diastolic fall between high and normal ranges
            chronicDiseaseMgmt.bpControl['140/90-130/80']++;
        } else if (bpSysResult <= BP_SYS_NORMAL && bpDiaResult <= BP_DIA_NORMAL) {
            // Both systolic and diastolic are at or below normal
            chronicDiseaseMgmt.bpControl['<130/80']++;
        } else if (bpSysResult > BP_SYS_NORMAL && bpSysResult <= BP_SYS_HIGH) {
            // Systolic is between normal and high, diastolic is either above normal or within the high range
            chronicDiseaseMgmt.bpControl['140/90-130/80']++;
        } else {
            // For cases that do not fit into the above categories
            if (bpSysResult > BP_SYS_HIGH) {
                chronicDiseaseMgmt.bpControl['>140/90']++;
            } else if (bpSysResult <= BP_SYS_NORMAL) {
                chronicDiseaseMgmt.bpControl['<130/80']++;
            } else {
                chronicDiseaseMgmt.bpControl['None of the above']++;
            }
        }
    });

    return secondaryOutcomesData;
};


export const followUpAnalysis = (
    visitsData: PostInterventionAbnVisit[], 
    uacrData: PostInterventionAbnUACR[], 
    egfrData: PostInterventionAbnEGFR[]
) => {
    let finalData: { [mrn: string]: any } = {};

    // Initialize counters
    let followUpCompleteCount = 0;
    let followUpNotCompleteCount = 0;
    let uacrYesCount = 0;
    let egfrYesCount = 0;
    let bothTestsCount = 0;

    // Process visitsData
    for (const visit of visitsData) {
        const { mrn, followUpCompleted } = visit;

        if (!finalData[mrn]) {
            finalData[mrn] = {
                followUpCompleted: followUpCompleted || null,
                uacr: null,
                egfr: null,
            };
        } else {
            finalData[mrn].followUpCompleted = followUpCompleted || finalData[mrn].followUpCompleted;
        }

        // Count follow-up completion
        if (followUpCompleted?.toLowerCase() === "yes") {
            followUpCompleteCount++;
        } else if (followUpCompleted?.toLowerCase() === "no") {
            followUpNotCompleteCount++;
        }
    }

    // Process uacrData: Find most recent UACR for each MRN
    for (const uacr of uacrData) {
        const { mrn, followUpUACRDate, followUpUACRValue } = uacr;
        const uacrDate = new Date(followUpUACRDate);

        if (!finalData[mrn]) {
            finalData[mrn] = {
                followUpCompleted: null,
                uacr: { date: uacrDate, value: followUpUACRValue },
                egfr: null,
            };
        } else {
            if (!finalData[mrn].uacr || uacrDate > finalData[mrn].uacr.date) {
                finalData[mrn].uacr = { date: uacrDate, value: followUpUACRValue };
            }
        }

        // Count UACR presence
        if (followUpUACRValue) {
            uacrYesCount++;
        }
    }

    // Process egfrData: Find most recent eGFR for each MRN
    for (const egfr of egfrData) {
        const { mrn, followUpEGFRDate, followUpEGFRValue } = egfr;
        const egfrDate = new Date(followUpEGFRDate);

        if (!finalData[mrn]) {
            finalData[mrn] = {
                followUpCompleted: null,
                uacr: null,
                egfr: { date: egfrDate, value: followUpEGFRValue },
            };
        } else {
            if (!finalData[mrn].egfr || egfrDate > finalData[mrn].egfr.date) {
                finalData[mrn].egfr = { date: egfrDate, value: followUpEGFRValue };
            }
        }

        // Count eGFR presence
        if (followUpEGFRValue) {
            egfrYesCount++;
        }
    }

    // Count cases where both UACR and eGFR are present for the same MRN
    for (const mrn in finalData) {
        if (finalData[mrn].uacr && finalData[mrn].egfr) {
            bothTestsCount++;
        }
    }

    // Return finalData and the counts
    return {
        counts: {
            followUpCompleteCount,
            followUpNotCompleteCount,
            uacrYesCount,
            egfrYesCount,
            bothTestsCount
        }
    };
};