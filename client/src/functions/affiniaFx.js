// =======================================================================
// CLEAN UP DATASET AFFINIA FX
// =======================================================================

export const mergeData = (tab1, tab2, tab3) => {
    let finalData = {};

    // Set() is javascript collection of unique values, so ensures only one unique MRN passed through
    let uniqueIds = new Set();
    tab1.forEach((item) => uniqueIds.add(item.mrn));
    tab2.forEach((item) => uniqueIds.add(item.mrn));
    tab3.forEach((item) => uniqueIds.add(item.mrn));

    uniqueIds.forEach((identifier) => {
        finalData[identifier] = {
            demographics: [],
            healthConditions: [],
            medications: [],
        }
    });

    // Tab 1 = All Pt Demographics
    tab1.forEach((item) => {
        let identifier = item.mrn;

        finalData[identifier]['demographics'].push({
            // Demographics
            'Gender': item.demo_gender || 'Missing',
            'Race': item.demo_race || 'Missing',
            "Ethnicity": item.demo_ethnicity || 'Missing',
            "Language": item.demo_language || 'Missing'
        });
    });

    // Tab 2 = All Pt HTN & DM dx. BP, A1c
    tab2.forEach((item) => {
        let identifier = item.mrn;

        finalData[identifier]['healthConditions'].push({
            // Hypertension
            'Hyptertension': item.dx_htn_yn || 'Missing',
            'BP Date Pre': item.dx_bp_date_pre || 'Missing',
            'BP Result Pre': item.dx_bp_pre || 'Missing',

            'BP Date Post': item.dx_bp_date_post || 'Missing',
            'BP Result Post': item.dx_bp_post || 'Missing',

            // Diabetes
            'Diabetes': item.dx_dm_yn || 'Missing',
            'A1C Date Pre': item.dx_a1c_date_pre || 'Missing',
            'A1C Result Pre': item.dx_a1c_pre || 'Missing',

            'A1C Date Post': item.dx_a1c_date_post || 'Missing',
            'A1C Result Post': item.dx_a1c_post || 'Missing',
        });
    });

    // Tab 3 = All Pt Medications
    tab3.forEach((item) => {
        let identifier = item.mrn;
        let medicationData = {
            'Start Date': medDataItem.med_date || '',
            'Med Name': medDataItem.med_name || '',
            'Med Type': medDataItem.med_type || ''
        }

        finalData[identifier]['medications'].push({medicationData});
    });

    // Tab 4 = All Pt Zip
    // tab5.forEach()

    // Tab 5 = All Pt Payer


    // Tab 6 = 

    return finalData; 
};


// =======================================================================
// Affinia Analysis Functions
// =======================================================================
/*
Table of contents:

Function 1: Demographics analysis
Function 2: Medication analysis
*/




export const functionThree = (data) => {

    let demographics = {
        "diabetes only": 0,
        "hypertension only": 0,
        "diabetes and hypertension": 0,
        gender: {
            male: 0,
            female: 0,
            nonBinary: 0,
        },
        race: {

        },
        language: {

        }
    }

    for (const obj of data) {

    }
};
