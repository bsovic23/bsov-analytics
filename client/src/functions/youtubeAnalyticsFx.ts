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
    
    const sortedData = data.sort((a, b) => {
        return (b[variable] as number) - (a[variable] as number);
    });

    const top10 = sortedData.slice(0, 10);

    let top10Result: { [key: string]: YouTubeData } = {};

    for (const obj of top10) {
        const { "Video title": videoTitle } = obj;

        top10Result[videoTitle] = obj;
    }

    return top10Result;
};

// ----------
// Video Topic Views By Month
// ----------

export const youtubeTopicMonthFx = (data: YouTubeData[]) => {

};