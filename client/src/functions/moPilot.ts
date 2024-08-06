// -------------------------------------------
// MO Pilot Project Analysis
// -------------------------------------------

import { 
    MoPilotInitial, // Initial Data Raw
    MoPilotFollowUp, // Follow Up Data Raw
    MissingInitialEntry, // QA/QC has follow up but no intial data
    SDOH, // SDOH Survey Questions
    MoPilotAllData, // Initial + Follow Up Data Combined Clean

    MoPilotCountAnalytics, // Final Count Analytics
} from "../typeScript/moPilot";


// ------------- Clean Up -----------//

export const moPilotDataCleanUp = (initial: MoPilotInitial[], followUp: MoPilotFollowUp[]): MoPilotAllData => {
    let finalData: MoPilotAllData = {};

    const extractSurveyData = (survey: any): SDOH => {
        return {
            q1: survey.q1_yes || survey.q1_no,
            q2: survey.q2_yes || survey.q2_no,
            q3: survey.q3_yes || survey.q3_no,
            q4: survey.q4_yes || survey.q4_no,
            q5: survey.q5_yes || survey.q5_no,
            q6: survey.q6_yes || survey.q6_no,
            q7: survey.q7_yes || survey.q7_no,
            q8: survey.q8_yes || survey.q8_no,
            q9: survey.q9_yes || survey.q9_no,
            q10: survey.q10_yes || survey.q10_no,
        };
    };

    // Initial Survey CleanUp + Push to Final Data
    for (const obj of initial) {
        const {
            submissionDate, identifier, age, zipcode, race, ethnicity, insurance, location,
            q1_yes, q1_no, q2_yes, q2_no, q3_yes, q3_no, q4_yes, q4_no,
            q5_yes, q5_no, q6_yes, q6_no, q7_yes, q7_no, q8_yes, q8_no,
            q9_yes, q9_no, q10_yes, q10_no, sdohComplete,
            primaryCare, chronicDiseases, pharmacyReferral,
        } = obj;

        if (!finalData[identifier]) {
            finalData[identifier] = {
                identifier: identifier,
                age: age,
                zipcode: zipcode,
                race: race,
                ethnicity: ethnicity,
                insurance: insurance,
                primaryCare: primaryCare,
                chronicDiseases: chronicDiseases ? chronicDiseases.split("\n") : [],
                pharmacyReferral: pharmacyReferral,
                initialSubmissionDate: submissionDate,
                followUpSubmissionDate: '',
                initialLocation: location,
                followUpLocation: '',
                initialSdohComplete: sdohComplete,
                followUpSdohComplete: '',
                initialSurvey: [
                    extractSurveyData(obj),
                ],
                followUpSurvey: [],
                egfr: 0,
                uacr: 0,
                labResultsOutsideRange: '',
                medsCountDosedInapp: 0,
                medsCountDiscontinued: 0,
            };
        } else console.log(identifier);
    }

    // Follow Survey CleanUp + Push to Final Data
    for (const obj of followUp) {
        const {
            submissionDate, identifier,
            q1_yes, q1_no, q2_yes, q2_no, q3_yes, q3_no, q4_yes, q4_no,
            q5_yes, q5_no, q6_yes, q6_no, q7_yes, q7_no, q8_yes, q8_no,
            q9_yes, q9_no, q10_yes, q10_no,
            sdohCompleted, location, followUpDate, labsDrawnDate, labsLocation,
            egfr, uacr, labResultsOutsideRange, medsCountDosedInapp, medsCountDiscontinued,
        } = obj;

        if (finalData[identifier]) {
            finalData[identifier].followUpSubmissionDate = submissionDate;
            finalData[identifier].followUpLocation = location;
            finalData[identifier].followUpSdohComplete = sdohCompleted;
            finalData[identifier].followUpSurvey.push(extractSurveyData(obj));
            finalData[identifier].egfr = egfr;
            finalData[identifier].uacr = uacr;
            finalData[identifier].labResultsOutsideRange = labResultsOutsideRange;
            finalData[identifier].medsCountDosedInapp += medsCountDosedInapp;
            finalData[identifier].medsCountDiscontinued += medsCountDiscontinued;
        }
    }

    return finalData;
};


// ------------- Trends Among Desc Category ----------- //

export const trendsFx = () => {

};


// ------------- Final Data Analysis Counts ----------- //

