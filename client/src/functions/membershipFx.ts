// -------------------------------------------
// Wild Apricot Functions
// -------------------------------------------

//  Interface Imports

import { WildApricotData, WildApricotPrevContacts, WildApricotDups, WildApricotMembershipLapsed } from '../typeScript/membership'
import { WildApricotdata } from '../typeScript/salesForce';

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
            "Professional Category": professionalCategory,
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
                professionalCategory: professionalCategory,
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

// ------- Wild Apricot Y/Y Analysis ------

export const wildApricotYearAnalysis = (data: WildApricotData[]) => {
    let finalData: Record<string, any> = {
        total: {
            memberActiveByYear: {
                yearPre2000: 0,
                year2000_2005: 0,
                year2010_2015: 0,
                year2015_2019: 0,
                year2020: 0,
                year2021: 0,
                year2022: 0,
                year2023: 0,
                year2024: 0
            },
            memberJoinedYear: {
                yearPre2000: 0,
                year2000_2005: 0,
                year2010_2015: 0,
                year2015_2019: 0,
                year2020: 0,
                year2021: 0,
                year2022: 0,
                year2023: 0,
                year2024: 0
            },
            lapsedYear: {
                yearPre2000: 0,
                year2000_2005: 0,
                year2010_2015: 0,
                year2015_2019: 0,
                year2020: 0,
                year2021: 0,
                year2022: 0,
                year2023: 0,
                year2024: 0
            },
        }
    };

    const getYearCategory = (year: number): keyof typeof finalData['total']['memberActiveByYear'] | undefined => {
        if (year < 2000) return 'yearPre2000';
        if (year <= 2005) return 'year2000_2005';
        if (year <= 2015) return 'year2010_2015';
        if (year <= 2019) return 'year2015_2019';
        if (year === 2020) return 'year2020';
        if (year === 2021) return 'year2021';
        if (year === 2022) return 'year2022';
        if (year === 2023) return 'year2023';
        if (year === 2024) return 'year2024';
        return undefined; // Handle any unexpected years
    };

    for (const obj of data) {
        const { 
            "Professional Category": professionalCategory,
            "Membership status": membershipStatus,
            "Member since": memberSince,
            "Renewal due": renewalDue,
        } = obj;

        // Parse dates
        const memberSinceYear = new Date(memberSince).getFullYear();
        const renewalDueYear = renewalDue ? new Date(renewalDue).getFullYear() : null;

        // Ensure there's a category for this professionalCategory in finalData
        if (!finalData[professionalCategory]) {
            finalData[professionalCategory] = {
                memberActiveByYear: {
                    yearPre2000: 0,
                    year2000_2005: 0,
                    year2010_2015: 0,
                    year2015_2019: 0,
                    year2020: 0,
                    year2021: 0,
                    year2022: 0,
                    year2023: 0,
                    year2024: 0
                },
                memberJoinedYear: {
                    yearPre2000: 0,
                    year2000_2005: 0,
                    year2010_2015: 0,
                    year2015_2019: 0,
                    year2020: 0,
                    year2021: 0,
                    year2022: 0,
                    year2023: 0,
                    year2024: 0
                },
                lapsedYear: {
                    yearPre2000: 0,
                    year2000_2005: 0,
                    year2010_2015: 0,
                    year2015_2019: 0,
                    year2020: 0,
                    year2021: 0,
                    year2022: 0,
                    year2023: 0,
                    year2024: 0
                }
            };
        }

        // Member Joined Year
        const joinedCategory = getYearCategory(memberSinceYear);
        if (joinedCategory) {
            finalData.total.memberJoinedYear[joinedCategory]++;
            finalData[professionalCategory].memberJoinedYear[joinedCategory]++;
        }

        // Member Active By Year
        if (membershipStatus === 'Active') {
            for (let year = memberSinceYear; year <= 2024; year++) {
                const activeCategory = getYearCategory(year);
                if (activeCategory) {
                    finalData.total.memberActiveByYear[activeCategory]++;
                    finalData[professionalCategory].memberActiveByYear[activeCategory]++;
                }
            }
        }

        // Lapsed Year
        if (membershipStatus === 'Lapsed' && renewalDueYear) {
            const lapsedCategory = getYearCategory(renewalDueYear);
            if (lapsedCategory) {
                finalData.total.lapsedYear[lapsedCategory]++;
                finalData[professionalCategory].lapsedYear[lapsedCategory]++;
            }
        }
    }

    return finalData;
};