// Google Analytics


// Import Data and Mapping Data

export interface GoogleAnalyticsMapping {
    "Topic(s)": string,
    "Subtopics": string,
    "Design": string,
    "Group": string,
    "Current Page Path": string,
    "Old Page Path": string,
    "Deleted/Combined Page Path": string,
};

export interface GoogleAnalyticsImport {
    "Page path and screen class": string,
    "Views": number,
    "Users": number,
    "Views per user": number,
    "Average engagement time": number,
    "Event count": number,
    "Key events": number,
    "Total revenue": number,
}

// Clean Google Analytics Data

export interface GoogleAnalyticsDataClean {
    [currentPage: string]: {
        topics: string[],
        subtopics: string[],
        design: string,
        group: string,
        currentPage: string,
        oldPage: string;
        additionalPage: string[],
        views: number,
        users: number,
        avgEngagementTime: number,
        eventCount: number,
        keyEvents: number,
    }
}
