
import { NkfAnalyticsData } from '../typeScript/nkfAnalytics';

export const nkfAnalyticsTopicFx = (data: NkfAnalyticsData[]) => {
    let finalData: { [topic: string]: { [source: string]: number } } = {};

    // Helper function to capitalize the first letter of each word
    const capitalize = (str: string) => {
        return str
            .toLowerCase() // Convert the entire string to lowercase
            .split(' ')     // Split by space for multiple words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
            .join(' ');     // Rejoin the words
    };

    for (const obj of data) {
        const { source, topic } = obj;

        // Split the topic if it's a comma-separated string and trim whitespace
        const topics = topic.split(',').map(t => capitalize(t.trim()));

        // Iterate through each topic and update the count in finalData
        for (const t of topics) {
            if (!finalData[t]) {
                // If the topic doesn't exist in finalData, initialize it
                finalData[t] = {};
            }

            if (!finalData[t][source]) {
                // If the source doesn't exist for this topic, initialize it with a count of 0
                finalData[t][source] = 0;
            }

            // Increment the count for the topic and source
            finalData[t][source] += 1;
        }
    }

    return finalData;
};



// Enrollments By FY

export const nkfAnalyticsEnrollmentsFx = (data: NkfAnalyticsData[]) => {
    // Object to store the final data, where each fiscal year contains an object of sources and their enrollments
    let finalData: { [fiscalYear: string]: { [source: string]: number } } = {};

    for (const obj of data) {
        const { source, enrollments, fiscalYear } = obj;

        // If the fiscalYear doesn't exist in finalData, initialize it
        if (!finalData[fiscalYear]) {
            finalData[fiscalYear] = {};
        }

        // If the source for this fiscalYear doesn't exist, initialize it with a count of 0
        if (!finalData[fiscalYear][source]) {
            finalData[fiscalYear][source] = 0;
        }

        // Increment the enrollments for this fiscal year and source
        finalData[fiscalYear][source] += enrollments;
    }

    return finalData;
};


// Completions By FY

export const nkfAnalyticsCompletionsFx = (data: NkfAnalyticsData[]) => {
    // Object to store the final data, where each fiscal year contains an object of sources and their enrollments
    let finalData: { [fiscalYear: string]: { [source: string]: number } } = {};

    for (const obj of data) {
        const { source, completions, fiscalYear } = obj;

        // If the fiscalYear doesn't exist in finalData, initialize it
        if (!finalData[fiscalYear]) {
            finalData[fiscalYear] = {};
        }

        // If the source for this fiscalYear doesn't exist, initialize it with a count of 0
        if (!finalData[fiscalYear][source]) {
            finalData[fiscalYear][source] = 0;
        }

        // Increment the enrollments for this fiscal year and source
        finalData[fiscalYear][source] += completions;
    }

    return finalData;
};


// Source By FY

export const nkfAnalyticsFYFx = (data: NkfAnalyticsData[]) => {
    // Object to store the final data, where each fiscal year contains an object of sources and their enrollments
    let finalData: { [fiscalYear: string]: { [source: string]: number } } = {};

    for (const obj of data) {
        const { source, fiscalYear } = obj;

        // If the fiscalYear doesn't exist in finalData, initialize it
        if (!finalData[fiscalYear]) {
            finalData[fiscalYear] = {};
        }

        // If the source for this fiscalYear doesn't exist, initialize it with a count of 0
        if (!finalData[fiscalYear][source]) {
            finalData[fiscalYear][source] = 0;
        }

        // Increment the enrollments for this fiscal year and source
        finalData[fiscalYear][source] += 1;
    }

    return finalData;
};