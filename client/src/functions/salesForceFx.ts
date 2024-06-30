// SalesForce Cleanup Functions

import {
    WildApricotdata,
    SalesForceData,

    MatchedPx
} from '../typeScript/salesForce';

export const dupsFunction = (data1: WildApricotdata[], data2: SalesForceData[]) => {
    let wildApricotIds: { id: string; sfId: string; sfIdRecent: string }[] = [];
    let salesForceIds: { id: string; contactId: string }[] = [];

    let matchedPx: MatchedPx = {};

    for (const obj of data1) {
        let id = `${obj.firstName}-${obj.lastName}`;
        let sfId = obj.salesForceId;
        let sfIdRecent = obj.recentSalesForceId;

        wildApricotIds.push({ id, sfId, sfIdRecent });
    }

    for (const obj of data2) {
        let id = `${obj.firstName}-${obj.lastName}`;
        let contactId = obj.contactId;

        salesForceIds.push({ id, contactId });
    }

    for (const obj of wildApricotIds) {
        let id = obj.id;

        if (!matchedPx[id]) {
            matchedPx[id] = {
                wildApricot: [],
                salesForce: []
            }
        }

        matchedPx[id].wildApricot.push({ sfId: obj.sfId, sfIdRecent: obj.sfIdRecent })
    };

    for (const obj of salesForceIds) {
        let id = obj.id;

        if (!matchedPx[id]) {
            matchedPx[id] = {
                wildApricot: [],
                salesForce: []
            }
        }

        matchedPx[id].salesForce.push({ contactId: obj.contactId })
    }

    let filteredMatchedPx: MatchedPx = {};
    
    for (const id in matchedPx) {
        if (matchedPx[id].wildApricot.length !== 1 || matchedPx[id].salesForce.length !== 1) {
            filteredMatchedPx[id] = matchedPx[id];
        }
    }

    const sortedMatchedPx: MatchedPx = {};
    Object.keys(filteredMatchedPx)
        .sort((a, b) => a.localeCompare(b))
        .forEach(key => {
            sortedMatchedPx[key] = filteredMatchedPx[key];
        });

    return sortedMatchedPx;
};

