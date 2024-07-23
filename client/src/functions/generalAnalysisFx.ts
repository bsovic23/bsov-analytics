// ========================================================================================================================
//  General Analysis/Cleanup Functions
// ========================================================================================================================

import { KlcEmailList, 
  KlcEmailListClean,
  Katey715,
  Katey715Clean,
  EnrollmentReport718,
  RegistrationReport718,
  CleanedList718
} from "../typeScript/generalAnalysis";

// ===== KLC ==============================================================================================================


// == KLC Email List Clean Up == 

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

// == KLC Cleanup == 

export const salesforceKLCFx = (enrollData: EnrollmentReport718[], regisData: RegistrationReport718[] ) => {
  let cleanDataFinal: CleanedList718 = {};

  for (const obj of enrollData) {
    let uniqueIdentifier = 'insert unique identifier of course-firstname-lastname';

    if (!uniqueIdentifier) {
      
    }
  };

  return cleanDataFinal;
}