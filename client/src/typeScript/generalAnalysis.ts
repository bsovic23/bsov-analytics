
// Katey KLC emaii list

export interface KlcEmailList {
    id: number,
    courseName: string,
    courseId: number,
    firstName: string,
    lastName: string,
    email: string,
    state: string,
    country: string,
    member: boolean,
    dateAccess: string,
    courseComplete: boolean,
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
        courseCompleteNames: { course: string }[];
        courseCompleteNumbers: { course: number }[];
        courseNonCompleteNames: { course: string }[];
        courseNonCompleteNumbers: {course: number }[];
    }
}


// 7.15 Katey KLC emaii list

export interface Katey715 {
    id: number,
    resourceName: string,
    courseId: number,
    complete: boolean,
    firstName: string,
    lastName: string,
    email: string,
    member: boolean
}

export interface Katey715Clean {
    [email: string]: {
        email: string,
        firstName: string,
        lastName: string,
        member: boolean,
        coursesComplete: number,
        courseNameRegister: { course: string }[],
        courseNameComplete: { course: string }[],
        courseIdRegister: { course: number }[],
        courseIdComplete: { course: number }[],
        situationA: boolean,
        situationB: boolean, 
    }
};


// Kidney Learning Center Cleanup 

export interface EnrollmentReport718 {
    'Id': number,
    'Date Registered': string,
    'Resource Name': string,
    'Course Id': string,
    'Complete': boolean,
    'First Name': string,
    'Last Name': string,
    'Profession': string,
    'Email': string,
    'Address 1': string,
    'Address 2': string,
    'City': string,
    'State': string,
    'Postal Code': string,
    'Country': string,
    'Organization': string,
    'Title': string,
    'Member': boolean,
    'Date Accessed': string,
    'Date Started': string,
    'Date Of Evaluation': string,
    'Certificate Date': string,
    'Date Of Survey': string,
    'Date Updated': string,
    'Max Credits': number,
    'Payment Date': string,
    'Tags': string,
    'Views': number,
}

export interface RegistrationReport718 {
    'Course Name': string,
    'Id': number,
    'First Name': string,
    'Last Name': string,
    'Email': string,
    'City': string,
    'Country': string,
    'Completion Date': string,
    'Registration Date': string,
    'Preferred Language': string,
    'What best describes you?': string,
    'What is your current connection to kidney disease?': string,
    'If you are a kidney patient, do you know the stage/type of your disease?': string,
    'If you know the cause of your kidney disease, please note it below:': string,
    'What type of dialysis treatment are you receiving?': string,
    'What type of transplant did you receive?': string,
    'What is your transplant status?': string,
    'Have you received any other treatment for your kidney disease in the past?': string,
    'Name of transplant center:': string,
    'Date of transplant:': string,
    'Which gender do you identify with?': string,
    'What is the highest grade or year of school that you have completed?': string,
    'What is your current employment status?': string,
    'How would you describe your race or ethnicity? Please select all that apply': string,
}

export interface CleanedList718 {
    [uniqueIdentifier: string]: {
        uniqueIdentifier: string,
        registrationId: string,
        enrollmentId: string,
        'First Name': string,
        'Last Name': string,
        'Email': string,
        'City': string,
        'Country': string,
        'Course Name': string,
        'Course Id': number,
        'Complete': boolean,
        'Profession': string,
        'Address 1': string,
        'Address 2': string,
        'State': string,
        'Postal Code': string,
        'Organization': string,
        'Title': string,
        'Member': boolean,
        'Date Accessed': string,
        'Date Started': string,
        'Date Of Evaluation': string,
        'Certificate Date': string,
        'Date of Survey': string,
        'Date Updated': string,
        'Max Credits': number,
        'Payment Date': string,
        'Tags': string,
        'Views': number,
        'Completion Date': string,
        'Registration Date': string,
        'Preferred Language': string,
        'What best describes you?': string,
        'What is your current connection to kidney disease?': string,
        'If you are a kidney patient, do you know the stage/type of your disease?': string,
        'If you know the cause of your kidney disease, please note it below:': string,
        'What type of dialysis treatment are you receiving?': string,
        'What type of transplant did you receive?': string,
        'What is your transplant status?': string,
        'Have you received any other treatment for your kidney disease in the past?': string,
        'Name of transplant center:': string,
        'Date of transplant:': string,
        'Which gender do you identify with?': string,
        'What is the highest grade or year of school that you have completed?': string,
        'What is your current employment status?': string,
        'How would you describe your race or ethnicity? Please select all that apply': string,
    }
}