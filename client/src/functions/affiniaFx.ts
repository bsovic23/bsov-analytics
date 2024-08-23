import {
    // Raw Data Interface 
    AllPtData, 
    KitPtData, 
    MedicationData, 

    postUACR,
    postEGFR,
    MergedData,

    PostInterventionData,
    PostFollowUpData,

    // Clean Data Interface
    PatientData,
    Demographics,
    HealthConditions,
    Medication,
    MedicationReview,

    // Outcome Measures
    OutcomeMeasures,

    // Secondary Outcomes Interface
    SecondaryOutcomesData,

    // Demographics Outcomes Interface
    DemographicsOutcomes,
} from "../typeScript/affinia";

// =======================================================================
// CLEAN UP DATASET AFFINIA FX
// =======================================================================

export const mergeData = (allPtData:AllPtData[], kitPtData:KitPtData[], medicationData:MedicationData[]) => {
    let finalData: Record<number, any> = {};

    // Set() is javascript collection of unique values, so ensures only one unique MRN passed through
    let uniqueIds = new Set<number>();
    allPtData.forEach((item) => uniqueIds.add(item.mrn));
    kitPtData.forEach((item) => uniqueIds.add(item.mrn));
    medicationData.forEach((item) => uniqueIds.add(item.mrn));

    // Set default data + kit return = false
    uniqueIds.forEach((identifier) => {
        finalData[identifier] = {
            kitReturned: false,
            demographics: {},
            healthConditions: {},
            medications: [],
        }
    });

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

    // DATA SET 3
    // Tab 3 = All Pt Medications
    medicationData.forEach((item) => {
        let identifier = item.mrn;
        let medicationData = {
            'Start Date': item.medDate ? new Date(item.medDate).toLocaleDateString('en-US') : '',
            'Med Name': item.medName || '',
            'Med Type': item.medType || '',
        }

        finalData[identifier]['medications'].push(medicationData);
    });

    return finalData; 
};


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

Function 1: Demographics analysis
Function 2: Medication analysis
Function 3: Demographic Data Points analysis
*/

export const functionOne = (data: PatientData[]): OutcomeMeasures => {
    return 'hello world function 1';
};

