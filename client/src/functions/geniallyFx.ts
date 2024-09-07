// Imports

import { Genially } from "../typeScript/genially";


// Functions

// Topics Count

export const geniallyTopicFx = (data: Genially[]) => {
    
    let topicsCount: { [key: string]: number } = {};

    for (const obj of data) {
        const { topic } = obj;

        if (!topicsCount[topic]) {
            topicsCount[topic] = 0;
        }

        topicsCount[topic] += 1;
    }

    return topicsCount;
}

// Page Views By Month

type MonthName = 
    | "January" 
    | "February" 
    | "March" 
    | "April" 
    | "May" 
    | "June" 
    | "July" 
    | "August" 
    | "September" 
    | "October" 
    | "November" 
    | "December";

    export const geniallyMonthViewsFx = (data: Genially[]) => {
        let monthViewsCount: Record<MonthName, number> = {
            "January": 0,
            "February": 0,
            "March": 0,
            "April": 0,
            "May": 0,
            "June": 0,
            "July": 0,
            "August": 0,
            "September": 0,
            "October": 0,
            "November": 0,
            "December": 0,
        };
    
        for (const obj of data) {
            const { firstAccessed } = obj;
    
            let month: MonthName | "" = "";
    
            if (isNaN(Date.parse(firstAccessed))) {
                // Attempt to parse date in format "dd/MM/yyyy"
                const dateParts = firstAccessed.split("/");
                if (dateParts.length === 3) {
                    const monthNumber = parseInt(dateParts[1], 10);
                    month = new Date(2024, monthNumber - 1).toLocaleString('en-US', { month: 'long' }) as MonthName;
                }
            } else {
                // Parse date assuming it's in a standard format like "Tue Dec 03 2024 19:00:00 GMT-0500 (Eastern Standard Time)"
                const parsedDate = new Date(firstAccessed);
                month = parsedDate.toLocaleString('en-US', { month: 'long' }) as MonthName;
            }
    
            if (month) {
                monthViewsCount[month] += 1;
            }
        }
    
        return monthViewsCount;
    };



// Completion Rate By Topic



// View Time By Topic