export const finalDataAnalysisFx = (data: MoPilotAllData) => {
    let finalData: MoPilotCountAnalytics = {
        individuals: 0,
        initialSdohSurveys: 0,
        followUpSdohSurveys: 0,
        locationCount: {},
        demographics: {
            ageIndividualsCount: 0,
            ageTotal: 0,
            race: {},
            ethnicity: {},
            insurance: {},
            primaryCare: {},
            chronicDiseases: {},
            pharmacyReferral: {},
        },
        initialSurvey: {
            q1: {},
            q2: {},
            q3: {},
            q4: {},
            q5: {},
            q6: {},
            q7: {},
            q8: {},
            q9: {},
            q10: {},
        },
        followUpSurvey: {
            q1: {},
            q2: {},
            q3: {},
            q4: {},
            q5: {},
            q6: {},
            q7: {},
            q8: {},
            q9: {},
            q10: {},
        },
        labsOutsideRangeCount: {},
        medsDosedInappropriateCount: 0,
        egfrIndividualsCount: 0,
        egfrTotal: 0,
        uacrIndividualsCount: 0,
        uacrTotal: 0,
    };

    const incrementCount = (survey: Record<string, Record<string, number>>, key: string, value: string) => {
        if (!survey[key]) {
            survey[key] = {};
        }
        survey[key][value] = (survey[key][value] || 0) + 1;
    };

    for (const key in data) {

        const obj = data[key];

        const {age, race, ethnicity, insurance, primaryCare, chronicDiseases,
            pharmacyReferral, initialLocation, followUpLocation, initialSdohComplete,
            followUpSdohComplete, initialSurvey, followUpSurvey, egfr, uacr, labResultsOutsideRange,
            medsCountDosedInapp
        } = obj;

        finalData.individuals += 1;
        
        if (initialSdohComplete === 'Yes') {
            finalData.initialSdohSurveys += 1;
        }

        if (followUpSdohComplete === 'Yes') {
            finalData.followUpSdohSurveys += 1;
        }

        finalData.locationCount[initialLocation] = (finalData.locationCount[initialLocation] || 0) + 1;

        //  ---- Demographics ----
        if (age) {
            const parsedAge = parseInt(age, 10);
            if (!isNaN(parsedAge)) {
                finalData.demographics.ageIndividualsCount += 1;
                finalData.demographics.ageTotal += parsedAge;
            }
        }

        if (race) {
            finalData.demographics.race[race] = (finalData.demographics.race[race] || 0) + 1; 
        }

        if (ethnicity) {
            finalData.demographics.ethnicity[ethnicity] = (finalData.demographics.ethnicity[ethnicity] || 0) + 1; 
        }

        if (insurance) {
            finalData.demographics.insurance[insurance] = (finalData.demographics.insurance[insurance] || 0) + 1; 
        }

        if (primaryCare) {
            finalData.demographics.primaryCare[primaryCare] = (finalData.demographics.primaryCare[primaryCare] || 0) + 1; 
        }

        if (chronicDiseases.length !== 0) {
            for (const disease of chronicDiseases) {
                finalData.demographics.chronicDiseases[disease] = (finalData.demographics.chronicDiseases[disease] || 0) + 1; 
            }
        }

        if (pharmacyReferral) {
            finalData.demographics.pharmacyReferral[pharmacyReferral] = (finalData.demographics.pharmacyReferral[pharmacyReferral] || 0) + 1; 
        }

        initialSurvey.forEach((survey: SDOH) => {
            Object.keys(survey).forEach(key => {
                if (key.startsWith('q')) {
                    const typedKey = key as keyof SDOH;
                    const value = survey[typedKey];
                    incrementCount(finalData.initialSurvey, typedKey, value);
                }
            });
        });

        // ---- Follow Up Survey ----
        followUpSurvey.forEach((survey: SDOH) => {
            Object.keys(survey).forEach(key => {
                if (key.startsWith('q')) {
                    const typedKey = key as keyof SDOH;
                    const value = survey[typedKey];
                    incrementCount(finalData.followUpSurvey, typedKey, value);
                }
            });
        });

        // Labs Outside Range
        if (labResultsOutsideRange) {
            finalData.labsOutsideRangeCount[labResultsOutsideRange] = (finalData.labsOutsideRangeCount[labResultsOutsideRange] || 0) + 1; 
        }

        // Meds Dosed Inappropriately
        if (medsCountDosedInapp) {
            finalData.medsDosedInappropriateCount += medsCountDosedInapp;
        };

        // Egfr 
        if (egfr !== 0) {
            finalData.egfrIndividualsCount += 1;
            finalData.egfrTotal += egfr;
        };

        // UACR
        if (uacr !== 0) {
            finalData.uacrIndividualsCount += 1;
            finalData.uacrTotal += uacr;
        };
    }

    return finalData;
};



// ------------- Counts ----------- //

export const surveyCounts = (initial: MoPilotInitial[], followUp: MoPilotFollowUp[]) => {
    // Track identifiers to determine complete surveys
    const initialIdentifiers = new Set<string>();
    const followUpIdentifiers = new Set<string>();
    const completeIdentifiers = new Set<string>();

    let counts = {
        initialSurveyCount: 0,
        initualUniqueSurveyCount: 0,  // Moved this after identifier processing
        followUpSurveyCount: 0,
        followUpUniqueSurveyCount: 0, // Moved this after identifier processing
        initialSiteCount: {} as Record<string, number>,
        followUpSiteCount: {} as Record<string, number>,
        completeSiteCount: {} as Record<string, number>,
    };

    // Array to hold ids and sites for identifiers in follow-up but not in initial
    const missingInInitial = [] as { id: string, site: string }[];

    // Process Initial Surveys
    for (const obj of initial) {
        const { location, identifier } = obj;

        counts.initialSurveyCount++;
        counts.initialSiteCount[location] = (counts.initialSiteCount[location] || 0) + 1;
        initialIdentifiers.add(identifier);
    }

    // Process Follow-Up Surveys
    for (const obj of followUp) {
        const { location, identifier } = obj;

        counts.followUpSurveyCount++;
        counts.followUpSiteCount[location] = (counts.followUpSiteCount[location] || 0) + 1;
        followUpIdentifiers.add(identifier);

        // Check if this identifier is not in initialIdentifiers
        if (!initialIdentifiers.has(identifier)) {
            missingInInitial.push({ id: identifier, site: location });
        }
    }

    // Determine complete surveys
    initialIdentifiers.forEach(identifier => {
        if (followUpIdentifiers.has(identifier)) {
            completeIdentifiers.add(identifier);
        }
    });

    // Update Complete Site Count
    for (const obj of initial) {
        const { location, identifier } = obj;
        if (completeIdentifiers.has(identifier)) {
            counts.completeSiteCount[location] = (counts.completeSiteCount[location] || 0) + 1;
        }
    }

    // Calculate the unique survey counts
    counts.initualUniqueSurveyCount = initialIdentifiers.size;
    counts.followUpUniqueSurveyCount = followUpIdentifiers.size;

    return { counts, missingInInitial };
};