// Interface inports

import {
    GoogleAnalyticsMapping,
    GoogleAnalyticsImport,
    GoogleAnalyticsDataClean,
} from '../typeScript/googleAnalytics';

// ==================================================================
// Google Analytics Functions
// ==================================================================

// ----------
// Google Analytics Import + Mapping Cleaned Up Merge 
// ----------

export const googleAnalyticsCleanFx = (
    importData: GoogleAnalyticsImport[], 
    mappingData: GoogleAnalyticsMapping[]
) => {

    let cleanData: { [currentPage: string]: GoogleAnalyticsDataClean[string] } = {};

    for (const obj of mappingData) {
        const {
            "Topic(s)": topics,
            "Subtopics": subtopics,
            "Design": design,
            "Group": group,
            "Current Page Path": currentPage,
            "Old Page Path": oldPage,
            "Deleted/Combined Page Path": archivedPage,
        } = obj;

        // Initialize cleanData for the current page if not already initialized
        if (!cleanData[currentPage]) {
            cleanData[currentPage] = {
                topics: topics ? topics.split(',') : [],
                subtopics: subtopics ? subtopics.split(',') : [],
                design: design || '',
                group: group || '',
                currentPage: currentPage,
                oldPage: oldPage || '',
                additionalPage: archivedPage ? archivedPage.split(',') : [],
                views: 0,
                users: 0,
                avgEngagementTime: 0,
                eventCount: 0,
                keyEvents: 0,
            }
        }
    }

    for (const obj of importData) {
        const {
            "Page path and screen class": pagePath,
            "Views": views,
            "Users": users,
            "Average engagement time": avgEngagementTime,
            "Event count": eventCount,
            "Key events": keyEvents,
        } = obj;

        let matchingPage = Object.keys(cleanData).find(key => {
            const data = cleanData[key];
            return data.currentPage === pagePath ||
                data.oldPage === pagePath ||
                data.additionalPage.includes(pagePath);
        });

        if (matchingPage) {
            cleanData[matchingPage].views += views;
            cleanData[matchingPage].users += users;  // Update to `users`
            cleanData[matchingPage].avgEngagementTime += avgEngagementTime;  // Corrected
            cleanData[matchingPage].eventCount += eventCount;  // Corrected
            cleanData[matchingPage].keyEvents += keyEvents;  // Corrected
        } else {
            cleanData[pagePath] = {
                topics: [],
                subtopics: [],
                design: '',
                group: '',
                currentPage: pagePath,
                oldPage: '',
                additionalPage: [],
                views: views,
                users: users,
                avgEngagementTime: avgEngagementTime,
                eventCount: eventCount,
                keyEvents: keyEvents,
            }
        }
    }

    return cleanData;
};


// ----------
// Google Analytics Totals 
// ----------

export const googleAnalyticsTotals = (
    data: GoogleAnalyticsDataClean, 
    variableOne?: string,  // Make this optional
    variableTwo?: string   // Make this optional
) => {
    let result: { [key: string]: number } = {};

    if (variableOne && variableTwo) {
        // Bivariate analysis: Sum views/users for each topic, subtopic, design, or group
        for (const page in data) {
            const entry = data[page];

            let key = '';
            if (variableTwo === 'topics') key = entry.topics.join(', ');
            else if (variableTwo === 'subtopics') key = entry.subtopics.join(', ');
            else if (variableTwo === 'design') key = entry.design;
            else if (variableTwo === 'group') key = entry.group;

            if (!result[key]) {
                result[key] = 0;
            }

            if (variableOne === 'views') {
                result[key] += entry.views;
            } else if (variableOne === 'users') {
                result[key] += entry.users;
            }
        }
    } else if (variableOne) {
        // Univariate analysis: Sum views or users across all entries
        let total = 0;
        for (const page in data) {
            const entry = data[page];

            if (variableOne === 'views') {
                total += entry.views;
            } else if (variableOne === 'users') {
                total += entry.users;
            }
        }

        result[variableOne] = total;
    } else if (variableTwo) {
        // Analysis by variableTwo only: Count occurrences of each category in variableTwo
        for (const page in data) {
            const entry = data[page];

            let key = '';
            if (variableTwo === 'topics') key = entry.topics.join(', ');
            else if (variableTwo === 'subtopics') key = entry.subtopics.join(', ');
            else if (variableTwo === 'design') key = entry.design;
            else if (variableTwo === 'group') key = entry.group;

            if (!result[key]) {
                result[key] = 0;
            }

            result[key] += 1;  // Increment count for this category
        }
    }

    return result;
};