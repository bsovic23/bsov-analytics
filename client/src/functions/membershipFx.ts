// -------------------------------------------
// Wild Apricot Functions
// -------------------------------------------

//  Interface Imports

import { WildApricotData, WildApricotDups, WildApricotMembershipLapsed } from '../typeScript/membership'

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

// ------ Wild Apricot Lapsed Members Renewal -------

export const wildApricotMemberLapseFx = (
    data: WildApricotData[], 
    monthChosen: number, 
    yearChosen: number
): WildApricotMembershipLapsed[] => {
    let membersLapsed: WildApricotMembershipLapsed[] = [];

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

        const renewalDate = new Date(renewalDue);
        const renewalMonth = renewalDate.getMonth() + 1; // getMonth returns 0-11, so +1
        const renewalYear = renewalDate.getFullYear();

        if (
            membershipStatus === 'Lapsed' &&
            renewalMonth === monthChosen &&
            renewalYear === yearChosen
        ) {
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
            });
        }
    }

    return membersLapsed;
};

// ------- Wild Apricot Y/Y Analysis ------

export const wildApricotFiscalYearAnalysis = (data: WildApricotData[]) => {
    let finalData: Record<string, any> = {
        total: {
            memberActiveByYear: {
                FY21: 0,
                FY22: 0,
                FY23: 0,
                FY24: 0,
                FY25: 0
            },
            memberJoinedYear: {
                FY21: 0,
                FY22: 0,
                FY23: 0,
                FY24: 0,
                FY25: 0
            },
            lapsedYear: {
                FY21: 0,
                FY22: 0,
                FY23: 0,
                FY24: 0,
                FY25: 0
            },
        }
    };

    const getFiscalYear = (date: Date): keyof typeof finalData['total']['memberActiveByYear'] | undefined => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() returns 0-based month, so adding 1

        if (year === 2020 && month >= 5 || year === 2021 && month <= 4) return 'FY21';
        if (year === 2021 && month >= 5 || year === 2022 && month <= 4) return 'FY22';
        if (year === 2022 && month >= 5 || year === 2023 && month <= 4) return 'FY23';
        if (year === 2023 && month >= 5 || year === 2024 && month <= 4) return 'FY24';
        if (year === 2024 && month >= 5) return 'FY25';
        return undefined;
    };

    for (const obj of data) {
        const { 
            "Professional Category": professionalCategory,
            "Membership status": membershipStatus,
            "Member since": memberSince,
            "Renewal due": renewalDue,
        } = obj;

        // Parse dates
        const memberSinceDate = new Date(memberSince);
        const renewalDueDate = renewalDue ? new Date(renewalDue) : null;

        // Ensure there's a category for this professionalCategory in finalData
        if (!finalData[professionalCategory]) {
            finalData[professionalCategory] = {
                memberActiveByYear: {
                    FY21: 0,
                    FY22: 0,
                    FY23: 0,
                    FY24: 0,
                    FY25: 0
                },
                memberJoinedYear: {
                    FY21: 0,
                    FY22: 0,
                    FY23: 0,
                    FY24: 0,
                    FY25: 0
                },
                lapsedYear: {
                    FY21: 0,
                    FY22: 0,
                    FY23: 0,
                    FY24: 0,
                    FY25: 0
                }
            };
        }

        // Member Joined Year
        const joinedFiscalYear = getFiscalYear(memberSinceDate);
        if (joinedFiscalYear) {
            finalData.total.memberJoinedYear[joinedFiscalYear]++;
            finalData[professionalCategory].memberJoinedYear[joinedFiscalYear]++;
        }

        // Member Active By Year
        if (membershipStatus === 'Active') {
            for (let year = memberSinceDate.getFullYear(); year <= 2024; year++) {
                const activeFiscalYear = getFiscalYear(new Date(year, memberSinceDate.getMonth(), memberSinceDate.getDate()));
                if (activeFiscalYear) {
                    finalData.total.memberActiveByYear[activeFiscalYear]++;
                    finalData[professionalCategory].memberActiveByYear[activeFiscalYear]++;
                }
            }
        }

        // Lapsed Year
        if (membershipStatus === 'Lapsed' && renewalDueDate) {
            const lapsedFiscalYear = getFiscalYear(renewalDueDate);
            if (lapsedFiscalYear) {
                finalData.total.lapsedYear[lapsedFiscalYear]++;
                finalData[professionalCategory].lapsedYear[lapsedFiscalYear]++;
            }
        }
    }

    return finalData;
};


// Retention Rate

export function calculateFiscalYearRetention(data: WildApricotData[], fiscalYears: string[]) {
    const retention = fiscalYears.reduce((acc, year) => {
        acc[year] = { numerator: 0, denominator: 0 };
        return acc;
    }, {} as Record<string, { numerator: number, denominator: number }>);

    const getFiscalYear = (date: Date): string | undefined => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() returns 0-based month

        if (year === 2020 && month >= 5 || year === 2021 && month <= 4) return 'FY21';
        if (year === 2021 && month >= 5 || year === 2022 && month <= 4) return 'FY22';
        if (year === 2022 && month >= 5 || year === 2023 && month <= 4) return 'FY23';
        if (year === 2023 && month >= 5 || year === 2024 && month <= 4) return 'FY24';
        if (year === 2024 && month >= 5) return 'FY25';
        return undefined;
    };

    data.forEach(member => {
        const memberSinceDate = new Date(member['Member since']);
        const renewalDueDate = new Date(member['Renewal due']);
        const membershipStatus = member['Membership status'];

        fiscalYears.forEach(fiscalYear => {
            const memberFiscalYear = getFiscalYear(memberSinceDate);
            const renewalFiscalYear = getFiscalYear(renewalDueDate);

            if (memberFiscalYear && fiscalYear >= memberFiscalYear) {
                if (!renewalFiscalYear || fiscalYear < renewalFiscalYear || (fiscalYear === renewalFiscalYear && membershipStatus === 'Active')) {
                    // Member retained for this fiscal year
                    retention[fiscalYear].numerator += 1;
                }
                // Add to the denominator for each fiscal year the member is considered
                retention[fiscalYear].denominator += 1;
            }
        });
    });

    return retention;
}


// WILD APRICOT MEMBERSHIP NEW

export const wildApricotRetentionNew = (data: WildApricotData[]) => {

};