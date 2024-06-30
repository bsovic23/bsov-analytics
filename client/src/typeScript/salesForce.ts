// ---------------------
// Data Imports 
// ---------------------

export interface WildApricotdata {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    category: string;
    salesForceId: string;
    recentSalesForceId: string;
}

export interface SalesForceData { 
    contactId: string;
    firstName: string;
    lastName: string;
    email: string;
    memberType: string;
}

export type MatchedPx = {
    [key: string]: MatchedData;
};

export interface MatchedData {
    wildApricot: { sfId: string; sfIdRecent: string }[];
    salesForce: { contactId: string }[];
}
