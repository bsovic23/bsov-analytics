import {
    // ====================
    // Data Imports
    // ====================

    // All Pt
    AllMrn,
    AllMedicationData,

    // Pre Intervention
    PreInterventionData,

    // Post Intervention
    PostInterventionData,
    PostFollowUpInterventionData,

    // Survey Monkey
    SurveyMonkey,

    // ====================
    // Cleaned Data Sets 
    // ====================

    PatientData,
    Demographics,
    HealthConditions,

    // ====================
    // Analysis Outputs
    // ====================

    // Outcome Measures
    OutcomeMeasures,
    OutcomeMeasuresFollowUp,

    // Secondary Outcomes Interface
    SecondaryOutcomesDataPre,
    SecondaryOutcomesDataPost,
    MedicationAnalysis,

    // Demographics Outcomes Interface
    DemographicsOutcomes,

} from "../typeScript/affinia";

// =======================================================================
// CLEAN UP DATASET AFFINIA FX
// =======================================================================

// ------------------------
// Pre Intervention Data CleanUp
// ------------------------

export const formatPreInterventionData = (preInterventionData:PreInterventionData[]): { [key: number]: PatientData } => {
    let finalData: { [key: number]: PatientData } = {};

    preInterventionData.forEach((item) => {
        let identifier = item.mrn;
        
        if (!finalData[identifier]) {
            finalData[identifier] = {
                kitReturned: false,
                demographics: {
                    Gender: 'Missing',
                    Race: 'Missing',
                    Ethnicity: 'Missing',
                    Language: 'Missing',
                },
                healthConditions: {
                    'A1C Date Pre': '',
                    'A1C Result Pre': null,
                    'BP Date Pre': '',
                    'BP Systolic Pre': null,
                    'BP Diastolic Pre': null,
                    'Hypertension': 'Missing',
                    'Diabetes': 'Missing',
                    'Both Hypertension and Diabetes': 'Missing'
                }
            };
        }

        finalData[identifier].kitReturned = item.kitReturned;

        finalData[identifier]['demographics'] = {
            // Demographics
            'Gender': item.gender || 'Missing',
            'Race': item.race || 'Missing',
            "Ethnicity": item.ethnicity || 'Missing',
            "Language": item.language || 'Missing',
        };

        finalData[identifier]['healthConditions'] = {
            'A1C Date Pre': item.a1c_date_pre || '',
            'A1C Result Pre': item.a1c_result_pre, 
            'BP Date Pre': item.bp_date_pre || '',
            'BP Systolic Pre': item.bp_systolic_pre,
            'BP Diastolic Pre': item.bp_diastolic_pre,
            'Hypertension': item.htn_yn_pre || 'Missing',
            'Diabetes': item.dm_yn_pre || 'Missing',
            'Both Hypertension and Diabetes': item.htn_bp_yn_pre || 'Missing'
        };
    });

    return finalData; 
};


// ------------------------
// Post Intervention Data CleanUp
// ------------------------

// Dont Need

// =======================================================================
// Affinia Analysis Functions
// =======================================================================
/*

Table of contents:

Function 1: Outcome Measures - Post Intervention Measure
Function 2: Medication analysis
Function 3: Demographic Data Points analysis

*/

// -----------------------------------------------------------------------------------------------------------------------------------------------
// Function 1 - 
// -----------------------------------------------------------------------------------------------------------------------------------------------

export const functionOne = (data: PostInterventionData[]): OutcomeMeasures => {
    let postData: OutcomeMeasures = {
        resultCategory: {},
        ckdStage: {
            g1: 0,
            g2: 0,
            g3a: 0,
            g3b: 0,
            g4: 0,
            g5: 0,
            g1NoUacr: 0,
            g2NoUacr: 0,
            missingEgfr: 0,
        },
    };

    const rangeUp = new Date("08/15/2023");
    const rangeDown = new Date("06/30/2024");

    for (const obj of data) {
        // resultCategory
        const result = obj.testResult;
        postData.resultCategory[result] = (postData.resultCategory[result] || 0) + 1;

        // ckdStage
        const egfrValue = obj.eGFRValue;
        const egfrDate = new Date(obj.eGFRDate);
        const uacrValue = obj.post_uacr;
        const uacrDate = new Date(obj.post_uacrDate);

       
        // Check for missing eGFR value
        if (egfrValue === null || egfrValue === undefined) {
            postData.ckdStage.missingEgfr += 1;
        } else {
            // Evaluate eGFR and UACR values only if eGFR is present
            if (egfrValue >= 90 && uacrValue > 30 && egfrDate >= rangeUp && egfrDate <= rangeDown && uacrDate >= rangeUp && uacrDate <= rangeDown) postData.ckdStage.g1 += 1;
            else if (egfrValue >= 60 && uacrValue > 30 && egfrDate >= rangeUp && egfrDate <= rangeDown && uacrDate >= rangeUp && uacrDate <= rangeDown) postData.ckdStage.g2 += 1;
            else if (egfrValue >= 45 && egfrValue < 60 && egfrDate >= rangeUp && egfrDate <= rangeDown) postData.ckdStage.g3a += 1;
            else if (egfrValue >= 30 && egfrValue < 45 && egfrDate >= rangeUp && egfrDate <= rangeDown) postData.ckdStage.g3b += 1;
            else if (egfrValue >= 15 && egfrValue < 30 && egfrDate >= rangeUp && egfrDate <= rangeDown) postData.ckdStage.g4 += 1;
            else if (egfrValue < 15 && egfrDate >= rangeUp && egfrDate <= rangeDown) postData.ckdStage.g5 += 1;
            else if (egfrValue >= 90 && egfrDate >= rangeUp && egfrDate <= rangeDown) postData.ckdStage.g1NoUacr += 1;
            else if (egfrValue >= 60 && egfrDate >= rangeUp && egfrDate <= rangeDown) postData.ckdStage.g2NoUacr += 1;
        }

    }

    return postData;
};

