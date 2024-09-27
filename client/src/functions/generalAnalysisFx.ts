// ========================================================================================================================
//  General Analysis/Cleanup Functions
// ========================================================================================================================

import { 
  // Medication Clean Up
  Medications,
  MedicationsClean,

  // 
  EgfrDups,
  UacrDups,
  EgfrFollowUpDups,
  UacrFollowUpDups,
} from "../typeScript/generalAnalysis";

// Medication Clean Up

export const medicationCleanUpFx = (data: Medications[]): MedicationsClean => {
  let cleanMedData: MedicationsClean = {};

  for (const obj of data) {
    const { med, mrn, startDate, stopDate } = obj;
    const identifier = `${mrn}-${med}`;

    // Ignore entries without valid start and stop dates
    if (!startDate) continue;

    if (!cleanMedData[identifier]) {
      // Create new entry for mrn-med combination
      cleanMedData[identifier] = {
        mrn: mrn,
        medType: med,
        medStartDate: startDate,
        medStopDate: stopDate || "Still on medication", // Default to ongoing if no stopDate provided
      };
    } else {
      // Update the start date to the earliest date
      if (new Date(cleanMedData[identifier].medStartDate) > new Date(startDate)) {
        cleanMedData[identifier].medStartDate = startDate;
      }

      // Logic for stop date
      if (stopDate) {
        if (!cleanMedData[identifier].medStopDate || new Date(cleanMedData[identifier].medStopDate) < new Date(stopDate)) {
          cleanMedData[identifier].medStopDate = stopDate;
        }
      } else {
        // Ensure that ongoing medication status is protected
        cleanMedData[identifier].medStopDate = "Still on medication";
      }
    }
  }
  
  return cleanMedData;
};

// Duplicate Cleaning

export const dupLabClean = (data: Array<UacrFollowUpDups>): Array<{ mrn: number; date: string; value: number }> => {
  // Custom date parsing function
  const parseDate = (dateStr: string): Date | null => {
    const parsedDate = new Date(dateStr);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  // Parse dates and filter out invalid ones, then sort by MRN and date descending
  const parsedData = data
    .map(d => ({ ...d, parsedDate: parseDate(d.followUpUACRDate) }))
    .filter(d => d.parsedDate !== null)
    .sort((a, b) => (b.parsedDate as Date).getTime() - (a.parsedDate as Date).getTime() || b.mrn - a.mrn);

  const result = new Map<number, { mrn: number; date: string; value: number }>();

  // Filter for most recent non-blank value per MRN
  parsedData.forEach(item => {
    if (item.followUpUACRValue !== undefined && item.followUpUACRValue !== null && !result.has(item.mrn)) {
      result.set(item.mrn, { mrn: item.mrn, date: item.followUpUACRDate, value: item.followUpUACRValue });
    }
  });

  return Array.from(result.values());
};