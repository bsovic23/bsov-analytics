
// Katey KLC emaii list

export interface KlcEmailList {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    state: string,
    country: string,
    member: boolean,
    dateAccess: string,
    courseComplete: string,
}

export interface KlcEmailListClean {
    [email: string]: {
        firstName: string,
        lastName: string,
        email: string,
        state: string,
        country: string,
        member: boolean,
        dateAccessTotal: number,
        coursesComplete: number,
        firstContact: string,
        lastContact: string,
        dates: { formattedDate: string }[];
    }
}