export const functionTwo = (data: PatientData[]): SecondaryOutcomesData => {

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

        // Medications
        const meds = obj.medications;

        for (const obj of meds) {
            let medType = obj['Med Type'];

            secondaryOutcomesData.medCategoryCount[medType] = (secondaryOutcomesData.medCategoryCount[medType] || 0) +1;
        }

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


// Post Intervention Analysis

export const postInterventionFxOne = (data: PostInterventionData[]) => {

    let postInterventionOutcomes = {
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

    const { chronicDiseaseMgmt } = postInterventionOutcomes;

    for (const obj of data) {

        const { tab2_a1cValue, tab2_bpSys, tab2_bpDia } = obj;

        // Chronic Disease Management - A1C
        if (tab2_a1cValue > 9) {
            chronicDiseaseMgmt.a1cControl['>9%'] ++;
        } else if (tab2_a1cValue >= 7) {
            chronicDiseaseMgmt.a1cControl['7-9%'] ++;
        } else if (tab2_a1cValue < 7) {
            chronicDiseaseMgmt.a1cControl['<7%'] ++;
        } else {
            chronicDiseaseMgmt.a1cControl['Not Found'] ++;
        }

        // Chronic Disease Management - Bloop Pressure
        if (tab2_bpSys > BP_SYS_HIGH && tab2_bpDia > BP_DIA_HIGH) {
            chronicDiseaseMgmt.bpControl['>140/90'] ++;
        } else if ((tab2_bpSys <= BP_SYS_HIGH && tab2_bpSys > BP_SYS_NORMAL) && 
                    (tab2_bpSys <= BP_DIA_HIGH && tab2_bpDia > BP_DIA_NORMAL)) {
                    chronicDiseaseMgmt.bpControl['140/90-130/80'] ++;          
        } else if (tab2_bpSys <= BP_SYS_NORMAL && tab2_bpDia <= BP_DIA_NORMAL) {
            chronicDiseaseMgmt.bpControl['<130/80'] ++;
        } else if (tab2_bpSys > BP_SYS_HIGH) {
            chronicDiseaseMgmt.bpControl['>140/90'] ++;
        } else if (tab2_bpSys > BP_SYS_NORMAL) {
            chronicDiseaseMgmt.bpControl['140/90-130/80'] ++;
        } else if (tab2_bpSys < BP_SYS_NORMAL) {
            chronicDiseaseMgmt.bpControl['<130/80'] ++;
        } else {
            console.log(tab2_bpSys, tab2_bpDia);
            chronicDiseaseMgmt.bpControl['None of the above'] ++;
        }
    };

    return postInterventionOutcomes;
};





/// UACR EGFR ANALYSIS DELETE AFTER EXPORT
/*
export const getMostRecentRecords = (uacrData: postUACR[], egfrData: postEGFR[]): MergedData[] => {
    const result: { [key: number]: MergedData } = {};

    // Process UACR data
    uacrData.forEach(record => {
        const currentMrn = record.mrn;
        const uacrDate = new Date(record.tab3_uacrDate);

        if (!result[currentMrn]) {
            result[currentMrn] = {
                mrn: currentMrn,
                mostRecentUacrDate: record.tab3_uacrDate,
                mostRecentUacrValue: record.tab3_uacrValue,
            };
        } else if (uacrDate > new Date(result[currentMrn].mostRecentUacrDate || '1970-01-01')) {
            result[currentMrn].mostRecentUacrDate = record.tab3_uacrDate;
            result[currentMrn].mostRecentUacrValue = record.tab3_uacrValue;
        }
    });

    // Process eGFR data
    egfrData.forEach(record => {
        const currentMrn = record.mrn;
        const egfrDate = new Date(record.tab4_egfrDate);

        if (!result[currentMrn]) {
            result[currentMrn] = {
                mrn: currentMrn,
                mostRecentEgfrDate: record.tab4_egfrDate,
                mostRecentEgfrValue: record.tab4_egfrValue,
            };
        } else if (egfrDate > new Date(result[currentMrn].mostRecentEgfrDate || '1970-01-01')) {
            result[currentMrn].mostRecentEgfrDate = record.tab4_egfrDate;
            result[currentMrn].mostRecentEgfrValue = record.tab4_egfrValue;
        }
    });

    return Object.values(result);
};
*/

export const postLabAnalysis = (data: MergedData[]) => {

    let finalData = {
        G1: 0,
        G2: 0,
        G3a: 0,
        G3b: 0,
        G4: 0,
        G5: 0,
        MissingOrIncomplete: 0
    };

    for (const obj of data) {
        
        const { mostRecentEgfrValue, mostRecentUacrValue } = obj;

        if (mostRecentEgfrValue === null && mostRecentUacrValue === null) {
            finalData.MissingOrIncomplete++;
            continue;
        }

        if (mostRecentEgfrValue !== null && mostRecentEgfrValue >= 90 && mostRecentUacrValue !== null && mostRecentUacrValue > 30) {
            finalData.G1++;
        } else if (mostRecentEgfrValue !== null && mostRecentEgfrValue >= 60 && mostRecentEgfrValue < 90 && mostRecentUacrValue !== null && mostRecentUacrValue > 30) {
            finalData.G2++;
        } else if (mostRecentEgfrValue !== null && mostRecentEgfrValue >= 45 && mostRecentEgfrValue < 60) {
            finalData.G3a++;
        } else if (mostRecentEgfrValue !== null && mostRecentEgfrValue >= 30 && mostRecentEgfrValue < 45) {
            finalData.G3b++;
        } else if (mostRecentEgfrValue !== null && mostRecentEgfrValue >= 15 && mostRecentEgfrValue < 30) {
            finalData.G4++;
        } else if (mostRecentEgfrValue !== null && mostRecentEgfrValue < 15) {
            finalData.G5++;
        } else {
            finalData.MissingOrIncomplete++;
        }
    }

    return finalData;
};


export const postFollowUpFx = (data: PostFollowUpData[]) => {

    let finalData = {
        followUpAptComplete: 0,
        uacrTestComplete: 0,
    };

    for (const obj of data) {
        if (!obj) continue;  // Skip if obj is undefined or null

        const { followUpApt_kept, testTypeOrdered } = obj;

        // Check if follow-up appointment was completed
        if (followUpApt_kept === "Yes") {
            finalData.followUpAptComplete++;
        }

        // Check if "Microalbumin" is in the follow-up tests ordered
        if (followUpApt_kept === "Yes" && testTypeOrdered && testTypeOrdered.includes("Microalbumin")) {
            finalData.uacrTestComplete++;
        }
    }

    return finalData;
};