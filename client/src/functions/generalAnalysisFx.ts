// ========================================================================================================================
//  General Analysis/Cleanup Functions
// ========================================================================================================================

import { 
  // KLC
  KlcEmailList, 
  KlcEmailListClean,
  Katey715,
  Katey715Clean,
  EnrollmentReport718,
  RegistrationReport718,
  CleanedList718,

  // Megan
  MeganAnalysis,
} from "../typeScript/generalAnalysis";

// ===== KLC ==============================================================================================================


// == KLC Email List Clean Up == 
/*

export const klcEmailListFx = (data: KlcEmailList[]): KlcEmailListClean => {
  let cleanKlcList: KlcEmailListClean = {};

  for (const obj of data) {
    const { firstName, lastName, email, state, country, member, dateAccess, courseComplete, courseName, courseId } = obj;

    const date = new Date(dateAccess);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;

    if (!cleanKlcList[email]) {
      cleanKlcList[email] = { 
        firstName, lastName, state, country, member, email, dateAccessTotal: 0, 
        coursesComplete: 0, firstContact: '', lastContact: '', dates: [], 
        courseCompleteNames: [], courseCompleteNumbers: [], courseNonCompleteNames: [], courseNonCompleteNumbers: [] 
      };
    }

    if (formattedDate !== 'NaN/NaN/NaN' && !cleanKlcList[email].dates.some(dateObj => dateObj.formattedDate === formattedDate)) {
      cleanKlcList[email].dates.push({ formattedDate });
      cleanKlcList[email].dateAccessTotal++;

      if (courseComplete) {
        cleanKlcList[email].coursesComplete++;
      }
    }

    if (courseComplete) {
      cleanKlcList[email].courseCompleteNumbers.push({ course: courseId });
      cleanKlcList[email].courseCompleteNames.push({ course: courseName });
    } else {
      cleanKlcList[email].courseNonCompleteNumbers.push({ course: courseId });
      cleanKlcList[email].courseNonCompleteNames.push({ course: courseName });
    }
  }

  for (const email in cleanKlcList) {
    cleanKlcList[email].dates.sort((a, b) => {
      const dateA = new Date(a.formattedDate);
      const dateB = new Date(b.formattedDate);
      return dateA.getTime() - dateB.getTime();
    });
  }

  let filteredKlcList: KlcEmailListClean = {};

  for (const email in cleanKlcList) {
    if (cleanKlcList[email].dates.length > 1 || cleanKlcList[email].coursesComplete > 1) {
      filteredKlcList[email] = cleanKlcList[email];
    }
  }

  for (const email in filteredKlcList) {
    filteredKlcList[email].firstContact = filteredKlcList[email].dates[0].formattedDate;
    filteredKlcList[email].lastContact = filteredKlcList[email].dates[filteredKlcList[email].dates.length - 1].formattedDate;
  }

  return filteredKlcList;
};


// == KLC 715 List Clean Up == 

export const list715fx = (data: Katey715[] ): Katey715Clean => {

    let finalData: Katey715Clean = {};

    for (const obj of data) {
      const { resourceName, courseId, complete, firstName, lastName, email, member } = obj;
    
      if (!finalData[email]) {
        finalData[email] = {
          email: email,
          firstName: firstName,
          lastName: lastName,
          member: member,
          coursesComplete: 0,
          situationA: false,
          situationB: false,
          courseNameRegister: [],
          courseNameComplete: [],
          courseIdRegister: [],
          courseIdComplete: [],
        }
      }

      if (complete) {
        finalData[email].coursesComplete += 1;
        finalData[email].courseNameComplete.push({ course: resourceName });
        finalData[email].courseIdComplete.push({ course: courseId });
      } else {
        finalData[email].courseNameRegister.push({ course: resourceName });
        finalData[email].courseIdRegister.push({ course: courseId });
      }
    };

    for (const email in finalData) {
      if (finalData[email].coursesComplete === 0) {
          finalData[email].situationB = true;
      } else if (finalData[email].coursesComplete > 0) {
          finalData[email].situationA = true;
      }
    }

    return finalData;  
}
*/

