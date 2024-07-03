// -------------------------------------------
// Wild Apricot Functions
// -------------------------------------------

// Interface Imports
import { WildApricotData, WildApricotDups, WildApricotMembershipLapsed } from '../typeScript/membership'

// Wild Apricot Duplicates

export const wildApricotDupsFx = (data: WildApricotData[]): WildApricotDups => {
    let wildApricotDataClean: WildApricotDups = {};

    for (const obj of data) {
        const { 'User ID': userId, 'First name': firstName, 'Last name': lastName, 'Email': email } = obj;
        let uniqueId = `${firstName}-${lastName}-${email}`;

        if (!wildApricotDataClean[uniqueId]) {
            wildApricotDataClean[uniqueId] = {
                dupCount: 0,
                ids: [],
            };
        }

        wildApricotDataClean[uniqueId].dupCount++;
        wildApricotDataClean[uniqueId].ids.push(userId);
    }

    let dupReviews: WildApricotDups = {};
    for (const key in wildApricotDataClean) {
        if (wildApricotDataClean[key].dupCount > 1) {
            dupReviews[key] = wildApricotDataClean[key];
        }
    }

    return dupReviews;
};


// Wild Apricot Lapsed Renewal

export const wildApricotMemberLapseFx = (data: WildApricotData[]): WildApricotMembershipLapsed => {

    let membersLapsed: WildApricotMembershipLapsed = {};

    return membersLapsed;
};