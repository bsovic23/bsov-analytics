// -------------------------------------------
// Wild Apricot Functions
// -------------------------------------------

//  Interface Imports

import { WildApricotData, WildApricotPrevContacts, WildApricotDups, WildApricotMembershipLapsed } from '../typeScript/membership'

// ------ Wild Apricot Duplicates -------

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

// ------- Wild Apricot Lapsed Renewal ------

export const wildApricotMemberLapseFx = (data: WildApricotData[], prevContacts: WildApricotPrevContacts[]): WildApricotMembershipLapsed[] => {

    let membersLapsed: WildApricotMembershipLapsed[] = [];

    const daysSinceFx = (renewalDue: string, today: string): number => {
        const renewalDate = new Date(renewalDue);
        const currentDate = new Date(today);
        return Math.floor((currentDate.getTime() - renewalDate.getTime()) / (1000 * 60 * 60 * 24));
    };
    
    for (const obj of data) {
        const { 
            "User ID": userId, 
            "First name": firstName,
            "Last name": lastName,
            "Email": email,
            "Phone": phone,
            "Membership enabled": membershipEnabled,
            "Membership level": membershipLevel,
            "Membership status": membershipStatus,
            "Member since": memberSince,
            "Renewal due": renewalDue,
            "Renewal date since last changed": renewalDateLastChange,
        } = obj;

        const daysLapsed = daysSinceFx(renewalDue, new Date().toISOString().split('T')[0]);

        if (membershipStatus === 'Lapsed' && daysLapsed > 0 && daysLapsed < 31) {
            membersLapsed.push({
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                membershipEnabled: membershipEnabled,
                membershipLevel: membershipLevel,
                membershipStatus: membershipStatus,
                memberSince: memberSince,
                renewalDue: renewalDue,
                renewalDateLastChange: renewalDateLastChange,
                daysLapsed: daysLapsed,
            });
        }
    };

    return membersLapsed;
};