
// Katey KLC emaii list

export interface KlcEmailList {
    id: number,
    dateRegister: string,
    resourceName: string,
    complete: boolean,
    firstName: string,
    lastName: string,
    email: string,
    member: boolean,
    dateAccess: string,
}

export interface KlcEmailListClean {
    [email: string]: {
        firstName: string,
        lastName: string,
        email: string,
        dateAccessTotal: number,
        firstContact: string,
        lastContact: string,
        dates: { formattedDate: string }[];
    }
}