// -----------------------------------------------------------------------------------------------------------------------------------------------
// Function 2 - 
// -----------------------------------------------------------------------------------------------------------------------------------------------

export const functionOneFollowUp = (data: PostFollowUpInterventionData[]): OutcomeMeasuresFollowUp => {
    let finalData: OutcomeMeasuresFollowUp = {
        followUpCompleted: 0,
        followUpCompletedNo: 0,
        followUpUACRCompleted: 0,
        followUpUACRCompletedNo: 0,
        followUpEGFRCompleted: 0,
        followUpEGFRCompletedNo: 0,
        followUpBothCompleted: 0,
        followUpBothCompletedNo: 0,
    }

    for (const obj of data) {
        const { followUpCompleted, followUpTestOrdered, followUpTestComplete, followUpEGFRValue, followUpUACRValue } = obj;

        // Follow Up Scheduled and Completed VS follow up and cancel
        if (followUpCompleted === 'Yes') {
            finalData.followUpCompleted += 1;
        } else if (followUpCompleted === 'No') {
            finalData.followUpCompletedNo += 1;
        }

        // Follow Up Complete + UACR     VS     Follow Up UACR order but no result
        if (followUpCompleted === 'Yes') {
            if (followUpUACRValue !== null && followUpUACRValue !== undefined) {
                finalData.followUpUACRCompleted += 1;
            } else {
                finalData.followUpUACRCompletedNo += 1;
            }
        }

        // Follow Up Complete + EGFR     VS     Follow Up EGFR order but no result
        if (followUpCompleted === 'Yes') {
            if (followUpEGFRValue !== null && followUpEGFRValue !== undefined) {
                finalData.followUpEGFRCompleted += 1;
            } else {
                finalData.followUpEGFRCompletedNo += 1;
            }
        }

        // Follow Up Complete + EGFR + UACR    VS     Follow Up EGFR order and/or UACR but no result
        if (followUpCompleted === 'Yes') {
            if (followUpEGFRValue !== null && followUpEGFRValue !== undefined && followUpUACRValue !== null && followUpUACRValue !== undefined) {
                finalData.followUpBothCompleted += 1;
            } else {
                finalData.followUpBothCompletedNo += 1;
            }
        }
    }

    return finalData;
};

// -----------------------------------------------------------------------------------------------------------------------------------------------
// Function 2 - 
// -----------------------------------------------------------------------------------------------------------------------------------------------

