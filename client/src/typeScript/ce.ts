// ------------------
// Data Imports
// ------------------

export interface EnrollmentReport {
    module: string;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profession: string;
    city: string;
    state: string;
    country: string;
    organization: string;
    title: string;
    member: Boolean;
    enrolled: Boolean;
    complete: Boolean;
    age: number;
    enrollMonth: number;
}

export interface EvaluationReport {
    id: number;
    profession: string;
    // each question differs ....
};

export interface ModuleReport {
    module: number;
    id: number;
    profession: string;
    moduleStartDate: string;
    moduleCompleteDate: string;
    moduleComplete: Boolean;
    scorePretest: number;
    scorePosttest: number;
}

export interface ModuleReportMap {
    module: number;
    quiz: Boolean;
    prepost_both: string;
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
// Analysis - User Data
// ------------------

export interface UserAnalysis {

}

// ------------------
// Analysis - Enrollment Data
// ------------------

export interface EnrollmentAnalysis {
    courseComplete: number;
    courseEnroll: number;
    enrollmentMonth: Record<number, number>;
    top10EnrolledModules: Record<string, number>;
    top10CompletedModules: Record<string, number>;
    moduleEnrollProfessions: Record<string, number>;
    moduleCompleteProfessions: Record<string, number>;
    moduleCompleteAge: Record<string, number>;
    moduleCompleteState: Record<string, number>;
    moduleCompleteCompare: Record<string, MemberFormat>;
};

export interface MemberFormat {
    completed: number;
    enrolled: number;
}



// ------------------
// Analysis - Evaluation Data
// ------------------

export interface EvaluationAnalysis {

};

// ------------------
// Analysis - Module Data
// ------------------

export interface ModuleAnalysis {
    professionScoreChange: Record<string, ProfessionStructure>;
    scoreIncreased: number;
    scoreDecreased: number;
    scoreSame: number;
    score100Both: number;
}

export interface ProfessionStructure {
    scoreIncreased: number;
    scoreDecreased: number;
    scoreSame: number;
    score100Both: number;
}