// ------------------
// Data Imports
// ------------------

export interface EnrollmentReport {
    module: string;
    id: number;
    first_name: string;
    last_name: string;
    profession: string;
    email: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    organization: string;
    title: string;
    dob: Date;
    member: Boolean;
    complete: Boolean;
}

export interface EvaluationReport {
    id: Number;
    profession: string;
    // each question differs ....
};

export interface ModuleReport {
    module: number;
    id: number;
    profession: string;
    complete: Boolean;
    scorePretest: number;
    scorePosttest: number;
}


// ------------------
// Data - User Data
// ------------------

export interface UserData {
    identifier: string;
    member: Boolean;
    profession: string;
    city: string;
    state: string;
    country: string;
    enrolledCourses: string[];
    completedCourses: string[];
};

// ------------------
// Data - Evaluation Data
// ------------------



// ------------------
// Data - Module Data
// ------------------

export interface ModuleScoreData {
    professionScoreChange: ProfessionStructure[];
    scoreIncreased: number;
    scoreDecreased: number;
    scoreSame: number;
    score100Both: number;
}

export interface ProfessionStructure {
    professionType: string;
    scoreIncreased: number;
    scoreDecreased: number;
    scoreSame: number;
    score100Both: number;
}