export const functionTwoPre = (data: PatientData[]): SecondaryOutcomesDataPre => {

    let secondaryOutcomesData: SecondaryOutcomesDataPre = {
        chronicDiseaseMgmtPre: {
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

    const { chronicDiseaseMgmtPre } = secondaryOutcomesData;

    for (const key in data) {
        let obj = data[key];

        const rangeUp = new Date("02/01/2022");
        const rangeDown = new Date("07/30/2023");

        if (!obj.healthConditions) {
            continue;
        }

        const health = obj.healthConditions;

        // Chronic Disease Management - A1C
        if (health["A1C Date Pre"] !== null) {
            const a1cDatePre = new Date(health["A1C Date Pre"]); 
            if (a1cDatePre >= rangeUp && a1cDatePre <= rangeDown) {
                if (health['A1C Result Pre'] !== null && health['A1C Result Pre'] !== undefined) {
                    if (health['A1C Result Pre'] > 9) {
                        chronicDiseaseMgmtPre.a1cControl['>9%']++;
                    } else if (health['A1C Result Pre'] >= 7) {
                        chronicDiseaseMgmtPre.a1cControl['7-9%']++;
                    } else if (health['A1C Result Pre'] < 7) {
                        chronicDiseaseMgmtPre.a1cControl['<7%']++;
                    }
                } else {
                    chronicDiseaseMgmtPre.a1cControl['Not Found']++;
                }
            }
        }

        // Chronic Disease Management - Blood Pressure
        if (health["BP Date Pre"] !== null) {
            const bpDatePre = new Date(health["BP Date Pre"]); 
            if (bpDatePre >= rangeUp && bpDatePre <= rangeDown) {
                if (health['BP Systolic Pre'] !== null && health['BP Diastolic Pre'] !== null) {
                    if (health['BP Systolic Pre'] > BP_SYS_HIGH && health['BP Diastolic Pre'] > BP_DIA_HIGH) {
                        chronicDiseaseMgmtPre.bpControl['>140/90']++;
                    } else if ((health['BP Systolic Pre'] <= BP_SYS_HIGH && health['BP Systolic Pre'] > BP_SYS_NORMAL) &&
                               (health['BP Diastolic Pre'] <= BP_DIA_HIGH && health['BP Diastolic Pre'] > BP_DIA_NORMAL)) {
                        chronicDiseaseMgmtPre.bpControl['140/90-130/80']++;
                    } else if (health['BP Systolic Pre'] <= BP_SYS_NORMAL && health['BP Diastolic Pre'] <= BP_DIA_NORMAL) {
                        chronicDiseaseMgmtPre.bpControl['<130/80']++;
                    } else if (health['BP Systolic Pre'] > BP_SYS_HIGH) {
                        chronicDiseaseMgmtPre.bpControl['>140/90']++;
                    } else if (health['BP Systolic Pre'] > BP_SYS_NORMAL) {
                        chronicDiseaseMgmtPre.bpControl['140/90-130/80']++;
                    } else if (health['BP Systolic Pre'] < BP_SYS_NORMAL) {
                        chronicDiseaseMgmtPre.bpControl['<130/80']++;
                    } else {
                        chronicDiseaseMgmtPre.bpControl['None of the above']++;
                    }
                } else {
                    chronicDiseaseMgmtPre.bpControl['None of the above']++;
                }
            }
        }
    }

    return secondaryOutcomesData;
};

// -----------------------------------------------------------------------------------------------------------------------------------------------
// Function 1 - 
// -----------------------------------------------------------------------------------------------------------------------------------------------

export const functionTwoPost = (data: PostInterventionData[]): SecondaryOutcomesDataPost => {

    let secondaryOutcomesData: SecondaryOutcomesDataPost = {
        chronicDiseaseMgmtPost: {
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

    const { chronicDiseaseMgmtPost } = secondaryOutcomesData;

    const rangeUp = new Date("08/15/2023");
    const rangeDown = new Date("06/30/2024");

    for (const obj of data) {
        // Convert string date fields to Date objects
        const postA1cDate = new Date(obj.post_a1cDate);
        const postBpDate = new Date(obj.post_bpDate);

        // Safeguard against null/undefined values
        const a1cResult = obj?.post_a1c;
        const bpSysResult = obj?.post_sys;
        const bpDiaResult = obj?.post_dia;

        // Chronic Disease Management - A1C
        if (postA1cDate >= rangeUp && postA1cDate <= rangeDown) {
            if (a1cResult !== null && a1cResult !== undefined) {
                if (a1cResult > 9) {
                    chronicDiseaseMgmtPost.a1cControl['>9%']++;
                } else if (a1cResult >= 7) {
                    chronicDiseaseMgmtPost.a1cControl['7-9%']++;
                } else if (a1cResult < 7) {
                    chronicDiseaseMgmtPost.a1cControl['<7%']++;
                }
            } else {
                chronicDiseaseMgmtPost.a1cControl['Not Found']++;
            }
        }

        // Chronic Disease Management - Blood Pressure
        if (postBpDate >= rangeUp && postBpDate <= rangeDown) {
            if (bpSysResult !== null && bpSysResult !== undefined && bpDiaResult !== null && bpDiaResult !== undefined) {
                if (bpSysResult === BP_SYS_NORMAL && bpDiaResult > BP_DIA_NORMAL && bpDiaResult <= BP_DIA_HIGH) {
                    chronicDiseaseMgmtPost.bpControl['140/90-130/80']++;
                } else if (bpSysResult > BP_SYS_HIGH && bpDiaResult > BP_DIA_HIGH) {
                    chronicDiseaseMgmtPost.bpControl['>140/90']++;
                } else if ((bpSysResult <= BP_SYS_HIGH && bpSysResult > BP_SYS_NORMAL) &&
                        (bpDiaResult <= BP_DIA_HIGH && bpDiaResult > BP_DIA_NORMAL)) {
                    chronicDiseaseMgmtPost.bpControl['140/90-130/80']++;
                } else if (bpSysResult <= BP_SYS_NORMAL && bpDiaResult <= BP_DIA_NORMAL) {
                    chronicDiseaseMgmtPost.bpControl['<130/80']++;
                } else if (bpSysResult > BP_SYS_HIGH) {
                    chronicDiseaseMgmtPost.bpControl['>140/90']++;
                } else if (bpSysResult >= BP_SYS_NORMAL) {
                    chronicDiseaseMgmtPost.bpControl['140/90-130/80']++;
                } else if (bpSysResult < BP_SYS_NORMAL && bpDiaResult <= BP_DIA_HIGH && bpDiaResult > BP_DIA_NORMAL) {
                    chronicDiseaseMgmtPost.bpControl['140/90-130/80']++;
                } else {
                    chronicDiseaseMgmtPost.bpControl['None of the above']++;
                }
            } else {
                chronicDiseaseMgmtPost.bpControl['None of the above']++;
            }
        }
    }

    return secondaryOutcomesData;
};

// -----------------------------------------------------------------------------------------------------------------------------------------------
// Function 1 - 
// -----------------------------------------------------------------------------------------------------------------------------------------------

export const medicationCountAnalysis = (medicationData: AllMedicationData[]): MedicationAnalysis => {
    let finalData: MedicationAnalysis = {
        preMedCount: {},
        postMedCount: {}
    };

    // Define pre and post periods
    const preStart = new Date('February 1, 2021').getTime();
    const preEnd = new Date('July 30, 2023').getTime();
    const postStart = new Date('August 15, 2023').getTime();
    const postEnd = new Date('June 30, 2024').getTime();
    const currentDate = new Date('September 27, 2024').getTime();

    for (const obj of medicationData) {
        const { medType, medStartDate, medStopDate } = obj;

        // Parse the start and stop dates
        const startDate = new Date(medStartDate).getTime();
        let stopDate = medStopDate === 'still on medication'
            ? currentDate  // If still on medication, use current date (September 27, 2024)
            : new Date(medStopDate).getTime();

        // Function to check if a medication period overlaps with a time period
        const isActiveDuringPeriod = (periodStart: number, periodEnd: number) =>
            (startDate <= periodEnd && startDate >= periodStart) || // started within the period
            (stopDate <= periodEnd && stopDate >= periodStart) || // stopped within the period
            (startDate < periodStart && stopDate > periodEnd); // ongoing throughout the entire period

        // Check if medication falls within the pre period
        if (isActiveDuringPeriod(preStart, preEnd)) {
            finalData.preMedCount[medType] = (finalData.preMedCount[medType] || 0) + 1;
        }

        // Check if medication falls within the post period
        if (isActiveDuringPeriod(postStart, postEnd)) {
            finalData.postMedCount[medType] = (finalData.postMedCount[medType] || 0) + 1;
        }
    }

    return finalData;
};

// -----------------------------------------------------------------------------------------------------------------------------------------------
// Function 1 - 
// -----------------------------------------------------------------------------------------------------------------------------------------------

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
        } else if (healthConditions.Hypertension === 'Yes' && healthConditions.Diabetes === 'No') {
            demographics['hypertension only'] ++;
        } else if (healthConditions.Diabetes === 'Yes' && healthConditions.Hypertension === 'No') {
            demographics['diabetes only'] ++;
        } else if (healthConditions.Diabetes === 'No' && 
                    healthConditions.Hypertension === 'No' &&
                    healthConditions['Both Hypertension and Diabetes'] === 'No'
                ) {
            demographics['neither diabetes or hypertension'] ++;
        } else {
            console.log("BP HTN ERROR: HTN:" + obj.healthConditions.Hypertension + "diabetes:" + obj.healthConditions.Diabetes)
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

// -----------------------------------------------------------------------------------------------------------------------------------------------
// Survey Monkey Analysis 
// -----------------------------------------------------------------------------------------------------------------------------------------------

export const countSurveyResponses = (data: SurveyMonkey[]): Record<string, Record<string, number>> => {
    const counts: Record<string, Record<string, number>> = {};

    // Iterate over each survey response
    for (const response of data) {
        // Iterate over each key in the SurveyMonkey interface
        for (const key in response) {
            const value = response[key as keyof SurveyMonkey];

            // Initialize the counts object for this key if it doesn't exist
            if (!counts[key]) {
                counts[key] = {};
            }

            // Increment the count for this value
            if (value) {
                counts[key][value] = (counts[key][value] || 0) + 1;
            }
        }
    }

    return counts;
};