// ------------------
// Data Imports
// ------------------

export interface CompletionReport {
    id: number;
    profession: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    organization: string;
    title: string;
    dob: Date;
    completed: Boolean;
}

export interface EnrollmentReport {
    id: number;
    profession: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    organization: string;
    title: string;
    dob: Date;
    completed: Boolean;
}

export interface EvaluationReport {
    id: Number;
    profession: String;
    // each question differs ....
};

export interface ModuleReport {
    id: Number;
    profession: String;
    scorePretest: Number;
    scorePosttest: Number;
}

// ------------------
// Data - Module Data
// ------------------


// ------------------
// Data - User Data
// ------------------
export interface UserData {
    id: number;
    member: Boolean;
    profession: String;
    city: String;
    state: String;
    country: String;
    enrolledCourses: Courses[];
    completedCourses: Courses[];
};

export interface Courses {
    courseTitle: String;
}