// -------------------------------------------
// Wild Apricot Data Imports
// -------------------------------------------

// Wild Apricot Data

export interface WildApricotData {
    'User ID': number,
    'First name': string,
    'Last name': string,
    'Email': string,
    'Phone': string,
    'Membership enabled': string,
    'Membership level': string,
    'Membership status': string,
    'Member since': string,
    'Renewal due': string,
    'Renewal date since last changed': string,
}

// -------------------------------------------
// Wild Apricot Function Outputs
// -------------------------------------------

// Wild Apricot Duplicates Output

export interface WildApricotDups {
    [uniqueId: string]: {
        dupCount: number,
        ids: number[],
    }
}

// Wild Apricot 30 day Membership Lapse Output

export interface WildApricotMembershipLapsed {
    [userId: number]: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        membershipStatus: string,
        memberSince: string,
        renewalData: string,
        renewalDateLastChange: string,
        daysLapsed: number,
    }
}