// == KLC Cleanup == 

const raceEthnicityMap: { [key: string]: string } = {
  '1': 'American Indian or Alaska Native',
  '2': 'Asian',
  '3': 'Black or African American',
  '4': 'Hispanic or Latino',
  '5': 'Native Hawaiian or Other Pacific Islander',
  '6': 'White',
  '7': 'Prefer not to answer'
};

const convertRaceEthnicity = (codes: string): string => {
  // Split the input string by commas, spaces, or brackets, filter out empty values, and map to descriptions
  return codes
    .split(/[\[\], ]+/)
    .filter(code => code) // Remove empty strings
    .map(code => raceEthnicityMap[code])
    .filter(Boolean) // Remove undefined values in case of invalid codes
    .join(', ');
};

export const salesforceKLCFx = (regisData: RegistrationReport718[], enrollData: EnrollmentReport718[]) => {
  const cleanedList: CleanedList718 = {};
  const enrollmentMap: { [key: string]: EnrollmentReport718 } = {};

  // Populate the hash map with enrollData
  enrollData.forEach(enrollment => {
      const enrollIdentifier = `${enrollment['Resource Name']}-${enrollment.Email}`;
      enrollmentMap[enrollIdentifier] = enrollment;
  });

  regisData.forEach(registration => {
      const regIdentifier = `${registration['Course Name']}-${registration.Email}`;
      const enrollment = enrollmentMap[regIdentifier];

      if (enrollment) {
          const uniqueIdentifier = regIdentifier;

          cleanedList[uniqueIdentifier] = {
              uniqueIdentifier: uniqueIdentifier,
              'First Name': enrollment['First Name'],
              'Last Name': enrollment['Last Name'],
              Email: enrollment.Email,
              City: enrollment.City,
              Country: enrollment.Country,
              'Course Name': registration['Course Name'],
              'Course Id': parseInt(enrollment['Course Id']),
              Complete: enrollment.Complete,
              'Address 1': enrollment['Address 1'],
              'Address 2': enrollment['Address 2'],
              State: enrollment.State,
              'Postal Code': enrollment['Postal Code'],
              Member: enrollment.Member,
              'Completion Date': enrollment['Date Registered'], // Assuming 'Date Registered' is used as 'Completion Date'
              'Registration Date': enrollment['Date Registered'],
              'Preferred Language': registration['Preferred Language'],
              'What best describes you?': registration['What best describes you?'],
              'What is your current connection to kidney disease?': registration['What is your current connection to kidney disease?'],
              'If you are a kidney patient, do you know the stage/type of your disease?': registration['If you are a kidney patient, do you know the stage/type of your disease?'],
              'If you know the cause of your kidney disease, please note it below:': registration['If you know the cause of your kidney disease, please note it below:'],
              'What type of dialysis treatment are you receiving?': registration['What type of dialysis treatment are you receiving?'],
              'What type of transplant did you receive?': registration['What type of transplant did you receive?'],
              'What is your transplant status?': registration['What is your transplant status?'],
              'Have you received any other treatment for your kidney disease in the past?': registration['Have you received any other treatment for your kidney disease in the past?'],
              'Name of transplant center:': registration['Name of transplant center:'],
              'Date of transplant:': registration['Date of transplant:'],
              'Which gender do you identify with?': registration['Which gender do you identify with?'],
              'What is the highest grade or year of school that you have completed?': registration['What is the highest grade or year of school that you have completed?'],
              'What is your current employment status?': registration['What is your current employment status?'],
              'How would you describe your race or ethnicity? Please select all that apply': convertRaceEthnicity(registration['How would you describe your race or ethnicity? Please select all that apply']),
          };
      }
  });

  return cleanedList;
};


// == Megan Analysis == 

