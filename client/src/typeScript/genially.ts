//


export interface Genially {
    topic: string,
    viewingTime: string,
    pagesViewed: string,
    firstAccessed: string,
    questionsComplete: string,
    questionsCorrect: string,
};

export interface GeniallyAnalysis {
    topicCount: Record<string, number>,
}
