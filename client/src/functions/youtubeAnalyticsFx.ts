import { YouTubeData } from "../typeScript/youtube";

// ==================================================================
// YouTube Analytics Functions
// ==================================================================

// ----------
// YouTube Topic Count
// ----------

export const youtubeTopicCountFx = (data: YouTubeData[]) => {
    let topicCount: { [topic: string]: number } = {};

    for (const obj of data) {
        const { "Topic": topic } = obj;

        if (!topicCount[topic]) {
            topicCount[topic] = 0;
        }

        topicCount[topic] ++;
    }

    return topicCount;
};

// ----------
// Top 10 Videos By FY
// ----------

export const youtubeTop10Fx = (data: YouTubeData[], variable: keyof YouTubeData) => {
    // Check if the variable is numeric to avoid sorting issues
    const isNumeric = (value: any) => !isNaN(Number(value));

    const sortedData = data.sort((a, b) => {
        // Ensure both fields are numbers if required
        const aVal = isNumeric(a[variable]) ? Number(a[variable]) : 0;
        const bVal = isNumeric(b[variable]) ? Number(b[variable]) : 0;

        return bVal - aVal; // Descending sort
    });

    // Get the top 10 items
    const top10 = sortedData.slice(0, 10);

    // Create a result that maps video titles to the selected numeric variable (e.g., Views)
    let top10Result: { [key: string]: number } = {};

    for (const obj of top10) {
        const videoTitle = obj["Video title"];
        const value = isNumeric(obj[variable]) ? Number(obj[variable]) : 0;

        // Map video title to the numeric value
        top10Result[videoTitle] = value;
    }

    return top10Result; // This now maps video titles to values for the chart
};

// ----------
// Video Topic Views By FY
// ----------

export const youtubeViewsByFiscalYearFx = (data: YouTubeData[]) => {
    const fiscalYears = {
        FY20: 0,
        FY21: 0,
        FY22: 0,
        FY23: 0,
        FY24: 0,
        FY25: 0,
    };

    for (const obj of data) {
        const { "Video publish time": publishTime, Views } = obj;
        
        // Convert the "Video publish time" to a Date object
        const publishDate = new Date(publishTime);
        const year = publishDate.getFullYear();
        const month = publishDate.getMonth() + 1; // Month is 0-indexed in JS

        // Determine the fiscal year based on the publish date
        if (year === 2019 && month >= 4 || year === 2020 && month <= 3) {
            fiscalYears.FY20 += Views;
        } else if (year === 2020 && month >= 4 || year === 2021 && month <= 3) {
            fiscalYears.FY21 += Views;
        } else if (year === 2021 && month >= 4 || year === 2022 && month <= 3) {
            fiscalYears.FY22 += Views;
        } else if (year === 2022 && month >= 4 || year === 2023 && month <= 3) {
            fiscalYears.FY23 += Views;
        } else if (year === 2023 && month >= 4 || year === 2024 && month <= 3) {
            fiscalYears.FY24 += Views;
        } else if (year === 2024 && month >= 4 || year === 2025 && month <= 3) {
            fiscalYears.FY25 += Views;
        }
    }

    return fiscalYears;
};

// ----------
// Top five Topic Count Videos by FY
// ----------



// ----------
// Top five Topic Views by FY
// ----------