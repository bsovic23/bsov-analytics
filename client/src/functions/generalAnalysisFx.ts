// ========================================================================================================================
//  General Analysis/Cleanup Functions
// ========================================================================================================================

import { KlcEmailList, KlcEmailListClean } from "../typeScript/generalAnalysis";

// ===== KLC ==============================================================================================================

export const klcEmailListFx = (data: KlcEmailList[]): KlcEmailListClean => {

  let cleanKlcList: KlcEmailListClean = {};

  for (const obj of data) {
    const { firstName, lastName, email, dateAccess } = obj;

    // Clean data
    const date = new Date(dateAccess);

    // Extract components
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the date as MM/DD/YYYY
    const formattedDate = `${month}/${day}/${year}`;

    // Initialize the email property as an object if it doesn't exist
    if (!cleanKlcList[email]) {
      cleanKlcList[email] = { firstName, lastName, email, dateAccessTotal: 0, firstContact: '', lastContact: '', dates: [] };
    }

    // Push the dateAccess to the dates array
    if (formattedDate !== 'NaN/NaN/NaN' && !cleanKlcList[email].dates.some(dateObj => dateObj.formattedDate === formattedDate)) {
      cleanKlcList[email].dates.push({ formattedDate: formattedDate });
      cleanKlcList[email].dateAccessTotal ++;
    }
  };

    // Sort dates oldest to newest
    for (const email in cleanKlcList) {
      cleanKlcList[email].dates.sort((a, b) => {
        const dateA = new Date(a.formattedDate);
        const dateB = new Date(b.formattedDate);
        return dateA.getTime() - dateB.getTime();
      });
    }

  let filteredKlcList: KlcEmailListClean = {};

  for (const email in cleanKlcList) {
    if (cleanKlcList[email].dates.length > 1) {
      filteredKlcList[email] = cleanKlcList[email];
    }
  }

  for (const email in filteredKlcList) {
    
    filteredKlcList[email].firstContact = filteredKlcList[email].dates[0].formattedDate;
    filteredKlcList[email].lastContact = filteredKlcList[email].dates[filteredKlcList[email].dates.length-1].formattedDate;
  }

  return filteredKlcList;
}
