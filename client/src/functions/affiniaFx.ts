/*
// =======================================================================
// CLEAN UP DATASET AFFINIA FX
// =======================================================================

export const mergeData = (allPtData, kitPtData, medicationData) => {
    let finalData = {};

    // Set() is javascript collection of unique values, so ensures only one unique MRN passed through
    let uniqueIds = new Set();
    allPtData.forEach((item) => uniqueIds.add(item.mrn));
    kitPtData.forEach((item) => uniqueIds.add(item.mrn));

    // Set default data + kit return = false
    uniqueIds.forEach((identifier) => {
        finalData[identifier] = {
            kitReturned: false,
            demographics: [],
            healthConditions: [],
            medications: [],
        }
    });

    // DATA SET 1
    // All Pt Data - all cohort demographics (even if didnt return kit)
    allPtData.forEach((item) => {
        let identifier = item.mrn;

        finalData[identifier]['demographics'].push({
            // Demographics
            'Gender': item.gender || 'Missing',
            'Race': item.race || 'Missing',
            "Ethnicity": item.ethnicity || 'Missing',
            "Language": item.language || 'Missing',
        });

        finalData[identifier]['healthConditions'].push({

            'A1C Date Pre': item.a1c_date_pre || 'Missing',
            'A1C Result Pre': item.a1c_result_pre || 'Missing',

            // Blood Pressure
            'BP Date Pre': item.bp_date_pre || 'Missing',
            'BP Result Pre': item.bp_result_pre || 'Missing',
            'BP Systolic Pre': item.bp_systolic_pre || 'Missing',
            'BP Diastolic Pre': item.bp_diastolic_pre || "Missing",

            // Hypertension
            'Hypertension': item.htn_yn_pre || 'Missing',
            
            // Diabetes
            'Diabetes': item.dm_yn_pre || 'Missing',
            
            // Diabetes + Hypertension
            'Both Hypertension and Diabetes': item.htn_bp_yn_pre
        });

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
            'Start Date': item.medDate || '',
            'Med Name': item.medName || '',
            'Med Type': item.medType || ''
        }

        finalData[identifier]['medications'].push({medicationData});
    });

    return finalData; 
};


*/
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

export const functionOne = (data) => {
    return 'hello world function 1';
};

// Interface Data

interface PatientData {
    kitReturned: boolean;
    demographics: Demographics;
    healthConditions: HealthConditions;
    medications: Medication[];
}

interface Demographics {
    'Gender': string;
    'Race': string;
    'Ethnicity': string;
    'Language': string;
};

interface HealthConditions {
    'A1C Date Pre': string;
    'A1C Result Pre': number;
    'BP Date Pre': string;
    'BP Result Pre': number;
    'BP Systolic Pre': number;
    'BP Diastolic Pre': number;
    'Hypertension': string;
    'Diabetes': string;
    'Both Hypertension and Diabetes': string;
}

interface Medication {
    'Start Date': string;
    'Med Name': string;
    'Med Type': string;
}

// Interface Function One

// Interface Function Two

export const functionTwo = (data) => {

    let secondaryOutcomesData = {
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

        secondaryOutcomesData.medCategoryCount[meds['Med Name']] = (secondaryOutcomesData.medCategoryCount[meds['Med Name']] || 0) +1;        

        // A1C
        if (health.a1c_result_pre > 9) {
            chronicDiseaseMgmt.a1cControl['>9%'] ++;
        } else if (health.a1c_result_pre >= 7) {
            chronicDiseaseMgmt.a1cControl['7-9%'] ++;
        } else if (health.a1c_result_pre < 7) {
            chronicDiseaseMgmt.a1cControl['<7%'] ++;
        } else {
            chronicDiseaseMgmt.a1cControl['Not Found'] ++;
        }

        // Bloop Pressure
        if (health.bp_systolic_pre > BP_SYS_HIGH && health.bp_diastolic_pre > BP_DIA_HIGH) {
            chronicDiseaseMgmt.bpControl['>140/90'] ++;
        } else if ((health.bp_systolic_pre <= BP_SYS_HIGH && health.bp_systolic_pre > BP_SYS_NORMAL) && 
                    (health.bp_diastolic_pre <= BP_DIA_HIGH && health.bp_diastolic_pre > BP_DIA_NORMAL)) {
                    chronicDiseaseMgmt.bpControl['140/90-130/80'] ++;          
        } else if (health.bp_systolic_pre <= BP_SYS_NORMAL && health.bp_diastolic_pre <= BP_DIA_NORMAL) {
            chronicDiseaseMgmt.bpControl['<130/80'] ++;
        } else {
            console.log(health.bp_systolic_pre, health.bp_diastolic_pre);
            chronicDiseaseMgmt.bpControl['None of the above'] ++;
        }
    };

    return secondaryOutcomesData;
};


export const functionThree = (data) => {

    let demographics = {
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
        const healthConditions = obj.healthConditions[0];

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
        const demo = obj.demographics[0];

        // Gender
        demographics.gender[demo.Gender] = (demographics.gender[demo.Gender] || 0) + 1;

        // Race
        demographics.race[demo.Race] = (demographics.race[demo.race] || 0) + 1;

        // Ethnicity
        demographics.ethnicity[demo.Ethnicity] = (demographics.ethnicity[demo.Ethnicity] || 0) + 1;

        // Language
        demographics.language[demo.Language] = (demographics.language[demo.Language] || 0) + 1;
    };

    return demographics
};