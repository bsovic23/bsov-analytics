// -------------------------------------------
// Wild Apricot Functions
// -------------------------------------------

//  Interface Imports

import { WildApricotData, WildApricotDups, WildApricotMembershipLapsed } from '../typeScript/membership'

// =======================================================================================================================================
// Wild Apricot Repeated Clean Up Reports
// =======================================================================================================================================

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

// =======================================================================================================================================
// Wild Apricot Analysis
// =======================================================================================================================================

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
            for (let year = memberSinceDate.getFullYear(); year <= 2025; year++) {
                const activeFiscalYear = getFiscalYear(new Date(year, memberSinceDate.getMonth(), memberSinceDate.getDate()));
                if (activeFiscalYear) {
                    finalData.total.memberActiveByYear[activeFiscalYear]++;
                    finalData[professionalCategory].memberActiveByYear[activeFiscalYear]++;
                }
            }
        }

        // Lapsed Year (only if more than 1 year has passed since renewalDueDate)
        if (membershipStatus === 'Lapsed' && renewalDueDate) {
            const today = new Date('2024-10-27');
            const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

            // Only count as lapsed if renewalDueDate was more than one year ago
            if (renewalDueDate <= oneYearAgo) {
                const lapsedFiscalYear = getFiscalYear(renewalDueDate);
                if (lapsedFiscalYear) {
                    finalData.total.lapsedYear[lapsedFiscalYear]++;
                    finalData[professionalCategory].lapsedYear[lapsedFiscalYear]++;
                }
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


// WILD APRICOT Last Clicked

export const newFunctions = (data: WildApricotData[]) => {
    let finalData: Record<string, any> = {
        paidMemberships: 0,
        nonPaidMemberships: 0,
        activityByMonth2024: {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0
        }
    };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    for (const obj of data) {
        const { 
            "Professional Category": professionalCategory, 
            "Last login": lastLogin
        } = obj;

        // Count paid vs. non-paid memberships
        if (professionalCategory === "Student" || professionalCategory === "Fellow" || professionalCategory === "Resident") {
            finalData.nonPaidMemberships++;
        } else {
            finalData.paidMemberships++;
        }

        // Count activity by month for 2024
        if (lastLogin) {
            const lastLoginDate = new Date(lastLogin);
            const year = lastLoginDate.getFullYear();
            const month = lastLoginDate.getMonth(); // getMonth() is 0-based

            if (year === 2024) {
                const monthName = months[month]; // Get month name from the array
                finalData.activityByMonth2024[monthName]++;
            }
        }
    }

    return finalData;
};

export const quarterAnalysis = (data: WildApricotData[]) => {
    let finalData = {
        'Q1 (Jan-Mar)': 0,
        'Q2 (Apr-Jun)': 0,
        'Q3 (Jul-Sep)': 0,
        'Q4 (Oct-Dec)': 0,
    };

    for (const obj of data) {
        const { "Member since": memberSince } = obj;

        // Convert the "Member since" date to a JavaScript Date object
        const memberSinceDate = new Date(memberSince);

        // Extract the year and month
        const year = memberSinceDate.getFullYear();
        const month = memberSinceDate.getMonth() + 1; // Months are 0-based, so +1

        // Only count if the year is 2024
        if (year === 2024) {
            if (month >= 1 && month <= 3) {
                finalData['Q1 (Jan-Mar)'] += 1;
            } else if (month >= 4 && month <= 6) {
                finalData['Q2 (Apr-Jun)'] += 1;
            } else if (month >= 7 && month <= 9) {
                finalData['Q3 (Jul-Sep)'] += 1;
            } else if (month >= 10 && month <= 12) {
                finalData['Q4 (Oct-Dec)'] += 1;
            }
        }
    }

    return finalData;
}