// ========================================================================================================================
//  General Analysis/Cleanup Functions
// ========================================================================================================================

// ===== KLC ==============================================================================================================

// ------ FX-1 Created Account but not registered for course
export const klcNoCourseRegistrationFx = (data) => {

    if (!Array.isArray(data) || data.length === 0) {
        console.warn('Input data is not a non-empty array.');
        return [];
      }

    let userInformation = {};

    for (const obj of data) {
        let firstName = obj['First Name'];
        let lastName = obj['Last Name'];
        let email = obj.Email;
        let state = obj.State;
        let courseStatus = obj.Complete;

        let id = `${firstName}-${lastName}-${email}`;

        if (!userInformation[id]) {
            userInformation[id] = {
                'First Name': firstName,
                'Last Name': lastName,
                'Email': email,
                'State': state,
                'Course Status': {
                    'Complete': 0,
                    'RegisterdOnly': 0,
                    'NoRegisterdInfo': 0
                }
            }
        }

        if (courseStatus === true) {
            userInformation[id]['Course Status']['Complete'] += 1;
        } else if (courseStatus === false) {
            userInformation[id]['Course Status']['RegisterdOnly'] += 1;
        } else userInformation[id]['Course Status']['NoRegisterdInfo'] += 1;
    }

    const functionOneOutput = Object.values(userInformation).filter((user) => {
        const completeVar = user['Course Status']['Complete'];
        const registeredOnlyVar = user['Course Status']['RegisterdOnly'];
        const noRegisterdInfoVar = user['Course Status']['NoRegisterdInfo'];

        return completeVar === 0 && registeredOnlyVar === 0 && noRegisterdInfoVar !== 0;
    });

    return functionOneOutput;
};


// ------ FX-2 People who have Created Account and Registered but not completed any courses

export const klcRegistrationNoCompleteFx = (data) => {

    if (!Array.isArray(data) || data.length === 0) {
        console.warn('Input data is not a non-empty array.');
        return [];
      }

    let userInformation = {};

    for (const obj of data) {
        let firstName = obj['First Name'];
        let lastName = obj['Last Name'];
        let email = obj.Email;
        let courseStatus = obj.Complete;
        let state = obj.State;
        let courseName = obj['Resource Name'];
        let courseNumber = obj['Course Id']; 

        let id = `${firstName}-${lastName}-${email}`;

        if (!userInformation[id]) {
            userInformation[id] = {
                'First Name': firstName,
                'Last Name': lastName,
                'Email': email,
                'State': state,
                'CoursesNotComplete': [],
                'CoursesIdNotComplete': [],
                'Course Status': {
                    'Complete': 0,
                    'RegisterdOnly': 0,
                    'NoRegisterdInfo': 0
                }
            }
        }

        if (courseStatus === true) {
            userInformation[id]['Course Status']['Complete'] += 1;
        } else if (courseStatus === false) {
            userInformation[id]['Course Status']['RegisterdOnly'] += 1;
            userInformation[id]['CoursesNotComplete'].push(courseName);
            userInformation[id]['CoursesIdNotComplete'].push(courseNumber);
        } else userInformation[id]['Course Status']['NoRegisterdInfo'] += 1;
    }

    const functionTwoOutput = Object.values(userInformation).filter((user) => {
        const completeVar = user['Course Status']['Complete'];
        const registeredOnlyVar = user['Course Status']['RegisterdOnly'];
        const noRegisterdInfoVar = user['Course Status']['NoRegisterdInfo'];

        return completeVar === 0 && registeredOnlyVar !== 0;
    });

    return functionTwoOutput;
};

// ===== Data Dictionary ==============================================================================================================

// ------ Update with data dictionary comments

export const ddCleanupDeletes = (all, edits) => {
    const deletedIds = all.filter(item => !edits.some(editItem => editItem.id === item.id));
    return deletedIds;
  };