export const analysisMegan = (data: MeganAnalysis[]) => {
  let finalCounts: any = {
    form1_numerator: 0,
    form1_denominator: 0,
    form2_numerator: 0,
    form2_denominator: 0,
    form3_numerator: 0,
    form3_denominator: 0,
    form4_numerator: 0,
    form4_denominator: 0,
    form5: 0,
    form6: 0,
    form7: 0,
    form8: 0,
    sites: {}
  };

  for (const obj of data) {
    const { site, age, diabetes, hypertension, dia_htn_one, dia_htn_both, egfr_last12, recent_egfr, uacr_last12, recent_uacr, no_ckd } = obj;

    // Ensure the site is tracked in finalCounts.sites
    if (!finalCounts.sites[site]) {
      finalCounts.sites[site] = {
        form1_numerator: 0,
        form1_denominator: 0,
        form2_numerator: 0,
        form2_denominator: 0,
        form3_numerator: 0,
        form3_denominator: 0,
        form4_numerator: 0,
        form4_denominator: 0,
        form1_percentage: 0,
        form2_percentage: 0,
        form3_percentage: 0,
        form4_percentage: 0,
      };
    }

    // FORM 1
    if (age > 17 && age < 85 && !no_ckd) {
      finalCounts.form1_numerator += 1;
      finalCounts.sites[site].form1_numerator += 1;
    }
    if (age > 17 && age < 85 && !no_ckd && recent_egfr < 60) {
      finalCounts.form1_denominator += 1;
      finalCounts.sites[site].form1_denominator += 1;
    }

    // FORM 2
    if (age > 17 && age < 85 && recent_egfr < 60 && uacr_last12) {
      finalCounts.form2_numerator += 1;
      finalCounts.sites[site].form2_numerator += 1;
    }
    if (age > 17 && age < 85 && recent_egfr < 60) {
      finalCounts.form2_denominator += 1;
      finalCounts.sites[site].form2_denominator += 1;
    }

    // FORM 3
    if (age > 17 && age < 85 && (dia_htn_both || dia_htn_one) && (uacr_last12 && egfr_last12)) {
      finalCounts.form3_numerator += 1;
      finalCounts.sites[site].form3_numerator += 1;
    }
    if (age > 17 && age < 85 && (dia_htn_both || dia_htn_one)) {
      finalCounts.form3_denominator += 1;
      finalCounts.sites[site].form3_denominator += 1;
    }

    // FORM 4
    if (age > 17 && age < 85 && diabetes && (uacr_last12 && egfr_last12)) {
      finalCounts.form4_numerator += 1;
      finalCounts.sites[site].form4_numerator += 1;
    }
    if (age > 17 && age < 85 && diabetes) {
      finalCounts.form4_denominator += 1;
      finalCounts.sites[site].form4_denominator += 1;
    }

    // FORM 5
    if (age > 17 && age < 85 && recent_egfr < 60) {
      finalCounts.form5 += 1;
    }

    // FORM 6
    if (age > 17 && age < 85 && (dia_htn_both || dia_htn_one)) {
      finalCounts.form6 += 1;
    }

    // FORM 7
    if (age > 17 && age < 85 && diabetes) {
      finalCounts.form7 += 1;
    }

    // FORM 8
    if (age > 17 && age < 85 && !no_ckd) {
      finalCounts.form8 += 1;
    }
  }

  // Calculate percentages for each site
  for (const site in finalCounts.sites) {
    const siteData = finalCounts.sites[site];

    siteData.form1_percentage = siteData.form1_denominator > 0
      ? (siteData.form1_numerator / siteData.form1_denominator) * 100
      : 0;

    siteData.form2_percentage = siteData.form2_denominator > 0
      ? (siteData.form2_numerator / siteData.form2_denominator) * 100
      : 0;

    siteData.form3_percentage = siteData.form3_denominator > 0
      ? (siteData.form3_numerator / siteData.form3_denominator) * 100
      : 0;

    siteData.form4_percentage = siteData.form4_denominator > 0
      ? (siteData.form4_numerator / siteData.form4_denominator) * 100
      : 0;
  }

  return finalCounts;
};